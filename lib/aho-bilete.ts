// ── aho_bilete ───────────────────────────────────────────────────────────────
// TypeScript-spegling av Notion-databasen «AHO bilete» (éin tabell med
// Rettsstatus). Rettsflagga er AVLEIDDE av lisensen. Typane følgjer dei
// FAKTISKE verdiane i databasen (mellomrom, ikkje understrek). Sjå docs/DATA.md.

export type RightsStatus =
  | 'klar'
  | 'må bestillast'
  | 'rettar uavklart'
  | 'eigen grafikk'
  | 'ikkje bruk';

export type Lisens =
  | 'CC BY 2.0'
  | 'CC BY 3.0'
  | 'CC BY-SA 3.0'
  | 'CC BY-SA 4.0'
  | 'CC0'
  | 'PD'
  | 'uklart';

export type Seksjon =
  | 'brand'
  | 'historie'
  | 'design'
  | 'forsking'
  | 'samtid'
  | 'identitet'
  | 'prosjekt';

export type Prioritet = 'hero' | 'primær' | 'sekundær' | 'arkiv';
export type HotlinkStatus = 'ok_direct' | 'varsemd_sjekk_vilkår' | 'berre_intern';
export type Sensitivitet = 'nøytral' | 'sensitiv';

export type AhoBilete = {
  tittel: string;
  slug: string; // stabil nøkkel
  rights_status: RightsStatus;
  sort_order: number; // Notion: «Sortering» (00, 01, 14 …), reine sorteringsnøklar
  year: number | null; // Notion: «Årstal», faktisk årstal, nullbar
  seksjon: Seksjon;
  prioritet: Prioritet;
  fil?: string; // Notion: «Fil» (opplasta fil-URL)
  media_url?: string; // Notion: «Mediefil-URL»
  kjeldeside?: string;
  kreditering?: string;
  credit_line?: string; // Notion-formel «Credit line»
  lisens: Lisens;
  attribusjon_kravd: boolean; // avleidd
  del_likt: boolean; // avleidd (share-alike)
  kommersiell_ok: boolean; // avleidd
  hotlink_status: HotlinkStatus;
  host?: string;
  breidd?: number;
  høgd?: number;
  orientering?: 'liggande' | 'ståande'; // Notion-formel, avleidd: breidd >= høgd
  bruksklar?: boolean; // Notion-formel «Bruksklar»
  alt_tekst?: string;
  bildetekst?: string;
  føreslått_kjelde?: string;
  ansvarleg?: string;
  frist?: string; // ISO-dato
  sensitivitet?: Sensitivitet;
  merknad?: string;
};

/** Avled rettsflagga frå lisensen (same logikk som Notion-formlane). */
export function deriveRights(lisens: Lisens): {
  attribusjon_kravd: boolean;
  del_likt: boolean;
  kommersiell_ok: boolean;
} {
  const ccBy = lisens.startsWith('CC BY');
  const sa = lisens.includes('-SA');
  const fri = lisens === 'CC0' || lisens === 'PD';
  const uklart = lisens === 'uklart';
  return {
    attribusjon_kravd: ccBy || uklart, // konservativt ved uklart
    del_likt: sa,
    kommersiell_ok: (ccBy || fri) && !uklart,
  };
}

export const orientering = (breidd?: number, høgd?: number) =>
  breidd != null && høgd != null ? (breidd >= høgd ? 'liggande' : 'ståande') : undefined;

/** Kan biletet trygt visast i webappen no? */
export const erPubliserbar = (b: Pick<AhoBilete, 'rights_status'>) =>
  b.rights_status === 'klar' || b.rights_status === 'eigen grafikk';

/** Bygg ein ferdig credit-line dersom Notion-formelen ikkje er med. */
export function byggCreditLine(b: Partial<AhoBilete>): string {
  const parts = [b.kreditering?.trim()].filter(Boolean) as string[];
  if (b.lisens && b.lisens !== 'uklart') parts.push(b.lisens === 'PD' ? 'offentleg eige' : b.lisens);
  return parts.join(' · ');
}
