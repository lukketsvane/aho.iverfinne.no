import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { BILETE, biletCredit } from '@/lib/bilete';
import { SiteHeader } from '@/components/SiteHeader';
import { ArchiveImage } from '@/components/ArchivePhoto';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Bygg, AHO',
  description: 'Bygningane AHO har halde til i, frå Kunstindustriskulen til Maridalsveien 29.',
};

export default function ByggPage() {
  return (
    <main className="min-h-screen bg-paper">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-6 sm:px-8">
        <Eyebrow accent>Campus</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-ink sm:text-5xl">Bygg og campus</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
          Frå Statens handverks- og kunstindustriskule, via St. Olavs gate, til det ombygde
          industribygget i Maridalsveien 29 ved Akerselva. Rettsklare arkivfoto frå Wikimedia Commons.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BILETE.map((b) => (
            <figure key={b.slug} className="group">
              <a href={b.kjeldeside} target="_blank" rel="noopener noreferrer" className="block">
                <ArchiveImage src={b.media_url} alt={b.alt} className="aspect-[4/3] w-full" rounded="rounded-xl" />
              </a>
              <figcaption className="mt-3">
                <div className="text-[11px] font-bold uppercase tracking-widest text-ink">{b.tittel}</div>
                <a href={b.kjeldeside} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:text-aho">
                  {biletCredit(b)} <ArrowUpRight className="h-3 w-3 text-aho" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
