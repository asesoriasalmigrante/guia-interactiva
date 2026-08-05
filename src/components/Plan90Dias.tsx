'use client';

import React, { useState } from 'react';
import { Calendar, Loader2, AlertTriangle, CheckSquare } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';
import { PLAN_90_DIAS_DATA } from '../data/plan90DiasData';
import { useTranslatedData } from '../hooks/useTranslatedData';

export const Plan90Dias: React.FC = () => {
  const { language } = useLanguage();
  const { data: translatedData, loading } = useTranslatedData('plan-90-dias', PLAN_90_DIAS_DATA, language);
  const [checkedDays, setCheckedDays] = useState<Record<number, boolean>>({});

  const toggleDay = (dayNum: number) => {
    setCheckedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
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

      {!loading && (
        <div className="space-y-10">
          {/* Summary Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#0B2447] text-white p-4">
              <h3 className="font-bold text-sm">{t('plan90Phases', language)}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left p-3 font-bold text-[#0B2447] text-xs">{t('plan90TablePhase', language)}</th>
                    <th className="text-left p-3 font-bold text-[#0B2447] text-xs">{t('plan90TableDays', language)}</th>
                    <th className="text-left p-3 font-bold text-[#0B2447] text-xs">{t('plan90TableCore', language)}</th>
                    <th className="text-left p-3 font-bold text-[#0B2447] text-xs">{t('plan90TableGuarantee', language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {translatedData.map((phase, idx) => (
                    <tr key={idx} className="border-b border-slate-100 last:border-0">
                      <td className="p-3 font-semibold text-[#0B2447] text-xs">{phase.title}</td>
                      <td className="p-3 text-slate-600 text-xs">{phase.subtitle}</td>
                      <td className="p-3 text-slate-600 text-xs">{idx === 0 ? t('plan90Core1', language) : idx === 1 ? t('plan90Core2', language) : t('plan90Core3', language)}</td>
                      <td className="p-3 text-slate-600 text-xs">{idx === 0 ? t('plan90Guarantee1', language) : idx === 1 ? t('plan90Guarantee2', language) : t('plan90Guarantee3', language)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Phases */}
          {translatedData.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="space-y-4">
              {/* Phase Header */}
              <div className="border-l-4 border-[#E79923] pl-4 py-2">
                <h3 className="text-lg md:text-xl font-extrabold text-[#0B2447] tracking-tight">
                  {phase.title} — {phase.subtitle}
                </h3>
              </div>

              {/* Phase Description */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 ml-1">
                <p className="text-slate-600 text-sm leading-relaxed italic">{phase.description}</p>
              </div>

              {/* Weeks and Days */}
              {phase.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="space-y-3 ml-1">
                  {/* Week Header */}
                  <h4 className="text-[#E79923] font-bold text-sm uppercase tracking-wide">
                    {week.title}
                  </h4>

                  {/* Days */}
                  <div className="space-y-2">
                    {week.days.map((day) => (
                      <div
                        key={day.day}
                        className={`bg-white border rounded-xl p-4 transition-all ${
                          checkedDays[day.day]
                            ? 'border-green-300 bg-green-50/50'
                            : 'border-slate-200 hover:border-[#E79923]/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleDay(day.day)}
                            className="flex-shrink-0 mt-0.5"
                          >
                            {checkedDays[day.day] ? (
                              <CheckSquare className="w-5 h-5 text-green-600" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-slate-300 rounded" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#0B2447] text-sm">
                              {t('dayLabel', language)} {day.day}: {day.title}
                            </p>
                            <p className="text-slate-500 text-xs leading-relaxed mt-1">
                              {day.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Warning for Phase 2 */}
              {phaseIdx === 1 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 ml-1">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-xs leading-relaxed">
                    {t('plan90Warning', language)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Advice Box */}
      <div className="bg-gradient-to-r from-[#0B2447] via-[#0f2d5a] to-[#0B2447] text-white rounded-2xl p-6 md:p-8 border border-[#8FAFB3]/20 shadow-xl">
        <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl">
          {t('plan90Advice', language)}
        </p>
      </div>
    </div>
  );
};
