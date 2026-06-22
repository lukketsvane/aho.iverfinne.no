import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SKETCHES } from '@/lib/timeline';
import { SCREENS } from '@/components/sketches';
import { Phone, Logo, Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Ti UI-skisser — Ved sida av jubileet',
  description: 'Ti genererte UI-skisser for AHO si jubileums-tidslinje: hero, tidslinje, hending, arkivsøk, kart, designsporet, arkiv, kjeldekort, tiår og jubileum.',
};

export default function Skisser() {
  return (
    <main className="min-h-screen bg-paper-2">
      <header className="sticky top-0 z-40 border-b border-line/60 bg-paper-2/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-aho">
            <ArrowLeft className="h-4 w-4" /> Tidslinja
          </Link>
          <Logo className="h-6" />
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6">
        <div className="flex items-center gap-2">
          <Eyebrow accent>Skissebok</Eyebrow>
          <span className="h-px w-10 bg-aho" />
        </div>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Ti UI-skisser for jubileums&shy;tidslinja
        </h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          Ti skjermbilete som utforskar appen «Ved sida av jubileet» — frå opningsbilde til
          kjeldekritikk. Same designsystem som tidslinja: papirtone, AHO-oransje, serif-display og
          svart-kvitt arkiv. Bygde som ekte React-skjermar, ikkje AI-bilete.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-14 px-5 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {SKETCHES.map((s) => {
          const Screen = SCREENS[s.id];
          return (
            <figure key={s.id} className="flex flex-col">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-sm text-aho">{s.n}</span>
                <span className="font-serif text-xl text-ink">{s.title}</span>
              </div>
              <div id={`shot-${s.n}`}>
                <Phone>{Screen ? <Screen /> : null}</Phone>
              </div>
              <figcaption className="mt-4 px-1 text-[0.85rem] leading-relaxed text-muted">{s.blurb}</figcaption>
            </figure>
          );
        })}
      </section>
    </main>
  );
}
