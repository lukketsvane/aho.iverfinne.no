// ── Notion-adapter for «AHO bilete» ─────────────────────────────────────────
// Valfri, køyretids-henting av biletdatabasen. Avhengig-fri (global fetch).
// IKKJE kalla under bygg — gated på env, så Vercel-bygget aldri krasjar om
// nøklane manglar. Mappar dei FAKTISKE Notion-eigenskapsnamna (norske, med
// mellomrom) til AhoBilete. Sjå docs/DATA.md.

import {
  type AhoBilete,
  type Lisens,
  deriveRights,
  orientering,
  byggCreditLine,
} from './aho-bilete';

const NOTION_VERSION = '2022-06-28';
// Databasen «AHO bilete» (eigen tabell, skild frå «AHO heile historia»).
const BILETE_DB = process.env.NOTION_BILETE_DB_ID || '31983601-2179-494d-aa2f-6e5072610967';

// Notion property-lesarar (defensive — toler manglande felt)
type Prop = any;
const txt = (p: Prop): string =>
  ((p?.title ?? p?.rich_text ?? []) as any[])?.map((t) => t?.plain_text ?? '').join('') ?? '';
const sel = (p: Prop): string => p?.select?.name ?? '';
const num = (p: Prop): number | null => (typeof p?.number === 'number' ? p.number : null);
const url = (p: Prop): string => p?.url ?? '';
const chk = (p: Prop): boolean => !!p?.checkbox;
const dat = (p: Prop): string => p?.date?.start ?? '';
const person = (p: Prop): string => ((p?.people ?? []) as any[])?.map((u) => u?.name ?? '').join(', ');
const file = (p: Prop): string => {
  const f = ((p?.files ?? []) as any[])[0];
  return f?.file?.url ?? f?.external?.url ?? '';
};
const fStr = (p: Prop): string => p?.formula?.string ?? (p?.formula?.number?.toString() ?? '');
const fBool = (p: Prop): boolean => !!p?.formula?.boolean;

function mapPage(page: any): AhoBilete {
  const P = page.properties ?? {};
  const lisens = (sel(P['Lisens']) || 'uklart') as Lisens;
  const derived = deriveRights(lisens);
  const breidd = num(P['Breidd']) ?? undefined;
  const høgd = num(P['Høgd']) ?? undefined;
  return {
    tittel: txt(P['Tittel']),
    slug: txt(P['Slug']) || page.id,
    rights_status: (sel(P['Rettsstatus']) || 'rettar uavklart') as AhoBilete['rights_status'],
    sort_order: num(P['Sortering']) ?? 0,
    year: num(P['Årstal']),
    seksjon: (sel(P['Seksjon']) || 'historie') as AhoBilete['seksjon'],
    prioritet: (sel(P['Prioritet']) || 'arkiv') as AhoBilete['prioritet'],
    fil: file(P['Fil']) || undefined,
    media_url: url(P['Mediefil-URL']) || undefined,
    kjeldeside: url(P['Kjeldeside']) || undefined,
    kreditering: txt(P['Kreditering']) || undefined,
    credit_line: fStr(P['Credit line']) || byggCreditLine({ kreditering: txt(P['Kreditering']), lisens }),
    lisens,
    attribusjon_kravd: P['Attribusjon kravd'] ? chk(P['Attribusjon kravd']) : derived.attribusjon_kravd,
    del_likt: P['Del likt'] ? chk(P['Del likt']) : derived.del_likt,
    kommersiell_ok: P['Kommersiell OK'] ? chk(P['Kommersiell OK']) : derived.kommersiell_ok,
    hotlink_status: (sel(P['Hotlink-status']) || 'varsemd_sjekk_vilkår') as AhoBilete['hotlink_status'],
    host: txt(P['Host']) || undefined,
    breidd,
    høgd,
    orientering: (fStr(P['Orientering']) as AhoBilete['orientering']) || orientering(breidd, høgd),
    bruksklar: fBool(P['Bruksklar']),
    alt_tekst: txt(P['Alt-tekst']) || undefined,
    bildetekst: txt(P['Bildetekst']) || undefined,
    føreslått_kjelde: txt(P['Føreslått kjelde']) || undefined,
    ansvarleg: person(P['Ansvarleg']) || undefined,
    frist: dat(P['Frist']) || undefined,
    sensitivitet: (sel(P['Sensitivitet']) || 'nøytral') as AhoBilete['sensitivitet'],
    merknad: txt(P['Merknad']) || undefined,
  };
}

/** Hent alle bilete frå «AHO bilete», sortert på Sortering. */
export async function fetchAhoBilete(): Promise<AhoBilete[]> {
  const token = process.env.NOTION_API_KEY;
  if (!token) return [];

  const out: AhoBilete[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${BILETE_DB}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        sorts: [{ property: 'Sortering', direction: 'ascending' }],
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

/** Berre bilete som er rettsleg klare for publisering (Rettsstatus = klar / eigen grafikk). */
export async function fetchPubliserbareBilete(): Promise<AhoBilete[]> {
  const alle = await fetchAhoBilete();
  return alle.filter((b) => b.rights_status === 'klar' || b.rights_status === 'eigen grafikk');
}

/** Slå opp bilete per seksjon, t.d. til hero/historie. */
export async function biletePerSeksjon(): Promise<Record<string, AhoBilete[]>> {
  const alle = await fetchPubliserbareBilete();
  return alle.reduce<Record<string, AhoBilete[]>>((acc, b) => {
    (acc[b.seksjon] ??= []).push(b);
    return acc;
  }, {});
}
