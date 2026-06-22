'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Milestone } from '@/lib/timeline';
import { biletFor } from '@/lib/bilete';
import { ArchivePhoto, ArchiveImage } from './ArchivePhoto';

/* Sentral skinne, vekslande år/foto — overview som lenkjar til detaljsida. */
export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-24 sm:px-8">
      <div className="absolute bottom-12 left-1/2 top-3 w-px -translate-x-1/2 bg-line" aria-hidden />
      <ol className="space-y-12 sm:space-y-20">
        {items.map((m, i) => {
          const foto = biletFor(m.id);
          const yearLeft = i % 2 === 0;

          const Photo = (
            <div className={yearLeft ? 'pl-4 sm:pl-8' : 'pr-4 sm:pr-8'}>
              {foto ? (
                <ArchiveImage
                  src={foto.media_url}
                  alt={foto.alt}
                  className="aspect-[4/3] w-full"
                  rounded="rounded-lg sm:rounded-xl"
                />
              ) : (
                <ArchivePhoto motif={m.motif} className="aspect-[4/3] w-full" rounded="rounded-lg sm:rounded-xl" />
              )}
            </div>
          );

          const Year = (
            <div className={yearLeft ? 'pr-4 text-right sm:pr-8' : 'pl-4 sm:pl-8'}>
              <div className={`font-serif text-3xl leading-none tracking-tight sm:text-5xl ${m.accent ? 'text-aho' : 'text-ink'}`}>
                {m.year}
              </div>
              <div className={`mt-2 text-[9px] font-bold uppercase tracking-widest text-ink sm:text-[11px] ${yearLeft ? '' : ''}`}>
                {m.title}
              </div>
              <div className="mt-1 hidden text-xs text-muted sm:block">{m.lead}</div>
            </div>
          );

          return (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative"
            >
              <span
                className={`absolute left-1/2 top-1/2 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-paper ${m.accent ? 'border-aho' : 'border-line'}`}
                aria-hidden
              >
                <span className={`h-2 w-2 rounded-full ${m.accent ? 'bg-aho' : 'bg-transparent'}`} />
              </span>
              <Link href={`/${m.id}`} className="grid grid-cols-2 items-center gap-x-2 sm:gap-x-6" aria-label={`${m.year} — ${m.title}`}>
                {yearLeft ? (
                  <>
                    {Year}
                    {Photo}
                  </>
                ) : (
                  <>
                    {Photo}
                    {Year}
                  </>
                )}
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
