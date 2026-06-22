import Image from 'next/image';
import type { Milestone } from '@/lib/timeline';

type Motif = Milestone['motif'];

/* Original, rettsfrie «arkivfoto»-illustrasjonar i svart-kvitt. Erstatt med
   rettsklarerte foto ved å leggje dei i /public/arkiv og peike hit. */
const INK = '#5f5a52';
const DARK = '#403b35';
const MID = '#8f8980';
const LIGHT = '#e8e3da';
const FIG = '#6b655d';

function Scene({ motif }: { motif: Motif }) {
  switch (motif) {
    case 'fasade': // monumentalt mur-bygg (SHKS 1904)
      return (
        <g>
          <rect x="24" y="48" width="352" height="200" fill={MID} />
          <rect x="24" y="48" width="352" height="16" fill={DARK} />
          <rect x="24" y="232" width="352" height="16" fill={DARK} />
          {[0, 1, 2].map((r) =>
            Array.from({ length: 8 }).map((_, c) => (
              <g key={`${r}-${c}`}>
                <rect x={44 + c * 41} y={78 + r * 52} width="24" height="34" fill={LIGHT} />
                <path d={`M${44 + c * 41} ${78 + r * 52} h24 l-12 -9 z`} fill={DARK} />
              </g>
            )),
          )}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={40 + i * 28} y="252" width="4" height="12" fill={FIG} opacity="0.7" />
          ))}
        </g>
      );
    case 'gate': // smal bygard i Kvadraturen
      return (
        <g>
          <rect x="120" y="30" width="170" height="240" fill={MID} />
          <rect x="120" y="30" width="170" height="12" fill={DARK} />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={138 + c * 50} y={62 + r * 52} width="30" height="38" fill={LIGHT} />
            )),
          )}
          <rect x="186" y="226" width="38" height="44" fill={DARK} />
          <rect x="40" y="120" width="70" height="150" fill={INK} opacity="0.55" />
          <rect x="300" y="150" width="64" height="120" fill={INK} opacity="0.45" />
        </g>
      );
    case 'verkstad': // teiknesal / modellverkstad
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <line x1={40 + i * 120} y1="120" x2={40 + i * 120} y2="120" stroke={DARK} />
              <path d={`M${30 + i * 118} 250 l40 -70 h60 l40 70 z`} fill={MID} />
              <path d={`M${30 + i * 118} 250 l40 -70 h60`} fill="none" stroke={LIGHT} strokeWidth="3" />
              <line x1={60 + i * 118} y1="60" x2={70 + i * 118} y2="180" stroke={DARK} strokeWidth="2" />
              <circle cx={70 + i * 118} cy="56" r="9" fill={LIGHT} />
              <circle cx={92 + i * 118} cy="176" r="11" fill={FIG} />
            </g>
          ))}
        </g>
      );
    case 'nybygg': // moderne tre/glas-fasade (Maridalsveien)
      return (
        <g>
          <rect x="20" y="40" width="360" height="210" fill={MID} />
          <rect x="20" y="180" width="360" height="70" fill={DARK} opacity="0.85" />
          {Array.from({ length: 34 }).map((_, i) => (
            <rect key={i} x={26 + i * 10.6} y="46" width="5" height="130" fill={i % 2 ? LIGHT : INK} opacity={i % 2 ? 0.9 : 0.8} />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={30 + i * 50} y="188" width="40" height="54" fill={LIGHT} opacity="0.45" />
          ))}
          <circle cx="60" cy="150" r="26" fill={DARK} opacity="0.5" />
          <rect x="58" y="150" width="4" height="100" fill={DARK} opacity="0.5" />
        </g>
      );
    case 'segl': // abstrakt segl, ekko av AHO sin «O»
      return (
        <g>
          <circle cx="200" cy="150" r="92" fill="none" stroke={MID} strokeWidth="10" />
          <circle cx="200" cy="150" r="60" fill="none" stroke={DARK} strokeWidth="3" />
          <circle cx="200" cy="150" r="30" fill={LIGHT} />
          <rect x="150" y="146" width="100" height="8" fill={MID} />
        </g>
      );
    case 'rutenett': // blåkopi-rutenett
    default:
      return (
        <g>
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="300" stroke={MID} strokeWidth="1" opacity="0.5" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32} stroke={MID} strokeWidth="1" opacity="0.5" />
          ))}
          <rect x="96" y="80" width="150" height="110" fill="none" stroke={DARK} strokeWidth="3" />
          <line x1="96" y1="80" x2="246" y2="190" stroke={DARK} strokeWidth="2" />
          <circle cx="246" cy="80" r="10" fill={FIG} />
        </g>
      );
  }
}

export function ArchivePhoto({
  motif,
  className = '',
  rounded = 'rounded-xl',
  caption,
}: {
  motif: Motif;
  className?: string;
  rounded?: string;
  caption?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ring-1 ring-black/10 ${className}`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label={`Arkivillustrasjon: ${motif}`}>
        <defs>
          <linearGradient id={`sky-${motif}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d8d2c8" />
            <stop offset="1" stopColor="#bcb4a8" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#sky-${motif})`} />
        <Scene motif={motif} />
        {/* dempa duotone + vignett for arkivkjensle */}
        <rect width="400" height="300" fill="#2a2620" opacity="0.06" />
        <rect width="400" height="300" fill="url(#sky-vignette)" />
      </svg>
      <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ background: 'radial-gradient(120% 90% at 50% 30%, transparent 55%, rgba(40,34,28,0.22))' }} />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-6">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/85">{caption}</span>
        </div>
      )}
    </div>
  );
}

/* Ekte, rettsklart arkivfoto (frå Notion «AHO bilete»). */
export function ArchiveImage({
  src,
  alt,
  credit,
  className = '',
  rounded = 'rounded-xl',
}: {
  src: string;
  alt: string;
  credit?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} bg-paper-2 ring-1 ring-black/10 ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 560px" className="object-cover" />
      {credit && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-7">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/90">{credit}</span>
        </div>
      )}
    </div>
  );
}
