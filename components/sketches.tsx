import {
  Search,
  Menu,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Share2,
  Bookmark,
  MapPin,
  Image as ImageIcon,
  ScanLine,
} from 'lucide-react';
import { MILESTONES } from '@/lib/timeline';
import { ArchivePhoto } from './ArchivePhoto';
import { Logo, StatusBar, Eyebrow, SourceTag } from './ui';

const find = (id: string) => MILESTONES.find((m) => m.id === id)!;

function Screen({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-full flex-col bg-paper text-ink">{children}</div>;
}

function TopBar({ left, title }: { left?: React.ReactNode; title?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-3">
      <div className="flex items-center gap-2">{left ?? <Logo className="h-5" />}</div>
      {title}
      <div className="flex items-center gap-3 text-ink-soft">
        <Search className="h-[18px] w-[18px]" />
        <Menu className="h-[18px] w-[18px]" />
      </div>
    </div>
  );
}

/* 01 — Opning / hero ------------------------------------------------------ */
function Hero() {
  const nodes = [find('1945'), find('1961'), find('1968')];
  return (
    <Screen>
      <StatusBar />
      <TopBar />
      <div className="px-5 pt-3">
        <div className="flex items-center gap-2">
          <Eyebrow accent>80 år</Eyebrow>
          <span className="h-px w-7 bg-aho" />
        </div>
        <h1 className="mt-3 font-serif text-[2rem] font-medium leading-[1.05] tracking-tight">
          Ved sida av jubileet: ei tidslinje for AHO
        </h1>
        <div className="mt-4 mb-1 h-px w-6 bg-ink/40" />
        <p className="eyebrow text-[0.58rem] leading-[1.7] text-muted">
          Frå Kunstindustrimuseet til Noregs framste miljø for arkitektur og design.
        </p>
      </div>
      <ol className="relative mt-7 px-5">
        <div className="absolute bottom-2 left-[3.15rem] top-2 w-px bg-line" aria-hidden />
        {nodes.map((m) => (
          <li key={m.id} className="relative mb-6 flex items-start gap-4 pl-10">
            <span
              className={`absolute left-[2.7rem] top-1 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border bg-paper ${m.accent ? 'border-aho' : 'border-line'}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${m.accent ? 'bg-aho' : 'bg-transparent'}`} />
            </span>
            <ArchivePhoto motif={m.motif} className="h-16 w-24 shrink-0" rounded="rounded-lg" />
            <div className="pt-0.5">
              <div className={`font-serif text-2xl leading-none ${m.accent ? 'text-aho' : 'text-ink'}`}>{m.year}</div>
              <div className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-ink">{m.title}</div>
              <div className="mt-0.5 text-[11px] text-muted">{m.lead}</div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-auto flex flex-col items-center gap-1 pb-6 pt-2">
        <Eyebrow className="text-[0.55rem]">Utforsk tidslinja</Eyebrow>
        <ArrowDown className="h-4 w-4 text-aho" />
      </div>
    </Screen>
  );
}

/* 02 — Tidslinje (liste) -------------------------------------------------- */
function TidslinjeListe() {
  const rows = MILESTONES.slice(0, 6);
  return (
    <Screen>
      <StatusBar />
      <TopBar />
      <div className="px-5 pt-2 pb-4">
        <h1 className="font-serif text-4xl tracking-tight">Tidslinje</h1>
      </div>
      <ol className="relative px-5 pb-6">
        <div className="absolute bottom-3 left-[1.4rem] top-2 w-px bg-line" aria-hidden />
        {rows.map((m) => (
          <li key={m.id} className="relative mb-7 pl-9">
            <span
              className={`absolute left-[1.4rem] top-1.5 z-10 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center rounded-full border bg-paper ${m.accent ? 'border-aho' : 'border-line'}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${m.accent ? 'bg-aho' : 'bg-transparent'}`} />
            </span>
            <div className="flex items-start justify-between">
              <div>
                <div className={`font-serif text-3xl leading-none ${m.accent ? 'text-aho' : 'text-ink'}`}>{m.year}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-ink">{m.title}</div>
              </div>
              <ArrowRight className="mt-2 h-4 w-4 text-muted" />
            </div>
            {m.accent && <ArchivePhoto motif={m.motif} className="mt-3 aspect-[16/8] w-full" rounded="rounded-xl" />}
          </li>
        ))}
      </ol>
    </Screen>
  );
}

/* 03 — Hending i detalj (1945) ------------------------------------------- */
function Hending() {
  const m = find('1945');
  return (
    <Screen>
      <div className="absolute left-0 right-0 top-0 z-30">
        <StatusBar tone="light" />
        <div className="flex items-center justify-between px-5 py-1 text-white drop-shadow">
          <ArrowLeft className="h-5 w-5" />
          <Logo className="h-4" />
          <Share2 className="h-[18px] w-[18px]" />
        </div>
      </div>
      <ArchivePhoto motif={m.motif} className="h-64 w-full" rounded="rounded-none" />
      <div className="px-5 pt-4">
        <div className="font-serif text-6xl leading-none text-aho">{m.year}</div>
        <div className="mt-3"><Eyebrow>{m.kicker}</Eyebrow></div>
        <h1 className="mt-1.5 font-serif text-2xl leading-tight">{m.title}</h1>
        <p className="mt-1 font-serif text-base italic text-ink-soft">{m.lead}</p>
        <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">{m.body}</p>

        <div className="mt-6 rounded-2xl border border-line bg-card p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted">Kjelde</div>
          <div className="mt-1 text-sm text-ink">{m.sources[1]?.credit ?? m.sources[0]?.name}</div>
          <div className="mt-0.5 font-mono text-[11px] text-muted">{m.sources[1]?.license}</div>
          <a className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-aho">
            Oppslag <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">
        <span className="inline-flex items-center gap-1.5"><ArrowLeft className="h-3.5 w-3.5" /> 1945</span>
        <span>1 / 10</span>
        <span className="inline-flex items-center gap-1.5 text-ink">1961 <ArrowRight className="h-3.5 w-3.5" /></span>
      </div>
    </Screen>
  );
}

/* 04 — Arkivsøk ----------------------------------------------------------- */
function Arkivsok() {
  const res = [find('1945'), find('1968'), find('1979')];
  return (
    <Screen>
      <StatusBar />
      <TopBar />
      <div className="px-5 pt-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <div className="rounded-full border border-line bg-card py-3 pl-11 pr-4 font-mono text-[13px] text-muted shadow-sm">
            Søk i kjeldene…
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {['Tidsintervall', 'Kjeldetype', 'Geografi'].map((f) => (
            <div key={f}>
              <div className="eyebrow text-[0.5rem] text-muted">{f}</div>
              <div className="mt-1 h-px w-full bg-line" />
            </div>
          ))}
        </div>
      </div>
      <ol className="relative mt-8 space-y-6 px-5 pl-9 pb-6">
        <div className="absolute bottom-2 left-[1.55rem] top-1 w-px bg-line" aria-hidden />
        {res.map((m, i) => (
          <li key={m.id} className="relative">
            <span className={`absolute -left-[0.7rem] top-1 h-3 w-3 rounded-full border bg-paper ${i === 0 ? 'border-aho' : 'border-line'}`}>
              {i === 0 && <span className="absolute inset-[2px] rounded-full bg-aho" />}
            </span>
            <div className="font-serif text-2xl text-ink">{m.year}</div>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-ink">{m.title}</div>
            <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-muted">{m.body}</p>
            <div className="mt-1.5"><SourceTag>{m.sources[0]?.name}</SourceTag></div>
          </li>
        ))}
      </ol>
      <div className="mt-auto px-5 pb-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted/70">
        Lokalt oppslag · norske arkiv og register
      </div>
    </Screen>
  );
}

/* 05 — Kart / stadene ----------------------------------------------------- */
function Kart() {
  return (
    <Screen>
      <StatusBar />
      <TopBar title={<span className="font-serif text-lg">Stadene</span>} />
      <div className="relative mx-5 mt-2 flex-1 overflow-hidden rounded-2xl border border-line bg-paper-2">
        <svg viewBox="0 0 320 420" className="h-full w-full">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="420" stroke="#ddd8d0" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} stroke="#ddd8d0" />
          ))}
          {/* Akerselva */}
          <path d="M60 0 C90 120 40 200 120 300 S210 380 190 420" fill="none" stroke="#cfd8d2" strokeWidth="8" />
          {/* flyttelinje */}
          <path d="M210 120 Q150 220 130 300" fill="none" stroke="#ed4723" strokeWidth="2" strokeDasharray="5 5" />
        </svg>
        <Pin x="62%" y="26%" label="St. Olavs gate 2–4" sub="1968 – 2001" />
        <Pin x="38%" y="70%" label="Maridalsveien 29" sub="2001 –" active />
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
          {['1945', '1968', '2001', '2025'].map((y) => (
            <span key={y} className={y === '2001' ? 'text-aho' : ''}>{y}</span>
          ))}
        </div>
        <div className="mt-1 h-px w-full bg-line">
          <div className="h-px w-[62%] bg-aho" />
        </div>
        <div className="mt-3 rounded-xl border border-line bg-card p-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink">Maridalsveien 29</div>
          <div className="mt-0.5 text-[12px] text-muted">Ombygd av Jarmund/Vigsnæs etter open konkurranse.</div>
        </div>
      </div>
    </Screen>
  );
}
function Pin({ x, y, label, sub, active }: { x: string; y: string; label: string; sub: string; active?: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-full" style={{ left: x, top: y }}>
      <div className="mb-1 whitespace-nowrap rounded-md bg-card/95 px-2 py-1 text-center shadow-sm ring-1 ring-black/5">
        <div className="text-[9px] font-bold uppercase tracking-wider text-ink">{label}</div>
        <div className="font-mono text-[8px] text-muted">{sub}</div>
      </div>
      <MapPin className={`mx-auto h-6 w-6 ${active ? 'fill-aho text-aho' : 'fill-ink text-ink'}`} />
    </div>
  );
}

/* 06 — Designsporet ------------------------------------------------------- */
function Design() {
  const cards = [find('1979'), find('1983')];
  return (
    <Screen>
      <StatusBar />
      <TopBar />
      <div className="px-5 pt-2">
        <div className="flex gap-1.5 rounded-full bg-paper-2 p-1 text-[10px] font-semibold uppercase tracking-wider">
          {[['Arkitektur', false], ['Design', true], ['Landskap', false]].map(([t, on]) => (
            <span key={t as string} className={`flex-1 rounded-full py-1.5 text-center ${on ? 'bg-aho text-white' : 'text-muted'}`}>{t}</span>
          ))}
        </div>
        <h1 className="mt-5 font-serif text-4xl tracking-tight">Designsporet</h1>
      </div>
      <ol className="relative mt-5 px-5 pb-6">
        <div className="absolute bottom-4 left-[1.4rem] top-2 w-px bg-line" aria-hidden />
        {cards.map((m) => (
          <li key={m.id} className="relative mb-5 pl-9">
            <span className={`absolute left-[1.4rem] top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border bg-paper ${m.accent ? 'border-aho' : 'border-line'}`}>
              <span className={`absolute inset-[3px] rounded-full ${m.accent ? 'bg-aho' : 'bg-line'}`} />
            </span>
            <div className="overflow-hidden rounded-2xl border border-line bg-card">
              <ArchivePhoto motif={m.motif} className="aspect-[16/9] w-full" rounded="rounded-none" />
              <div className="p-3.5">
                <div className={`font-serif text-2xl ${m.accent ? 'text-aho' : 'text-ink'}`}>{m.year}</div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-ink">{m.title}</div>
                <p className="mt-1.5 text-[12px] leading-snug text-muted">{m.body}</p>
                <div className="mt-2"><SourceTag>AHO-arkivet</SourceTag></div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Screen>
  );
}

/* 07 — Arkivgalleri ------------------------------------------------------- */
function Arkiv() {
  const tiar = ['1940', '1950', '1960', '1970', '1980'];
  const grid = ['fasade', 'gate', 'verkstad', 'rutenett', 'nybygg', 'segl', 'fasade', 'verkstad'] as const;
  return (
    <Screen>
      <StatusBar />
      <TopBar title={<span className="font-serif text-lg">Arkiv</span>} />
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-2">
        {tiar.map((t) => (
          <span key={t} className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[11px] ${t === '1960' ? 'border-aho bg-aho text-white' : 'border-line text-muted'}`}>{t}</span>
        ))}
      </div>
      <div className="columns-2 gap-2.5 px-5 pt-2 pb-6 [&>*]:mb-2.5">
        {grid.map((motif, i) => (
          <div key={i} className="relative break-inside-avoid overflow-hidden rounded-xl ring-1 ring-black/10">
            <ArchivePhoto motif={motif} className={i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'} rounded="rounded-none" />
            <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[9px] text-white">{1945 + i * 9}</span>
            <Bookmark className="absolute bottom-2 right-2 h-4 w-4 text-white/90" />
          </div>
        ))}
      </div>
      <div className="px-5 pb-6 text-center font-mono text-[9px] uppercase tracking-wider text-muted/70">
        Arkivmateriale — sjekk rettar før bruk
      </div>
    </Screen>
  );
}

/* 08 — Kjeldekort --------------------------------------------------------- */
function Kjelde() {
  const m = find('1945');
  const rows: [string, string][] = [
    ['Lisens', 'PD · offentleg eige'],
    ['Hotlink', 'ok_direct'],
    ['Kreditering', 'A. B. Wilse / Oslo Museum'],
    ['Kjeldeside', 'oslobilder.no'],
    ['Orientering', 'liggande'],
    ['Sort_order', '01'],
  ];
  const flagg: [string, boolean][] = [
    ['attribusjon', true],
    ['del-likt', false],
    ['kommersiell', true],
  ];
  return (
    <Screen>
      <StatusBar />
      <TopBar left={<><ArrowLeft className="h-5 w-5 text-ink-soft" /><Logo className="h-5" /></>} />
      <div className="flex flex-1 flex-col px-5 pt-4">
        <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-sm">
          <ArchivePhoto motif={m.motif} className="aspect-[16/9] w-full" rounded="rounded-none" />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Kjeldekort</div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-emerald-600/12 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                  klar
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-aho/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-aho">
                  <ScanLine className="h-3 w-3" /> OCR
                </span>
              </div>
            </div>
            <dl className="mt-3 divide-y divide-line">
              {rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="text-[13px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {flagg.map(([k, on]) => (
                <span
                  key={k}
                  className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                    on ? 'border-ink/15 bg-paper-2 text-ink' : 'border-line text-muted line-through'
                  }`}
                >
                  {on ? '✓' : '✕'} {k}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-aho py-3.5 text-[12px] font-bold uppercase tracking-widest text-white">
          Opna hjå kjelda <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-center font-mono text-[10px] leading-relaxed text-muted/80">
          Ei treffliste er aldri bevis åleine.
        </p>
      </div>
    </Screen>
  );
}

/* 09 — Tiår-navigasjon ---------------------------------------------------- */
function Tiar() {
  const tiar = ['1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'];
  const strip = [find('1968'), find('1979'), find('1983')];
  return (
    <Screen>
      <StatusBar />
      <div className="px-5 pt-1">
        <TopBar />
      </div>
      <div className="no-scrollbar flex items-center gap-4 overflow-x-auto border-y border-line px-5 py-3">
        {tiar.map((t) => (
          <span key={t} className={`shrink-0 font-mono text-[12px] ${t === '1960' ? 'font-bold text-aho' : 'text-muted'}`}>{t}</span>
        ))}
      </div>
      <div className="px-5 pt-6">
        <h1 className="font-serif text-5xl tracking-tight">Åtti år</h1>
        <p className="mt-1 font-serif text-lg italic text-muted">1945 – 2025</p>
      </div>
      <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto px-5 pb-2">
        {strip.map((m, i) => (
          <div key={m.id} className={`w-44 shrink-0 overflow-hidden rounded-2xl border bg-card ${i === 0 ? 'border-aho/40' : 'border-line'}`}>
            <ArchivePhoto motif={m.motif} className="aspect-[4/3] w-full" rounded="rounded-none" />
            <div className="p-3">
              <div className={`font-serif text-xl ${m.accent ? 'text-aho' : 'text-ink'}`}>{m.year}</div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-ink">{m.title}</div>
            </div>
          </div>
        ))}
        <div className="flex w-10 shrink-0 items-center justify-center text-muted"><ArrowRight className="h-5 w-5" /></div>
      </div>
      <div className="mt-auto px-5 pb-7 pt-5">
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted">
          <span>1945</span><span>i dag</span>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full w-[38%] rounded-full bg-aho" />
        </div>
      </div>
    </Screen>
  );
}

/* 10 — Jubileum / om ------------------------------------------------------ */
function Jubileum() {
  const m = find('2025');
  return (
    <Screen>
      <div className="absolute left-0 right-0 top-0 z-30"><StatusBar tone="light" /></div>
      <ArchivePhoto motif={m.motif} className="h-72 w-full" rounded="rounded-none" />
      <div className="flex flex-1 flex-col px-5 pt-5">
        <div className="font-serif text-7xl leading-none text-aho">2025</div>
        <div className="mt-3"><Eyebrow accent>Jubileum</Eyebrow></div>
        <h1 className="mt-1.5 font-serif text-[1.7rem] leading-tight">80 år med forming av framtida</h1>
        <p className="mt-2 font-serif text-lg italic text-ink-soft">Historia held fram.</p>

        <div className="mt-6 rounded-xl border border-line bg-card/60 p-3 font-mono text-[10px] leading-relaxed text-muted">
          Ei tidslinje for AHO · 1945–2025 · kjelder frå norske arkiv og register.
        </div>

        <div className="mt-auto flex items-center justify-between py-6">
          <Logo className="h-6" />
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Til toppen <ArrowUp className="h-3.5 w-3.5 text-aho" />
          </span>
        </div>
      </div>
    </Screen>
  );
}

export const SCREENS: Record<string, () => React.JSX.Element> = {
  hero: Hero,
  tidslinje: TidslinjeListe,
  hending: Hending,
  arkivsok: Arkivsok,
  kart: Kart,
  design: Design,
  arkiv: Arkiv,
  kjelde: Kjelde,
  tiar: Tiar,
  jubileum: Jubileum,
};
