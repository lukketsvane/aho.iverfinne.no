// Synk rettsklare arkivfoto frå Notion «AHO bilete» til lib/bilete.ts.
// Bruk:  npm run sync:bilete   (krev NOTION_API_KEY + NOTION_BILETE_DB_ID)
// Les .env.local automatisk. Hentar berre Rettsstatus = «klar» OG
// Hotlink-status = «ok_direct» med Mediefil-URL (trygge å hotlinke).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

// last .env.local viss han finst
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const i = line.indexOf('=');
    if (i > 0 && !process.env[line.slice(0, i).trim()]) process.env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
}

const TOKEN = process.env.NOTION_API_KEY;
const DB = process.env.NOTION_BILETE_DB_ID || '31983601-2179-494d-aa2f-6e5072610967';
if (!TOKEN) {
  console.log('sync:bilete — ingen NOTION_API_KEY, beheld eksisterande snapshot.');
  process.exit(0);
}

const txt = (p) => (p?.title ?? p?.rich_text ?? []).map((t) => t?.plain_text ?? '').join('');
const sel = (p) => p?.select?.name ?? '';
const num = (p) => (typeof p?.number === 'number' ? p.number : null);
const url = (p) => p?.url ?? '';

async function fetchAll() {
  const out = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${DB}/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_size: 100, start_cursor: cursor }),
    });
    if (!res.ok) {
      console.error('Notion-feil', res.status, '— beheld snapshot.');
      process.exit(0);
    }
    const d = await res.json();
    out.push(...(d.results ?? []));
    cursor = d.has_more ? d.next_cursor : undefined;
  } while (cursor);
  return out;
}

const rows = await fetchAll();
const P = (pg, k) => pg.properties?.[k] ?? {};
const bilete = rows
  .filter((pg) => sel(P(pg, 'Rettsstatus')) === 'klar' && sel(P(pg, 'Hotlink-status')) === 'ok_direct' && url(P(pg, 'Mediefil-URL')))
  .map((pg) => ({
    slug: txt(P(pg, 'Slug')),
    tittel: txt(P(pg, 'Tittel')),
    year: num(P(pg, 'Årstal')),
    seksjon: sel(P(pg, 'Seksjon')),
    media_url: url(P(pg, 'Mediefil-URL')),
    kjeldeside: url(P(pg, 'Kjeldeside')),
    kreditering: txt(P(pg, 'Kreditering')),
    lisens: sel(P(pg, 'Lisens')),
    alt: txt(P(pg, 'Alt-tekst')),
    breidd: num(P(pg, 'Breidd')) ?? undefined,
    hogd: num(P(pg, 'Høgd')) ?? undefined,
  }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

const j = (v) => JSON.stringify(v);
const body = bilete
  .map(
    (b) => `  {
    slug: ${j(b.slug)},
    tittel: ${j(b.tittel)},
    year: ${b.year === null ? 'null' : b.year},
    seksjon: ${j(b.seksjon)},
    media_url: ${j(b.media_url)},
    kjeldeside: ${j(b.kjeldeside)},
    kreditering: ${j(b.kreditering)},
    lisens: ${j(b.lisens)},
    alt: ${j(b.alt)},${b.breidd ? `\n    breidd: ${b.breidd},` : ''}${b.hogd ? `\n    hogd: ${b.hogd},` : ''}
  },`,
  )
  .join('\n');

const file = `// ── Publiserbare arkivfoto (snapshot frå Notion «AHO bilete») ────────────────
// AUTO-GENERERT av scripts/sync-bilete.mjs. Berre rows med Rettsstatus = «klar»
// OG Hotlink-status = «ok_direct», dvs. trygge å hotlinke. Køyr \`npm run
// sync:bilete\` for å oppdatere når nye bilete blir markerte klare i Notion.

export type Bilete = {
  slug: string;
  tittel: string;
  year: number | null;
  seksjon: string;
  media_url: string;
  kjeldeside: string;
  kreditering: string;
  lisens: string;
  alt: string;
  breidd?: number;
  hogd?: number;
};

export const BILETE: Bilete[] = [
${body}
];

// Kva bilete høyrer til kva milepæl (id i lib/timeline.ts).
export const MILESTONE_BILETE: Record<string, string> = {
  '1968': '08_2020_st_olavs_gate_4_cc_by_sa_4_ssu',
  '2001': '14_2001_maridalsveien_aho_public_domain_mahlum',
  '2005': '14_2006_aho_maridalsveien_cc_by_sa_3_helge_hoifodt',
  '2009': '14_2009_aho_project_image_cc_by_2_mads_boedker',
  '2025': '20_2017_aho_architecture_school_campus_cc_by_sa_4_oyvind_holmstad',
};

export const biletFor = (milestoneId: string): Bilete | undefined => {
  const slug = MILESTONE_BILETE[milestoneId];
  return slug ? BILETE.find((b) => b.slug === slug) : undefined;
};

export const biletCredit = (b: Bilete): string =>
  \`\${b.kreditering}\${b.lisens && b.lisens !== 'uklart' ? ' · ' + (b.lisens === 'PD' ? 'offentleg eige' : b.lisens) : ''}\`;
`;

writeFileSync('lib/bilete.ts', file);
console.log(`sync:bilete — skreiv ${bilete.length} rettsklare bilete til lib/bilete.ts`);
