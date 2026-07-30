import React, { useState } from 'react';
import { JOB_ACTION_PLAN } from '../data/ebookData';
import { Briefcase, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';

interface JobSearchPlannerProps {
  onOpenAIChatWithMessage?: (msg: string) => void;
}

export const JobSearchPlanner: React.FC<JobSearchPlannerProps> = ({ onOpenAIChatWithMessage }) => {
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
          Estrategia Laboral Internacional (Capítulo 7 del eBook)
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t('jobplanTitle', language)}
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          Daniela Harrington destaca: <em className="text-amber-300">"Conseguir empleo antes de emigrar reduce dramáticamente la incertidumbre económica y te permite acceder a visados de trabajo. Adapta tu síntesis curricular al país de destino y cuídate de las estafas."</em>
        </p>
      </div>

      {/* Anti-Scam Alert Callout */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-red-900 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-red-800 font-extrabold text-base">
          <ShieldAlert className="w-6 h-6 text-red-600 flex-shrink-0" />
          <span>¡ALERTA DE ESTAFAS MIGRATORIAS Y LABORALES! (Punto Crítico del eBook)</span>
        </div>
        <p className="text-xs md:text-sm text-red-800 leading-relaxed">
          Los estafadores se aprovechan de la urgencia del migrante. <strong>Desconfía inmediatamente si:</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-medium text-red-900">
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            ❌ Te solicitan dinero o pago previo para "contratarte" o tramitar la oferta.
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            ❌ Te prometen "visas 100% garantizadas" sin requisitos oficiales.
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            ❌ Salarios excesivamente altos sin exigir experiencia ni entrevistas reales.
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-red-200">
            ❌ No existe sitio web o presencia oficial verificable de la empresa.
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
                Mes {month.monthNumber}
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
                          💡 <strong>Tip de Daniela:</strong> {task.tip}
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

      {/* AI Help CTA */}
      {onOpenAIChatWithMessage && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-base flex items-center gap-2 text-amber-400">
              <Sparkles className="w-5 h-5" />
              ¿Necesitas ayuda para redactar tu CV o perfil de LinkedIn?
            </h4>
            <p className="text-slate-300 text-xs">
              Pídele a nuestra Asesora Virtual que te ayude a optimizar tu experiencia laboral para el país destino.
            </p>
          </div>

          <button
            onClick={() => onOpenAIChatWithMessage(`Quisiera ayuda para adaptar mi Currículum (CV) y carta de presentación para buscar empleo desde el extranjero. ¿Podrías darme un modelo optimizado?`)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer transition-all"
            id="btn-ask-ai-jobs"
          >
            Optimizar mi CV con la Asesora IA
          </button>
        </div>
      )}
    </div>
  );
};
