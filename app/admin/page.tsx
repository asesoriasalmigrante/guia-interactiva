'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/src/types/profile';
import {
  Users, UserPlus, ShieldCheck, LogOut, Search, ChevronDown,
  Smartphone, CheckCircle2, XCircle, ArrowLeft, RefreshCw, Eye,
  Trash2, AlertTriangle, Copy, Check
} from 'lucide-react';

const customMigranteLogo = '/images/asesorias_migrante_custom_logo_1784912635483.jpg';

interface UserWithCount extends Profile {
  device_count: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<UserWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserMaxDevices, setNewUserMaxDevices] = useState(3);
  const [creating, setCreating] = useState(false);
  const [createdUser, setCreatedUser] = useState<{ email: string; temp_password: string } | null>(null);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [createError, setCreateError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch {
      console.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      if (!profile || profile.role !== 'admin') {
        router.push('/admin/login');
        return;
      }
      fetchUsers();
    };
    checkAdmin();
  }, [router, fetchUsers]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreating(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newUserEmail,
          full_name: newUserName,
          max_devices: newUserMaxDevices,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCreateError(data.error || 'Error al crear usuario');
        setCreating(false);
        return;
      }

      setCreatedUser({ email: data.user.email, temp_password: data.user.temp_password });
      setNewUserEmail('');
      setNewUserName('');
      setNewUserMaxDevices(3);
      fetchUsers();
    } catch {
      setCreateError('Error de conexión');
    } finally {
      setCreating(false);
    }
  };

  const handleToggleActive = async (userId: string, currentActive: boolean) => {
    setActionLoading(userId);
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentActive }),
      });
      fetchUsers();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`¿Eliminar permanentemente a ${email}? Esta acción no se puede deshacer.`)) return;
    setActionLoading(userId);
    try {
      await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      fetchUsers();
    } finally {
      setActionLoading(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.full_name && u.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: users.length,
    active: users.filter((u) => u.is_active).length,
    inactive: users.filter((u) => !u.is_active).length,
    totalDevices: users.reduce((sum, u) => sum + (u.device_count || 0), 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E79923] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <header className="bg-[#0B2447] text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B2447] p-0.5 border border-[#E79923] overflow-hidden">
              <img src={customMigranteLogo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h1 className="text-lg font-black font-poppins">Panel de Administración</h1>
              <p className="text-[10px] text-[#8FAFB3]">Gestión de usuarios — Asesorías al Migrante</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#081b36] border border-[#8FAFB3]/30 hover:border-[#E79923] text-[#F5F1E8] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver App</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-950/40 border border-rose-500/30 hover:bg-rose-900/60 text-rose-200 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-[#0B2447]" />
              <span className="text-xs font-bold text-gray-500">Total</span>
            </div>
            <p className="text-2xl font-black text-[#0B2447] font-poppins">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-gray-500">Activos</span>
            </div>
            <p className="text-2xl font-black text-emerald-600 font-poppins">{stats.active}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-gray-500">Bloqueados</span>
            </div>
            <p className="text-2xl font-black text-rose-600 font-poppins">{stats.inactive}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-4 h-4 text-[#E79923]" />
              <span className="text-xs font-bold text-gray-500">Dispositivos</span>
            </div>
            <p className="text-2xl font-black text-[#E79923] font-poppins">{stats.totalDevices}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-base font-black font-poppins text-[#0B2447]">Clientes</h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                />
              </div>
              <button
                onClick={fetchUsers}
                className="p-2 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
                title="Actualizar"
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] font-bold text-xs rounded-xl transition-all cursor-pointer font-poppins whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Crear Usuario</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Usuario</th>
                  <th className="text-left py-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Estado</th>
                  <th className="text-left py-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Suscripción</th>
                  <th className="text-center py-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dispositivos</th>
                  <th className="text-left py-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Creado</th>
                  <th className="text-right py-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-bold text-[#0B2447] text-sm">{user.email}</p>
                        {user.full_name && (
                          <p className="text-xs text-gray-400">{user.full_name}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.is_active
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {user.is_active ? 'Activo' : 'Bloqueado'}
                      </span>
                    </td>
                    <td className="py-3 px-3 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        user.subscription_status === 'active'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {user.subscription_status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-sm font-bold text-[#0B2447]">
                        {user.device_count || 0}
                      </span>
                      <span className="text-xs text-gray-400">/{user.max_devices}</span>
                    </td>
                    <td className="py-3 px-3 hidden lg:table-cell">
                      <span className="text-xs text-gray-400">
                        {new Date(user.created_at).toLocaleDateString('es-ES')}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                          className="p-1.5 rounded-lg hover:bg-[#0B2447]/10 transition-all cursor-pointer"
                          title="Ver detalles"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#0B2447]" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(user.id, user.is_active)}
                          disabled={actionLoading === user.id}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50"
                          title={user.is_active ? 'Bloquear' : 'Activar'}
                        >
                          {user.is_active ? (
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          disabled={actionLoading === user.id || user.role === 'admin'}
                          className="p-1.5 rounded-lg hover:bg-rose-50 transition-all cursor-pointer disabled:opacity-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-4">
            {createdUser ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-black font-poppins text-[#0B2447]">Usuario Creado</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Comparte esta contraseña temporal con el usuario. Solo se muestra una vez.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Correo</span>
                    <p className="text-sm font-bold text-[#0B2447]">{createdUser.email}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Contraseña Temporal</span>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-mono font-bold text-[#E79923] bg-[#0B2447] px-3 py-1.5 rounded-lg flex-1">
                        {createdUser.temp_password}
                      </p>
                      <button
                        onClick={() => copyToClipboard(createdUser.temp_password)}
                        className="p-2 bg-[#0B2447] rounded-lg hover:bg-[#0c2d4f] transition-all cursor-pointer"
                        title="Copiar"
                      >
                        {copiedPassword ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setCreatedUser(null); setShowCreateModal(false); }}
                  className="w-full py-3 bg-[#0B2447] hover:bg-[#0c2d4f] text-white font-bold text-sm rounded-xl transition-all cursor-pointer font-poppins"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black font-poppins text-[#0B2447]">Crear Usuario</h3>
                  <button
                    onClick={() => { setShowCreateModal(false); setCreateError(''); }}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <XCircle className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {createError && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-600">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{createError}</span>
                  </div>
                )}

                <form onSubmit={handleCreateUser} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Correo *</label>
                    <input
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</label>
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="Nombre completo"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Máx. Dispositivos</label>
                    <select
                      value={newUserMaxDevices}
                      onChange={(e) => setNewUserMaxDevices(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#E79923] focus:ring-2 focus:ring-[#E79923]/20 transition-all cursor-pointer"
                    >
                      <option value={1}>1 dispositivo</option>
                      <option value={2}>2 dispositivos</option>
                      <option value={3}>3 dispositivos (default)</option>
                      <option value={5}>5 dispositivos</option>
                      <option value={10}>10 dispositivos</option>
                    </select>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-700">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Se generará una contraseña temporal que deberás compartir con el usuario.</span>
                  </div>
                  <button
                    type="submit"
                    disabled={creating}
                    className="w-full py-3 bg-[#E79923] hover:bg-[#f0a835] text-[#0B2447] font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-poppins disabled:opacity-70"
                  >
                    {creating ? (
                      <span className="inline-block w-5 h-5 border-2 border-[#0B2447] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Crear Usuario</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
