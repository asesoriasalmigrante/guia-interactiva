'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';
import { KIT_EMERGENCIA_DATA } from '../data/kitEmergenciaData';
import { useTranslatedData } from '../hooks/useTranslatedData';

export const KitEmergencia: React.FC = () => {
  const { language } = useLanguage();
  const { data: translatedData, loading } = useTranslatedData('kit-emergencia', KIT_EMERGENCIA_DATA, language);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubsection = (id: string) => {
    setExpandedSubsections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const allSections: Record<string, boolean> = {};
    const allSubs: Record<string, boolean> = {};
    KIT_EMERGENCIA_DATA.forEach(s => {
      allSections[s.id] = true;
      s.subsections.forEach(sub => { allSubs[sub.id] = true; });
    });
    setExpandedSections(allSections);
    setExpandedSubsections(allSubs);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0B2447] text-white p-6 md:p-8 rounded-2xl border border-[#0B2447]/80 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-[#E79923] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          {t('kitTitle', language)}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t('kitTitle', language)}
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          {t('kitDesc', language)}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-8 text-[#0B2447]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-semibold">{t('loading', language)}</span>
        </div>
      )}

      {!loading && translatedData.map((section, sIdx) => (
        <div key={sIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-5 bg-[#0B2447] text-white hover:bg-[#0f2d5a] transition-colors"
          >
            <h3 className="font-extrabold text-sm md:text-base text-left">{section.title}</h3>
            {expandedSections[section.id] ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
          </button>

          {expandedSections[section.id] && (
            <div className="p-5 space-y-4">
              {section.subsections.map((sub, subIdx) => (
                <div key={subIdx} className="border-l-4 border-[#E79923] pl-4 space-y-2">
                  <button
                    onClick={() => toggleSubsection(sub.id)}
                    className="flex items-center justify-between w-full"
                  >
                    <h4 className="font-bold text-[#0B2447] text-sm">{sub.title}</h4>
                    {expandedSubsections[sub.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedSubsections[sub.id] && (
                    <div className="space-y-2">
                      {sub.content.map((para, i) => (
                        <p key={i} className="text-slate-600 text-xs md:text-sm leading-relaxed">{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="bg-gradient-to-r from-[#0B2447] via-[#0f2d5a] to-[#0B2447] text-white rounded-2xl p-6 md:p-8 border border-[#8FAFB3]/20 shadow-xl">
        <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl">
          {t('kitAdvice', language)}
        </p>
      </div>
    </div>
  );
};
