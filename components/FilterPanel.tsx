'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export type FilterItem = {
  id: string;
  year: number;
  title: string;
  lead: string;
  discipline: string;
};

const KATEGORIAR: { key: string; label: string }[] = [
  { key: 'institusjon', label: 'Institusjon' },
  { key: 'arkitektur', label: 'Arkitektur' },
  { key: 'design', label: 'Design' },
  { key: 'stad', label: 'Bygg og stad' },
];

export function FilterPanel({ items }: { items: FilterItem[] }) {
  const years = useMemo(() => Array.from(new Set(items.map((i) => i.year))).sort((a, b) => a - b), [items]);
  const [fra, setFra] = useState(years[0]);
  const [til, setTil] = useState(years[years.length - 1]);
  const [valde, setValde] = useState<Set<string>>(new Set());

  const treff = items
    .filter((i) => i.year >= fra && i.year <= til && (valde.size === 0 || valde.has(i.discipline)))
    .sort((a, b) => a.year - b.year);

  const toggle = (k: string) =>
    setValde((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });

  return (
    <div className="lg:grid lg:grid-cols-[20rem_1fr] lg:gap-12">
      {/* kontrollar */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="eyebrow text-[0.6rem] text-muted">Periode</div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {[
            ['Frå', fra, setFra] as const,
            ['Til', til, setTil] as const,
          ].map(([label, val, set]) => (
            <label key={label} className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</span>
              <select
                value={val}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-line bg-card px-3 py-2 font-serif text-lg text-ink outline-none focus:border-aho/40"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="eyebrow mt-8 text-[0.6rem] text-muted">Kategori</div>
        <div className="mt-3 space-y-1">
          {KATEGORIAR.map((k) => {
            const on = valde.has(k.key);
            return (
              <button
                key={k.key}
                type="button"
                onClick={() => toggle(k.key)}
                className="flex w-full items-center gap-3 rounded-lg py-2 text-left"
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded border ${on ? 'border-aho bg-aho text-white' : 'border-line bg-card'}`}>
                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className={`text-[14px] ${on ? 'text-ink' : 'text-ink-soft'}`}>{k.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 hidden rounded-full bg-aho px-6 py-3.5 text-center text-[12px] font-bold uppercase tracking-widest text-white lg:block">
          {treff.length} resultat
        </div>
      </div>

      {/* resultat */}
      <div className="mt-10 lg:mt-0">
        <ol className="space-y-2">
          {treff.map((m) => (
            <li key={m.id}>
              <Link href={`/${m.id}`} className="group flex items-center gap-4 rounded-xl border border-line bg-card px-4 py-4 transition-colors hover:border-aho/40">
                <span className="w-16 shrink-0 font-serif text-2xl text-aho">{m.year}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-ink">{m.title}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-muted">{m.lead}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-aho" />
              </Link>
            </li>
          ))}
          {treff.length === 0 && (
            <li className="py-16 text-center font-mono text-xs uppercase tracking-widest text-muted">Ingen treff i valt periode</li>
          )}
        </ol>
      </div>
    </div>
  );
}
