import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

const SITE_URL = 'https://guia-interactiva-one.vercel.app';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#E79923',
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Asesorías al Migrante — Daniela Harrington',
  description: 'Guía de Supervivencia Migratoria interactiva con Daniela Harrington. Calculadoras, comparadores de países, checklists y asesoría con IA.',
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json',
  openGraph: {
    title: 'Asesorías al Migrante — Daniela Harrington',
    description: 'Guía de Supervivencia Migratoria interactiva con IA, calculadoras y comparadores.',
    url: SITE_URL,
    siteName: 'Asesorías al Migrante',
    locale: 'es',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asesorías al Migrante — Daniela Harrington',
    description: 'Guía de Supervivencia Migratoria interactiva con IA, calculadoras y comparadores.',
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icons/favicon.png',
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Guía Migrante',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-lato">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
