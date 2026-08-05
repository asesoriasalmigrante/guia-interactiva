'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Profile, UserDevice, Payment } from '@/src/types/profile';
import {
  ArrowLeft, ShieldCheck, Smartphone, CreditCard, CheckCircle2,
  XCircle, Trash2, AlertTriangle, Save, RefreshCw
} from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { t } from '@/src/utils/i18n';

export default function AdminUserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const { language } = useLanguage();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [devices, setDevices] = useState<UserDevice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [maxDevices, setMaxDevices] = useState(3);
  const [isActive, setIsActive] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState('inactive');

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`);
      const data = await res.json();
      if (data.profile) {
        setProfile(data.profile);
        setFullName(data.profile.full_name || '');
        setMaxDevices(data.profile.max_devices);
        setIsActive(data.profile.is_active);
        setSubscriptionStatus(data.profile.subscription_status);
      }
      if (data.devices) setDevices(data.devices);
      if (data.payments) setPayments(data.payments);
    } catch {
      console.error('Error fetching user');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push('/admin/login'); return; }
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      if (!profile || profile.role !== 'admin') { router.push('/admin/login'); return; }
      fetchUser();
    };
    checkAdmin();
  }, [router, fetchUser]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          max_devices: maxDevices,
          is_active: isActive,
          subscription_status: subscriptionStatus,
        }),
      });
      fetchUser();
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveDevice = async (deviceId: string) => {
    if (!confirm(t('confirmRemoveDevice', language))) return;
    try {
      await fetch(`/api/admin/users/${userId}/devices/${deviceId}`, { method: 'DELETE' });
      fetchUser();
    } catch {
      console.error('Error removing device');
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm(`${t('confirmDeleteUser', language)} ${profile?.email}${t('confirmDeleteSuffix', language)}`)) return;
    try {
      await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      router.push('/admin');
    } catch {
      console.error('Error deleting user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E79923] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <p className="text-gray-500">{t('userNotFound', language)}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <header className="bg-[#0B2447] text-white py-4 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 rounded-lg bg-[#081b36] border border-[#8FAFB3]/30 hover:border-[#E79923] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-black font-poppins">{t('userDetail', language)}</h1>
            <p className="text-[10px] text-[#8FAFB3]">{profile.email}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-[#0B2447] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#E79923]" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-black font-poppins text-[#0B2447]">{profile.email}</h2>
              <p className="text-xs text-gray-400">ID: {profile.id.slice(0, 8)}...</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {isActive ? t('activeStatus', language) : t('blockedStatus', language)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('fullName', language)}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('maxDevices', language)}</label>
              <select
                value={maxDevices}
                onChange={(e) => setMaxDevices(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all cursor-pointer"
              >
                <option value={1}>{t('device1', language)}</option>
                <option value={2}>{t('device2', language)}</option>
                <option value={3}>{t('device3', language)}</option>
                <option value={5}>{t('device5', language)}</option>
                <option value={10}>{t('device10', language)}</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('status', language)}</label>
              <select
                value={isActive ? 'active' : 'inactive'}
                onChange={(e) => setIsActive(e.target.value === 'active')}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all cursor-pointer"
              >
                <option value="active">{t('activeStatus', language)}</option>
                <option value="inactive">{t('blockedStatus', language)}</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('subscription', language)}</label>
              <select
                value={subscriptionStatus}
                onChange={(e) => setSubscriptionStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all cursor-pointer"
              >
                <option value="active">{t('activeSubscription', language)}</option>
                <option value="inactive">{t('inactiveSubscription', language)}</option>
                <option value="expired">{t('expiredSubscription', language)}</option>
                <option value="trial">{t('trialSubscription', language)}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] font-bold text-sm rounded-xl transition-all cursor-pointer font-poppins disabled:opacity-70"
            >
              {saving ? (
                <span className="inline-block w-4 h-4 border-2 border-[#0B2447] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{t('saveChanges', language)}</span>
            </button>
            <button
              onClick={handleDeleteUser}
              className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-sm rounded-xl transition-all cursor-pointer border border-rose-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('deleteAccount', language)}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-[#E79923]" />
            <h3 className="text-base font-black font-poppins text-[#0B2447]">
              {t('devicesSection', language)} ({devices.length}/{profile.max_devices})
            </h3>
          </div>
          {devices.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">{t('noDevices', language)}</p>
          ) : (
            <div className="space-y-2">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0B2447] truncate">{device.device_name || t('unknownDevice', language)}</p>
                    <p className="text-[10px] text-gray-400 truncate">{device.user_agent}</p>
                    <p className="text-[10px] text-gray-400">
                      {t('lastAccess', language)} {new Date(device.last_active_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveDevice(device.id)}
                    className="p-2 rounded-lg hover:bg-rose-50 transition-all cursor-pointer ml-2"
                    title={t('removeDevice', language)}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#E79923]" />
            <h3 className="text-base font-black font-poppins text-[#0B2447]">
              {t('paymentsSection', language)}
            </h3>
          </div>
          {payments.length === 0 ? (
            <div className="text-center py-6">
              <CreditCard className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">{t('noPayments', language)}</p>
              <p className="text-xs text-gray-300 mt-1">{t('mercadopagoPending', language)}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-[#0B2447]">${payment.amount} {payment.currency}</p>
                    <p className="text-xs text-gray-400">{payment.description || t('paymentFallback', language)}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    payment.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                    payment.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-black font-poppins text-[#0B2447] mb-3">{t('accountInfo', language)}</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-400 uppercase font-bold">{t('role', language)}</span>
              <p className="font-bold text-[#0B2447]">{profile.role === 'admin' ? t('admin', language) : t('userRole', language)}</p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold">{t('created', language)}</span>
              <p className="font-bold text-[#0B2447]">{new Date(profile.created_at).toLocaleDateString('es-ES')}</p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold">{t('lastLogin', language)}</span>
              <p className="font-bold text-[#0B2447]">
                {profile.last_login_at ? new Date(profile.last_login_at).toLocaleString('es-ES') : t('never', language)}
              </p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold">{t('createdBy', language)}</span>
              <p className="font-bold text-[#0B2447]">{profile.created_by ? t('admin', language) : t('system', language)}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
