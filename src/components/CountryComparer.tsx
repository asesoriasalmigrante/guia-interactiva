import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/ebookData';
import { CountryInfo } from '../types';
import { Globe2, ShieldCheck, DollarSign, FileCheck2, AlertCircle, CheckCircle, Sparkles, Filter, Search, X, Check } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';

interface CountryComparerProps {
  onOpenAIChatWithMessage?: (msg: string) => void;
}

export const CountryComparer: React.FC<CountryComparerProps> = ({ onOpenAIChatWithMessage }) => {
  const { language } = useLanguage();
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>(['espana', 'canada', 'alemania']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');

  const toggleCountrySelection = (id: string) => {
    if (selectedCountryIds.includes(id)) {
      if (selectedCountryIds.length > 1) {
        setSelectedCountryIds(selectedCountryIds.filter(c => c !== id));
      }
    } else {
      if (selectedCountryIds.length < 3) {
        setSelectedCountryIds([...selectedCountryIds, id]);
      } else {
        // Replace oldest
        setSelectedCountryIds([selectedCountryIds[1], selectedCountryIds[2], id]);
      }
    }
  };

  const selectedCountries = COUNTRIES_DATA.filter(c => selectedCountryIds.includes(c.id));

  const filteredCountriesList = COUNTRIES_DATA.filter(c => {
    // Region Filter
    if (filterRegion !== 'all' && c.region !== filterRegion) return false;

    // Language Filter
    if (filterLanguage === 'spanish' && !c.languages.some(l => l.includes('Castellano') || l.includes('Español'))) return false;
    if (filterLanguage === 'english' && !c.languages.some(l => l.includes('Inglés'))) return false;
    if (filterLanguage === 'french' && !c.languages.some(l => l.includes('Francés'))) return false;
    if (filterLanguage === 'german' && !c.languages.some(l => l.includes('Alemán'))) return false;

    // Search Query (Name or demanded profession)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchProf = c.demandedProfessions.some(p => p.toLowerCase().includes(q));
      const matchLang = c.languages.some(l => l.toLowerCase().includes(q));
      if (!matchName && !matchProf && !matchLang) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-lato">
      {/* Intro Header in Brand Primary Color (#0B2447) */}
      <div className="bg-[#0B2447] text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[#E79923] text-xs font-bold uppercase tracking-wider font-poppins">
            <Globe2 className="w-4 h-4" />
            Herramienta de Evaluación Migratoria — {COUNTRIES_DATA.length} Países Integrados
          </div>
          <span className="bg-[#8FAFB3]/20 text-[#8FAFB3] border border-[#8FAFB3]/30 px-3 py-1 rounded-full text-xs font-bold">
            {COUNTRIES_DATA.length} Países del Mundo
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-poppins">
          {t('countriesTitle', language)}
        </h2>
        <p className="text-[#F5F1E8]/90 text-sm md:text-base max-w-3xl leading-relaxed">
          Daniela Harrington destaca: <em className="text-[#E79923] font-semibold">"No todos los países son ideales para ti. Evalúa el mercado laboral, idioma, costo de vida, facilidades migratorias y seguridad antes de tomar tu decisión."</em>
        </p>
      </div>

      {/* Comparison Selection & Filters Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-md space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-[#0B2447] text-lg font-poppins flex items-center gap-2">
              <span>Comparando ({selectedCountries.length}/3 países)</span>
            </h3>
            <p className="text-xs text-slate-500">Selecciona o busca cualquier país de la lista de 100+ países para compararlos frente a frente.</p>
          </div>

          {/* Currently Selected Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedCountries.map(c => (
              <span key={c.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0B2447] text-white shadow-xs">
                <span>{c.flag}</span>
                <span>{c.name}</span>
                <button
                  onClick={() => toggleCountrySelection(c.id)}
                  className="ml-1 hover:text-[#E79923] text-slate-300 transition-colors cursor-pointer"
                  title="Quitar de comparación"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            {selectedCountries.length < 3 && (
              <span className="text-xs text-[#E79923] font-bold border border-dashed border-[#E79923] px-3 py-1.5 rounded-xl bg-amber-50">
                + Elige {3 - selectedCountries.length} más
              </span>
            )}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar país por nombre, profesión (ej. Enfermería, IT) o idioma..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs md:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E79923] focus:border-[#E79923] focus:outline-none bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
              <span className="text-slate-500 font-bold px-2 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Idioma:
              </span>
              {[
                { id: 'all', label: 'Todos' },
                { id: 'spanish', label: 'Español' },
                { id: 'english', label: 'Inglés' },
                { id: 'french', label: 'Francés' },
                { id: 'german', label: 'Alemán' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setFilterLanguage(item.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-all cursor-pointer whitespace-nowrap ${
                    filterLanguage === item.id ? 'bg-[#0B2447] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-xs border-t border-slate-100">
            <span className="text-slate-500 font-bold pr-1">Continente:</span>
            {[
              { id: 'all', label: `Todos (${COUNTRIES_DATA.length})` },
              { id: 'América', label: `América (${COUNTRIES_DATA.filter(c => c.region === 'América').length})` },
              { id: 'Europa', label: `Europa (${COUNTRIES_DATA.filter(c => c.region === 'Europa').length})` },
              { id: 'Asia', label: `Asia (${COUNTRIES_DATA.filter(c => c.region === 'Asia').length})` },
              { id: 'Oceanía', label: `Oceanía (${COUNTRIES_DATA.filter(c => c.region === 'Oceanía').length})` },
              { id: 'África', label: `África (${COUNTRIES_DATA.filter(c => c.region === 'África').length})` }
            ].map(reg => (
              <button
                key={reg.id}
                onClick={() => setFilterRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  filterRegion === reg.id
                    ? 'bg-[#E79923] border-[#E79923] text-slate-950 font-poppins shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Country Badges Grid Picker (Max 110 items) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Mostrando <strong>{filteredCountriesList.length}</strong> de {COUNTRIES_DATA.length} países:</span>
            <span>Haz clic para marcar o desmarcar de la comparación frente a frente</span>
          </div>

          <div className="max-h-56 overflow-y-auto pr-1 flex flex-wrap gap-2 pt-1 border border-slate-100 rounded-xl p-3 bg-slate-50/50">
            {filteredCountriesList.length === 0 ? (
              <div className="w-full py-6 text-center text-slate-500 text-xs">
                No se encontraron países que coincidan con la búsqueda. Intenta borrar los filtros.
              </div>
            ) : (
              filteredCountriesList.map(country => {
                const isSelected = selectedCountryIds.includes(country.id);
                return (
                  <button
                    key={country.id}
                    onClick={() => toggleCountrySelection(country.id)}
                    id={`country-picker-${country.id}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B2447] border-[#0B2447] text-[#E79923] shadow-xs font-bold scale-102 ring-2 ring-[#E79923]/50'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">{country.flag}</span>
                    <span>{country.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E79923]" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Comparison Grid (1 to 3 Selected Countries) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCountries.map(country => (
          <div
            key={country.id}
            className="bg-white rounded-2xl border-2 border-slate-200 shadow-md overflow-hidden flex flex-col justify-between hover:border-[#E79923] transition-all"
          >
            {/* Country Card Header in Brand Principal (#0B2447) */}
            <div className="bg-[#0B2447] text-white p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <h3 className="text-xl font-extrabold font-poppins text-white">{country.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#8FAFB3] font-medium">
                    <span>Idiomas:</span> {country.languages.join(', ')}
                  </div>
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border font-poppins ${
                country.visaEase === 'Alta' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                country.visaEase === 'Media' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-blue-500/20 text-blue-300 border-blue-500/30'
              }`}>
                Visa: {country.visaEase}
              </span>
            </div>

            {/* Country Body Details */}
            <div className="p-5 space-y-4 text-xs md:text-sm text-[#2B2B2B] flex-1">
              {/* Cost of Living */}
              <div className="bg-[#F5F1E8] border border-[#E79923]/40 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between text-[#0B2447] font-bold text-xs uppercase tracking-wider font-poppins">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[#E79923]" />
                    Costo de Vida Estimado
                  </span>
                  <span className="text-xs bg-[#E79923] text-slate-950 font-bold px-2 py-0.5 rounded">
                    ~${country.costValueUSD} USD
                  </span>
                </div>
                <p className="text-[#0B2447] font-bold text-sm font-poppins">
                  {country.monthlyCostEstimate}
                </p>
                <p className="text-[11px] text-slate-600">
                  Estimación mensual básica para una persona sola (alquiler, comida, servicios y transporte).
                </p>
              </div>

              {/* Visas & Facilitidad */}
              <div className="space-y-1">
                <h4 className="font-bold text-[#0B2447] flex items-center gap-1.5 text-xs uppercase tracking-wider font-poppins">
                  <FileCheck2 className="w-4 h-4 text-blue-600" />
                  Facilidad Migratoria y Visados
                </h4>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {country.visaDetails}
                </p>
              </div>

              {/* Safety and Stability */}
              <div className="space-y-1">
                <h4 className="font-bold text-[#0B2447] flex items-center gap-1.5 text-xs uppercase tracking-wider font-poppins">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Seguridad y Estabilidad
                </h4>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {country.safetyAndStability}
                </p>
              </div>

              {/* Professions in Demand */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-[#0B2447] text-xs uppercase tracking-wider font-poppins">
                  🔥 Profesiones y Oficios Demandados
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {country.demandedProfessions.map((prof, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 border border-slate-200 text-slate-800 font-medium px-2 py-0.5 rounded text-[11px]"
                    >
                      {prof}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 gap-2.5 pt-2 border-t border-slate-100">
                <div>
                  <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wider flex items-center gap-1 mb-1 font-poppins">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Puntos Fuertes:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700 pl-4 list-disc marker:text-emerald-500">
                    {country.keyPros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-amber-800 text-[11px] uppercase tracking-wider flex items-center gap-1 mb-1 font-poppins">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Desafíos a Considerar:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700 pl-4 list-disc marker:text-amber-500">
                    {(country.keyCons || []).map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              {onOpenAIChatWithMessage && (
                <button
                  onClick={() => onOpenAIChatWithMessage(`Quisiera consultar los requisitos específicos, visas y costo de vida para emigrar a ${country.name} según mi profesión y situación familiar.`)}
                  className="w-full bg-[#0B2447] hover:bg-slate-800 text-[#E79923] text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-poppins shadow-xs"
                  id={`consult-country-${country.id}`}
                >
                  <Sparkles className="w-4 h-4 text-[#E79923]" />
                  Consultar sobre {country.name} con Asesora IA
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
