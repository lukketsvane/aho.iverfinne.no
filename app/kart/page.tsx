import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Kart — Stadene · AHO',
  description: 'AHO sine adresser gjennom tida, frå St. Olavs gate til Maridalsveien 29.',
};

const STADER = [
  { år: '1945', namn: 'Statens handverks- og kunstindustriskule', sub: 'Ullevålsveien 5 — opphavet' },
  { år: '1968', namn: 'St. Olavs gate 2–4', sub: '1968–2001 — eige hus i Kvadraturen', aktiv: false },
  { år: '2001', namn: 'Maridalsveien 29', sub: '2001– — ombygd av Jarmund/Vigsnæs', aktiv: true },
];

export default function KartPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6 sm:px-8">
        <Eyebrow accent>Stadene</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">Kart over historia</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          AHO har flytta gjennom åtti år. Frå Kunstindustriskulen, via St. Olavs gate, til det ombygde
          industribygget i Maridalsveien 29 ved Akerselva.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        {/* kart */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2">
          <svg viewBox="0 0 480 560" className="h-full w-full" role="img" aria-label="Kart over AHO sine adresser i Oslo">
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="560" stroke="#ddd8d0" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="480" y2={i * 40} stroke="#ddd8d0" />
            ))}
            {/* Akerselva */}
            <path d="M120 0 C150 140 90 240 180 360 S300 500 270 560" fill="none" stroke="#cfd8d2" strokeWidth="10" />
            {/* flyttelinje */}
            <path d="M300 150 Q230 280 200 420" fill="none" stroke="#ed4723" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="300" cy="150" r="6" fill="#1a1a1a" />
            <circle cx="200" cy="420" r="8" fill="#ed4723" />
          </svg>
          <div className="pointer-events-none absolute left-[58%] top-[24%] -translate-y-full">
            <div className="rounded-md bg-card/95 px-2 py-1 text-center shadow-sm ring-1 ring-black/5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-ink">St. Olavs gate</div>
              <div className="font-mono text-[8px] text-muted">1968–2001</div>
            </div>
            <MapPin className="mx-auto h-5 w-5 fill-ink text-ink" />
          </div>
          <div className="pointer-events-none absolute left-[40%] top-[74%] -translate-y-full">
            <div className="rounded-md bg-card/95 px-2 py-1 text-center shadow-sm ring-1 ring-black/5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-ink">Maridalsveien 29</div>
              <div className="font-mono text-[8px] text-muted">2001–</div>
            </div>
            <MapPin className="mx-auto h-6 w-6 fill-aho text-aho" />
          </div>
        </div>

        {/* liste */}
        <div className="mt-8 lg:mt-0">
          <ol className="relative space-y-6 border-l border-line pl-6">
            {STADER.map((s) => (
              <li key={s.år} className="relative">
                <span className={`absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border bg-paper ${s.aktiv ? 'border-aho' : 'border-line'}`}>
                  {s.aktiv && <span className="absolute inset-[2px] rounded-full bg-aho" />}
                </span>
                <div className={`font-serif text-2xl ${s.aktiv ? 'text-aho' : 'text-ink'}`}>{s.år}</div>
                <div className="mt-1 text-[12px] font-bold uppercase tracking-wider text-ink">{s.namn}</div>
                <div className="mt-0.5 text-sm text-muted">{s.sub}</div>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-[10px] leading-relaxed text-muted/80">
            Kartet er ei stilisert framstilling. Maridalsveien 29 ligg ved Akerselva, nord i Oslo sentrum.
          </p>
        </div>
      </section>
    </main>
  );
}
