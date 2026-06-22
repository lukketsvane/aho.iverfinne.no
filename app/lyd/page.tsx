import type { Metadata } from 'next';
import { Play, Clock } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { ArchivePhoto } from '@/components/ArchivePhoto';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Lyd, Lytt til historia · AHO',
  description: 'Lyd og forteljingar frå AHO si historie. Under arbeid.',
};

const KLIPP = [
  { tittel: 'Krisekurset i 1945', lengd: '04:12' },
  { tittel: 'Teiknesalen som metafor', lengd: '06:48' },
  { tittel: 'Frå SHKS til Maridalsveien', lengd: '05:30' },
  { tittel: 'Kva er AHO i dag?', lengd: '03:55' },
];

// Stilisert lydbølgje (plassholdar til ekte lyd ligg føre)
const BARS = Array.from({ length: 64 }, (_, i) => 8 + Math.round(22 * Math.abs(Math.sin(i * 0.7))));

export default function LydPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-6 sm:px-8">
        <Eyebrow accent>Lytt til historia</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">Lyd</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          Forteljingar, intervju og lydbilete frå åtti år med arkitektur- og designutdanning.
        </p>
        <p className="mt-3 inline-block rounded-full bg-paper-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
          Under arbeid, lydklippa kjem snart
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-10 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <ArchivePhoto motif="verkstad" className="aspect-[16/7] w-full" rounded="rounded-none" />
          <div className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-ink">Hovudforteljing</div>
            <p className="mt-1 text-sm text-muted">Arkitektstudent i Maridalsveien, 1956. Eit lydbilete frå teiknesalen.</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-aho text-white">
                <Play className="h-5 w-5 translate-x-px" fill="currentColor" />
              </span>
              <svg viewBox="0 0 256 40" className="h-9 flex-1" preserveAspectRatio="none" aria-hidden>
                {BARS.map((h, i) => (
                  <rect key={i} x={i * 4} y={20 - h / 2} width="2.2" height={h} rx="1" fill={i < 20 ? '#ed4723' : '#ddd8d0'} />
                ))}
              </svg>
              <span className="shrink-0 font-mono text-[11px] text-muted">12:46</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <div className="flex items-center justify-between border-t border-line pt-6">
          <Eyebrow>Korte klipp</Eyebrow>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {KLIPP.map((k) => (
            <li key={k.tittel} className="flex items-center gap-4 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft">
                <Play className="h-4 w-4 translate-x-px" fill="currentColor" />
              </span>
              <span className="flex-1 text-[14px] text-ink">{k.tittel}</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted">
                <Clock className="h-3 w-3" /> {k.lengd}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
