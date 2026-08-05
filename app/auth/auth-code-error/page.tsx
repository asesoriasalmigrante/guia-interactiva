'use client';

import { AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '@/src/utils/i18n';

const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';

export default function AuthCodeErrorPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-lato bg-slate-950 text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0B2447] p-1 border-2 border-rose-500 shadow-2xl ring-4 ring-rose-500/30 overflow-hidden">
            <img
              src={customMigranteLogo}
              alt={t('altLogo', language)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <h1 className="text-2xl font-black font-poppins text-white">
            {t('invalidLink', language)}
          </h1>
          <p className="text-xs text-[#A2C7CC]">
            {t('linkExpired', language)}
          </p>
        </div>

        <div className="bg-[#0c2345]/85 backdrop-blur-xl border border-[#8FAFB3]/30 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="bg-rose-500/20 border border-rose-500/40 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-rose-200">{t('authError', language)}</p>
              <p className="text-xs text-rose-300/80 mt-1">
                {t('requestNewLink', language)}
              </p>
            </div>
          </div>

          <Link
            href="/login"
            className="w-full py-3 bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-poppins"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToLogin', language)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
