'use client';

import { LanguageProvider } from '@/src/contexts/LanguageContext';
import { ServiceWorkerRegistration } from '@/src/components/ServiceWorkerRegistration';
import { InstallButton } from '@/src/components/InstallButton';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ServiceWorkerRegistration />
      {children}
      <InstallButton />
    </LanguageProvider>
  );
}
