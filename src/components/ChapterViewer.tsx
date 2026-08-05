import React, { useState, useEffect } from 'react';
import { CHAPTERS, EBOOK_METADATA, COUNTRIES_DATA } from '../data/ebookData';
import { BookOpen, Search, ArrowLeft, ArrowRight, Lightbulb, AlertTriangle, CheckCircle2, ChevronRight, ChevronDown, ChevronUp, Instagram, MessageCircle, Globe2, DollarSign, FileCheck2, CheckCircle, Loader2, Languages } from 'lucide-react';
import { t, translateChapterWithAI, WORLD_LANGUAGES } from '../utils/i18n';
import { useLanguage } from '@/src/contexts/LanguageContext';

const TikTokIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-.87-.43z" />
  </svg>
);

interface ChapterViewerProps {
}

// Helper function to render text with **bold** markup
const renderFormattedText = (text: string, strongClassName?: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className={strongClassName || "font-extrabold text-[#0B2447] dark:text-[#F3B244]"}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const ChapterViewer: React.FC<ChapterViewerProps> = () => {
  const { language } = useLanguage();
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isIndexOpen, setIsIndexOpen] = useState<boolean>(false);
  
  const rawChapter = CHAPTERS.find(c => c.id === selectedChapterId) || CHAPTERS[0];
  const [displayChapter, setDisplayChapter] = useState<any>(rawChapter);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const langCode = language;

  useEffect(() => {
    const chapterToTranslate = CHAPTERS.find(c => c.id === selectedChapterId) || CHAPTERS[0];
    if (langCode === 'es') {
      setDisplayChapter(chapterToTranslate);
      setIsTranslating(false);
      return;
    }

    let isMounted = true;
    setIsTranslating(true);

    translateChapterWithAI(chapterToTranslate, langCode)
      .then((translated) => {
        if (isMounted) {
          setDisplayChapter(translated);
          setIsTranslating(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setDisplayChapter(chapterToTranslate);
          setIsTranslating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedChapterId, langCode]);

  const activeLangObj = WORLD_LANGUAGES.find(l => l.code === langCode) || WORLD_LANGUAGES[0];

  const filteredChapters = CHAPTERS.filter(ch =>
    ch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ch.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ch.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (selectedChapterId < CHAPTERS.length) {
      setSelectedChapterId(selectedChapterId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (selectedChapterId > 1) {
      setSelectedChapterId(selectedChapterId - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-lato">
      {/* Intro Banner with Brand Primary (#0B2447) */}
      <div className="bg-[#0B2447] rounded-2xl p-6 md:p-8 text-white shadow-xl mb-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E79923]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#E79923]/20 text-[#E79923] border border-[#E79923]/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 font-poppins">
            <BookOpen className="w-3.5 h-3.5" />
            {t('interactiveReadingBadge', language)}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 font-poppins text-white">
            {t('ebookTitle', language)}
          </h2>
          <p className="text-[#F5F1E8]/90 text-sm md:text-base leading-relaxed mb-6">
            {t('ebookDescription', language)} <strong className="text-[#E79923]">{EBOOK_METADATA.author}</strong>, {t('authorRoleInEbook', language)}
          </p>
          
          <div className="flex flex-wrap gap-3 text-xs text-[#8FAFB3]">
            <span className="bg-[#081b36] px-3 py-1.5 rounded-xl border border-[#8FAFB3]/20">
              📖 {CHAPTERS.length} {t('completeChapters', language)}
            </span>
            <span className="bg-[#081b36] px-3 py-1.5 rounded-xl border border-[#8FAFB3]/20">
              ⚖️ {t('legalAdvice', language)}
            </span>
            <span className="bg-[#081b36] px-3 py-1.5 rounded-xl border border-[#8FAFB3]/20">
              💡 {t('realExperience', language)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Collapsible Sidebar Chapter Index */}
        <div className="lg:col-span-4 space-y-4">
          <div 
            className="bg-white dark:bg-[#152338] rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md sticky top-20 z-20 transition-all"
            onMouseEnter={() => setIsIndexOpen(true)}
            onMouseLeave={() => setIsIndexOpen(false)}
          >
            {/* Collapsible Header Button */}
            <button
              onClick={() => setIsIndexOpen(!isIndexOpen)}
              className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-none"
              id="btn-toggle-chapter-index"
              aria-expanded={isIndexOpen}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="w-9 h-9 rounded-xl bg-[#0B2447] text-[#E79923] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#0B2447] dark:text-[#E79923] text-sm md:text-base font-poppins">
                      {t('chapterIndexTitle', langCode)}
                    </h3>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex-shrink-0">
                      {CHAPTERS.length} {t('chapterOf', language)}.
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {t('chapterTitle', language)}. {displayChapter.id}: <strong className="text-[#0B2447] dark:text-slate-200 font-semibold">{displayChapter.title}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#0B2447] dark:text-[#E79923] font-bold flex-shrink-0 bg-[#E79923]/20 border border-[#E79923]/40 px-2.5 py-1.5 rounded-xl group-hover:bg-[#E79923] group-hover:text-[#0B2447] transition-all">
                <span className="hidden sm:inline font-poppins">{isIndexOpen ? t('btnCollapse', langCode) : t('btnExpand', langCode)}</span>
                {isIndexOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {/* Collapsible Content Area */}
            {isIndexOpen && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-fadeIn">
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('searchPlaceholder', langCode)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E79923] bg-slate-50 dark:bg-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                  />
                </div>

                {/* Chapter List */}
                <div className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1">
                  {filteredChapters.map((ch) => {
                    const isActive = ch.id === selectedChapterId;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setSelectedChapterId(ch.id);
                          setIsIndexOpen(false); // Auto-collapse to reveal reading area
                        }}
                        id={`chapter-item-${ch.id}`}
                        className={`w-full text-left p-2.5 rounded-xl text-xs md:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#0B2447] dark:bg-[#E79923] text-white dark:text-[#0B2447] font-bold shadow-md'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium'
                        }`}
                      >
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center mt-0.5 ${
                          isActive
                            ? 'bg-[#E79923] dark:bg-[#0B2447] text-[#0B2447] dark:text-[#E79923]'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {ch.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate font-poppins">{ch.title}</div>
                          <div className={`text-[10px] truncate ${
                            isActive
                              ? 'text-[#8FAFB3] dark:text-[#0B2447]/80'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}>
                            {ch.category} • {ch.readTime}
                          </div>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 mt-1 ${
                          isActive
                            ? 'text-[#E79923] dark:text-[#0B2447]'
                            : 'text-slate-400 dark:text-slate-500'
                        }`} />
                      </button>
                    );
                  })}

                  {filteredChapters.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                      {t('noChaptersFound', language)} "{searchTerm}".
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chapter Reader Main Area */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-[#152338] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-6 md:p-8 space-y-6">
            {/* Header / Meta */}
            <div className="border-b border-slate-100 dark:border-slate-800 pb-6 space-y-3">
              {isTranslating && (
                <div className="flex items-center gap-2 bg-[#E79923]/15 border border-[#E79923]/40 text-[#0B2447] dark:text-[#E79923] px-3.5 py-2 rounded-xl text-xs font-bold animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-[#E79923]" />
                  <span>{t('translatingTo', language)} {activeLangObj.name} ({activeLangObj.nativeName})...</span>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-[#0B2447] text-[#E79923] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider font-poppins">
                  {t('chapterTitle', language)} {displayChapter.id} • {displayChapter.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  ⏱️ {t('estimatedTime', language)} {displayChapter.readTime}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B2447] dark:text-white tracking-tight leading-tight font-poppins">
                {displayChapter.title}
              </h2>

              <p className="text-[#2B2B2B] dark:text-slate-200 text-base leading-relaxed italic bg-[#F5F1E8] dark:bg-slate-800/70 border-l-4 border-[#E79923] p-4 rounded-r-xl">
                "{displayChapter.summary}"
              </p>
            </div>

            {/* Author Profile Feature Card for Chapter 1 */}
            {(displayChapter.id === 1 || displayChapter.authorImage) && (
              <div className="bg-gradient-to-br from-[#0B2447] to-[#12315e] text-white rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col md:flex-row items-center gap-6 my-2">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-[#E79923] shadow-lg bg-slate-800">
                    <img 
                      src={displayChapter.authorImage || EBOOK_METADATA.authorImage} 
                      alt={t('altDaniela', language)}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      id="author-portrait-img"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-[#E79923] text-[#0B2447] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md font-poppins">
                    {t('verified', language)}
                  </span>
                </div>

                <div className="space-y-2 text-center md:text-left flex-1">
                  <div className="inline-block bg-[#E79923]/20 text-[#E79923] border border-[#E79923]/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
                    {t('authorFounder', language)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white font-poppins">
                    Daniela Harrington
                  </h3>
                  <p className="text-xs md:text-sm text-slate-300 font-medium">
                    {t('authorTitle', language)} <span className="text-[#E79923] font-semibold">{t('companyName', language)}</span>
                  </p>
                  <p className="text-xs text-slate-300 italic pt-1 border-t border-slate-700/60 max-w-xl">
                    "{t('authorQuote', language)}"
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <a 
                      href={`https://instagram.com/${EBOOK_METADATA.contact.instagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all border border-white/20"
                      id="author-instagram-link"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#E79923]" />
                      {EBOOK_METADATA.contact.instagram}
                    </a>
                    <a 
                      href={EBOOK_METADATA.contact.tiktok} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all border border-white/20"
                      id="author-tiktok-link"
                    >
                      <TikTokIcon className="w-3.5 h-3.5 text-[#E79923]" />
                      {EBOOK_METADATA.contact.tiktokHandle}
                    </a>
                    <a 
                      href={`https://wa.me/5492235173127?text=${encodeURIComponent(t('whatsappMessage', language))}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 bg-[#E79923] hover:brightness-105 text-[#0B2447] text-xs font-bold px-3 py-1.5 rounded-lg transition-all font-poppins"
                      id="author-whatsapp-link"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {t('contactWhatsApp', language)}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Key Points Summary Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <h3 className="font-bold text-[#0B2447] dark:text-[#E79923] text-sm uppercase tracking-wider flex items-center gap-2 font-poppins">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {t('chapterKeyPoints', language)}
              </h3>
              <ul className="space-y-2">
                {displayChapter.keyPoints?.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-[#2B2B2B] dark:text-slate-200">
                    <span className="text-[#E79923] font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning Alert if present */}
            {displayChapter.warningAlert && (
              <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 text-rose-900 dark:text-rose-200 flex items-start gap-3 text-xs md:text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-1 font-poppins">{t('importantWarning', language)}</strong>
                  <span>{displayChapter.warningAlert}</span>
                </div>
              </div>
            )}

            {/* Main Sections Content */}
            <div className="space-y-8 pt-2">
              {displayChapter.sections?.map((section: any, idx: number) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-[#0B2447] dark:text-[#E79923] font-poppins border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center justify-between gap-2">
                    <span>{section.heading}</span>
                  </h3>

                  {/* Section Contextual Image if present */}
                  {section.imageUrl && (
                    <div className="my-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-md group">
                      <div className="relative aspect-16/9 md:aspect-21/9 bg-slate-900 overflow-hidden">
                        <img 
                          src={section.imageUrl} 
                          alt={section.imageCaption || section.heading}
                          className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                        {section.imageCaption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3.5 md:p-4 text-xs md:text-sm text-slate-100 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E79923] shrink-0" />
                            <span>{section.imageCaption}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {renderFormattedText(section.content)}
                  </p>

                  {section.bulletPoints && (
                    <ul className="space-y-2 pl-4 list-disc marker:text-[#E79923] text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      {section.bulletPoints.map((bp: string, bidx: number) => (
                        <li key={bidx}>{renderFormattedText(bp)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Interactive 3-Country Comparison Sample Box for Chapter 3 */}
            {displayChapter.id === 3 && (
              <div className="my-8 p-5 md:p-6 bg-slate-50 dark:bg-[#0b1728] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-[#E79923]/20 text-[#E79923] border border-[#E79923]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-poppins mb-1">
                      <Globe2 className="w-3.5 h-3.5" />
                      {t('countryComparatorExample', language)}
                    </div>
                    <h4 className="text-lg md:text-xl font-extrabold text-[#0B2447] dark:text-[#F3B244] font-poppins">
                      {t('directComparison', language)}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
                      {t('comparisonDescription', language)}
                    </p>
                  </div>

                </div>

                {/* 3 Country Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {COUNTRIES_DATA.filter(c => ['espana', 'canada', 'alemania'].includes(c.id)).map((c) => (
                    <div 
                      key={c.id}
                      className="bg-white dark:bg-[#101d30] rounded-2xl border border-slate-200 dark:border-slate-700/80 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      {/* Card Header */}
                      <div className="space-y-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl" role="img" aria-label={c.name}>{c.flag}</span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-poppins">
                            {c.region}
                          </span>
                        </div>
                        <h5 className="text-lg font-bold text-[#0B2447] dark:text-[#F3B244] font-poppins">
                          {c.name}
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {c.languages.map((lang, lidx) => (
                            <span key={lidx} className="text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-md">
                              🗣️ {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Indicators */}
                      <div className="space-y-3 text-xs flex-1">
                        {/* Cost of Living */}
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl space-y-0.5">
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 font-poppins">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            {t('monthlyCostEstimate', language)}
                          </div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                            {c.monthlyCostEstimate}
                          </div>
                        </div>

                        {/* Visa Ease & Details */}
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl space-y-0.5">
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 font-poppins">
                            <FileCheck2 className="w-3.5 h-3.5 text-[#E79923]" />
                            {t('visaEase', language)} <span className="text-[#0B2447] dark:text-[#F3B244] font-extrabold ml-1">{c.visaEase}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                            {c.visaDetails}
                          </p>
                        </div>

                        {/* Demanded Jobs */}
                        <div className="space-y-1">
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold font-poppins">
                            💼 {t('demandedProfessions', language)}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {c.demandedProfessions.slice(0, 3).map((job, jidx) => (
                              <span key={jidx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                                {job}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Pros */}
                        <div className="space-y-1 pt-1">
                          <div className="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold font-poppins flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {t('keyAdvantages', language)}
                          </div>
                          <ul className="space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
                            {c.keyPros.slice(0, 2).map((pro, pidx) => (
                              <li key={pidx} className="flex items-start gap-1">
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    💡 {t('danielaAdvice', language)}
                  </p>
                </div>
              </div>
            )}

            {/* Daniela Harrington Tip Box */}
            <div className="bg-[#0B2447] dark:bg-[#08172e] text-white rounded-2xl p-6 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-[#E79923] text-xs font-bold uppercase tracking-wider font-poppins">
                <Lightbulb className="w-4 h-4 text-[#E79923]" />
                {t('danielaTipTitle', language)}
              </div>
              <p className="text-sm md:text-base text-[#F5F1E8] italic leading-relaxed">
                "{renderFormattedText(displayChapter.danielaTip, "font-extrabold text-[#E79923]")}"
              </p>
            </div>

            {/* Chapter Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={selectedChapterId === 1}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all font-poppins cursor-pointer ${
                  selectedChapterId === 1
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B2447] dark:text-slate-200'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                {t('btnPrev', langCode)}
              </button>

              <button
                onClick={handleNext}
                disabled={selectedChapterId === CHAPTERS.length}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all font-poppins cursor-pointer ${
                  selectedChapterId === CHAPTERS.length
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'bg-[#0B2447] hover:bg-slate-800 text-white'
                }`}
              >
                {t('btnNext', langCode)}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
