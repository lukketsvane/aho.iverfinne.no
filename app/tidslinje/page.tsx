import type { Metadata } from 'next';
import { ArrowDown } from 'lucide-react';
import { MILESTONES } from '@/lib/timeline';
import { Timeline } from '@/components/Timeline';
import { ArkivSok } from '@/components/ArkivSok';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Tidslinje — Ved sida av jubileet · AHO',
  description: 'Ei scrollbar tidslinje for AHO, 1945–2025.',
};

export default function TidslinjePage() {
  return (
    <main id="tidslinje" className="min-h-screen bg-paper">
      <SiteHeader />

      <section className="mx-auto max-w-2xl px-5 pt-12 pb-2 sm:px-8">
        <div className="flex items-center gap-3">
          <Eyebrow accent className="text-[0.7rem]">80 år</Eyebrow>
          <span className="h-px w-10 bg-aho" />
        </div>
        <h1 className="mt-5 font-serif text-[2.5rem] font-medium leading-[1.05] tracking-[-0.015em] text-ink sm:text-[3.2rem]">
          Ved sida av jubileet: ei tidslinje for AHO
        </h1>
        <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
          Frå krisekurset i 1945 til skulen ved Akerselva i dag — fortald gjennom verifiserte
          hendingar og kjelder frå norske arkiv og register. Trykk på eit år for heile historia.
        </p>
        <div className="mt-9 flex items-center gap-2 text-muted">
          <Eyebrow className="text-[0.62rem]">Utforsk tidslinja</Eyebrow>
          <ArrowDown className="h-4 w-4 animate-bounce text-aho" />
        </div>
      </section>

      <Timeline items={MILESTONES} />
      <ArkivSok />
    </main>
  );
}
