'use client';

import React from 'react';
import { Calendar, Download, Eye, Layers } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';

export const Plan90Dias: React.FC = () => {
  const { language } = useLanguage();

  const phases = [
    { titleKey: 'plan90Phase1', descKey: 'plan90Phase1Desc' },
    { titleKey: 'plan90Phase2', descKey: 'plan90Phase2Desc' },
    { titleKey: 'plan90Phase3', descKey: 'plan90Phase3Desc' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0B2447] text-white p-6 md:p-8 rounded-2xl border border-[#0B2447]/80 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-[#E79923] text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          {t('plan90Title', language)}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t('plan90Title', language)}
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          {t('plan90Desc', language)}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/plan-maestro-90-dias.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {t('plan90Download', language)}
          </a>
          <a
            href="/plan-maestro-90-dias.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/20"
          >
            <Eye className="w-4 h-4" />
            {t('plan90Preview', language)}
          </a>
        </div>
      </div>

      {/* Phases Preview */}
      <div>
        <div className="flex items-center gap-2 text-[#E79923] text-xs font-bold uppercase tracking-wider mb-4">
          <Layers className="w-4 h-4" />
          {t('plan90Phases', language)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-[#E79923]/60 transition-all space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#0B2447] text-[#E79923] text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-extrabold text-[#0B2447] text-sm leading-snug">
                  {t(phase.titleKey, language)}
                </h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed pl-9">
                {t(phase.descKey, language)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Advice Box */}
      <div className="bg-gradient-to-r from-[#0B2447] via-[#0f2d5a] to-[#0B2447] text-white rounded-2xl p-6 md:p-8 border border-[#8FAFB3]/20 shadow-xl">
        <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl">
          {t('plan90Advice', language)}
        </p>
      </div>
    </div>
  );
};
