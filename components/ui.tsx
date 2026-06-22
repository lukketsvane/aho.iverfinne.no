import type { ReactNode } from 'react';

/* ── AHO-merket (berre «AHO», kutta ut av den offisielle logoen) ─────────── */
export function Logo({
  variant = 'orange',
  className = 'h-5',
}: {
  variant?: 'orange' | 'black';
  className?: string;
}) {
  const src = variant === 'black' ? '/logo/AHO_mark_black.png' : '/logo/AHO_mark_orange.png';
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="AHO" className={className} style={{ width: 'auto' }} draggable={false} />;
}

/* ── Sperra versal-etikett ─────────────────────────────────────────────── */
export function Eyebrow({
  children,
  className = '',
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`eyebrow text-[0.62rem] ${accent ? 'text-aho' : 'text-muted'} ${className}`}
    >
      {children}
    </span>
  );
}

/* ── Kjeldetagg i monospace, t.d. [Digitalarkivet] ─────────────────────── */
export function SourceTag({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">[{children}]</span>
  );
}

/* ── iOS-statuslinje ───────────────────────────────────────────────────── */
export function StatusBar({ time = '09:41', tone = 'dark' }: { time?: string; tone?: 'dark' | 'light' }) {
  return (
    <div className={`relative z-20 flex items-center justify-between px-7 pt-3 pb-1 ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
      <span className="text-[13px] font-semibold tabular-nums tracking-tight">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 4.3} y={8 - i * 2.4} width="3" height={3 + i * 2.4} rx="0.7" opacity={i === 3 ? 0.35 : 1} />
          ))}
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
          <path d="M8 2.2c2.6 0 5 1 6.8 2.7l-1.5 1.6A7.2 7.2 0 0 0 8 4.9 7.2 7.2 0 0 0 2.7 6.5L1.2 4.9A9.7 9.7 0 0 1 8 2.2Z" />
          <path d="M8 6c1.4 0 2.7.55 3.7 1.5l-1.6 1.6A2.9 2.9 0 0 0 8 8.3c-.8 0-1.5.3-2.1.8L4.3 7.5A5.2 5.2 0 0 1 8 6Z" />
          <circle cx="8" cy="10.2" r="1.4" />
        </svg>
        {/* battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden>
          <rect x="0.5" y="1" width="22" height="11" rx="3" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2.5" width="16" height="8" rx="1.5" fill="currentColor" />
          <rect x="24" y="4.5" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

/* ── iPhone-ramme som omsluttar ein skjerm ─────────────────────────────── */
export function Phone({
  children,
  className = '',
  scroll = true,
}: {
  children: ReactNode;
  className?: string;
  scroll?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19.5] w-full max-w-[330px] rounded-[2.7rem] bg-[#15110f] p-[4px] shadow-[0_30px_60px_-25px_rgba(40,20,10,0.45),0_8px_20px_-12px_rgba(40,20,10,0.3)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.45rem] bg-paper ring-1 ring-black/5">
        {/* dynamic island */}
        <div className="pointer-events-none absolute left-1/2 top-[9px] z-30 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-[#15110f]" />
        <div className={`flex h-full flex-col ${scroll ? 'overflow-y-auto no-scrollbar' : 'overflow-hidden'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
