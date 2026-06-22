import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { MILESTONES } from '@/lib/timeline';
import { BILETE } from '@/lib/bilete';
import { SiteHeader } from '@/components/SiteHeader';
import { ArchiveImage } from '@/components/ArchivePhoto';
import { Logo } from '@/components/ui';

const KORT = [
  { n: '01', href: '/tidslinje', title: 'Tidslinje', blurb: 'Utforsk dei viktige milepælane i AHO si historie, 1945–2025.' },
  { n: '02', href: '/bygg', title: 'Bygg', blurb: 'Frå Kunstindustriskulen til Maridalsveien 29 ved Akerselva.' },
  { n: '03', href: '/kart', title: 'Kart', blurb: 'Stadene AHO har halde til, frå St. Olavs gate til i dag.' },
];

export default function Home() {
  const campus = BILETE.find((b) => b.slug.includes('campus')) ?? BILETE[BILETE.length - 1];

  return (
    <>
      <SiteHeader />

      {/* orange hero */}
      <section className="bg-aho text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <Logo variant="orange" className="hidden" />
            <div className="mb-6 h-px w-12 bg-white/50" />
            <h1 className="font-serif text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">80 år</h1>
            <p className="eyebrow mt-5 text-[0.7rem] text-white/85">Utforsk historia til AHO</p>
            <p className="mt-5 max-w-md text-[0.97rem] leading-relaxed text-white/90">
              På vegen til verkelegheit: opplag, menneske, lærarar og bygg som har forma
              Arkitektur- og designhøgskolen i Oslo gjennom 80 år.
            </p>
            <Link href="/tidslinje" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-widest text-aho transition-transform hover:scale-[1.02]">
              Start utforsking <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-white/20 lg:mt-0">
            <ArchiveImage src={campus.media_url} alt={campus.alt} className="aspect-[4/3] w-full" rounded="rounded-2xl" />
          </div>
        </div>
      </section>

      {/* kort */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {KORT.map((k) => (
            <Link key={k.n} href={k.href} className="group rounded-2xl border border-line bg-card p-6 transition-colors hover:border-aho/40">
              <div className="font-mono text-xs text-aho">{k.n}</div>
              <h2 className="mt-3 font-serif text-2xl text-ink">{k.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{k.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-ink transition-colors group-hover:text-aho">
                Opna <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* fremheva */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="flex items-center justify-between border-t border-line pt-8">
          <span className="eyebrow text-[0.62rem] text-muted">Frå tidslinja</span>
          <Link href="/tidslinje" className="font-mono text-[11px] uppercase tracking-wider text-aho">Sjå alle →</Link>
        </div>
        <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {MILESTONES.filter((m) => m.accent).map((m) => (
            <Link key={m.id} href={`/${m.id}`} className="group">
              <div className={`font-serif text-4xl ${m.accent ? 'text-aho' : 'text-ink'}`}>{m.year}</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-ink">{m.title}</div>
              <p className="mt-1.5 text-sm leading-snug text-muted">{m.lead}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-1 text-muted">
          <span className="eyebrow text-[0.58rem]">Scroll for å sjå meir</span>
          <ArrowDown className="h-4 w-4 text-aho" />
        </div>
      </section>
    </>
  );
}
