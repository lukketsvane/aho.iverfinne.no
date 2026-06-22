import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Personar — AHO',
  description: 'Menneske som har forma AHO. Persongalleriet er under arbeid.',
};

// Veldokumenterte professorar/figurar i AHO-/Oslo-arkitekturmiljøet.
// Portrett og fulle biografiar blir lagde til når rettane er stadfesta.
const PERSONAR = [
  { namn: 'Arne Korsmo', år: '1900–1968', rolle: 'Arkitekt, professor' },
  { namn: 'Knut Knutsen', år: '1903–1969', rolle: 'Arkitekt' },
  { namn: 'Christian Norberg-Schulz', år: '1926–2000', rolle: 'Arkitekturteoretikar, professor' },
  { namn: 'Sverre Fehn', år: '1924–2009', rolle: 'Arkitekt, professor' },
  { namn: 'Wenche Selmer', år: '1920–1998', rolle: 'Arkitekt' },
  { namn: 'Grete Prytz Kittelsen', år: '1917–2010', rolle: 'Designar' },
];

const initialar = (n: string) =>
  n.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('');

export default function PersonerPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6 sm:px-8">
        <Eyebrow accent>Menneske</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">Personar</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          Lærarar, arkitektar og designarar som har forma AHO og det norske arkitektur- og
          designmiljøet.
        </p>
        <p className="mt-3 inline-block rounded-full bg-paper-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
          Under arbeid — portrett og biografiar blir lagde til når rettane er klare
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {PERSONAR.map((p) => (
            <figure key={p.namn} className="text-center">
              <div className="mx-auto flex aspect-square w-full max-w-[160px] items-center justify-center rounded-full bg-paper-2 ring-1 ring-black/5">
                <span className="font-serif text-3xl text-muted/60">{initialar(p.namn)}</span>
              </div>
              <figcaption className="mt-3">
                <div className="text-[12px] font-bold uppercase tracking-wide text-ink">{p.namn}</div>
                <div className="mt-0.5 font-mono text-[10px] text-muted">{p.år}</div>
                <div className="mt-0.5 text-[11px] text-muted">{p.rolle}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
