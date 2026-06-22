'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, MapPin } from 'lucide-react';
import type { Milestone } from '@/lib/timeline';
import type { Bilete } from '@/lib/bilete';
import { biletCredit } from '@/lib/bilete';
import { ArchivePhoto, ArchiveImage } from './ArchivePhoto';
import { Eyebrow, SourceTag, Logo } from './ui';

/* Detaljside: foto + tekst (to-spalta på desktop) + relaterte + mørk lightbox. */
export function MilestoneDetail({ m, main, pool }: { m: Milestone; main: Bilete | null; pool: Bilete[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const mainIdx = main ? pool.findIndex((b) => b.slug === main.slug) : -1;
  const relaterte = pool.filter((b) => b.slug !== main?.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-14">
        {/* foto */}
        <div className="lg:sticky lg:top-24">
          {main ? (
            <button type="button" onClick={() => setOpen(mainIdx >= 0 ? mainIdx : 0)} className="group block w-full cursor-zoom-in" aria-label="Opna i fullskjerm">
              <ArchiveImage src={main.media_url} alt={main.alt} credit={biletCredit(main)} className="aspect-[4/3] w-full transition-opacity group-hover:opacity-95" rounded="rounded-2xl" />
            </button>
          ) : (
            <ArchivePhoto motif={m.motif} className="aspect-[4/3] w-full" rounded="rounded-2xl" />
          )}
        </div>

        {/* tekst */}
        <div className="mt-8 lg:mt-0">
          <div className={`font-serif text-6xl leading-none tracking-tight sm:text-7xl lg:text-8xl ${m.accent ? 'text-aho' : 'text-ink'}`}>
            {m.year}
          </div>
          <div className="mt-4 h-0.5 w-10 bg-aho" />
          <div className="mt-4"><Eyebrow accent={m.accent}>{m.kicker}</Eyebrow></div>
          <h1 className="mt-2 font-serif text-2xl leading-tight text-ink sm:text-3xl">{m.title}</h1>
          <p className="mt-1 font-serif text-lg italic text-ink-soft">{m.lead}</p>
          <p className="mt-6 max-w-prose text-[0.97rem] leading-relaxed text-ink-soft">{m.body}</p>
          {m.place && (
            <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
              <MapPin className="h-3.5 w-3.5" /> {m.place}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            {main && (
              <a href={main.kjeldeside} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:text-aho">
                [Foto: {main.kreditering.split(' / ')[0]}] <ArrowUpRight className="h-3 w-3 text-aho" />
                <span className="text-muted/70">· {main.lisens}</span>
              </a>
            )}
            {m.sources.map((s, k) =>
              s.url ? (
                <a key={k} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:text-aho">
                  [{s.name}] <ArrowUpRight className="h-3 w-3 text-aho" />
                </a>
              ) : (
                <SourceTag key={k}>{s.name}</SourceTag>
              ),
            )}
          </div>
        </div>
      </div>

      {/* relaterte bilete */}
      {relaterte.length > 0 && (
        <div className="mt-14 border-t border-line pt-8">
          <Eyebrow>Relaterte bilete</Eyebrow>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-5">
            {relaterte.map((b) => {
              const i = pool.findIndex((x) => x.slug === b.slug);
              return (
                <button key={b.slug} type="button" onClick={() => setOpen(i)} className="group block text-left">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-black/10">
                    <Image src={b.media_url} alt={b.alt || b.tittel} fill sizes="(max-width: 640px) 33vw, 280px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="mt-2 line-clamp-1 text-[11px] font-bold uppercase tracking-wide text-ink">{b.tittel}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted">{b.lisens}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {open !== null && <Lightbox images={pool} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Lightbox({ images, index, onIndex, onClose }: { images: Bilete[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const total = images.length;
  const go = useCallback((d: number) => onIndex((index + d + total) % total), [index, total, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [go, onClose]);

  const img = images[index];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#100f0e] text-white">
      <div className="flex items-center justify-between px-5 py-4 sm:px-10">
        <Logo className="h-5" />
        <button type="button" onClick={onClose} aria-label="Lukk" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/65 transition-colors hover:bg-white/10 hover:text-white">
          Lukk <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20">
        <span className="absolute left-5 top-0 font-mono text-[11px] uppercase tracking-widest text-white/55 sm:left-20">
          <span className="text-aho">{String(index + 1).padStart(2, '0')}</span> / {total}
        </span>
        <button type="button" onClick={() => go(-1)} aria-label="Førre" className="absolute left-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-aho/60 text-aho transition-colors hover:bg-aho hover:text-white sm:flex">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="relative h-full max-h-[62vh] w-full max-w-4xl">
          <Image src={img.media_url} alt={img.alt || img.tittel} fill sizes="(max-width: 900px) 100vw, 900px" className="object-contain" priority />
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Neste" className="absolute right-3 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-aho/60 text-aho transition-colors hover:bg-aho hover:text-white sm:flex">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="px-5 pb-3 sm:px-10">
        <div className="font-serif text-3xl">{img.year ?? ''}</div>
        <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/80">{img.tittel}</div>
        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/45">{biletCredit(img)}</div>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5 sm:px-10">
        {images.map((b, i) => (
          <button key={b.slug} type="button" onClick={() => onIndex(i)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 transition ${i === index ? 'ring-aho' : 'opacity-50 ring-transparent hover:opacity-90'}`} aria-label={b.tittel}>
            <Image src={b.media_url} alt="" fill sizes="80px" className="object-cover" />
            <span className="absolute left-1 top-1 rounded bg-black/55 px-1 font-mono text-[8px] text-white/90">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="h-[3px] w-full bg-white/10">
        <div className="h-full bg-aho transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
    </div>
  );
}
