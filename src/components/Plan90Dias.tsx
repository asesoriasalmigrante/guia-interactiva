'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp, Loader2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t, translateChapterWithAI } from '../utils/i18n';
import { PLAN_90_DIAS_DATA, PlanPhase } from '../data/plan90DiasData';

export const Plan90Dias: React.FC = () => {
  const { language } = useLanguage();
  const [translatedData, setTranslatedData] = useState(PLAN_90_DIAS_DATA);
  const [loading, setLoading] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({});
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (language === 'es') {
      setTranslatedData(PLAN_90_DIAS_DATA);
      return;
    }
    setLoading(true);
    translateChapterWithAI({ id: 'plan-90-dias', content: PLAN_90_DIAS_DATA }, language)
      .then((translated) => {
        if (translated?.content) {
          setTranslatedData(translated.content);
        }
      })
      .catch(() => setTranslatedData(PLAN_90_DIAS_DATA))
      .finally(() => setLoading(false));
  }, [language]);

  const togglePhase = (id: string) => setExpandedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleWeek = (id: string) => setExpandedWeeks(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleDay = (key: string) => setExpandedDays(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const allPhases: Record<string, boolean> = {};
    const allWeeks: Record<string, boolean> = {};
    PLAN_90_DIAS_DATA.forEach(p => {
      allPhases[p.id] = true;
      p.weeks.forEach(w => { allWeeks[w.id] = true; });
    });
    setExpandedPhases(allPhases);
    setExpandedWeeks(allWeeks);
  }, []);

  const phaseColors = ['from-[#0B2447] to-[#0f2d5a]', 'from-[#1a3a5c] to-[#0B2447]', 'from-[#0B2447] to-[#1a3a5c]'];
  const phaseAccents = ['border-[#E79923]', 'border-[#D4AF37]', 'border-[#E79923]'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
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
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-8 text-[#0B2447]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-semibold">{t('loading', language)}</span>
        </div>
      )}

      {/* Phases */}
      {!loading && translatedData.map((phase, phaseIdx) => (
        <div key={phase.id} className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden`}>
          <button
            onClick={() => togglePhase(phase.id)}
            className={`w-full flex items-center justify-between p-5 bg-gradient-to-r ${phaseColors[phaseIdx]} text-white hover:opacity-90 transition-opacity`}
          >
            <div className="text-left">
              <h3 className="font-extrabold text-sm md:text-base">{phase.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{phase.subtitle}</p>
            </div>
            {expandedPhases[phase.id] ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
          </button>

          {expandedPhases[phase.id] && (
            <div className="p-5 space-y-4">
              {/* Phase intro */}
              <div className={`border-l-4 ${phaseAccents[phaseIdx]} pl-4 py-2 bg-slate-50 rounded-r-lg`}>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic">{phase.description}</p>
              </div>

              {/* Weeks */}
              {phase.weeks.map((week) => (
                <div key={week.id} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleWeek(week.id)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <h4 className="font-bold text-[#0B2447] text-xs md:text-sm text-left">{week.title}</h4>
                    {expandedWeeks[week.id] ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </button>

                  {expandedWeeks[week.id] && (
                    <div className="p-4 space-y-2">
                      {week.days.map((day) => (
                        <div key={`${week.id}-day${day.day}`} className="border-l-2 border-[#E79923]/30 pl-3">
                          <button
                            onClick={() => toggleDay(`${week.id}-day${day.day}`)}
                            className="flex items-center justify-between w-full py-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#0B2447] text-[#E79923] text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
                                {day.day}
                              </span>
                              <span className="font-semibold text-[#0B2447] text-xs">{day.title}</span>
                            </div>
                            {expandedDays[`${week.id}-day${day.day}`] ? <ChevronUp className="w-3 h-3 text-slate-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
                          </button>
                          {expandedDays[`${week.id}-day${day.day}`] && (
                            <p className="text-slate-500 text-xs leading-relaxed pl-8 pb-2">{day.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Warning for Phase 2 */}
              {phaseIdx === 1 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-xs leading-relaxed">
                    {t('plan90Warning', language)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Advice Box */}
      <div className="bg-gradient-to-r from-[#0B2447] via-[#0f2d5a] to-[#0B2447] text-white rounded-2xl p-6 md:p-8 border border-[#8FAFB3]/20 shadow-xl">
        <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl">
          {t('plan90Advice', language)}
        </p>
      </div>
    </div>
  );
};
