import React from 'react';
import { OFFICIAL_RESOURCES, EBOOK_METADATA } from '../data/ebookData';
import { Compass, ExternalLink, ShieldCheck, Phone, Instagram, Mail, Globe } from 'lucide-react';

const TikTokIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-.87-.43z" />
  </svg>
);

interface OfficialResourcesProps {
  currentLanguage?: string;
}

export const OfficialResources: React.FC<OfficialResourcesProps> = ({ currentLanguage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          Directorio Oficial de Consulta (Capítulo 11 del eBook)
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Recursos y Enlaces Oficiales Recomendados
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          Daniela Harrington enfatiza: <em className="text-amber-300">"Las leyes migratorias pueden cambiar en cualquier momento. Siempre debes verificar los requisitos en sitios oficiales y evitar basarte únicamente en rumores."</em>
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OFFICIAL_RESOURCES.map((res, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-amber-500/60 transition-all space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full uppercase">
                  {res.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">{res.category}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                {res.title}
              </h3>

              <div className="text-xs font-bold text-amber-600">
                {res.organization}
              </div>

              <p className="text-slate-600 text-xs leading-relaxed">
                {res.description}
              </p>
            </div>

            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              id={`official-link-${idx}`}
            >
              <span>Visitar Sitio Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Daniela Harrington / Asesorías al Migrante Contact Info Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5" />
          Asesoría Profesional Personalizada con Daniela Harrington
        </div>

        <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-3xl">
          "Expertos en leyes, aliados en tu viaje. Traspasa fronteras con el respaldo correcto." Si deseas una consulta personalizada para analizar tu perfil migratorio, homologaciones o tramitación de visas, puedes contactarnos directamente:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <a
            href={`tel:${EBOOK_METADATA.contact.phone}`}
            className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-slate-700/80 transition-colors"
          >
            <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Teléfono / WhatsApp</div>
              <div className="text-xs font-bold text-white">{EBOOK_METADATA.contact.phone}</div>
            </div>
          </a>

          <a
            href={`https://instagram.com/${EBOOK_METADATA.contact.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-slate-700/80 transition-colors"
          >
            <Instagram className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Instagram Oficial</div>
              <div className="text-xs font-bold text-white">{EBOOK_METADATA.contact.instagram}</div>
            </div>
          </a>

          <a
            href={EBOOK_METADATA.contact.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-slate-700/80 transition-colors"
            id="contact-link-tiktok"
          >
            <TikTokIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">TikTok Oficial</div>
              <div className="text-xs font-bold text-white">{EBOOK_METADATA.contact.tiktokHandle}</div>
            </div>
          </a>

          <a
            href={`mailto:${EBOOK_METADATA.contact.email}`}
            className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 p-3 rounded-xl border border-slate-700/80 transition-colors"
          >
            <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Correo Electrónico</div>
              <div className="text-xs font-bold text-white truncate">{EBOOK_METADATA.contact.email}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
