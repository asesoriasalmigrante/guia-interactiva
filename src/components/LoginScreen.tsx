'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, KeyRound, Luggage, Plane, Building2, Languages, Check, ChevronDown, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { EBOOK_METADATA } from '../data/ebookData';
import { createClient } from '@/lib/supabase/client';
const migrationBgImg = '/images/migration_three_phases_1784911692499.jpg';
const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';
import { WORLD_LANGUAGES, LanguageOption, t } from '../utils/i18n';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function LoginScreen() {
  const { language, setLanguage } = useLanguage();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotSent, setForgotSent] = useState<boolean>(false);
  const [forgotError, setForgotError] = useState<string>('');
  const [forgotLoading, setForgotLoading] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    if (errorParam === 'account_disabled') {
      setError('Tu cuenta ha sido desactivada. Contacta al administrador.');
    }
  }, []);

  const selectedLang = WORLD_LANGUAGES.find((l) => l.code === language) || WORLD_LANGUAGES[0];

  const handleSelectLanguage = (lang: LanguageOption) => {
    setLanguage(lang.code);
    setIsLangDropdownOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }

    if (!password.trim()) {
      setError('Por favor ingresa tu clave de acceso.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        if (authError.message.includes('Invalid login')) {
          setError('Correo o contraseña incorrectos. Si no tienes cuenta, contacta al administrador.');
        } else {
          setError(authError.message);
        }
        setIsLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_active, subscription_status')
          .eq('id', user.id)
          .single();

        if (profile && !profile.is_active) {
          await supabase.auth.signOut();
          setError('Tu cuenta ha sido desactivada. Contacta al administrador.');
          setIsLoading(false);
          return;
        }

        if (profile && profile.subscription_status === 'inactive') {
          window.location.href = '/payment';
          return;
        }
      }

      window.location.href = '/';
    } catch (err: any) {
      setError('Error al conectar con el servidor. Intenta nuevamente.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    if (!forgotEmail.trim()) {
      setForgotError('Por favor ingresa tu correo electrónico.');
      return;
    }

    setForgotLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${window.location.origin}/auth/confirm?type=recovery`,
      });

      if (resetError) {
        setForgotError(resetError.message);
      } else {
        setForgotSent(true);
      }
    } catch (err: any) {
      setForgotError('Error al enviar el correo. Intenta nuevamente.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-lato relative overflow-hidden bg-slate-950 text-white">
      {/* 3-Phase Background Image with dark vignette overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={migrationBgImg}
          alt="Tres fases de la migración: preparación, aeropuerto y nuevo país"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.1] scale-105"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2447]/80 via-[#0B2447]/70 to-[#061326]/90 backdrop-blur-[2px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6 my-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0B2447] p-1 border-2 border-[#E79923] shadow-2xl ring-4 ring-[#E79923]/30 mb-1 overflow-hidden">
            <img
              src={customMigranteLogo}
              alt="Logo Asesorías al Migrante"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-poppins text-white tracking-tight drop-shadow-md">
              {EBOOK_METADATA.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#A2C7CC] font-medium mt-1">
              {EBOOK_METADATA.subtitle}
            </p>
          </div>

          {/* 3 Phases Indicator Pill Strip */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="bg-[#0B2447]/80 border border-amber-400/30 rounded-xl p-2 flex flex-col items-center justify-center text-center backdrop-blur-md">
              <Luggage className="w-4 h-4 text-[#E79923] mb-1" />
              <span className="text-[10px] font-extrabold text-amber-200">1. Preparación</span>
              <span className="text-[9px] text-slate-300">Armando equipaje</span>
            </div>
            <div className="bg-[#0B2447]/80 border border-sky-400/30 rounded-xl p-2 flex flex-col items-center justify-center text-center backdrop-blur-md">
              <Plane className="w-4 h-4 text-sky-400 mb-1" />
              <span className="text-[10px] font-extrabold text-sky-200">2. El Viaje</span>
              <span className="text-[9px] text-slate-300">En el aeropuerto</span>
            </div>
            <div className="bg-[#0B2447]/80 border border-emerald-400/30 rounded-xl p-2 flex flex-col items-center justify-center text-center backdrop-blur-md">
              <Building2 className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-[10px] font-extrabold text-emerald-200">3. Nuevo País</span>
              <span className="text-[9px] text-slate-300">Llegada y metas</span>
            </div>
          </div>
        </div>

        {/* Language selector bar */}
        <div className="flex justify-center">
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border bg-[#0B2447]/90 border-[#8FAFB3]/40 hover:border-[#E79923] text-[#F5F1E8] shadow-lg backdrop-blur-md hover:scale-105 active:scale-95"
              id="btn-login-language-selector"
            >
              <Languages className="w-4 h-4 text-[#E79923]" />
              <span className="text-sm">{selectedLang.flag}</span>
              <span>{selectedLang.name} ({selectedLang.code.toUpperCase()})</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8FAFB3]" />
            </button>

            {isLangDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)}></div>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#081a33] border border-[#8FAFB3]/40 rounded-2xl shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl animate-fadeIn max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 border-b border-[#8FAFB3]/20 text-[10px] uppercase font-bold text-[#8FAFB3] tracking-wider flex items-center justify-between">
                    <span>15 Idiomas / Languages</span>
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
        </div>

        {/* Login Card */}
        <div className="bg-[#0c2345]/85 backdrop-blur-xl border border-[#8FAFB3]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-[#8FAFB3]/20 pb-4">
            <h2 className="text-lg font-bold font-poppins text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E79923]" />
              {view === 'login'
                ? t('loginGuideTitle', language)
                : 'Recuperar Contraseña'}
            </h2>
            <p className="text-xs text-[#A2C7CC] mt-1">
              {view === 'login'
                ? 'Ingresa tu correo y clave para acceder a todos los capítulos y herramientas.'
                : 'Ingresa tu correo electrónico para recibir instrucciones de recuperación.'}
            </p>
          </div>

          {/* Login Form */}
          {view === 'login' && (
            <>
              {error && (
                <div className="bg-rose-500/20 border border-rose-500/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-100 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A2C7CC]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#06152b]/90 border border-[#8FAFB3]/30 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                      id="input-email"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    {t('passwordLabel', language)}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A2C7CC]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa tu clave"
                      className="w-full pl-10 pr-10 py-3 bg-[#06152b]/90 border border-[#8FAFB3]/30 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                      id="input-password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A2C7CC] hover:text-white transition-colors cursor-pointer"
                      title={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setView('forgot');
                      setForgotSent(false);
                      setForgotError('');
                      setForgotEmail(email);
                    }}
                    className="text-xs text-[#8FAFB3] hover:text-[#E79923] transition-colors cursor-pointer font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#E79923] hover:bg-[#f0a835] active:scale-[0.99] text-[#0B2447] font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-poppins mt-2 disabled:opacity-70"
                  id="btn-login-submit"
                >
                  {isLoading ? (
                    <span className="inline-block w-5 h-5 border-2 border-[#0B2447] border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Ingresar a la Guía</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Info: Admin creates users */}
              <div className="pt-2 border-t border-[#8FAFB3]/20">
                <div className="bg-[#06152b]/80 border border-[#8FAFB3]/25 rounded-xl p-3 text-center">
                  <p className="text-xs text-[#A2C7CC]">
                    Las cuentas son creadas exclusivamente por el administrador.
                  </p>
                  <p className="text-[10px] text-[#8FAFB3]/70 mt-1">
                    Si no tienes acceso, contacta a Asesorías al Migrante.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Forgot Password Form */}
          {view === 'forgot' && (
            <>
              {forgotSent ? (
                <div className="space-y-4 text-center">
                  <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4 flex flex-col items-center gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    <div>
                      <p className="text-sm font-bold text-emerald-200">Correo enviado</p>
                      <p className="text-xs text-emerald-300/80 mt-1">
                        Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="text-xs text-[#8FAFB3] hover:text-[#E79923] transition-colors cursor-pointer font-medium flex items-center gap-1 mx-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Volver al inicio de sesión
                  </button>
                </div>
              ) : (
                <>
                  {forgotError && (
                    <div className="bg-rose-500/20 border border-rose-500/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-rose-100 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
                      <span>{forgotError}</span>
                    </div>
                  )}

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A2C7CC]">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full pl-10 pr-4 py-3 bg-[#06152b]/90 border border-[#8FAFB3]/30 rounded-xl text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                          id="input-forgot-email"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full py-3.5 bg-[#E79923] hover:bg-[#f0a835] active:scale-[0.99] text-[#0B2447] font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-poppins mt-2 disabled:opacity-70"
                      id="btn-forgot-submit"
                    >
                      {forgotLoading ? (
                        <span className="inline-block w-5 h-5 border-2 border-[#0B2447] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar instrucciones</span>
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={() => setView('login')}
                    className="text-xs text-[#8FAFB3] hover:text-[#E79923] transition-colors cursor-pointer font-medium flex items-center gap-1 mx-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Volver al inicio de sesión
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-[#A2C7CC]">
          &copy; {new Date().getFullYear()} Asesorías al Migrante &bull; Por Daniela Harrington
        </p>
      </div>
    </div>
  );
}
