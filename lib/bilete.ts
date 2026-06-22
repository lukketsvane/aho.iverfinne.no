// ── Publiserbare arkivfoto (snapshot frå Notion «AHO bilete») ────────────────
// Berre rows med Rettsstatus = «klar» OG Hotlink-status = «ok_direct», dvs.
// trygge å hotlinke. Dette er ein snapshot; når NOTION_API_KEY er delt med
// databasen kan `lib/notion.ts` (fetchPubliserbareBilete) erstatte lista.

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
  {
    slug: '08_2020_st_olavs_gate_4_cc_by_sa_4_ssu',
    tittel: 'St. Olavs gate-perioden',
    year: 2020,
    seksjon: 'historie',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/St._Olavs_Gate_4%2C_Oslo_%28Oslo_by_Steinerskole%29.jpg',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:St._Olavs_Gate_4,_Oslo_(Oslo_by_Steinerskole).jpg',
    kreditering: 'Ssu / Wikimedia Commons',
    lisens: 'CC BY-SA 4.0',
    alt: 'Bygningen i St. Olavs gate 4 i Oslo sett frå gata.',
    breidd: 4032,
    hogd: 3024,
  },
  {
    slug: '14_2001_maridalsveien_aho_public_domain_mahlum',
    tittel: 'Flytting til Maridalsveien 29',
    year: 2001,
    seksjon: 'historie',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Arkitekthogskolen_Oslo.jpg',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:Arkitekthogskolen_Oslo.jpg',
    kreditering: 'Mahlum / Wikimedia Commons',
    lisens: 'PD',
    alt: 'Arkitekthøgskolen i Maridalsveien 29 i Oslo, eksteriør.',
    breidd: 951,
    hogd: 375,
  },
  {
    slug: '14_2006_aho_maridalsveien_cc_by_sa_3_helge_hoifodt',
    tittel: 'AHO etter flyttinga',
    year: 2006,
    seksjon: 'samtid',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Arkitekt_og_designhogskolen_Oslo.JPG',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:Arkitekt_og_designhogskolen_Oslo.JPG',
    kreditering: 'Helge Høifødt / Wikimedia Commons',
    lisens: 'CC BY-SA 3.0',
    alt: 'Arkitektur- og designhøgskolen i Oslo, eksteriør av campus i Maridalsveien.',
    breidd: 3872,
    hogd: 2091,
  },
  {
    slug: '14_2009_aho_project_image_cc_by_2_mads_boedker',
    tittel: 'AHO-prosjekt',
    year: 2009,
    seksjon: 'forsking',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Oslo_school_of_architecture_and_design.jpg',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:Oslo_school_of_architecture_and_design.jpg',
    kreditering: 'Mads Boedker / Wikimedia Commons / Flickr',
    lisens: 'CC BY 2.0',
    alt: 'Prosjekt-/aktivitetsbilete frå Arkitektur- og designhøgskolen i Oslo.',
    breidd: 3888,
    hogd: 2592,
  },
  {
    slug: '17_2011_aho_entrance_logo_cc_by_3_sidsel_moum',
    tittel: 'AHO-identitet',
    year: 2011,
    seksjon: 'identitet',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/The_Oslo_School_of_Architecture_and_Design_-_entrance.jpg',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:The_Oslo_School_of_Architecture_and_Design_-_entrance.jpg',
    kreditering: 'Sidsel Moum / Wikimedia Commons',
    lisens: 'CC BY 3.0',
    alt: 'Inngangen til Arkitektur- og designhøgskolen i Oslo med skilt og logo.',
    breidd: 914,
    hogd: 1129,
  },
  {
    slug: '18_2015_aho_related_student_project_the_bands_cc0',
    tittel: 'Studentprosjekt',
    year: 2015,
    seksjon: 'prosjekt',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/05_The_Bands_dining_table_and_BBQ_SMALL.jpg',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:05_The_Bands_dining_table_and_BBQ_SMALL.jpg',
    kreditering: 'Jonas Aarre Sommarset / Wikimedia Commons',
    lisens: 'CC0',
    alt: "Studentprosjektet 'The Bands' med spisebord og grill utandørs.",
    breidd: 5616,
    hogd: 3744,
  },
  {
    slug: '20_2017_aho_architecture_school_campus_cc_by_sa_4_oyvind_holmstad',
    tittel: 'AHO campus',
    year: 2017,
    seksjon: 'samtid',
    media_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/AHO_Oslo_Architecture_School_2017.jpg',
    kjeldeside: 'https://commons.wikimedia.org/wiki/File:AHO_Oslo_Architecture_School_2017.jpg',
    kreditering: 'Øyvind Holmstad / Wikimedia Commons',
    lisens: 'CC BY-SA 4.0',
    alt: 'Campus til Arkitektur- og designhøgskolen i Oslo, fotografert i 2017.',
    breidd: 5472,
    hogd: 3648,
  },
];

// Kva bilete høyrer til kva milepæl (id i lib/timeline.ts).
export const MILESTONE_BILETE: Record<string, string> = {
  '1968': '08_2020_st_olavs_gate_4_cc_by_sa_4_ssu',
  '2001': '14_2001_maridalsveien_aho_public_domain_mahlum',
  '2005': '14_2006_aho_maridalsveien_cc_by_sa_3_helge_hoifodt',
  '2025': '20_2017_aho_architecture_school_campus_cc_by_sa_4_oyvind_holmstad',
};

export const biletFor = (milestoneId: string): Bilete | undefined => {
  const slug = MILESTONE_BILETE[milestoneId];
  return slug ? BILETE.find((b) => b.slug === slug) : undefined;
};

export const biletCredit = (b: Bilete): string =>
  `${b.kreditering}${b.lisens && b.lisens !== 'uklart' ? ' · ' + (b.lisens === 'PD' ? 'offentleg eige' : b.lisens) : ''}`;
