import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { Logo, Eyebrow } from '@/components/ui';

export const metadata: Metadata = { title: 'Om, AHO 80 år', description: 'Om jubileumsprosjektet og kjeldene.' };

export default function OmPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
        <Eyebrow accent>Om prosjektet</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          Ved sida av jubileet
        </h1>
        <div className="prose prose-stone mt-8 max-w-none text-ink-soft">
          <p className="text-[1.02rem] leading-relaxed">
            Arkitektur- og designhøgskolen i Oslo fyller <strong>80 år i 2025</strong>. Dette er ei
            scrollbar tidslinje som dokumenterer historia, frå krisekurset «Statens arkitektkurs» ved
            Kunstindustriskulen i 1945, til den sjølvstendige skulen ved Akerselva i dag.
          </p>
          <p className="leading-relaxed">
            Årstala er kryssjekka mot Store norske leksikon, Wikipedia og AHO si eiga historieside.
            Bileta er rettsklare arkivfoto frå Wikimedia Commons, eller rettsfrie illustrasjonar der
            originalfoto enno manglar rettar. Kvar kjelde er merkt med kreditering og lisens.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {[
            ['1945', 'Grunnlagt'],
            ['80', 'År i 2025'],
            ['10', 'Milepælar'],
          ].map(([n, l]) => (
            <div key={l} className="bg-card px-5 py-6 text-center">
              <div className="font-serif text-3xl text-aho">{n}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{l}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-2xl text-ink">Kjelder</h2>
        <ul className="mt-4 space-y-2 font-mono text-[12px] text-muted">
          <li>· Store norske leksikon, snl.no</li>
          <li>· Wikipedia (nynorsk)</li>
          <li>· AHO, aho.no/om/aho-sin-historie</li>
          <li>· Foto: Wikimedia Commons (CC / PD)</li>
          <li>· Biletdatabase: Notion «AHO bilete»</li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted">
          <Link href="/skisser" className="transition-colors hover:text-aho">Ti UI-skisser →</Link>
          <a href="https://www.aho.no" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-aho">aho.no →</a>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <Logo className="h-6" />
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted/80">
            Ei tidslinje for AHO · 1945-2025 · kjelder frå norske arkiv og register.
          </p>
        </div>
      </section>
    </main>
  );
}
