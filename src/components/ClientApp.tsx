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
import { KitEmergencia } from '@/src/components/KitEmergencia';
import { Plan90Dias } from '@/src/components/Plan90Dias';
import { EBOOK_METADATA } from '@/src/data/ebookData';
import { Phone, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';

export default function ClientApp() {
  const router = useRouter();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('ebook');
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
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'ebook' && (
          <ChapterViewer />
        )}
        {activeTab === 'countries' && (
          <CountryComparer />
        )}
        {activeTab === 'budget' && (
          <BudgetCalculator />
        )}
        {activeTab === 'checklist' && (
          <ChecklistTool />
        )}
        {activeTab === 'quiz' && (
          <ReadinessQuiz />
        )}
        {activeTab === 'jobplan' && (
          <JobSearchPlanner />
        )}
        {activeTab === 'resources' && (
          <OfficialResources />
        )}
        {activeTab === 'kit' && (
          <KitEmergencia />
        )}
        {activeTab === 'plan90' && (
          <Plan90Dias />
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
                  {EBOOK_METADATA.title} — {t('footerCredit', language).replace('Asesorías al Migrante — ', '').replace('Migration Advisory — ', '')}
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
            <p>&copy; {new Date().getFullYear()} {t('footerCredit', language)}</p>
            <p>Información educativa y de guía basada en la obra oficial de Daniela Harrington.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
