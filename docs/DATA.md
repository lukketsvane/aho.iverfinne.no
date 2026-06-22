# Data, kjelder og rettar

## 1. Tidslinja (verifiserte hendingar)

Hendingane i [`lib/timeline.ts`](../lib/timeline.ts) er kryssjekka mot:

- Store norske leksikon — [Statens arkitektkurs](https://snl.no/Statens_arkitektkurs),
  [AHO](https://snl.no/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo)
- [nn.wikipedia.org](https://nn.wikipedia.org/wiki/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo)
- AHO si historieside — [aho.no/om/aho-sin-historie](https://www.aho.no/om/aho-sin-historie/)

| År | Hending |
|----|---------|
| 1945 | Statens arkitektkurs — krisekurset ved Kunstindustriskulen (SHKS) |
| 1961 | Sjølvstendig vitskapleg høgskule: Statens Arkitektskole i Oslo |
| 1968 | Flytting til eige hus i St. Olavs gate |
| 1969 | Namnet Arkitekthøgskolen i Oslo (AHO) |
| 1979 | Industridesign som toårig etterutdanning (designsporet) |
| 1983 | Industridesign på fulltid |
| 1996 | Institutt for industridesign innlemma |
| 2001 | Flytting til Maridalsveien 29 (ombygd av Jarmund/Vigsnæs) |
| 2005 | Arkitektur- og designhøgskolen i Oslo |
| 2025 | 80-årsjubileum |

> Merk: AI-utkastet til mockup hadde nokre feil årstal (t.d. «1968 Tøyen»,
> «1956 statleg høgskule»). Tidslinja her brukar dei verifiserte årstala.

## 2. Bilete — Notion-databasen `aho_bilete`

Faktiske arkivfoto blir styrte frå éin Notion-tabell med eit `rights_status`-felt,
slik at eit bilete kan flytte seg frå «uavklart» til «klar» utan å byte tabell.
Tre hovudgrep:

1. **Éin tabell** med `rights_status`.
2. **Enum i staden for fritekst** på lisens, hotlink-status og år/periode.
   `sort_order` (00, 01, 14 …) er sorteringsnøklar — ikkje årstal; `year` er det
   faktiske, nullbare årstalet.
3. **Avleidde rettsflagg** (`attribusjon_kravd`, `del_likt`, `kommersiell_ok`) så
   utviklar slepp å parse lisensstrengen.

Skjemaet er spegla i TypeScript i [`lib/aho-bilete.ts`](../lib/aho-bilete.ts).

Databasen er bygd i Notion som **«AHO bilete»** med norske eigenskapsnamn og fleire
visingar (*Alle*, *Etter rettsstatus*, *Klare til bruk*, *Treng handling*, *Galleri*,
*Etter seksjon*). `lib/notion.ts` mappar dei faktiske namna:

| Notion-eigenskap | Kodefelt | | Notion-eigenskap | Kodefelt |
|---|---|---|---|---|
| Tittel | `tittel` | | Mediefil-URL | `media_url` |
| Slug | `slug` | | Kjeldeside | `kjeldeside` |
| Rettsstatus | `rights_status` | | Kreditering | `kreditering` |
| Sortering | `sort_order` | | Credit line *(formel)* | `credit_line` |
| Årstal | `year` | | Hotlink-status | `hotlink_status` |
| Seksjon | `seksjon` | | Breidd / Høgd | `breidd` / `høgd` |
| Prioritet | `prioritet` | | Orientering *(formel)* | `orientering` |
| Lisens | `lisens` | | Bruksklar *(formel)* | `bruksklar` |
| Attribusjon kravd | `attribusjon_kravd` | | Alt-tekst / Bildetekst | `alt_tekst` / `bildetekst` |
| Del likt | `del_likt` | | Ansvarleg / Frist | `ansvarleg` / `frist` |
| Kommersiell OK | `kommersiell_ok` | | Sensitivitet / Merknad | `sensitivitet` / `merknad` |

Merk: select-verdiane brukar **mellomrom** (t.d. `må bestillast`, `rettar uavklart`),
ikkje understrek. `Seksjon` har i tillegg `brand`, `identitet` og `prosjekt`.

### Rettsstatus → publisering

```
klar | eigen_grafikk   → kan visast no
må_bestillast          → bestill / klarér før bruk
rettar_uavklart        → berre internt, vis plassholdar
ikkje_bruk             → aldri publiser
```

### Avleidde rettsflagg (frå lisens)

| Lisens | attribusjon | del-likt | kommersiell |
|--------|:-:|:-:|:-:|
| CC BY 2.0 / 4.0 | ✓ | ✕ | ✓ |
| CC BY-SA 3.0 / 4.0 | ✓ | ✓ | ✓ |
| CC0 / PD | ✕ | ✕ | ✓ |
| uklart | ✓ | ✕ | ✕ |

Logikken ligg i `deriveRights()` — same reglar som Notion-formlane.

## 3. Henting frå Notion

[`lib/notion.ts`](../lib/notion.ts) hentar databasen og mappar kvar rad til
`AhoBilete`. Adapteren er **env-gated**: utan `NOTION_API_KEY` + `DATABASE_ID`
returnerer han ein tom liste, så produksjonsbygget aldri krasjar.

```ts
import { fetchPubliserbareBilete } from '@/lib/notion';
const bilete = await fetchPubliserbareBilete(); // berre rights_status = klar
```

Det er **to** databasar: «AHO heile historia» (tidslinje/hendingar, `DATABASE_ID`)
og «AHO bilete» (foto + rettar, `NOTION_BILETE_DB_ID`). Set i `.env.local`
(sjå `.env.example`):

```
NOTION_API_KEY=secret_...
DATABASE_ID=...              # AHO heile historia (hendingar)
NOTION_BILETE_DB_ID=...      # AHO bilete (foto/rettar)
```

Kobl deretter `media_url` / `fil` inn i `ArchivePhoto`-komponenten i staden for
SVG-plassholdaren, og bruk `credit_line` som biletekst.

## 4. Førebels biletkjelder (frå research)

| Periode | Motiv | Kjelde | Status |
|---------|-------|--------|--------|
| 1945 | SHKS-bygget (1904) | Anders Beer Wilse / Oslo Museum | foto før 1925 → offentleg eige |
| 1968 | St. Olavs gate 4 | Wikimedia Commons | CC BY-SA 4.0 |
| 1979/83 | Modellverkstad | AHO-arkivet | rettar må avklarast |
| 2001 | Maridalsveien 29 | Arkitektur.no (jubileum) | rettar må avklarast |
