import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { TabBar } from '@/components/TabBar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-jb', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://aho-80.iverfinne.no'),
  title: 'Ved sida av jubileet, ei tidslinje for AHO',
  description:
    'AHO fyller 80 år. Ei scrollbar tidslinje frå Statens arkitektkurs (1945) til Arkitektur- og designhøgskolen i Oslo i dag, bygd på norske arkiv og register.',
  applicationName: 'AHO 80',
  appleWebApp: {
    capable: true,
    title: 'AHO 80',
    statusBarStyle: 'default',
  },
  openGraph: {
    title: 'Ved sida av jubileet, ei tidslinje for AHO',
    description: 'Frå Kunstindustrimuseet til Noregs framste miljø for arkitektur og design. 1945-2025.',
    locale: 'nn_NO',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f5f3ef',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nn"
      className={`${inter.variable} ${newsreader.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-paper text-ink pb-16 md:pb-0" suppressHydrationWarning>
        {children}
        <TabBar />
      </body>
    </html>
  );
}
