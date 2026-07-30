import React, { useState, useEffect } from 'react';
import { CHECKLIST_CATEGORIES } from '../data/ebookData';
import { CheckSquare, AlertTriangle, Cloud, HardDrive, RefreshCw, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';

interface ChecklistToolProps {
  onOpenAIChatWithMessage?: (msg: string) => void;
}

export const ChecklistTool: React.FC<ChecklistToolProps> = ({ onOpenAIChatWithMessage }) => {
  const { language } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('migrante_checklist_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {};
  });

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'identidad': true,
    'academicos': true,
    'respaldo_digital': true
  });

  useEffect(() => {
    localStorage.setItem('migrante_checklist_state', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleResetChecklist = () => {
    if (window.confirm('¿Deseas reiniciar todas las casillas marcadas de tu checklist?')) {
      setCheckedItems({});
      localStorage.removeItem('migrante_checklist_state');
    }
  };

  // Calculate Total Stats
  const allItems = CHECKLIST_CATEGORIES.flatMap(c => c.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter(i => checkedItems[i.id]).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const digitalBackupItems = CHECKLIST_CATEGORIES.find(c => c.id === 'respaldo_digital')?.items || [];
  const digitalCompletedCount = digitalBackupItems.filter(i => checkedItems[i.id]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <CheckSquare className="w-4 h-4" />
          Lista de Comprobación Final (Capítulos 5 y 10 del eBook)
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t('checklistTitle', language)}
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          Daniela Harrington advierte: <em className="text-amber-300">"Tener los documentos correctos, vigentes y debidamente apostillados te ahorrará meses de retraso y miles de dólares. ¡No olvides realizar tu respaldo digital obligatorio!"</em>
        </p>
      </div>

      {/* Global Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              Progreso General de Preparación
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                {completedCount} de {totalCount} Verificados
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Marca los documentos y gestiones que ya tienes listos y verificados para viajar.
            </p>
          </div>

          <button
            onClick={handleResetChecklist}
            className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 self-start sm:self-auto transition-colors cursor-pointer"
            id="btn-reset-checklist"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reiniciar Checklist</span>
          </button>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{progressPercent}% Completado</span>
            {progressPercent === 100 ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> ¡Todo listo para abordar!
              </span>
            ) : (
              <span className="text-slate-500">Faltan {totalCount - completedCount} tareas</span>
            )}
          </div>
        </div>
      </div>

      {/* Daniela's Digital Backup Alert Callout */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-indigo-800/80 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Cloud className="w-5 h-5 text-amber-400" />
          <span>¡CONSEJO DE VIDA DE DANIELA! Respaldo Digital Obligatorio</span>
        </div>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
          Uno de los errores más comunes es viajar únicamente con documentos físicos. Si te roban la maleta o se extravía en el aeropuerto, estarás indocumentado en un país extranjero. <strong>Guarda copias escaneadas en PDF en tu correo electrónico, nube (Google Drive/Dropbox) y en un pendrive USB en tu bolso de mano.</strong>
        </p>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-indigo-900/60 p-2.5 rounded-xl border border-indigo-700/60 w-fit">
          <HardDrive className="w-4 h-4" />
          Respaldo Digital Verificado: {digitalCompletedCount} / {digitalBackupItems.length}
        </div>
      </div>

      {/* Category Accordions */}
      <div className="space-y-4">
        {CHECKLIST_CATEGORIES.map((category) => {
          const isExpanded = expandedCategories[category.id] ?? true;
          const catCompleted = category.items.filter(i => checkedItems[i.id]).length;
          const isCatAllDone = catCompleted === category.items.length;

          return (
            <div
              key={category.id}
              className={`bg-white rounded-2xl border transition-all ${
                isCatAllDone ? 'border-emerald-300/80 bg-emerald-50/20' : 'border-slate-200'
              } shadow-sm overflow-hidden`}
            >
              {/* Category Header Bar */}
              <button
                onClick={() => toggleCategoryExpand(category.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                id={`cat-header-${category.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                    isCatAllDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-amber-400'
                  }`}>
                    {catCompleted}/{category.items.length}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                      {category.name}
                      {isCatAllDone && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          ✓ Completado
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500">{category.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Items List */}
              {isExpanded && (
                <div className="p-5 pt-0 space-y-2 border-t border-slate-100 mt-1">
                  {category.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by div click
                          className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                        />

                        <div className="flex-1 min-w-0">
                          <div className={`text-xs md:text-sm font-semibold leading-snug ${isChecked ? 'line-through text-slate-500' : ''}`}>
                            {item.text}
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            {item.required && (
                              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.2 rounded">
                                Obligatorio
                              </span>
                            )}

                            {item.isDigitalBackupRecommend && (
                              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.2 rounded flex items-center gap-1">
                                <Cloud className="w-3 h-3" /> Respaldo Digital
                              </span>
                            )}

                            {item.tooltip && (
                              <span className="text-[11px] text-slate-500 italic">
                                ℹ️ {item.tooltip}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Progress Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              Estado Final de tu Preparación
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">
              Resumen detallado de los avances en tu lista de comprobación migratoria.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full w-fit">
            {completedCount} de {totalCount} verificados
          </span>
        </div>

        {/* Dual Percentage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Porcentaje Logrado */}
          <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Porcentaje Logrado
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-emerald-700">
                {progressPercent}%
              </span>
              <span className="text-xs font-semibold text-emerald-800">
                Completado
              </span>
            </div>
            <p className="text-xs text-emerald-700/90 leading-relaxed pt-1">
              {completedCount === totalCount
                ? "¡Has completado el 100% de los ítems de tu checklist! Estás completamente preparado."
                : `Has verificado satisfactoriamente ${completedCount} de ${totalCount} tareas y documentos.`}
            </p>
          </div>

          {/* Porcentaje Faltante */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Porcentaje Faltante
              </span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black text-amber-700">
                {100 - progressPercent}%
              </span>
              <span className="text-xs font-semibold text-amber-800">
                Pendiente
              </span>
            </div>
            <p className="text-xs text-amber-700/90 leading-relaxed pt-1">
              {totalCount - completedCount === 0
                ? "No te falta ninguna tarea por completar."
                : `Te faltan ${totalCount - completedCount} tareas o documentos por verificar antes de viajar.`}
            </p>
          </div>
        </div>

        {/* Visual Progress Bar Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-extrabold text-slate-700">
            <span className="text-emerald-700">✓ Logrado: {progressPercent}%</span>
            <span className="text-amber-700">⏳ Faltante: {100 - progressPercent}%</span>
          </div>
          <div className="w-full bg-amber-100 h-5 rounded-full overflow-hidden flex p-1 border border-slate-200 shadow-inner">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
            <div
              className="bg-amber-400/50 h-full rounded-r-full transition-all duration-500"
              style={{ width: `${100 - progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* AI Help CTA */}
      {onOpenAIChatWithMessage && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-extrabold text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              ¿Tienes dudas sobre cómo apostillar o traducir tus documentos?
            </h4>
            <p className="text-slate-300 text-xs">
              Pregunta a nuestra Asesora Virtual sobre los requisitos de apostilla de La Haya o trámites consulares.
            </p>
          </div>

          <button
            onClick={() => onOpenAIChatWithMessage(`Tengo dudas sobre cómo apostillar y legalizar mis documentos (títulos, antecedentes penales y actas) para mi proceso migratorio. ¿Podrías indicarme los pasos?`)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap shadow-md transition-all cursor-pointer"
            id="btn-ask-ai-checklist"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            Consultar sobre Apostillas con Asesora IA
          </button>
        </div>
      )}
    </div>
  );
};
