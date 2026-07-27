import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChapterViewer } from './components/ChapterViewer';
import { CountryComparer } from './components/CountryComparer';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ChecklistTool } from './components/ChecklistTool';
import { ReadinessQuiz } from './components/ReadinessQuiz';
import { JobSearchPlanner } from './components/JobSearchPlanner';
import { OfficialResources } from './components/OfficialResources';
import { AIConsultantChat } from './components/AIConsultantChat';
import { LoginScreen } from './components/LoginScreen';
import { EBOOK_METADATA } from './data/ebookData';
import { Phone, Instagram, Mail, Sparkles } from 'lucide-react';
import customMigranteLogo from './assets/images/asesorias_migrante_custom_logo_1784912635483.jpg';

import { getAppLanguage } from './utils/i18n';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ebook');
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [aiInitialMessage, setAiInitialMessage] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => getAppLanguage());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('migrante_auth');
  });

  useEffect(() => {
    const handleLangChange = () => {
      setCurrentLanguage(getAppLanguage());
    };
    window.addEventListener('languagechange', handleLangChange);
    return () => window.removeEventListener('languagechange', handleLangChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenAIChatWithMessage = (msg: string) => {
    setAiInitialMessage(msg);
    setIsAIChatOpen(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('migrante_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={() => setIsAuthenticated(true)}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-lato ${
      isDarkMode
        ? 'dark bg-[#0a121d] text-[#e2e8f0] selection:bg-[#E79923] selection:text-[#0B2447]'
        : 'bg-[#F5F1E8] text-[#2B2B2B] selection:bg-[#E79923] selection:text-[#0B2447]'
    }`}>
      {/* Top Header & Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIChat={() => {
          setAiInitialMessage('');
          setIsAIChatOpen(true);
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'ebook' && (
          <ChapterViewer onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={currentLanguage} />
        )}

        {activeTab === 'countries' && (
          <CountryComparer onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={currentLanguage} />
        )}

        {activeTab === 'budget' && (
          <BudgetCalculator onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={currentLanguage} />
        )}

        {activeTab === 'checklist' && (
          <ChecklistTool onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={currentLanguage} />
        )}

        {activeTab === 'quiz' && (
          <ReadinessQuiz onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={currentLanguage} />
        )}

        {activeTab === 'jobplan' && (
          <JobSearchPlanner onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={currentLanguage} />
        )}

        {activeTab === 'resources' && (
          <OfficialResources currentLanguage={currentLanguage} />
        )}
      </main>

      {/* Footer in Brand Primary #0B2447 */}
      <footer className="bg-[#0B2447] text-[#8FAFB3] text-xs border-t border-[#0B2447] py-10 px-4 font-lato">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#8FAFB3]/20 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B2447] p-0.5 border border-[#E79923] flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src={customMigranteLogo}
                  alt="Logo Asesorías al Migrante"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base font-poppins">Asesorías al Migrante</h3>
                <p className="text-[#8FAFB3] text-xs">
                  {EBOOK_METADATA.title} — Por {EBOOK_METADATA.author}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[#F5F1E8]/90">
              <a href={`tel:${EBOOK_METADATA.contact.phone}`} className="hover:text-[#E79923] transition-colors flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> {EBOOK_METADATA.contact.phone}
              </a>
              <a href={`https://instagram.com/${EBOOK_METADATA.contact.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-[#E79923] transition-colors flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5" /> {EBOOK_METADATA.contact.instagram}
              </a>
              <a href={`mailto:${EBOOK_METADATA.contact.email}`} className="hover:text-[#E79923] transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {EBOOK_METADATA.contact.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-[#8FAFB3]/80 text-[11px]">
            <p>
              © {new Date().getFullYear()} Asesorías al Migrante. Todos los derechos reservados.
            </p>
            <p>
              Información educativa y de guía basada en la obra oficial de Daniela Harrington.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating AI Consultant Assistant Trigger (Mobile/Desktop FAB) */}
      <button
        onClick={() => {
          setAiInitialMessage('');
          setIsAIChatOpen(true);
        }}
        className="fixed bottom-4 right-4 z-40 bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] font-bold p-2.5 sm:px-3.5 sm:py-2 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-[#0B2447] font-poppins"
        title="Consultar con Asesora Virtual"
        id="fab-ai-chat"
      >
        <Sparkles className="w-4 h-4 fill-[#0B2447]" />
        <span className="hidden sm:inline text-[11px] font-extrabold uppercase tracking-wide">
          Asesora IA
        </span>
      </button>

      {/* AI Consultant Drawer Modal */}
      <AIConsultantChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        initialMessage={aiInitialMessage}
      />
    </div>
  );
}
