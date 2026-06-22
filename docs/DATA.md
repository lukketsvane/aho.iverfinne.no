# Data, kjelder og rettar

## 1. Tidslinja (verifiserte hendingar)

Hendingane i [`lib/timeline.ts`](../lib/timeline.ts) er kryssjekka mot:

- Store norske leksikon — [Statens arkitektkurs](https://snl.no/Statens_arkitektkurs),
  [AHO](https://snl.no/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo)
- [nn.wikipedia.org](https://nn.wikipedia.org/wiki/Arkitektur-_og_designh%C3%B8gskolen_i_Oslo)
- AHO si historieside — [aho.no/om/aho-sin-historie](https://www.aho.no/om/aho-sin-historie/)

| År | Hending |
|----|---------|
| 1945 | Statens arkitektkurs — krisekurset ved Kunstindustriskulen (SHKS); 189 arkitektar utdanna |
| 1961 | Sjølvstendig vitskapleg høgskule: Statens Arkitektskole i Oslo |
| 1966 | Christian Norberg-Schulz professor (til 1992) — teori og internasjonal tyngd |
| 1968 | Flytting til eige hus i St. Olavs gate |
| 1969 | Namnet Arkitekthøgskolen i Oslo (AHO) |
| 1979 | Industridesign som toårig etterutdanning (designsporet) |
| 1983 | Industridesign på fulltid |
| 1996 | Institutt for industridesign innlemma |
| 1997 | Sverre Fehn (professor 1971–95) får Pritzker-prisen |
| 2001 | Flytting til Maridalsveien 29 (1938-bygg for Oslo Lysverker, ombygd av Jarmund/Vigsnæs) |
| 2004 | Master i landskapsarkitektur |
| 2005 | Arkitektur- og designhøgskolen i Oslo |
| 2009 | Institutt for industridesign → Institutt for design |
| 2025 | 80-årsjubileum |

> Merk: AI-utkastet til mockup hadde nokre feil årstal (t.d. «1968 Tøyen»,
> «1956 statleg høgskule»). Tidslinja her brukar dei verifiserte årstala.
> Fullt skrapa kjeldemateriale — inkludert kandidatstoff og sprik mellom
> kjelder — ligg i [`RESEARCH.md`](RESEARCH.md).

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

Set i `.env.local` (sjå `.env.example`):

```
NOTION_API_KEY=secret_...
DATABASE_ID=...
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
