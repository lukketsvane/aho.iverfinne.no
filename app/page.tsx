import Link from 'next/link';
import { Search, ArrowDown, LayoutGrid } from 'lucide-react';
import { MILESTONES } from '@/lib/timeline';
import { Timeline } from '@/components/Timeline';
import { ArkivSok } from '@/components/ArkivSok';
import { Logo, Eyebrow } from '@/components/ui';

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[560px] items-center justify-between px-5 py-3.5">
          <Link href="/" aria-label="AHO — heim">
            <Logo className="h-6" />
          </Link>
          <nav className="flex items-center gap-1.5">
            <Link
              href="/skisser"
              className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-paper-2 sm:inline-flex"
            >
              <LayoutGrid className="h-4 w-4" /> Skisser
            </Link>
            <a href="#arkivsok" aria-label="Søk" className="rounded-full p-2 text-ink-soft transition-colors hover:bg-paper-2">
              <Search className="h-5 w-5" />
            </a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-[560px] px-5 pt-12 pb-2">
        <div className="flex items-center gap-3">
          <Eyebrow accent className="text-[0.7rem]">80 år</Eyebrow>
          <span className="h-px w-10 bg-aho" />
        </div>
        <h1 className="mt-5 font-serif text-[2.7rem] font-medium leading-[1.04] tracking-[-0.015em] text-ink sm:text-[3.4rem]">
          Ved sida av jubileet: ei tidslinje for AHO
        </h1>
        <div className="mt-7 mb-1 h-px w-7 bg-ink/40" />
        <p className="eyebrow max-w-md text-[0.7rem] leading-[1.7] text-muted">
          Frå Kunstindustrimuseet til Noregs framste miljø for arkitektur og design.
        </p>
        <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
          Arkitektur- og designhøgskolen i Oslo fyller 80 år. Dette er historia — frå krisekurset i
          1945 til skulen ved Akerselva i dag — fortald gjennom verifiserte hendingar og kjelder frå
          norske arkiv og register.
        </p>
        <div className="mt-9 flex items-center gap-2 text-muted">
          <span className="eyebrow text-[0.62rem]">Utforsk tidslinja</span>
          <ArrowDown className="h-4 w-4 animate-bounce text-aho" />
        </div>
      </section>

      <Timeline items={MILESTONES} />

      <ArkivSok />

      {/* footer */}
      <footer className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-[560px] px-5 py-12">
          <Logo className="h-6" />
          <p className="mt-4 max-w-sm font-serif text-xl text-ink">
            Arkitektur- og designhøgskolen i Oslo
          </p>
          <p className="mt-2 text-sm text-muted">1945 – 2025 · 80 år med forming av framtida.</p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            <Link href="/skisser" className="transition-colors hover:text-aho">
              Ti UI-skisser →
            </Link>
            <a href="https://www.aho.no" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-aho">
              aho.no →
            </a>
          </div>

          <p className="mt-8 max-w-md text-[11px] leading-relaxed text-muted/80">
            Kjelder: Store norske leksikon, Wikipedia og AHO. Årstal er kryssjekka; biletrettar er
            førebels og må stadfestast før publisering. Bileta her er rettsfrie illustrasjonar.
          </p>
        </div>
      </footer>
    </main>
  );
}
