"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Zap, ArrowRight, ShieldCheck, Clock, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function PopupOfferPage() {
    return (
        <main className="min-h-screen bg-[#000212] font-sans selection:bg-brand-orange/30 overflow-x-hidden">
            <Navbar />

            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-black mb-8 animate-fade-in tracking-widest uppercase">
                            <Zap size={16} className="fill-brand-orange" /> Sadece Pop-up İsteyenlere
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                            Abonelik Yok. <br />
                            <span className="text-brand-orange">Sadece Pop-up.</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                            Her ay ödeme yapmaktan bıktınız mı? 299 TL'ye tek seferlik paketimizi alın, sitenize dilediğiniz kadar akıllı pop-up ekleyin. Ömür boyu sizin olsun.
                        </p>

                        <div className="flex flex-col gap-4 mb-12">
                            {[
                                "Bütün Pop-up senaryoları dahil",
                                "Sınırsız gösterim ve trafik",
                                "Ömür boyu teknik destek",
                                "Aylık veya yıllık abonelik ücreti yok"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-white font-medium">
                                    <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center">
                                        <Check size={14} className="text-brand-orange" strokeWidth={3} />
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <Link href="/checkout?plan=popup_lifetime" className="inline-flex items-center gap-4 bg-brand-orange text-black px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-brand-orange/20 group">
                            Şimdi Sahip Ol <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-brand-orange/20 rounded-[40px] blur-3xl" />
                        <div className="relative bg-[#1C1C1E] border border-white/10 rounded-[40px] p-10 shadow-2xl overflow-hidden group">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Ömür Boyu Paket</h3>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Tek Seferlik Ödeme</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-5xl font-black text-white tracking-tighter">₺299</div>
                                    <div className="text-slate-500 line-through font-bold">₺999</div>
                                </div>
                            </div>

                            <div className="space-y-6 mb-12">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                    <ShieldCheck className="text-brand-orange shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Güvenilir Altyapı</h4>
                                        <p className="text-slate-500 text-sm">Sitenizi yavaşlatmayan, hafif ve güçlü script.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                    <Clock className="text-brand-orange shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Anında Kurulum</h4>
                                        <p className="text-slate-500 text-sm">Ödeme sonrası 1 dakika içinde Pop-up'larınız yayında.</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                                    <Headphones className="text-brand-orange shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">7/24 Destek</h4>
                                        <p className="text-slate-500 text-sm">Her türlü sorunuzda ekibimiz yanınızda.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 rounded-2xl bg-white/10 text-white font-black border border-white/10 hover:bg-white/20 transition-all">
                                Özellikleri Karşılaştır
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs mb-12">DÜNYACA ÜNLÜ MARKALARIN TERCİHİ</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
                        <span className="text-3xl font-black text-white italic">TECHHUB</span>
                        <span className="text-3xl font-black text-white">Softly.</span>
                        <span className="text-3xl font-black text-white tracking-tighter italic underline decoration-brand-orange">GLOW</span>
                        <span className="text-3xl font-black text-white tracking-widest">BOLT</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
