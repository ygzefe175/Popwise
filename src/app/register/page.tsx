"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RegisterPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalı');
            return;
        }

        setLoading(true);

        const { error } = await signUp(email, password, fullName);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Başarılı kayıt
            router.push('/login?registered=true');
        }
    };

    return (
        <main className="min-h-screen bg-transparent">
            <Navbar />

            <div className="flex items-center justify-center px-6 py-24 min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md">
                    <div className="bg-[#1C1C1E] rounded-2xl shadow-xl border border-white/5 p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black text-white mb-2">Kayıt Ol</h1>
                            <p className="text-slate-400">Ücretsiz hesap oluşturun</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-bold text-white mb-2">
                                    Ad Soyad
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F10] border border-white/10 text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                                    E-posta
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F10] border border-white/10 text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="ornek@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-white mb-2">
                                    Şifre
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F10] border border-white/10 text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-bold text-white mb-2">
                                    Şifre Tekrar
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-[#0F0F10] border border-white/10 text-white focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3 text-lg shadow-[0_4px_0_0_#D97706] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#D97706] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-400">
                                Zaten hesabınız var mı?{' '}
                                <Link href="/login" className="text-brand-orange font-bold hover:underline">
                                    Giriş Yap
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                            <p className="text-xs text-slate-500 text-center">
                                Kayıt olarak{' '}
                                <Link href="/terms" className="underline hover:text-white">
                                    Kullanım Koşulları
                                </Link>
                                'nı ve{' '}
                                <Link href="/privacy" className="underline hover:text-white">
                                    Gizlilik Politikası
                                </Link>
                                'nı kabul etmiş olursunuz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
