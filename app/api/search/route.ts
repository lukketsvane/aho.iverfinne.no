import { NextRequest, NextResponse } from 'next/server';
import { MILESTONES } from '@/lib/timeline';

// Lokalt arkivsøk, ingen eksterne AI-kall. Søkjer i dei verifiserte
// hendingane i tidslinja. (Google-AI-integrasjonen er teken ut med vilje;
// appen byggjer og køyrer utan API-nøklar.)
export async function POST(req: NextRequest) {
  const { query } = await req.json().catch(() => ({ query: '' }));
  const q = (query ?? '').toString().trim().toLowerCase();

  if (!q) return NextResponse.json({ items: [] });

  const terms = q.split(/\s+/).filter(Boolean);
  const scored = MILESTONES.map((m) => {
    const hay = [m.year, m.kicker, m.title, m.lead, m.body, m.place, m.discipline, ...m.sources.map((s) => `${s.name} ${s.credit ?? ''}`)]
      .join(' ')
      .toLowerCase();
    const score = terms.reduce((acc: number, t: string) => acc + (hay.includes(t) ? 1 : 0), 0);
    return { m, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.m.year.localeCompare(b.m.year));

  const items = scored.map(({ m }) => ({
    dato: m.year,
    hending: m.title,
    detaljar: m.body,
    kjelde: m.sources[0]?.name ?? 'AHO-arkivet',
    url: m.sources.find((s) => s.url)?.url ?? '',
  }));

  return NextResponse.json({ items });
}
