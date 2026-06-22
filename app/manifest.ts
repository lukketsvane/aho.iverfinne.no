import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ved sida av jubileet, ei tidslinje for AHO',
    short_name: 'AHO 80',
    description:
      'AHO fyller 80 år. Ei scrollbar tidslinje frå Statens arkitektkurs (1945) til Arkitektur- og designhøgskolen i Oslo i dag.',
    lang: 'nn',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f5f3ef',
    theme_color: '#ed4723',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
