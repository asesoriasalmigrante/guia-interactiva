'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      const dismissed = localStorage.getItem('pwa_install_dismissed');
      if (!dismissed) {
        setShowInstall(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstall(false);
      localStorage.removeItem('pwa_install_dismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstall(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstall(false);
    setIsDismissed(true);
    localStorage.setItem('pwa_install_dismissed', 'true');
  };

  if (isInstalled || !showInstall || isDismissed || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50">
      <div className="bg-[#0B2447] border border-amber-400/30 rounded-2xl p-4 shadow-2xl shadow-amber-900/20">
        <div className="flex items-start gap-3">
          <div className="bg-amber-400/20 rounded-xl p-2 flex-shrink-0">
            <Download className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm font-poppins">
              Instalar Guía Migrante
            </h3>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">
              Instálala en tu dispositivo para acceso rápido sin abrir el navegador.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleInstall}
                className="bg-amber-400 hover:bg-amber-500 text-[#0B2447] font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Instalar
              </button>
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-white text-xs px-3 py-2 rounded-xl transition-colors"
              >
                Ahora no
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-500 hover:text-white flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}