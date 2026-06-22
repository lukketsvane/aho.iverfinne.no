import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Menu } from 'lucide-react';
import { MILESTONES } from '@/lib/timeline';
import { BILETE, biletFor } from '@/lib/bilete';
import { Logo, Eyebrow } from '@/components/ui';
import { MilestoneDetail } from '@/components/MilestoneDetail';

export function generateStaticParams() {
  return MILESTONES.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = MILESTONES.find((x) => x.id === id);
  if (!m) return {};
  return { title: `${m.year} — ${m.title} · AHO`, description: m.lead };
}

export default async function MilestonePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = MILESTONES.findIndex((m) => m.id === id);
  if (idx < 0) notFound();
  const m = MILESTONES[idx];
  const prev = MILESTONES[idx - 1];
  const next = MILESTONES[idx + 1];

  return (
    <main className="min-h-screen bg-paper pb-24">
      <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" aria-label="AHO — heim"><Logo className="h-6" /></Link>
          <Link href="/skisser" className="rounded-full p-2 text-ink-soft transition-colors hover:bg-paper-2" aria-label="Meny">
            <Menu className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-2 pt-8 sm:px-8">
        <div className="flex items-center gap-3">
          <Eyebrow accent>80 år</Eyebrow>
          <span className="h-px w-8 bg-aho" />
        </div>
        <Link href="/#tidslinje" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-aho">
          <ArrowLeft className="h-3.5 w-3.5" /> Til tidslinja
        </Link>
      </div>

      <div className="pt-6">
        <MilestoneDetail m={m} main={biletFor(m.id) ?? null} pool={BILETE} />
      </div>

      {/* prev / neste */}
      <nav className="mx-auto mt-16 flex max-w-6xl items-stretch justify-between gap-4 border-t border-line px-5 pt-6 sm:px-8">
        {prev ? (
          <Link href={`/${prev.id}`} className="group flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted"><ArrowLeft className="mr-1 inline h-3 w-3" />Førre</span>
            <span className="mt-1 font-serif text-xl text-ink transition-colors group-hover:text-aho">{prev.year}</span>
            <span className="text-[11px] text-muted">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/${next.id}`} className="group flex flex-col text-right">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Neste<ArrowRight className="ml-1 inline h-3 w-3" /></span>
            <span className="mt-1 font-serif text-xl text-ink transition-colors group-hover:text-aho">{next.year}</span>
            <span className="text-[11px] text-muted">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
