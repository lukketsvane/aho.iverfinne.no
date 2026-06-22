'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Milestone } from '@/lib/timeline';
import { biletFor, biletCredit } from '@/lib/bilete';
import { ArchivePhoto, ArchiveImage } from './ArchivePhoto';
import { Eyebrow, SourceTag } from './ui';

export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative mx-auto mt-10 max-w-[560px] px-5 pb-24">
      {/* gjennomgåande skinne */}
      <div className="absolute bottom-6 left-[1.65rem] top-3 w-px bg-line sm:left-[1.9rem]" aria-hidden />
      {items.map((m) => {
        const foto = biletFor(m.id);
        return (
        <motion.li
          key={m.id}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative pb-16 pl-14 sm:pl-16"
        >
          {/* node */}
          <span
            className={`absolute left-[1.18rem] top-2 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border bg-paper sm:left-[1.43rem] ${
              m.accent ? 'border-aho' : 'border-line'
            }`}
            aria-hidden
          >
            <span className={`h-2 w-2 rounded-full ${m.accent ? 'bg-aho' : 'bg-line'}`} />
          </span>

          <div className="flex items-baseline gap-3">
            <span
              className={`font-serif text-5xl leading-none tracking-tight sm:text-6xl ${
                m.accent ? 'text-aho' : 'text-ink'
              }`}
            >
              {m.year}
            </span>
          </div>
          <div className="mt-3 mb-3 h-px w-7 bg-ink/40" />
          <Eyebrow accent={m.accent}>{m.kicker}</Eyebrow>
          <h3 className="mt-1.5 font-serif text-[1.55rem] leading-tight text-ink">{m.title}</h3>
          <p className="mt-0.5 text-[0.95rem] italic text-ink-soft" style={{ fontFamily: 'var(--font-serif)' }}>
            {m.lead}
          </p>

          {foto ? (
            <a href={foto.kjeldeside} target="_blank" rel="noopener noreferrer" className="mt-5 block">
              <ArchiveImage
                src={foto.media_url}
                alt={foto.alt}
                credit={biletCredit(foto)}
                className="aspect-[16/10] w-full"
              />
            </a>
          ) : (
            <ArchivePhoto
              motif={m.motif}
              className="mt-5 aspect-[16/10] w-full"
              caption={m.sources.find((s) => s.credit)?.credit ?? m.place}
            />
          )}

          <p className="mt-4 max-w-prose text-[0.92rem] leading-relaxed text-ink-soft">{m.body}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {foto && (
              <a
                href={foto.kjeldeside}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:text-aho"
              >
                [Foto: {foto.kreditering.split(' / ')[0]}]
                <ArrowUpRight className="h-3 w-3 text-aho" />
                <span className="text-muted/70">· {foto.lisens}</span>
              </a>
            )}
            {m.sources.map((s, k) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:text-aho"
                  >
                    [{s.name}]
                    <ArrowUpRight className="h-3 w-3 text-aho" />
                  </a>
                ) : (
                  <SourceTag>{s.name}</SourceTag>
                )}
                {s.license && (
                  <span className="font-mono text-[9px] uppercase tracking-wide text-muted/70">· {s.license}</span>
                )}
              </span>
            ))}
          </div>
        </motion.li>
        );
      })}
    </ol>
  );
}
