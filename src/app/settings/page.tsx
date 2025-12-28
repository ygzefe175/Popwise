"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';
import { User, Lock, Mail, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { profile, updateProfile, loading: profileLoading } = useProfile(user?.id ?? null);

    // Form States
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Status States
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (profile) {
            setFullName(profile.full_name || '');
        }
    }, [user, authLoading, profile, router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            // 1. Update Profile (Name)
            const { error: profileError } = await updateProfile({ full_name: fullName });
            if (profileError) throw profileError;

            // 2. Update Password (if provided)
            if (password) {
                if (password !== confirmPassword) {
                    throw new Error("Şifreler uyuşmuyor.");
                }
                const { error: passwordError } = await supabase.auth.updateUser({ password: password });
                if (passwordError) throw passwordError;
            }

            setMessage({ type: 'success', text: 'Profiliniz başarıyla güncellendi.' });
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Bir hata oluştu.' });
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || profileLoading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-bold">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-transparent">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-white mb-2">Hesap Ayarları</h1>
                    <p className="text-slate-400">Profil bilgilerinizi ve tercihlerinizi yönetin.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar / Navigation (Visual only for now) */}
                    <div className="lg:col-span-1 space-y-2">
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-brand-orange/10 text-brand-orange font-bold border border-brand-orange/20 flex items-center gap-3">
                            <User size={18} /> Profil
                        </button>
                        <button disabled className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 font-medium flex items-center gap-3 opacity-50 cursor-not-allowed">
                            <Lock size={18} /> Güvenlik (Yakında)
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-8 shadow-xl">

                            {message && (
                                <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                    {message.type === 'success' ? <CheckCircle2 size={20} className="mt-0.5" /> : <AlertCircle size={20} className="mt-0.5" />}
                                    <p className="text-sm font-bold">{message.text}</p>
                                </div>
                            )}

                            <form onSubmit={handleUpdateProfile} className="space-y-8">

                                {/* Profile Picture Section */}
                                <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                                    <div className="w-20 h-20 rounded-full bg-brand-orange flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-brand-orange/20">
                                        {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Profil Fotoğrafı</h3>
                                        <p className="text-slate-500 text-sm mb-3">Şu an için varsayılan avatar kullanılıyor.</p>
                                        <button type="button" disabled className="text-brand-orange text-xs font-bold uppercase tracking-wider opacity-50 cursor-not-allowed">Değiştir (Yakında)</button>
                                    </div>
                                </div>

                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                        <User size={20} className="text-brand-orange" /> Kişisel Bilgiler
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ad Soyad</label>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-slate-600"
                                                placeholder="Adınız Soyadınız"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-posta</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={user.email}
                                                    disabled
                                                    className="w-full bg-[#0F1117]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                                                />
                                                <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Change */}
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                        <Lock size={20} className="text-brand-orange" /> Şifre Değiştir
                                    </h3>
                                    <p className="text-sm text-slate-500">Sadece şifrenizi değiştirmek istiyorsanız doldurun.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yeni Şifre</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-slate-600"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yeni Şifre (Tekrar)</label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all placeholder:text-slate-600"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-8 py-3 rounded-xl bg-brand-orange text-black font-black hover:brightness-110 transition-all shadow-lg shadow-brand-orange/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Kaydediliyor...' : <><Save size={18} fill="black" /> Değişiklikleri Kaydet</>}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
