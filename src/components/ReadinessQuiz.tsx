import React, { useState } from 'react';
import { READINESS_QUIZ_BLOCKS, QUIZ_RESULT_TIERS, EBOOK_METADATA } from '../data/ebookData';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';
import {
  Compass,
  CheckCircle2,
  HelpCircle,
  XCircle,
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

type AnswerOption = 'yes' | 'unsure' | 'no';

export const ReadinessQuiz: React.FC = () => {
  const { language } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, AnswerOption>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const allQuestions = READINESS_QUIZ_BLOCKS.flatMap(b => b.questions);
  const totalQuestionsCount = allQuestions.length;
  const maxPoints = totalQuestionsCount * 2;

  const handleSelectOption = (questionId: number, option: AnswerOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const getPointsForAnswer = (option?: AnswerOption): number => {
    if (option === 'yes') return 2;
    if (option === 'unsure') return 1;
    return 0;
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
              {t('quizBadge', language)}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-poppins text-white leading-tight">
              {t('quizTitle', language)}
            </h1>
            <p className="text-[#8FAFB3] text-sm md:text-base leading-relaxed">
              {t('quizDesc', language)}
            </p>
          </div>

          <div className="bg-[#0e2c56] p-4 rounded-2xl border border-white/10 text-center flex-shrink-0 w-full md:w-auto min-w-[200px]">
            <p className="text-[#8FAFB3] text-xs font-semibold uppercase tracking-wider mb-1">{t('evaluativeQuestionnaire', language)}</p>
            <p className="text-2xl font-extrabold text-[#E79923] font-poppins">{t('questionsCount', language)}</p>
            <p className="text-xs text-slate-300 mt-1 italic">{t('quoteRight', language)}</p>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <CheckCircle2 className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">{t('twentyFiveQuestions', language)}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">{t('quickEvaluation', language)}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <BookOpen className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">{t('realPlanning', language)}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5 justify-center sm:justify-start">
            <Trophy className="w-4 h-4 text-[#E79923] flex-shrink-0" />
            <span className="text-slate-200 font-medium">{t('immediateResults', language)}</span>
          </div>
        </div>
      </div>

      {/* Guide Section: How to complete */}
      {!showResult && (
        <div className="bg-white dark:bg-[#0e1a2b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#0B2447] dark:text-[#E79923] font-extrabold font-poppins text-lg">
            <Info className="w-5 h-5 text-[#E79923]" />
            {t('howToCompleteTest', language)}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">1</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">{t('readEachQuestion', language)}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{t('answerSincerely', language)}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">2</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">{t('markEachAnswer', language)}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{t('quizChooseBetween', language)} <strong>{t('quizAnswerSi', language)}</strong>, <strong>{t('quizAnswerUnsure', language)}</strong> {t('quizOr', language)} <strong>{t('quizAnswerNo', language)}</strong>.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">3</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">{t('assignPoints', language)}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{t('pointValues', language)}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F1E8]/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="w-7 h-7 rounded-lg bg-[#0B2447] text-white font-bold flex items-center justify-center text-xs">4</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm pt-1">{t('sumThePoints', language)}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{t('compareResult', language)}</p>
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
                {t('testProgress', language)}
              </span>
              <span className="text-xs font-bold text-[#0B2447] dark:text-[#E79923] bg-[#F5F1E8] dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                {answeredCount} / {totalQuestionsCount} {t('answeredCount', language)}
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
                      {t('quizBlock' + block.id + 'Title', language)}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-poppins">
                      {t('quizBlock' + block.id + 'Title', language)}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 self-start sm:self-center">
                  {t('quizBlock' + block.id + 'Range', language)}
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
                          {t('quizQ' + q.id, language)}
                        </h4>
                      </div>

                      {/* 3 Answer Option Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pl-0 sm:pl-10">
                        {/* Option: Yes */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 'yes')}
                          id={`q-${q.id}-opt-si`}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            currentAnswer === 'yes'
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-500/30'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                          }`}
                        >
                          <CheckCircle2 className={`w-4 h-4 ${currentAnswer === 'yes' ? 'text-white' : 'text-emerald-600'}`} />
                          <span>{t('quizAnswerSi', language)}</span>
                        </button>

                        {/* Option: Unsure */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 'unsure')}
                          id={`q-${q.id}-opt-unsure`}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            currentAnswer === 'unsure'
                              ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-2 ring-amber-500/30'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                          }`}
                        >
                          <HelpCircle className={`w-4 h-4 ${currentAnswer === 'unsure' ? 'text-slate-950' : 'text-amber-500'}`} />
                          <span>{t('quizAnswerUnsure', language)}</span>
                        </button>

                        {/* Option: No */}
                        <button
                          type="button"
                          onClick={() => handleSelectOption(q.id, 'no')}
                          id={`q-${q.id}-opt-no`}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            currentAnswer === 'no'
                              ? 'bg-slate-800 text-white border-slate-800 shadow-sm ring-2 ring-slate-800/30'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <XCircle className={`w-4 h-4 ${currentAnswer === 'no' ? 'text-white' : 'text-slate-400'}`} />
                          <span>{t('quizAnswerNo', language)}</span>
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
                  ? t('allQuestionsAnswered', language)
                  : `${totalQuestionsCount - answeredCount} ${t('questionsRemaining', language)}`}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('currentScore', language)} <strong>{currentScore} / {maxPoints} {t('pointsLabel', language)}</strong>
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
              {t('finishTest', language)}
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
                  {currentScore >= 41 ? t('quizTierHighTitle', language) : currentScore >= 26 ? t('quizTierMidTitle', language) : t('quizTierLowTitle', language)}
                </span>
              </div>

              <div className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-poppins pt-2">
                {currentScore} <span className="text-xl md:text-2xl text-slate-400 font-semibold">{t('outOf', language)}</span>
              </div>

              <div className="max-w-xl mx-auto pt-2">
                <div className={`p-5 rounded-2xl border text-sm md:text-base leading-relaxed ${activeTier.badgeBorder}`}>
                  {currentScore >= 41 ? t('quizTierHighDesc', language) : currentScore >= 26 ? t('quizTierMidDesc', language) : t('quizTierLowDesc', language)}
                </div>
              </div>
            </div>

            {/* Scale reference bar */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto space-y-3 text-left">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider font-poppins">
                {t('resultsTable', language)}
              </h4>
              <div className="space-y-2 text-xs">
                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  currentScore >= 41 ? 'bg-emerald-50 border-emerald-400 font-bold dark:bg-emerald-950/40' : 'opacity-60'
                }`}>
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold">{t('scoreRangeHigh', language)}</span>
                  <span className="text-slate-700 dark:text-slate-300">{t('resultHigh', language)}</span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  currentScore >= 26 && currentScore <= 40 ? 'bg-amber-50 border-amber-400 font-bold dark:bg-amber-950/40' : 'opacity-60'
                }`}>
                  <span className="text-amber-900 dark:text-amber-300 font-bold">{t('scoreRangeMedium', language)}</span>
                  <span className="text-slate-700 dark:text-slate-300">{t('resultMedium', language)}</span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                  currentScore <= 25 ? 'bg-red-50 border-red-400 font-bold dark:bg-red-950/40' : 'opacity-60'
                }`}>
                  <span className="text-red-800 dark:text-red-300 font-bold">{t('scoreRangeLow', language)}</span>
                  <span className="text-slate-700 dark:text-slate-300">{t('resultLow', language)}</span>
                </div>
              </div>
            </div>

            {/* Block Breakdown */}
            <div className="text-left bg-slate-50/70 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-2xl mx-auto">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm font-poppins">
                {t('blockBreakdown', language)}
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
                          {t('quizBlock' + block.id + 'Title', language)}
                        </span>
                        <span className="text-[#0B2447] dark:text-[#E79923] font-bold">
                          {earnedBlockPts} / {maxBlockPts} {t('quizPts', language)} ({blockPercentage}%)
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
                {t('retakeTest', language)}
              </button>
            </div>
          </div>

          {/* General Recommendations Section (Page 9 of PDF) */}
          <div className="bg-white dark:bg-[#0e1a2b] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-poppins flex items-center gap-2">
                <Compass className="w-6 h-6 text-[#E79923]" />
                {t('generalRecommendations', language)}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>{t('reco1', language)}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>{t('reco2', language)}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>{t('reco3', language)}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>{t('reco4', language)}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F1E8]/60 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 md:col-span-2">
                <HeartHandshake className="w-5 h-5 text-[#E79923] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  <strong>{t('reco5', language)}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Book Call to Action / Advisory Banner (Page 9 of PDF) */}
          <div className="bg-[#0B2447] text-white p-6 md:p-10 rounded-3xl border border-[#0B2447] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#E79923]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-3xl relative z-10">
              <span className="text-[#E79923] text-xs font-extrabold uppercase tracking-widest bg-[#E79923]/10 px-3.5 py-1 rounded-full border border-[#E79923]/20">
                {t('professionalBackup', language)}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold font-poppins text-white leading-snug">
                {t('quizCTATitle', language)}
              </h3>
              <p className="text-[#8FAFB3] text-sm md:text-base leading-relaxed">
                {t('quizDisclaimer', language)}
              </p>
            </div>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 relative z-10 text-xs">
              <a
                href={`https://wa.me/${EBOOK_METADATA.contact.phone}?text=${encodeURIComponent(t('whatsappMsgQuiz', language))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-xl font-bold flex items-center gap-2.5 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{t('whatsappContact', language)}</span>
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
                <span>{t('officialWebsite', language)}</span>
              </a>
            </div>

            {/* Final CTA Button */}
            <div className="pt-4 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div>
                <p className="text-white font-extrabold font-poppins text-lg">
                  {t('scheduleAdvisory', language)}
                </p>
                <p className="text-[#8FAFB3] text-xs">
                  {t('scheduleAdvisorySub', language)}
                </p>
              </div>

              <a
                href={`https://wa.me/${EBOOK_METADATA.contact.phone}?text=${encodeURIComponent(t('whatsappMsgQuiz', language) + ' ' + currentScore + '/50 ' + t('quizPoints', language))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#E79923] hover:bg-amber-400 text-[#0B2447] font-black px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all font-poppins"
              >
                {t('scheduleMyAdvisory', language)}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
