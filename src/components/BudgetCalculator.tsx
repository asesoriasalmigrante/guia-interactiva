import React, { useState, useEffect } from 'react';
import { INITIAL_BUDGET_ITEMS } from '../data/ebookData';
import { BudgetItem } from '../types';
import { Calculator, Plus, Trash2, ShieldAlert, Download, RefreshCw, DollarSign, PieChart } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '../utils/i18n';

const CATEGORY_MAP: Record<string, string> = {
  'Trámites y Documentos': 'categoryTramites',
  'Viaje y Traslado': 'categoryViaje',
  'Alojamiento Inicial': 'categoryAlojamiento',
  'Depósito y Alquiler': 'categoryDeposito',
  'Alimentación e Higiene': 'categoryAlimentacion',
  'Transporte': 'categoryTransport',
  'Seguro Médico': 'categorySeguro',
  'Fondo de Emergencia': 'categoryFondo',
};

export const BudgetCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [items, setItems] = useState<BudgetItem[]>(() => {
    const saved = localStorage.getItem('migrante_budget_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BUDGET_ITEMS;
  });

  const [monthsOfEmergencyFund, setMonthsOfEmergencyFund] = useState<number>(3);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCost, setNewItemCost] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<BudgetItem['category']>(t('categoryTramites', language) as BudgetItem['category']);

  useEffect(() => {
    localStorage.setItem('migrante_budget_items', JSON.stringify(items));
  }, [items]);

  const handleCostChange = (id: string, newCost: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, estimatedCost: isNaN(newCost) ? 0 : newCost } : item));
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemCost) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: newItemCategory,
      name: newItemName.trim(),
      estimatedCost: parseFloat(newItemCost) || 0,
      notes: t('customNote', language)
    };

    setItems(prev => [...prev, newItem]);
    setNewItemName('');
    setNewItemCost('');
  };

  const handleResetToDefault = () => {
    if (window.confirm(t('confirmReset', language))) {
      setItems(INITIAL_BUDGET_ITEMS);
      localStorage.removeItem('migrante_budget_items');
    }
  };

  // Group by category
  const categories = Array.from(new Set(items.map(i => i.category)));

  const totalBudget = items.reduce((sum, item) => {
    if (item.category === 'Fondo de Emergencia') {
      return sum + (item.estimatedCost * (monthsOfEmergencyFund / 3));
    }
    return sum + item.estimatedCost;
  }, 0);

  const initialMoveCost = items.reduce((sum, item) => {
    if (item.category === 'Fondo de Emergencia') return sum;
    return sum + item.estimatedCost;
  }, 0);

  const emergencyFundTotal = items.reduce((sum, item) => {
    if (item.category === 'Fondo de Emergencia') return sum + (item.estimatedCost * (monthsOfEmergencyFund / 3));
    return sum;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          {t('budgetToolLabel', language)}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t('budgetTitle', language)}
        </h2>
        <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          Daniela Harrington enfatiza: <em className="text-amber-300">{t('budgetQuote', language)}</em>
        </p>
      </div>

      {/* Main Grid: Calculator & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Items Editor */}
        <div className="lg:col-span-8 space-y-6">
          {/* Emergency Fund Slider */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                {t('emergencyFundLabel', language)}
              </label>
              <span className="bg-slate-900 text-amber-400 px-3 py-1 rounded-full text-xs font-extrabold">
                {monthsOfEmergencyFund} {t('emergencyFundSuggested', language)}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {t('emergencyFundHint', language)}
            </p>
            <input
              type="range"
              min="1"
              max="6"
              step="1"
              value={monthsOfEmergencyFund}
              onChange={(e) => setMonthsOfEmergencyFund(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>{t('emergencyFund1', language)}</span>
              <span>{t('emergencyFund3', language)}</span>
              <span>{t('emergencyFund6', language)}</span>
            </div>
          </div>

          {/* Add New Custom Expense Form */}
          <form onSubmit={handleAddItem} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">{t('addExpenseTitle', language)}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                placeholder={t('addExpenseName', language)}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="sm:col-span-5 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />

              <select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as BudgetItem['category'])}
                className="sm:col-span-4 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
              >
                <option value="Trámites y Documentos">{t('categoryTramites', language)}</option>
                <option value="Viaje y Traslado">{t('categoryViaje', language)}</option>
                <option value="Alojamiento Inicial">{t('categoryAlojamiento', language)}</option>
                <option value="Depósito y Alquiler">{t('categoryDeposito', language)}</option>
                <option value="Alimentación e Higiene">{t('categoryAlimentacion', language)}</option>
                <option value="Transporte">{t('categoryTransport', language)}</option>
                <option value="Seguro Médico">{t('categorySeguro', language)}</option>
                <option value="Fondo de Emergencia">{t('categoryFondo', language)}</option>
              </select>

              <input
                type="number"
                placeholder={t('costUSD', language)}
                value={newItemCost}
                onChange={(e) => setNewItemCost(e.target.value)}
                className="sm:col-span-2 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />

              <button
                type="submit"
                className="sm:col-span-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center p-2 transition-all cursor-pointer"
                title={t('addExpenseBtn', language)}
                id="btn-add-budget-item"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Budget Categories & Item List */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">{t('expenseBreakdown', language)}</h3>
              <button
                onClick={handleResetToDefault}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
                title={t('resetEstimations', language)}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t('resetEstimations', language)}</span>
              </button>
            </div>

            <div className="space-y-6">
              {categories.map((cat, cIdx) => {
                const catItems = items.filter(i => i.category === cat);
                const catTotal = catItems.reduce((sum, i) => {
                  if (i.category === 'Fondo de Emergencia') return sum + (i.estimatedCost * (monthsOfEmergencyFund / 3));
                  return sum + i.estimatedCost;
                }, 0);

                return (
                  <div key={cIdx} className="space-y-3">
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80">
                      <span className="font-bold text-xs md:text-sm text-slate-800 uppercase tracking-wider">
                        {CATEGORY_MAP[cat] ? t(CATEGORY_MAP[cat], language) : cat}
                      </span>
                      <span className="font-extrabold text-xs md:text-sm text-slate-900">
                        ${catTotal.toLocaleString()} USD
                      </span>
                    </div>

                    <div className="space-y-2 pl-1">
                      {catItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs md:text-sm text-slate-900">{item.name}</div>
                            {item.notes && <div className="text-[11px] text-slate-500 italic">{item.notes}</div>}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 focus-within:ring-2 focus-within:ring-amber-500">
                              <span className="text-slate-400 text-xs font-medium">$</span>
                              <input
                                type="number"
                                min="0"
                                value={item.category === 'Fondo de Emergencia' ? Math.round(item.estimatedCost * (monthsOfEmergencyFund / 3)) : item.estimatedCost}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value) || 0;
                                  if (item.category === 'Fondo de Emergencia') {
                                    handleCostChange(item.id, Math.round((val * 3) / monthsOfEmergencyFund));
                                  } else {
                                    handleCostChange(item.id, val);
                                  }
                                }}
                                className="w-20 text-xs md:text-sm font-bold text-slate-900 focus:outline-none"
                              />
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-slate-400 hover:text-red-600 transition-colors p-1"
                              title={t('deleteExpense', language)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 sticky top-28 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-400" />
                {t('budgetSummary', language)}
              </h3>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded font-bold">
                {t('realEstimate', language)}
              </span>
            </div>

            {/* Total Highlight */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{t('minBudget', language)}</span>
              <div className="text-3xl md:text-4xl font-extrabold text-amber-400 tracking-tight">
                ${totalBudget.toLocaleString()} <span className="text-sm text-slate-400 font-normal">USD</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {t('includesExpenses', language).replace('{months}', String(monthsOfEmergencyFund))}
              </p>
            </div>

            {/* Breakdown Subtotals */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>{t('departureCosts', language)}</span>
                <strong className="text-white">${initialMoveCost.toLocaleString()} USD</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span>{t('emergencyFundTotal', language).replace('{months}', String(monthsOfEmergencyFund))}</span>
                <strong className="text-amber-400">${emergencyFundTotal.toLocaleString()} USD</strong>
              </div>
            </div>

            {/* Advice Box */}
            <div className="bg-indigo-950/60 border border-indigo-800 p-4 rounded-xl text-xs space-y-2 text-indigo-200">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                {t('danielaRecommendation', language)}
              </div>
              <p className="leading-relaxed">
                {t('budgetAdvice', language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
