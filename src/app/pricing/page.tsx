"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Sparkles, Zap, Building2, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-[#000212] font-sans selection:bg-brand-orange/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-orange text-sm font-bold mb-6 animate-fade-in">
                        <Sparkles size={16} /> 14 Gün Ücretsiz Deneme
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                        Dönüşümlerinizi <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-200">2 Kata Çıkarın.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Pop-up sistemimize ömür boyu sahip olun veya gelişmiş analitik ile sitenizi baştan sona takip edin.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="px-6 pb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

                    {/* Free Plan */}
                    <div className="bg-[#1C1C1E] rounded-3xl p-8 border border-white/10 flex flex-col relative group hover:border-emerald-500/30 transition-all">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-400 mb-2 font-mono uppercase tracking-tighter">Başlangıç (Free)</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">₺0</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-4">Kendi projesini test eden küçük girişimler için kısıtlı paket.</p>
                        </div>
                        <Link href="/register" className="w-full py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 border border-white/10 transition-all text-center mb-8">
                            Ücretsiz Başla
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-emerald-500" /> 1 Web Sitesi</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-emerald-500" /> 3 Aktif Pop-up Limiti</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-emerald-500" /> 500 Gösterim / Ay</li>
                            <li className="flex items-center gap-3 text-slate-500 text-sm italic"><XIcon /> Gelişmiş İstatistikler</li>
                        </ul>
                    </div>

                    {/* Pro Plan (One-time) */}
                    <div className="bg-[#1C1C1E] rounded-3xl p-8 border-2 border-brand-orange flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-brand-orange/10">
                        <div className="absolute top-0 right-0 bg-brand-orange text-black text-[10px] font-black px-4 py-1.5 rounded-bl-2xl rounded-tr-lg tracking-widest uppercase">EN POPÜLER</div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Zap size={20} className="fill-brand-orange text-brand-orange" /> Profesyonel
                            </h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">₺499</span>
                                <span className="text-slate-500 text-lg">/tek sefer</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-4">Büyüyen işletmeler için sınırsız güç. Bir kez ödeyin, hep kullanın.</p>
                        </div>
                        <Link href="/checkout?plan=pro" className="w-full py-5 rounded-xl bg-brand-orange text-black font-black hover:brightness-110 transition-all text-center mb-8 shadow-xl shadow-brand-orange/20 uppercase tracking-widest text-sm">
                            Hemen Sahip Ol
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-center gap-3 text-white text-sm font-semibold"><Check size={18} className="text-brand-orange" /> 1 Web Sitesi (Sınırsız Pop-up)</li>
                            <li className="flex items-center gap-3 text-white text-sm font-semibold"><Check size={18} className="text-brand-orange" /> Sınırsız Gösterim</li>
                            <li className="flex items-center gap-3 text-white text-sm font-semibold"><Check size={18} className="text-brand-orange" /> Pop-up Tıklama Verileri</li>
                            <li className="flex items-center gap-3 text-white text-sm font-semibold"><Check size={18} className="text-brand-orange" /> White-label (Logosuz)</li>
                        </ul>
                    </div>

                    {/* Agency Plan (One-time) */}
                    <div className="bg-[#1C1C1E] rounded-3xl p-8 border border-white/10 flex flex-col relative group hover:border-blue-500/30 transition-all">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-slate-400 mb-2">Ajans (Enterprise)</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">₺1,599</span>
                                <span className="text-slate-500 text-lg">/tek sefer</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-4">Ajanslar ve çoklu site yöneten profesyoneller için tam yetki.</p>
                        </div>
                        <Link href="/contact" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-all text-center mb-8">
                            İletişime Geçin
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-blue-500" /> 10 Web Sitesi Lisansı</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-blue-500" /> Sınırsız Her Şey</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-blue-500" /> Öncelikli 7/24 Destek</li>
                        </ul>
                    </div>
                </div>

                {/* Pop-up Only Dedicated Section */}
                <div className="max-w-5xl mx-auto mt-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-indigo-600/20 rounded-[40px] blur-3xl opacity-50" />
                    <div className="relative bg-[#1C1C1E] border border-white/10 rounded-[40px] p-10 md:p-16 overflow-hidden flex flex-col md:flex-row items-center gap-12 group">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase mb-6 tracking-widest">
                                <Zap size={14} className="fill-indigo-500" /> Ekstra Güç Lazım mı?
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight text-center md:text-left">
                                Gelişmiş Web Analitiğine <br />
                                <span className="text-indigo-400">Meraklı mısınız?</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed text-center md:text-left">
                                Sadece pop-up ile yetinmeyin. Sitenizin tüm trafik haritasını, AI analizlerini ve gerçek zamanlı ziyaretçi hareketlerini Aylık ₺399'a ek paket olarak alın.
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <Link href="/checkout?plan=analytics" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
                                    Analitik Paketini İncele <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="max-w-4xl mx-auto mt-20 flex flex-wrap justify-center gap-10 opacity-40 items-center">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Check className="text-emerald-500" size={16} /> güvenli ödeme (256-bit)
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Check className="text-emerald-500" size={16} /> ömür boyu lisans
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <Check className="text-emerald-500" size={16} /> anında kurulum
                    </div>
                </div>

                {/* FAQ Teaser */}
                <div className="max-w-3xl mx-auto mt-24 text-center">
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Hala Kararsız mısınız?</h2>
                    <p className="text-slate-400 mb-8 font-medium">Binlerce mutlu müşteri yanılıyor olamaz. Ücretsiz başlayın, farkı görün.</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/faq" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-colors">
                            <HelpCircle size={20} /> Sıkça Sorulan Sorular
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    )
}
