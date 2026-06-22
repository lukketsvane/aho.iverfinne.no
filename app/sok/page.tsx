import type { Metadata } from 'next';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';
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
        <div className="flex items-center justify-between">
          <Eyebrow accent>Søk</Eyebrow>
          <Link href="/filter" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-soft transition-colors hover:border-aho/40 hover:text-aho">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
          </Link>
        </div>
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
