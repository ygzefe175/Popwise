"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                router.push('/dashboard?payment=success');
            }, 2000);
        }, 2000);
    };

    // Simple formatting functions
    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    };

    const formatExpiry = (value: string) => {
        return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    };

    if (success) {
        return (
            <main className="min-h-screen bg-[#000212] flex items-center justify-center">
                <div className="text-center animate-fade-in">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
                        <CheckCircle2 size={48} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">Ödeme Başarılı!</h1>
                    <p className="text-slate-400">Pro hesabınız aktif edildi. Yönlendiriliyorsunuz...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#000212] font-sans">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Left: Order Summary */}
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-white mb-2">Ödemeyi Tamamla</h1>
                            <p className="text-slate-400">Güvenli ödeme altyapısı ile aboneliğinizi başlatın.</p>
                        </div>

                        <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 mb-8">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Sipariş Özeti</h3>

                            <div className="flex items-center justify-between py-4 border-b border-white/5">
                                <div>
                                    <h4 className="font-bold text-white text-lg">Pro Paket</h4>
                                    <p className="text-sm text-slate-400">Aylık Abonelik</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-black text-white">₺399</div>
                                    <div className="text-xs text-slate-500">/ay</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <span className="text-slate-400 font-medium">Toplam Tutar</span>
                                <span className="text-2xl font-black text-brand-orange">₺399</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <ShieldCheck size={24} className="text-emerald-500 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-emerald-400 text-sm">30 Gün Para İade Garantisi</h4>
                                <p className="text-xs text-emerald-500/80 mt-1">Hizmetimizden memnun kalmazsanız, ilk 30 gün içinde sorgusuz sualsiz iade talep edebilirsiniz.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Form */}
                    <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none"></div>

                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <CreditCard size={20} className="text-brand-orange" /> Kart Bilgileri
                            </h2>
                            <div className="flex gap-2 opacity-50">
                                <div className="w-8 h-5 bg-white rounded"></div>
                                <div className="w-8 h-5 bg-white rounded"></div>
                                <div className="w-8 h-5 bg-white rounded"></div>
                            </div>
                        </div>

                        <form onSubmit={handlePayment} className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kart Sahibinin Adı</label>
                                <input
                                    type="text"
                                    required
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    placeholder="Ad Soyad"
                                    className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kart Numarası</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all font-mono"
                                    />
                                    <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Son Kullanma (AA/YY)</label>
                                    <input
                                        type="text"
                                        required
                                        value={expiry}
                                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                        placeholder="AA/YY"
                                        maxLength={5}
                                        className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all font-mono text-center"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CVC / CVV</label>
                                    <input
                                        type="text"
                                        required
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                        placeholder="123"
                                        maxLength={3}
                                        className="w-full bg-[#0F1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none transition-all font-mono text-center"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-brand-orange text-black font-black text-lg hover:brightness-110 transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2"
                                >
                                    {loading ? 'İşleniyor...' : <>Ödemeyi Yap <ShieldCheck size={20} /></>}
                                </button>
                                <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                                    <Lock size={10} />
                                    256-bit SSL ile güvenli ödeme
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
