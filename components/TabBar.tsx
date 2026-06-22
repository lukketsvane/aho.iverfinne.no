'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GitCommitVertical, Users, Building2, Info } from 'lucide-react';

const TABS = [
  { href: '/', label: 'Heim', icon: Home },
  { href: '/tidslinje', label: 'Tidslinje', icon: GitCommitVertical },
  { href: '/personer', label: 'Personar', icon: Users },
  { href: '/bygg', label: 'Bygg', icon: Building2 },
  { href: '/om', label: 'Om AHO', icon: Info },
];

export function TabBar() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/90 backdrop-blur-md md:hidden">
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? path === '/' : path.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link href={href} className={`flex flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-medium transition-colors ${active ? 'text-aho' : 'text-muted'}`}>
                <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
