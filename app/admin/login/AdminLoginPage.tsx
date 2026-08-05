'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '@/src/utils/i18n';

const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';

export default function AdminLoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        if (profile?.role === 'admin') {
          router.push('/admin');
        }
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError(t('fillAllFields', language));
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(t('invalidCredentials', language));
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError(t('userDataError', language));
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        await supabase.auth.signOut();
        setError(t('noAdminPermission', language));
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError(t('connectionError', language));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B2447]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0B2447] p-1 border-2 border-[#E79923] shadow-2xl ring-4 ring-[#E79923]/30 overflow-hidden">
            <img
              src={customMigranteLogo}
              alt="Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <h1 className="text-2xl font-black font-poppins text-white">
            {t('adminPanel', language)}
          </h1>
          <p className="text-xs text-[#8FAFB3]">
            {t('adminAccessOnly', language)}
          </p>
        </div>

        <div className="bg-[#0c2345]/85 backdrop-blur-xl border border-[#8FAFB3]/30 rounded-3xl p-6 shadow-2xl space-y-6">
          {error && (
            <div className="bg-rose-500/20 border border-rose-500/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-100">
              <AlertCircle className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                {t('emailLabel', language)}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8FAFB3]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder', language)}
                  className="w-full pl-10 pr-4 py-3 bg-[#06152b]/90 border border-[#8FAFB3]/30 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                {t('passwordLabel', language)}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8FAFB3]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder', language)}
                  className="w-full pl-10 pr-10 py-3 bg-[#06152b]/90 border border-[#8FAFB3]/30 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8FAFB3] hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#E79923] hover:bg-[#f0a835] active:scale-[0.99] text-[#0B2447] font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-poppins mt-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-[#0B2447] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t('signIn', language)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#8FAFB3]/60">
          &copy; {new Date().getFullYear()} {t('adminFooter', language)}
        </p>
      </div>
    </div>
  );
}
