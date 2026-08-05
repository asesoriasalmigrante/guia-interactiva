'use client';

import React from 'react';
import { CreditCard, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '@/src/utils/i18n';

const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';

export default function PaymentPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B2447] font-lato">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0B2447] p-1 border-2 border-[#E79923] shadow-2xl ring-4 ring-[#E79923]/30 overflow-hidden">
            <img
              src={customMigranteLogo}
              alt="Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <h1 className="text-2xl font-black font-poppins text-white">
            {t('pendingAccess', language)}
          </h1>
          <p className="text-xs text-[#8FAFB3]">
            {t('pendingAccessDesc', language)}
          </p>
        </div>

        <div className="bg-[#0c2345]/85 backdrop-blur-xl border border-[#8FAFB3]/30 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="bg-[#06152b]/80 border border-[#8FAFB3]/25 rounded-xl p-4 text-center space-y-3">
            <CreditCard className="w-10 h-10 text-[#E79923] mx-auto" />
            <div>
              <p className="text-sm font-bold text-white">{t('mercadopagoIntegration', language)}</p>
              <p className="text-xs text-[#8FAFB3] mt-1">
                {t('comingSoonPayment', language)}
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 text-center">
            {t('alreadyPaid', language)}
          </div>

          <a
            href="mailto:asesoriasalmigrante@gmail.com"
            className="w-full py-3 bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-poppins cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{t('contactSupport', language)}</span>
          </a>

          <Link
            href="/login"
            className="w-full py-3 bg-transparent border border-[#8FAFB3]/30 hover:border-[#E79923] text-[#8FAFB3] hover:text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToLogin', language)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
