import React, { useState } from 'react';
import { READINESS_QUIZ_BLOCKS, QUIZ_RESULT_TIERS, EBOOK_METADATA } from '../data/ebookData';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';
import {
  Compass,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Sparkles,
  RefreshCw,
  Trophy,
  ArrowRight,
  FileCheck,
  ShieldCheck,
  Briefcase,
  DollarSign,
  HeartHandshake,
  Scale,
  UserCheck,
  Phone,
  Instagram,
  Mail,
  ExternalLink,
  BookOpen,
  Info
} from 'lucide-react';

interface ReadinessQuizProps {
  onOpenAIChatWithMessage?: (msg: string) => void;
}

type AnswerOption = 'Si' | 'No estoy seguro' | 'No';

export const ReadinessQuiz: React.FC<ReadinessQuizProps> = ({ onOpenAIChatWithMessage }) => {
  const { language } = useLanguage();
  // answers map: questionId -> 'Si' | 'No estoy seguro' | 'No'
  const [answers, setAnswers] = useState<Record<number, AnswerOption>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  // Flattened questions list (25 questions)
  const allQuestions = READINESS_QUIZ_BLOCKS.flatMap(b => b.questions);
  const totalQuestionsCount = allQuestions.length; // 25
  const maxPoints = totalQuestionsCount * 2; // 50 points

  const handleSelectOption = (questionId: number, option: AnswerOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const getPointsForAnswer = (option?: AnswerOption): number => {
    if (option === 'Si') return 2;
    if (option === 'No estoy seguro') return 1;
    return 0; // 'No' or undefined
  };

  const calculateTotalScore = (): number => {
    return (Object.values(answers) as AnswerOption[]).reduce((acc: number, opt: AnswerOption) => acc + getPointsForAnswer(opt), 0);
  };

  const currentScore = calculateTotalScore();
  const answeredCount = Object.keys(answers).length;
  const isQuizComplete = answeredCount === totalQuestionsCount;

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTierInfo = (score: number) => {
    if (score >= 41) return QUIZ_RESULT_TIERS[0];
    if (score >= 26) return QUIZ_RESULT_TIERS[1];
    return QUIZ_RESULT_TIERS[2];
  };

  const activeTier = getTierInfo(currentScore);

  const getBlockIcon = (blockId: number) => {
    switch (blockId) {
      case 1: return <Compass className="w-5 h-5 text-[#E79923]" />;
      case 2: return <FileCheck className="w-5 h-5 text-[#E79923]" />;
      case 3: return <Briefcase className="w-5 h-5 text-[#E79923]" />;
      case 4: return <DollarSign className="w-5 h-5 text-[#E79923]" />;
      case 5: return <HeartHandshake className="w-5 h-5 text-[#E79923]" />;
      case 6: return <Scale className="w-5 h-5 text-[#E79923]" />;
      case 7: return <UserCheck className="w-5 h-5 text-[#E79923]" />;
      default: return <Compass className="w-5 h-5 text-[#E79923]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 font-lato">
      {/* Page Header / Hero Banner */}
      <div className="bg-[#0B2447] text-white p-6 md:p-10 rounded-3xl border border-[#0B2447]/20 shadow-2xl space-y-6 text-center md:text-left relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#E79923]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#E79923] text-xs font-bold uppercase tracking-wider bg-[#E79923]/10 px-3.5 py-1.5 rounded-full border border-[#E79923]/20">
              <Compass className="w-4 h-4" />
              Test de Preparación Migratoria Oficial
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-poppins text-white leading-tight">
              {t('quizTitle', language)}
            </h1>
            <p className="text-[#8FAFB3] text-sm md:text-base leading-relaxed">
              Descubre tu nivel de preparación antes de dar uno de los pasos más importantes de tu vida.
            </p>
          </div>

          <div className="bg-[#0e2c56] p-4 rounded-2xl border border-white/10 text-center flex-shrink-0 w-full md:w-auto min-w-[200px]">
            <p className="text-[#8FAFB3] text-xs font-semibold uppercase tracking-wider mb-1">Cuestionario Evaluativo</p>
            <p className="text-2xl font-extrabold text-[#E79923] font-poppins">25 Preguntas</p>
            <p className="text-xs text-slate-300 mt-1 italic">"Traspasa fronteras con el respaldo correcto"</p>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <CheckCircle2 className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">25 preguntas</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">Evaluación Rápida</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <BookOpen className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">Planificación Real</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <Trophy className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">Resultados Inmediatos</span>
          </div>
        </div>
      </div>

      {/* Guide Section: How to complete */}
      {!showResult && (
        <div className="bg-white dark:bg-[#0e1a2b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#0B2447] dark:text-[#E79923] font-extrabold font-poppins text-lg">
            <Info className="w-5 h-5 text-[#E79923]" />
            ¿Cómo completar este test?
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">1</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">Lee cada pregunta</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Responde con sinceridad según sea tu situación actual.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">2</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">Marca cada respuesta</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Elige entre <strong>Si</strong>, <strong>No estoy seguro</strong> o <strong>No</strong>.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">3</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">Asigna los puntos</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Si = 2 pts | No estoy seguro = 1 pt | No = 0 pts.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">4</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">Suma los puntos</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">Al finalizar compara tu resultado con la tabla de interpretación.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Form or Results Display */}
      {!showResult ? (
        <div className="space-y-8">
          {/* Sticky Progress Bar */}
          <div className="bg-white dark:bg-[#0e1a2b] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-16 z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white font-poppins uppercase tracking-wider">
                Progreso del Test
              </span>
              <span className="text-xs font-bold text-[#0B2447] dark:text-[#E79923] bg-[#F5F1E8] dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                {answeredCount} / {totalQuestionsCount} Respondidas
              </span>
            </div>

            <div className="w-full sm:w-64 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0B2447] to-[#E79923] h-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestionsCount) * 100}%` }}
              />
            </div>
          </div>

          {/* Render Blocks */}
          {READINESS_QUIZ_BLOCKS.map(block => (
            <div
              key={block.id}
              className="bg-white dark:bg-[#0e1a2b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6"
            >
              {/* Block Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B2447] dark:bg-slate-900 flex items-center justify-center flex-shrink-0">
                    {getBlockIcon(block.id)}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#E79923] uppercase tracking-wider font-poppins">
                      Bloque {block.id}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-poppins">
                      {block.title}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 self-start sm:self-center">
                  {block.questionRange}
                </span>
              </div>

              {/* Questions in Block */}
              <div className="space-y-6">
                {block.questions.map(q => {
                  const currentAnswer = answers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#0B2447] text-[#E79923] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {q.id}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base leading-snug pt-0.5">
                          {q.question}
                        </h4>
                      </div>

                      {/* 3 Answer Option Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-0 sm:pl-10">
                        {/* Option: Si */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 'Si')}
                          id={`q-${q.id}-opt-si`}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            currentAnswer === 'Si'
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/30'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                          }`}
                        >
                          <CheckCircle2 className={`w-4 h-4 ${currentAnswer === 'Si' ? 'text-white' : 'text-emerald-600'}`} />
                          <span>Si</span>
                        </button>

                        {/* Option: No estoy seguro */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 'No estoy seguro')}
                          id={`q-${q.id}-opt-unsure`}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            currentAnswer === 'No estoy seguro'
                              ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-2 ring-amber-500/30'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                          }`}
                        >
                          <HelpCircle className={`w-4 h-4 ${currentAnswer === 'No estoy seguro' ? 'text-slate-950' : 'text-amber-500'}`} />
                          <span>No estoy seguro</span>
                        </button>

                        {/* Option: No */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 'No')}
                          id={`q-${q.id}-opt-no`}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            currentAnswer === 'No'
                              ? 'bg-slate-800 text-white border-slate-800 shadow-sm ring-2 ring-slate-800/30'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <XCircle className={`w-4 h-4 ${currentAnswer === 'No' ? 'text-white' : 'text-slate-400'}`} />
                          <span>No</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Action Bar */}
          <div className="bg-white dark:bg-[#0e1a2b] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white font-poppins">
                {isQuizComplete
                  ? '¡Has respondido todas las 25 preguntas!'
                  : `Faltan ${totalQuestionsCount - answeredCount} preguntas por responder`}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Puntaje acumulado actual: <strong>{currentScore} / {maxPoints} puntos</strong>
              </p>
            </div>

            <button
              onClick={() => {
                setShowResult(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={answeredCount === 0}
              id="btn-show-quiz-results"
              className="w-full sm:w-auto bg-[#E79923] hover:bg-amber-400 text-[#0B2447] font-extrabold px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer font-poppins"
            >
              Ver Mi Resultado e Interpretación
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8">
          {/* Main Score Result Card */}
          <div className="bg-white dark:bg-[#0e1a2b] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-[#0B2447] text-[#E79923] mx-auto flex items-center justify-center shadow-lg border border-[#E79923]/30">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-xs">
                <span className={`px-3 py-1 rounded-full font-extrabold text-xs uppercase ${activeTier.badgeColor}`}>
                  {activeTier.title}
                </span>
              </div>

              <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-poppins pt-2">
                {currentScore} <span className="text-xl md:text-2xl text-slate-400 font-semibold">/ 50 Puntos</span>
              </div>

              <div className="max-w-xl mx-auto pt-2">
                <div className={`p-5 rounded-2xl border text-sm md:text-base leading-relaxed ${activeTier.badgeBorder}`}>
                  {activeTier.description}
                </div>
              </div>
            </div>

            {/* Scale reference bar */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto space-y-3 text-left">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-poppins">
                Tabla de Interpretación de Resultados:
              </h4>
              <div className="space-y-2 text-xs">
                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  currentScore >= 41 ? 'bg-emerald-50 border-emerald-400 font-bold dark:bg-emerald-950/40' : 'opacity-60'
                }`}>
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold">41 a 50 puntos</span>
                  <span className="text-slate-700 dark:text-slate-300">¡Estás muy bien preparado!</span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  currentScore >= 26 && currentScore <= 40 ? 'bg-amber-50 border-amber-400 font-bold dark:bg-amber-950/40' : 'opacity-60'
                }`}>
                  <span className="text-amber-900 dark:text-amber-300 font-bold">26 a 40 puntos</span>
                  <span className="text-slate-700 dark:text-slate-300">Vas por buen camino</span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  currentScore <= 25 ? 'bg-red-50 border-red-400 font-bold dark:bg-red-950/40' : 'opacity-60'
                }`}>
                  <span className="text-red-800 dark:text-red-300 font-bold">0 a 25 puntos</span>
                  <span className="text-slate-700 dark:text-slate-300">Aún no estás listo</span>
                </div>
              </div>
            </div>

            {/* Block Breakdown */}
            <div className="text-left bg-slate-50/70 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-2xl mx-auto">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm font-poppins">
                Desglose de Puntos por Bloque:
              </h4>
              <div className="space-y-3">
                {READINESS_QUIZ_BLOCKS.map(block => {
                  const blockQuestions = block.questions;
                  const maxBlockPts = blockQuestions.length * 2;
                  const earnedBlockPts = blockQuestions.reduce((acc, q) => acc + getPointsForAnswer(answers[q.id]), 0);
                  const blockPercentage = Math.round((earnedBlockPts / maxBlockPts) * 100);

                  return (
                    <div key={block.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-800 dark:text-slate-200">
                          Bloque {block.id}: {block.title}
                        </span>
                        <span className="text-[#0B2447] dark:text-[#E79923] font-bold">
                          {earnedBlockPts} / {maxBlockPts} pts ({blockPercentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            blockPercentage >= 80 ? 'bg-emerald-500' : blockPercentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${blockPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={handleReset}
                id="btn-retry-quiz"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer font-poppins"
              >
                <RefreshCw className="w-4 h-4" />
                Repetir el Test
              </button>

              {onOpenAIChatWithMessage && (
                <button
                  onClick={() => onOpenAIChatWithMessage(`Obtuve ${currentScore}/50 puntos en el Test de Preparación Migratoria (${activeTier.title}). ¿Podrías darme un análisis de mis puntos fuertes y un plan específico para mejorar en las áreas con menor puntaje?`)}
                  id="btn-ask-ai-quiz"
                  className="w-full sm:w-auto bg-[#0B2447] text-[#E79923] hover:bg-[#0a1e3b] text-xs font-extrabold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all font-poppins"
                >
                  <Sparkles className="w-4 h-4 text-[#E79923]" />
                  Obtener Plan de Mejora con Asesora IA
                </button>
              )}
            </div>
          </div>

          {/* General Recommendations Section (Page 9 of PDF) */}
          <div className="bg-white dark:bg-[#0e1a2b] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-poppins flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#E79923]" />
                Recomendaciones Generales
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>Investiga siempre en fuentes oficiales.</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>Planifica con tiempo y sé flexible ante los cambios.</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>Organiza tu documentación con anticipación.</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>Fortalece tu perfil profesional y tus finanzas.</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 md:col-span-2">
                <HeartHandshake className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>Rodéate de profesionales especializados en migración.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Book Call to Action / Advisory Banner (Page 9 of PDF) */}
          <div className="bg-[#0B2447] text-white p-6 md:p-10 rounded-3xl border border-[#0B2447] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#E79923]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-3xl relative z-10">
              <span className="text-[#E79923] text-xs font-extrabold uppercase tracking-widest bg-[#E79923]/10 px-3.5 py-1 rounded-full border border-[#E79923]/20">
                Respaldo Profesional
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold font-poppins text-white leading-snug">
                ¿QUIERES tener una migración 100% segura?
              </h3>
              <p className="text-[#8FAFB3] text-sm md:text-base leading-relaxed">
                Este test te ayuda a identificar tu nivel de preparación, pero cada proyecto migratorio es único. La seguridad no se basa en suerte, sino en información correcta. Precisamente por eso escribí <strong>'Mudarse a otro país: La verdadera guía de supervivencia'</strong>. Es todo lo que yo desearía haber sabido antes de mudarme. Te ahorra meses de investigación y evita errores comunes en tu expediente. Pide la tuya.
              </p>
            </div>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 relative z-10 text-xs">
              <a
                href={`https://wa.me/${EBOOK_METADATA.contact.phone}?text=${encodeURIComponent('Hola Daniela, acabo de realizar el Test de Preparación Migratoria y me gustaría solicitar una asesoría personalizada.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-xl font-bold flex items-center gap-2.5 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp: +54 9 (223) 5173127</span>
              </a>

              <a
                href={`mailto:${EBOOK_METADATA.contact.email}`}
                className="bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-xl font-medium flex items-center gap-2.5 transition-all border border-white/10"
              >
                <Mail className="w-4 h-4 text-[#E79923] flex-shrink-0" />
                <span className="truncate">{EBOOK_METADATA.contact.email}</span>
              </a>

              <a
                href={`https://instagram.com/${EBOOK_METADATA.contact.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-xl font-medium flex items-center gap-2.5 transition-all border border-white/10"
              >
                <Instagram className="w-4 h-4 text-[#E79923] flex-shrink-0" />
                <span>{EBOOK_METADATA.contact.instagram}</span>
              </a>

              <a
                href={EBOOK_METADATA.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-3.5 rounded-xl font-medium flex items-center gap-2.5 transition-all border border-white/10"
              >
                <ExternalLink className="w-4 h-4 text-[#E79923] flex-shrink-0" />
                <span>Sitio Web Oficial</span>
              </a>
            </div>

            {/* Final CTA Button */}
            <div className="pt-4 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div>
                <p className="text-white font-extrabold font-poppins text-lg">
                  ¡AGENDA TU ASESORÍA PERSONALIZADA!
                </p>
                <p className="text-[#8FAFB3] text-xs">
                  ASESORÍAS AL MIGRANTE — "Traspasa Fronteras con el respaldo correcto."
                </p>
              </div>

              <a
                href={`https://wa.me/${EBOOK_METADATA.contact.phone}?text=${encodeURIComponent('Hola Daniela, acabo de realizar el Test de Preparación Migratoria (Obtuve ' + currentScore + '/50 puntos) y quiero agendar mi Asesoría Personalizada.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#E79923] hover:bg-amber-400 text-[#0B2447] font-black px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all font-poppins"
              >
                Agendar Mi Asesoría
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
