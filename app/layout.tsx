import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asesorías al Migrante — Daniela Harrington',
  description: 'Guía de Supervivencia Migratoria interactiva con Daniela Harrington',
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
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'es',
                  includedLanguages: 'es,en,zh-CN,fr,de,pt,it,ru,ar,hi,ja,ko,id,tr,vi',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </head>
      <body className="font-lato">
        <div id="google_translate_element" style={{ display: 'none' }} />
        {children}
      </body>
    </html>
  );
}
