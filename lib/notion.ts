// ── Notion-adapter for aho_bilete ────────────────────────────────────────────
// Valfri, køyretids-henting av biletdatabasen. Avhengig-fri (brukar global
// fetch). IKKJE kalla under bygg — gated på env, så Vercel-bygget aldri krasjar
// om nøklane manglar. Kall frå ein server action / route handler når DB-en er
// klar. Set NOTION_API_KEY og DATABASE_ID i miljøet.

import {
  type AhoBilete,
  type Lisens,
  deriveRights,
  orientering,
  byggCreditLine,
} from './aho-bilete';

const NOTION_VERSION = '2022-06-28';

// Notion property-lesarar (defensive — toler manglande felt)
type Prop = any;
const txt = (p: Prop): string =>
  (p?.title ?? p?.rich_text ?? [])?.map((t: any) => t?.plain_text ?? '').join('') ?? '';
const sel = (p: Prop): string => p?.select?.name ?? '';
const num = (p: Prop): number | null => (typeof p?.number === 'number' ? p.number : null);
const url = (p: Prop): string => p?.url ?? '';
const chk = (p: Prop): boolean => !!p?.checkbox;
const dat = (p: Prop): string => p?.date?.start ?? '';
const person = (p: Prop): string => (p?.people ?? [])?.map((u: any) => u?.name ?? '').join(', ');
const file = (p: Prop): string => {
  const f = (p?.files ?? [])[0];
  return f?.file?.url ?? f?.external?.url ?? '';
};
const formula = (p: Prop): string => p?.formula?.string ?? (p?.formula?.number?.toString() ?? '');

function mapPage(page: any): AhoBilete {
  const P = page.properties ?? {};
  const lisens = (sel(P['lisens']) || 'uklart') as Lisens;
  const derived = deriveRights(lisens);
  const breidd = num(P['breidd']) ?? undefined;
  const høgd = num(P['høgd']) ?? undefined;
  return {
    tittel: txt(P['tittel']),
    slug: txt(P['slug']) || page.id,
    rights_status: (sel(P['rights_status']) || 'rettar_uavklart') as AhoBilete['rights_status'],
    sort_order: num(P['sort_order']) ?? 0,
    year: num(P['year']),
    seksjon: (sel(P['seksjon']) || 'historie') as AhoBilete['seksjon'],
    prioritet: (sel(P['prioritet']) || 'arkiv') as AhoBilete['prioritet'],
    fil: file(P['fil']) || undefined,
    media_url: url(P['media_url']) || undefined,
    kjeldeside: url(P['kjeldeside']) || undefined,
    kreditering: txt(P['kreditering']) || undefined,
    credit_line: formula(P['credit_line']) || byggCreditLine({ kreditering: txt(P['kreditering']), lisens }),
    lisens,
    attribusjon_kravd: P['attribusjon_kravd'] ? chk(P['attribusjon_kravd']) : derived.attribusjon_kravd,
    del_likt: P['del_likt'] ? chk(P['del_likt']) : derived.del_likt,
    kommersiell_ok: P['kommersiell_ok'] ? chk(P['kommersiell_ok']) : derived.kommersiell_ok,
    hotlink_status: (sel(P['hotlink_status']) || 'varsemd_sjekk_vilkår') as AhoBilete['hotlink_status'],
    host: txt(P['host']) || undefined,
    breidd,
    høgd,
    orientering: (formula(P['orientering']) as AhoBilete['orientering']) || orientering(breidd, høgd),
    alt_tekst: txt(P['alt_tekst']) || undefined,
    bildetekst: txt(P['bildetekst']) || undefined,
    føreslått_kjelde: txt(P['føreslått_kjelde']) || undefined,
    ansvarleg: person(P['ansvarleg']) || undefined,
    frist: dat(P['frist']) || undefined,
    sensitivitet: (sel(P['sensitivitet']) || 'nøytral') as AhoBilete['sensitivitet'],
    merknad: txt(P['merknad']) || undefined,
  };
}

/** Hent alle bilete frå aho_bilete-databasen, sortert på sort_order. */
export async function fetchAhoBilete(): Promise<AhoBilete[]> {
  const token = process.env.NOTION_API_KEY;
  const db = process.env.DATABASE_ID;
  if (!token || !db) return [];

  const out: AhoBilete[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        sorts: [{ property: 'sort_order', direction: 'ascending' }],
      }),
      cache: 'no-store',
    });
    if (!res.ok) break;
    const data = await res.json();
    for (const page of data.results ?? []) out.push(mapPage(page));
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return out;
}

/** Berre bilete som er rettsleg klare for publisering. */
export async function fetchPubliserbareBilete(): Promise<AhoBilete[]> {
  const alle = await fetchAhoBilete();
  return alle.filter((b) => b.rights_status === 'klar' || b.rights_status === 'eigen_grafikk');
}
