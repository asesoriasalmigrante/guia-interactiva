import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

const SITE_URL = 'https://guia-interactiva-one.vercel.app';

export const metadata: Metadata = {
  title: 'Asesorías al Migrante — Daniela Harrington',
  description: 'Guía de Supervivencia Migratoria interactiva con Daniela Harrington. Calculadoras, comparadores de países, checklists y asesoría con IA.',
  metadataBase: new URL(SITE_URL),
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
    icon: '/favicon.ico',
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
      </head>
      <body className="font-lato">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
