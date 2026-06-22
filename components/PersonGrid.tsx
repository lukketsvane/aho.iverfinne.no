'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type Person = {
  namn: string;
  år: string;
  rolle: string;
  kategori: 'Arkitekt' | 'Designar' | 'Teoretikar';
  bio: string;
  relevanteAr?: string[];
};

const KATEGORIAR = ['Alle', 'Arkitekt', 'Designar', 'Teoretikar'] as const;

export function PersonGrid({ personar }: { personar: Person[] }) {
  const [filter, setFilter] = useState<(typeof KATEGORIAR)[number]>('Alle');
  const synleg = personar.filter((p) => filter === 'Alle' || p.kategori === filter);
  const initialar = (n: string) => n.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('');

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {KATEGORIAR.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
              filter === k ? 'bg-aho text-white' : 'border border-line bg-card text-muted hover:border-aho/40'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {synleg.map((p) => (
          <figure key={p.namn} className="flex gap-4">
            <div className="flex aspect-square h-20 w-20 shrink-0 items-center justify-center rounded-full bg-paper-2 ring-1 ring-black/5">
              <span className="font-serif text-2xl text-muted/60">{initialar(p.namn)}</span>
            </div>
            <figcaption className="min-w-0">
              <div className="font-serif text-lg leading-tight text-ink">{p.namn}</div>
              <div className="mt-0.5 font-mono text-[10px] text-muted">{p.år} · {p.rolle}</div>
              <p className="mt-2 text-[12.5px] leading-snug text-ink-soft">{p.bio}</p>
              {p.relevanteAr && p.relevanteAr.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.relevanteAr.map((y) => (
                    <Link
                      key={y}
                      href={`/${y}`}
                      className="inline-flex items-center gap-0.5 rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[10px] text-aho transition-colors hover:bg-aho hover:text-white"
                    >
                      {y} <ArrowUpRight className="h-2.5 w-2.5" />
                    </Link>
                  ))}
                </div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
