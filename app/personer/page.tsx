import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui';
import { PersonGrid, type Person } from '@/components/PersonGrid';

export const metadata: Metadata = {
  title: 'Personar, AHO',
  description: 'Menneske som har forma AHO og det norske arkitektur- og designmiljøet.',
};

// Veldokumenterte figurar i AHO-/Oslo-arkitekturmiljøet. Portrett blir lagde
// til når rettane er stadfesta; relevante år lenkjar til tidslinja.
const PERSONAR: Person[] = [
  { namn: 'Arne Korsmo', år: '1900-1968', rolle: 'Arkitekt', kategori: 'Arkitekt', bio: 'Ein av dei fremste norske funksjonalistane og ein viktig lærar i arkitektur i Oslo.' },
  { namn: 'Knut Knutsen', år: '1903-1969', rolle: 'Arkitekt', kategori: 'Arkitekt', bio: 'Kjend for ein varsam, stadtilpassa modernisme og som lærar ved arkitektutdanninga.' },
  { namn: 'Christian Norberg-Schulz', år: '1926-2000', rolle: 'Teoretikar, professor', kategori: 'Teoretikar', bio: 'Professor ved AHO og ein internasjonalt kjend arkitekturteoretikar med fenomenologisk tilnærming.', relevanteAr: ['1966'] },
  { namn: 'Sverre Fehn', år: '1924-2009', rolle: 'Arkitekt, professor', kategori: 'Arkitekt', bio: 'Professor ved AHO 1971-1995 og vinnar av Pritzker-prisen i 1997.', relevanteAr: ['1997'] },
  { namn: 'Wenche Selmer', år: '1920-1998', rolle: 'Arkitekt', kategori: 'Arkitekt', bio: 'Føregangskvinne i norsk arkitektur, kjend for trehus i pakt med naturen.' },
  { namn: 'Grete Prytz Kittelsen', år: '1917-2010', rolle: 'Designar', kategori: 'Designar', bio: 'Emalje- og industridesignar, kalla «dronninga av skandinavisk design».' },
];

export default function PersonerPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-8 sm:px-8">
        <Eyebrow accent>Menneske</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">Personar</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          Lærarar, arkitektar og designarar som har forma AHO og det norske arkitektur- og
          designmiljøet. Portrett blir lagde til når rettane er klare.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <PersonGrid personar={PERSONAR} />
      </section>
    </main>
  );
}
