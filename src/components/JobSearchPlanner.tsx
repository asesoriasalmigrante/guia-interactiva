import React, { useState } from 'react';
import { JOB_ACTION_PLAN } from '../data/ebookData';
import { Briefcase, AlertTriangle, CheckCircle2, ShieldAlert, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';

export const JobSearchPlanner: React.FC = () => {
  const { language } = useLanguage();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          {t('jobplanDesc', language)}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t('jobplanTitle', language)}
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          {t('danielaJobQuote', language)}
        </p>
      </div>

      {/* Anti-Scam Alert Callout */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-red-900 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-red-800 font-extrabold text-base">
          <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0" />
          <span>{t('jobplanSelectCountry', language)}</span>
        </div>
        <p className="text-xs md:text-sm text-red-800 leading-relaxed">
          {t('scamWarning', language)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-red-900">
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            {t('scamWarning1', language)}
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            {t('scamWarning2', language)}
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            {t('scamWarning3', language)}
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            {t('scamWarning4', language)}
          </div>
        </div>
      </div>

      {/* 3-Month Action Plan Timeline */}
      <div className="space-y-6">
        {JOB_ACTION_PLAN.map((month) => (
          <div
            key={month.monthNumber}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-xl text-xs uppercase tracking-wider">
                {t('monthLabel', language).replace('{n}', String(month.monthNumber))}
              </span>
              <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
                {month.title}
              </h3>
            </div>

            <div className="space-y-3">
              {month.tasks.map((task) => {
                const isDone = !!completedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isDone ? 'bg-emerald-50/70 border-emerald-200 text-slate-900' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded uppercase">
                          {task.category}
                        </span>
                      </div>
                      <p className={`text-xs md:text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {task.text}
                      </p>
                      {task.tip && (
                        <p className="text-[11px] text-amber-800 bg-amber-50/80 border border-amber-200/60 p-2 rounded-lg italic">
                          💡 <strong>{t('danielaTipLabel', language)}</strong> {task.tip}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
