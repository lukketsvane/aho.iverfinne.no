'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { Logo } from './ui';

const NAV = [
  { href: '/tidslinje', label: 'Tidslinje' },
  { href: '/personer', label: 'Personar' },
  { href: '/bygg', label: 'Bygg' },
  { href: '/kart', label: 'Kart' },
  { href: '/om', label: 'Om AHO' },
];

export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link href="/" aria-label="AHO, heim" className="shrink-0">
          <Logo className="h-6" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {NAV.map(({ href, label }) => {
            const active = path.startsWith(href);
            return (
              <Link key={href} href={href} className={`text-[13px] font-medium tracking-tight transition-colors hover:text-aho ${active ? 'text-aho' : 'text-ink-soft'}`}>
                {label}
              </Link>
            );
          })}
        </nav>

        <Link href="/sok" aria-label="Søk" className="flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm text-muted transition-colors hover:border-aho/40 sm:min-w-[180px]">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Søk i AHO-historia</span>
        </Link>
      </div>
    </header>
  );
}
