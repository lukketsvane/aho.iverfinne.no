import type { Metadata } from 'next';
import { MILESTONES } from '@/lib/timeline';
import { SiteHeader } from '@/components/SiteHeader';
import { Eyebrow } from '@/components/ui';
import { FilterPanel, type FilterItem } from '@/components/FilterPanel';

export const metadata: Metadata = {
  title: 'Filter, AHO',
  description: 'Filtrer tidslinja på periode og kategori.',
};

export default function FilterPage() {
  const items: FilterItem[] = MILESTONES.map((m) => ({
    id: m.id,
    year: Number(m.year),
    title: m.title,
    lead: m.lead,
    discipline: m.discipline,
  }));

  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-8 sm:px-8">
        <Eyebrow accent>Filter</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">Filtrer historia</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          Avgrens tidslinja på periode og kategori. Trykk på eit resultat for heile historia.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <FilterPanel items={items} />
      </section>
    </main>
  );
}
