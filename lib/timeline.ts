// ── Tidslinje for AHO, verifiserte hendingar ────────────────────────────────
// Kjelder: Store norske leksikon (snl.no/Statens_arkitektkurs,
// snl.no/Arkitektur-_og_designhøgskolen_i_Oslo), nn.wikipedia.org, og AHO si
// eiga historieside (aho.no/om/aho-sin-historie). Årstal er kryssjekka.
// Biletrettar er FØREBELS og må stadfestast før publisering, sjå `sources`.

export type Discipline = 'institusjon' | 'arkitektur' | 'design' | 'landskap' | 'stad';

export type Source = {
  name: string;
  credit?: string;
  license?: string; // t.d. "CC BY-SA 4.0", "Offentleg eige", "Rettar må avklarast"
  access?: string; // t.d. "Open", "Norsk IP", "Krev avtale"
  url?: string;
};

export type Milestone = {
  id: string;
  year: string;
  kicker: string; // sperra versal-etikett
  title: string;
  lead: string; // kort underoverskrift
  body: string; // 2-3 setningar
  place?: string;
  discipline: Discipline;
  motif: 'fasade' | 'gate' | 'verkstad' | 'nybygg' | 'segl' | 'rutenett';
  accent?: boolean; // oransje markør / årstal
  sources: Source[];
};

export const MILESTONES: Milestone[] = [
  {
    id: '1945',
    year: '1945',
    kicker: 'Opphavet',
    title: 'Statens arkitektkurs',
    lead: 'Krisekurset ved Kunstindustriskulen',
    body: 'AHO blir ført tilbake til «Kurs for krigsramte arkitektstuderande», som i 1945 vart til Statens arkitektkurs, ei line ved Statens handverks- og kunstindustriskule (SHKS). Kurset skulle auke talet på arkitektar til attreisinga av landet etter krigen. Det vart fornya år for år som eit provisorium, og rakk å utdanne 189 arkitektar.',
    place: 'SHKS, Oslo',
    discipline: 'institusjon',
    motif: 'fasade',
    accent: true,
    sources: [
      { name: 'Store norske leksikon', url: 'https://snl.no/Statens_arkitektkurs', license: 'CC BY-SA', access: 'Open' },
      {
        name: 'Foto: SHKS, 1904',
        credit: 'Anders Beer Wilse / Oslo Museum',
        license: 'Offentleg eige (foto før 1925)',
        access: 'Open',
      },
    ],
  },
  {
    id: '1961',
    year: '1961',
    kicker: 'Sjølvstende',
    title: 'Statens Arkitektskole i Oslo',
    lead: 'Frå mellombels kurs til vitskapleg høgskule',
    body: 'Etter å ha vorte fornya år for år som ei mellombels ordning, fekk skulen i 1961 status som sjølvstendig vitskapleg høgskule under namnet Statens Arkitektskole i Oslo (SAO).',
    place: 'Oslo',
    discipline: 'institusjon',
    motif: 'rutenett',
    sources: [
      { name: 'Store norske leksikon', url: 'https://snl.no/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo', license: 'CC BY-SA', access: 'Open' },
    ],
  },
  {
    id: '1966',
    year: '1966',
    kicker: 'Tenkinga',
    title: 'Christian Norberg-Schulz',
    lead: 'Teori som gav skulen internasjonal tyngd',
    body: 'Christian Norberg-Schulz (1926-2000) kom til skulen i 1963 og var professor i arkitekturteori og -historie frå 1966 til 1992. Doktoravhandlinga «Intentions in Architecture» fekk internasjonalt gjennomslag og vart omsett til ni språk, og omgrepet hans om «genius loci», staden sin ånd, gjorde fenomenologien til ein berebjelke i norsk arkitekturutdanning.',
    place: 'Oslo',
    discipline: 'arkitektur',
    motif: 'rutenett',
    sources: [
      { name: 'Norsk biografisk leksikon', url: 'https://nbl.snl.no/Christian_Norberg-Schulz', license: 'CC BY-SA', access: 'Open' },
      { name: 'AHO, om Norberg-Schulz', url: 'https://www.aho.no/forskning/nyheter/ti-ting-du-ma-vite-om-christian-norberg-schulz-en-.html', access: 'Open' },
    ],
  },
  {
    id: '1968',
    year: '1968',
    kicker: 'Staden',
    title: 'St. Olavs gate',
    lead: 'Eige hus i Kvadraturen',
    body: 'Skulen flytta frå SHKS til eigne lokale i St. Olavs gate 4 (og seinare 2). Her heldt arkitektutdanninga til heilt fram til flyttinga i 2001.',
    place: 'St. Olavs gate 4, Oslo',
    discipline: 'stad',
    motif: 'gate',
    accent: true,
    sources: [
      { name: 'nn.wikipedia.org', url: 'https://nn.wikipedia.org/wiki/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo', license: 'CC BY-SA 3.0', access: 'Open' },
      { name: 'Foto: St. Olavs gate 4', credit: 'Wikimedia Commons', license: 'CC BY-SA 4.0', access: 'Open' },
    ],
  },
  {
    id: '1969',
    year: '1969',
    kicker: 'Namn',
    title: 'Arkitekthøgskolen i Oslo',
    lead: 'Namnet skulen ber i meir enn tre tiår',
    body: 'I 1969 skifta Statens Arkitektskole i Oslo namn til Arkitekthøgskolen i Oslo, forkortinga AHO som framleis står i dag.',
    place: 'Oslo',
    discipline: 'institusjon',
    motif: 'segl',
    sources: [
      { name: 'Store norske leksikon', url: 'https://snl.no/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo', license: 'CC BY-SA', access: 'Open' },
    ],
  },
  {
    id: '1979',
    year: '1979',
    kicker: 'Designsporet',
    title: 'Industridesign',
    lead: 'Toårig etterutdanning startar',
    body: 'Industridesign kom inn på AHO som eit toårig etterutdanningskurs i 1979, starten på det designfaglege sporet som etter kvart skulle prege heile skulen.',
    place: 'AHO, Oslo',
    discipline: 'design',
    motif: 'verkstad',
    accent: true,
    sources: [
      { name: 'AHO, historie', url: 'https://www.aho.no/om/aho-sin-historie/', access: 'Open' },
    ],
  },
  {
    id: '1983',
    year: '1983',
    kicker: 'Designsporet',
    title: 'Design på fulltid',
    lead: 'Industridesign blir fullt studium',
    body: 'I 1983 vart industridesign eit fullverdig fulltidstilbod. Faget voks frå kurs til eige studieprogram med eigen modellverkstad og studiokultur.',
    place: 'AHO, Oslo',
    discipline: 'design',
    motif: 'verkstad',
    sources: [
      { name: 'AHO, historie', url: 'https://www.aho.no/om/aho-sin-historie/', access: 'Open' },
      { name: 'Foto: modellverkstad', credit: 'AHO-arkivet', license: 'Rettar må avklarast', access: 'Krev avtale' },
    ],
  },
  {
    id: '1996',
    year: '1996',
    kicker: 'Samling',
    title: 'Institutt for industridesign',
    lead: 'Design og arkitektur under same tak',
    body: 'Institutt for industridesign vart innlemma i skulen i 1996, og samla design- og arkitekturmiljøa i éin institusjon, grunnlaget for dagens AHO.',
    place: 'Oslo',
    discipline: 'design',
    motif: 'rutenett',
    sources: [
      { name: 'Store norske leksikon', url: 'https://snl.no/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo', license: 'CC BY-SA', access: 'Open' },
    ],
  },
  {
    id: '1997',
    year: '1997',
    kicker: 'Anerkjenning',
    title: 'Sverre Fehn og Pritzker-prisen',
    lead: 'AHO-professoren som vann arkitekturens «nobelpris»',
    body: 'Sverre Fehn (1924-2009) var professor ved skulen frå 1971 til 1995 og ein legendarisk lærar. I 1997 fekk han Pritzker-prisen, framleis den einaste nordmannen som har vunne, same året som Heinrich-Tessenows gullmedalje. Saman med Norberg-Schulz gav han AHO ein eksepsjonell internasjonal posisjon.',
    place: 'Oslo',
    discipline: 'arkitektur',
    motif: 'fasade',
    accent: true,
    sources: [
      { name: 'Norsk biografisk leksikon', url: 'https://nbl.snl.no/Sverre_Fehn', license: 'CC BY-SA', access: 'Open' },
      { name: 'The Pritzker Architecture Prize, 1997', url: 'https://www.pritzkerprize.com/laureates/1997', access: 'Open' },
    ],
  },
  {
    id: '2001',
    year: '2001',
    kicker: 'Nytt hus',
    title: 'Maridalsveien 29',
    lead: 'Eit gammalt industribygg ved Akerselva',
    body: 'Hausten 2001 flytta AHO til Maridalsveien 29 ved Akerselva. Bygget stod ferdig i 1938 som verkstad og lager for Oslo Lysverker, teikna av Oslos byarkitekt, og fasaden er verna. Det vart bygd om til skule på om lag 10 900 m² etter ein open arkitektkonkurranse i 1998 som Jarmund/Vigsnæs Arkitekter vann.',
    place: 'Maridalsveien 29, Oslo',
    discipline: 'stad',
    motif: 'nybygg',
    accent: true,
    sources: [
      { name: 'nn.wikipedia.org', url: 'https://nn.wikipedia.org/wiki/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo', license: 'CC BY-SA 3.0', access: 'Open' },
      { name: 'Jarmund/Vigsnæs, Store norske leksikon', url: 'https://snl.no/Jarmund/Vigsn%C3%A6s_-_arkitektkontor', license: 'CC BY-SA', access: 'Open' },
      { name: 'Foto: Maridalsveien 29', credit: 'Arkitektur.no (jubileum)', license: 'Rettar må avklarast', access: 'Krev avtale' },
    ],
  },
  {
    id: '2004',
    year: '2004',
    kicker: 'Landskap',
    title: 'Master i landskapsarkitektur',
    lead: 'Det tredje hovudsporet kjem til',
    body: 'I 2004 oppretta AHO eit masterprogram i landskapsarkitektur, det tredje store fagsporet ved sida av arkitektur og design. Programmet blir i dag drive i samarbeid med Noregs arktiske universitet (UiT) i Tromsø.',
    place: 'Oslo',
    discipline: 'landskap',
    motif: 'rutenett',
    sources: [
      { name: 'AHO, historie', url: 'https://www.aho.no/om/aho-sin-historie/', access: 'Open' },
      { name: 'Oslo School of Architecture and Design, Wikipedia', url: 'https://en.wikipedia.org/wiki/Oslo_School_of_Architecture_and_Design', license: 'CC BY-SA', access: 'Open' },
    ],
  },
  {
    id: '2005',
    year: '2005',
    kicker: 'Namn',
    title: 'Arkitektur- og designhøgskolen',
    lead: 'Designet kjem inn i namnet',
    body: 'I 2005 vart namnet endra til Arkitektur- og designhøgskolen i Oslo, eit namn som speglar det utvida oppdraget med både arkitektur, landskap, urbanisme og design.',
    place: 'Oslo',
    discipline: 'institusjon',
    motif: 'segl',
    sources: [
      { name: 'Store norske leksikon', url: 'https://snl.no/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo', license: 'CC BY-SA', access: 'Open' },
    ],
  },
  {
    id: '2009',
    year: '2009',
    kicker: 'Design',
    title: 'Institutt for design',
    lead: 'Frå industridesign til breitt designfag',
    body: 'I 2009 skifta Institutt for industridesign namn til Institutt for design. Faget famnar no også tenestedesign og interaksjonsdesign, og designmiljøet har vakse til å vere på storleik med arkitekturmiljøet.',
    place: 'AHO, Oslo',
    discipline: 'design',
    motif: 'verkstad',
    sources: [
      { name: 'Oslo School of Architecture and Design, Wikipedia', url: 'https://en.wikipedia.org/wiki/Oslo_School_of_Architecture_and_Design', license: 'CC BY-SA', access: 'Open' },
    ],
  },
  {
    id: '2025',
    year: '2025',
    kicker: 'Jubileum',
    title: '80 år med forming av framtida',
    lead: 'Historia held fram',
    body: 'I 2025 fyller AHO 80 år. Frå eit krisekurs i 1945 til ein av Europas leiande sjølvstendige skular for arkitektur og design, historia held fram.',
    place: 'Oslo',
    discipline: 'institusjon',
    motif: 'nybygg',
    accent: true,
    sources: [
      { name: 'AHO, 80-årsjubileum', url: 'https://www.aho.no/aho-80-arsjubileum/', access: 'Open' },
    ],
  },
];

// ── Dei ti UI-skissene ───────────────────────────────────────────────────────
// Kvar skisse er eitt iPhone-skjermbilde som utforskar éin del av appen.
export type Sketch = {
  id: string;
  n: string; // 01-10
  title: string;
  blurb: string;
};

export const SKETCHES: Sketch[] = [
  { id: 'hero', n: '01', title: 'Opning', blurb: 'Hero med «80 ÅR», serif-tittel og bukta tidslinje.' },
  { id: 'tidslinje', n: '02', title: 'Tidslinje', blurb: 'Vertikal liste med år, foto og nodar.' },
  { id: 'hending', n: '03', title: 'Hending', blurb: 'Detaljside for 1945 med full-bleed arkivfoto.' },
  { id: 'arkivsok', n: '04', title: 'Arkivsøk', blurb: 'Søk i kjeldene med filter og kjeldetaggar.' },
  { id: 'kart', n: '05', title: 'Stadene', blurb: 'Kart frå St. Olavs gate til Maridalsveien.' },
  { id: 'design', n: '06', title: 'Designsporet', blurb: 'Fagfilter: arkitektur · design · landskap.' },
  { id: 'arkiv', n: '07', title: 'Arkiv', blurb: 'Fotogalleri i rutenett, filtrert på tiår.' },
  { id: 'kjelde', n: '08', title: 'Kjeldekort', blurb: 'Kjeldekritikk: arkiv, lisens og tilgang.' },
  { id: 'tiar', n: '09', title: 'Tiår', blurb: 'Horisontal tiår-navigasjon og filmstrip.' },
  { id: 'jubileum', n: '10', title: 'Jubileum', blurb: 'Avslutning: 2025, 80 år, kolofon.' },
];

export const ACCENT = '#ed4723';
