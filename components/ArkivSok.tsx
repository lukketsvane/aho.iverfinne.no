'use client';

import { useState } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';

type Treff = { dato: string; hending: string; detaljar: string; kjelde: string; url: string };

export function ArkivSok() {
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [treff, setTreff] = useState<Treff[]>([]);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setBusy(true);
    setDone(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      setTreff(data.items ?? []);
    } catch {
      setTreff([]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="arkivsok" className="mx-auto max-w-[560px] px-5 pb-24">
      <div className="mb-6 text-center">
        <span className="eyebrow text-[0.62rem] text-muted">Arkivsøk</span>
        <h2 className="mt-2 font-serif text-3xl text-ink">Søk i tidslinja</h2>
        <p className="mt-2 text-sm text-muted">
          Eit lokalt oppslag i dei verifiserte hendingane. Prøv «design», «1968» eller «Maridalsveien».
        </p>
      </div>

      <form onSubmit={run} className="group relative">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted transition-colors group-focus-within:text-ink" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Søk i kjeldene…"
          spellCheck={false}
          className="w-full rounded-full border border-line bg-card py-4 pl-14 pr-14 font-mono text-[15px] text-ink shadow-sm outline-none transition focus:border-aho/40 focus:ring-4 focus:ring-aho/10 placeholder:font-sans placeholder:text-muted"
        />
        {busy && <Loader2 className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted" />}
      </form>

      {done && !busy && (
        <div className="mt-10">
          {treff.length === 0 ? (
            <p className="py-12 text-center font-mono text-xs uppercase tracking-widest text-muted">
              Ingen treff
            </p>
          ) : (
            <ol className="relative space-y-9 pl-7">
              <div className="absolute bottom-2 left-[5px] top-3 w-px bg-line" aria-hidden />
              {treff.map((t, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-7 top-2 h-[11px] w-[11px] rounded-full border border-aho bg-paper">
                    <span className="absolute inset-[2px] rounded-full bg-aho" />
                  </span>
                  <div className="font-serif text-3xl text-ink">{t.dato}</div>
                  <h3 className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink">{t.hending}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.detaljar}</p>
                  <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                    <span>[{t.kjelde}]</span>
                    {t.url && (
                      <a href={t.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-aho">
                        Oppslag <ArrowRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  );
}
