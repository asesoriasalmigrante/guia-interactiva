'use client';

import React, { useState } from 'react';
import { Compass, BookOpen, Globe2, Calculator, CheckSquare, BrainCircuit, Briefcase, Sun, Moon, LogOut, ChevronDown, ChevronUp, Languages, Check, ShieldCheck, Calendar } from 'lucide-react';
const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';
import { WORLD_LANGUAGES, LanguageOption, t } from '../utils/i18n';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAIChat: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAIChat,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [showTranslationToast, setShowTranslationToast] = useState<boolean>(false);

  const selectedLang = WORLD_LANGUAGES.find((l) => l.code === language) || WORLD_LANGUAGES[0];

  const handleSelectLanguage = (lang: LanguageOption) => {
    setLanguage(lang.code);
    setIsLangDropdownOpen(false);
    setShowTranslationToast(true);
    setTimeout(() => {
      setShowTranslationToast(false);
    }, 4000);
  };

  const navItems = [
    { id: 'ebook', label: t('navEbook', language), icon: BookOpen },
    { id: 'countries', label: t('navCountries', language), icon: Globe2 },
    { id: 'budget', label: t('navBudget', language), icon: Calculator },
    { id: 'checklist', label: t('navChecklist', language), icon: CheckSquare },
    { id: 'quiz', label: t('navQuiz', language), icon: BrainCircuit },
    { id: 'jobplan', label: t('navJobplan', language), icon: Briefcase },
    { id: 'resources', label: t('navResources', language), icon: Compass },
    { id: 'kit', label: t('navKit', language), icon: ShieldCheck },
    { id: 'plan90', label: t('navPlan90', language), icon: Calendar },
  ];

  const activeNavItem = navItems.find((item) => item.id === activeTab) || navItems[0];
  const ActiveIcon = activeNavItem.icon;

  return (
    <header className="bg-[#0B2447] text-white border-b border-[#0B2447]/80 sticky top-0 z-40 shadow-lg font-lato">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B2447] p-0.5 border-2 border-[#E79923]/80 shadow-lg flex-shrink-0 overflow-hidden group hover:scale-105 transition-transform">
              <img
                src={customMigranteLogo}
                alt="Logo - Asesorías al Migrante"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight font-poppins">
                  {t('appTitle', language)}
                </h1>
                <span className="text-[10px] bg-[#8FAFB3]/20 text-[#8FAFB3] border border-[#8FAFB3]/30 px-2 py-0.5 rounded-full font-normal hidden sm:inline">
                  {t('appBadge', language)}
                </span>

                <button
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border bg-[#081b36] border-[#8FAFB3]/30 hover:border-[#E79923] text-[#F5F1E8] shadow-xs hover:scale-105 active:scale-95"
                  title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
                  id="toggle-reading-mode-btn"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#E79923]" />
                      <span className="text-[11px]">Claro</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#8FAFB3]" />
                      <span className="text-[11px]">Oscuro</span>
                    </>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border bg-[#081b36] border-[#8FAFB3]/30 hover:border-[#E79923] text-[#F5F1E8] shadow-xs hover:scale-105 active:scale-95"
                    title="Seleccionar idioma"
                    id="btn-language-selector"
                    aria-expanded={isLangDropdownOpen}
                  >
                    <Languages className="w-3.5 h-3.5 text-[#E79923]" />
                    <span className="text-[11px] font-bold flex items-center gap-1">
                      <span>{selectedLang.flag}</span>
                      <span>{selectedLang.code.toUpperCase()}</span>
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#8FAFB3]" />
                  </button>

                  {isLangDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsLangDropdownOpen(false)}
                      ></div>
                      <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-64 bg-[#081a33] border border-[#8FAFB3]/30 rounded-2xl shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl animate-fadeIn max-h-80 overflow-y-auto">
                        <div className="px-3 py-1.5 border-b border-[#8FAFB3]/20 text-[10px] uppercase font-bold text-[#8FAFB3] tracking-wider flex items-center justify-between">
                          <span>15 Idiomas Mundiales</span>
                          <span className="text-[9px] text-[#E79923] lowercase">multilingüe</span>
                        </div>
                        {WORLD_LANGUAGES.map((lang) => {
                          const isSelected = lang.code === language;
                          return (
                            <button
                              key={lang.code}
                              onClick={() => handleSelectLanguage(lang)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#E79923] text-[#0B2447] font-bold shadow-xs'
                                  : 'text-slate-200 hover:bg-[#0c264a] hover:text-white'
                              }`}
                              id={`lang-option-${lang.code}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base">{lang.flag}</span>
                                <div className="text-left">
                                  <div className="text-xs">{lang.name}</div>
                                  <div className={`text-[10px] ${isSelected ? 'text-[#0B2447]/80' : 'text-[#8FAFB3]'}`}>
                                    {lang.nativeName}
                                  </div>
                                </div>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-[#0B2447]" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border bg-rose-950/40 border-rose-500/30 hover:bg-rose-900/60 text-rose-200 shadow-xs hover:scale-105 active:scale-95 ml-0.5"
                    title={t('logoutBtn', language)}
                    id="btn-logout-header"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px]">{t('logoutBtn', language)}</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#8FAFB3]">{t('appSub', language)}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-[#081b36] border-t border-[#8FAFB3]/20 relative transition-all"
        onMouseEnter={() => setIsNavOpen(true)}
        onMouseLeave={() => setIsNavOpen(false)}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center justify-between gap-2 w-full text-left py-0.5 cursor-pointer group"
            id="btn-toggle-nav-dropdown"
            aria-expanded={isNavOpen}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[10px] sm:text-xs text-[#8FAFB3] uppercase font-bold tracking-wider flex-shrink-0">
                {t('activeSectionLabel', language)}:
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E79923]/20 border border-[#E79923]/50 text-[#E79923] rounded-lg font-extrabold text-xs truncate group-hover:bg-[#E79923]/30 transition-colors">
                <ActiveIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{activeNavItem.label}</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#8FAFB3] group-hover:text-white transition-colors flex-shrink-0">
              <span className="hidden md:inline text-[10px]">Pasa el cursor o toca para cambiar</span>
              <span className="md:hidden text-[10px] font-semibold text-[#E79923]">Cambiar</span>
              {isNavOpen ? (
                <ChevronUp className="w-4 h-4 text-[#E79923] animate-bounce" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#E79923]" />
              )}
            </div>
          </button>
        </div>

        {isNavOpen && (
          <div className="bg-[#06152b] border-t border-[#8FAFB3]/20 px-3 sm:px-4 py-3 shadow-2xl animate-fadeIn">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-start sm:justify-center lg:justify-start gap-1.5 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsNavOpen(false);
                    }}
                    id={`nav-tab-${item.id}`}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-poppins transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#E79923] text-[#0B2447] font-extrabold border-[#E79923] shadow-md scale-102'
                        : 'text-[#F5F1E8]/90 hover:text-white hover:bg-[#0B2447] border border-[#8FAFB3]/20 hover:border-[#8FAFB3]/50 font-medium'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${isActive ? 'text-[#0B2447]' : 'text-[#E79923]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {showTranslationToast && (
        <div className="fixed top-16 right-4 z-50 bg-[#0B2447] text-white border-2 border-[#E79923] p-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm animate-bounce">
          <div className="text-2xl">{selectedLang.flag}</div>
          <div>
            <div className="text-xs font-extrabold font-poppins text-[#E79923]">
              Idioma: {selectedLang.name}
            </div>
            <div className="text-[11px] text-[#8FAFB3]">
              {selectedLang.nativeName} ({selectedLang.code.toUpperCase()})
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
