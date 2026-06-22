import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { ArkivSok } from '@/components/ArkivSok';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = { title: 'Søk, AHO', description: 'Søk i AHO-historia og kjeldene.' };

const FORSLAG = ['Maridalsveien', 'industridesign', '1968', 'St. Olavs gate', 'Kunstindustri', 'jubileum'];

export default function SokPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-2xl px-5 pt-12 sm:px-8">
        <Eyebrow accent>Søk</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink">Søk i historia</h1>
        <div className="mt-5 flex flex-wrap gap-2">
          {FORSLAG.map((f) => (
            <span key={f} className="rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[11px] text-muted">
              {f}
            </span>
          ))}
        </div>
      </section>
      <ArkivSok />
    </main>
  );
}
