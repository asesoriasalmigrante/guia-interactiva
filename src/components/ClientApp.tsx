'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/src/components/Header';
import { ChapterViewer } from '@/src/components/ChapterViewer';
import { CountryComparer } from '@/src/components/CountryComparer';
import { BudgetCalculator } from '@/src/components/BudgetCalculator';
import { ChecklistTool } from '@/src/components/ChecklistTool';
import { ReadinessQuiz } from '@/src/components/ReadinessQuiz';
import { JobSearchPlanner } from '@/src/components/JobSearchPlanner';
import { OfficialResources } from '@/src/components/OfficialResources';
import { AIConsultantChat } from '@/src/components/AIConsultantChat';
import { EBOOK_METADATA } from '@/src/data/ebookData';
import { Phone, Instagram, Mail, Sparkles } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';

export default function ClientApp() {
  const router = useRouter();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('ebook');
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [aiInitialMessage, setAiInitialMessage] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, mounted]);

  const handleOpenAIChatWithMessage = (msg: string) => {
    setAiInitialMessage(msg);
    setIsAIChatOpen(true);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E79923] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-lato ${
      isDarkMode
        ? 'dark bg-[#0a121d] text-[#e2e8f0] selection:bg-[#E79923] selection:text-[#0B2447]'
        : 'bg-[#F5F1E8] text-[#2B2B2B] selection:bg-[#E79923] selection:text-[#0B2447]'
    }`}>
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
      />

      <main className="flex-1 pb-16">
        {activeTab === 'ebook' && (
          <ChapterViewer onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={language} />
        )}
        {activeTab === 'countries' && (
          <CountryComparer onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={language} />
        )}
        {activeTab === 'budget' && (
          <BudgetCalculator onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={language} />
        )}
        {activeTab === 'checklist' && (
          <ChecklistTool onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={language} />
        )}
        {activeTab === 'quiz' && (
          <ReadinessQuiz onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={language} />
        )}
        {activeTab === 'jobplan' && (
          <JobSearchPlanner onOpenAIChatWithMessage={handleOpenAIChatWithMessage} currentLanguage={language} />
        )}
        {activeTab === 'resources' && (
          <OfficialResources currentLanguage={language} />
        )}
      </main>

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
            <p>&copy; {new Date().getFullYear()} Asesorías al Migrante. Todos los derechos reservados.</p>
            <p>Información educativa y de guía basada en la obra oficial de Daniela Harrington.</p>
          </div>
        </div>
      </footer>

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
        <span className="hidden sm:inline text-[11px] font-extrabold uppercase tracking-wide">Asesora IA</span>
      </button>

      <AIConsultantChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        initialMessage={aiInitialMessage}
      />
    </div>
  );
}
