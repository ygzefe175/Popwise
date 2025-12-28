"use client";

import React from 'react';
import { Check, X } from 'lucide-react';

export default function ComparisonTable() {
    const features = [
        { name: "Aylık Maliyet", poopup: "₺0 (Ücretsiz) / ₺499 (Tek Seferlik)", optinmonster: "$19-79/ay", privy: "$15-95/ay" },
        { name: "Türkçe Panel", poopup: true, optinmonster: false, privy: false },
        { name: "Exit-Intent", poopup: true, optinmonster: true, privy: true },
        { name: "AI Optimizasyo", poopup: true, optinmonster: false, privy: false },
        { name: "Kurulum Süresi", poopup: "3 dakika", optinmonster: "15-30 dakika", privy: "10-20 dakika" },
        { name: "Müşteri Desteği", poopup: "Türkçe / Email", optinmonster: "İngilizce / Chat", privy: "İngilizce" },
        { name: "Branding Kaldırma", poopup: "₺499 ile", optinmonster: "$79/ay ile", privy: "$95/ay ile" },
        { name: "Mobil Uyumlu", poopup: true, optinmonster: true, privy: true },
        { name: "Sınırsız Gösterim", poopup: "₺499 ile", optinmonster: "$79/ay ile", privy: "Sınırlı" },
    ];

    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Neden Rakiplerden Daha İyi?
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Aynı özellikleri yarı fiyatına, Türkçe destek ile sunuyoruz.
                    </p>
                </div>

                <div className="bg-[#1C1C1E] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-6 text-slate-400 font-bold text-sm">Özellik</th>
                                    <th className="p-6 text-center">
                                        <div className="bg-gradient-to-br from-brand-orange to-amber-500 text-black font-black px-4 py-2 rounded-xl inline-block">
                                            PoopUp
                                        </div>
                                    </th>
                                    <th className="p-6 text-slate-400 font-bold text-sm text-center">OptinMonster</th>
                                    <th className="p-6 text-slate-400 font-bold text-sm text-center">Privy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-6 text-slate-300 font-medium">{feature.name}</td>
                                        <td className="p-6 text-center">
                                            {typeof feature.poopup === 'boolean' ? (
                                                feature.poopup ? (
                                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                                                        <Check size={16} className="text-emerald-400" />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                                                        <X size={16} className="text-red-400" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-white font-bold">{feature.poopup}</span>
                                            )}
                                        </td>
                                        <td className="p-6 text-center">
                                            {typeof feature.optinmonster === 'boolean' ? (
                                                feature.optinmonster ? (
                                                    <div className="w-6 h-6 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto">
                                                        <Check size={16} className="text-slate-500" />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                                                        <X size={16} className="text-red-400" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-slate-500 text-sm">{feature.optinmonster}</span>
                                            )}
                                        </td>
                                        <td className="p-6 text-center">
                                            {typeof feature.privy === 'boolean' ? (
                                                feature.privy ? (
                                                    <div className="w-6 h-6 rounded-full bg-slate-500/20 flex items-center justify-center mx-auto">
                                                        <Check size={16} className="text-slate-500" />
                                                    </div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                                                        <X size={16} className="text-red-400" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-slate-500 text-sm">{feature.privy}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 bg-gradient-to-r from-brand-orange/10 to-transparent border-t border-white/10 text-center">
                        <p className="text-white font-bold text-lg mb-4">
                            OptinMonster'a yılda <span className="text-brand-orange">$948</span> ödeyecekken,
                            <br />
                            PoopUp'a sadece <span className="text-brand-orange">₺499</span> öde, sonsuza kadar kullan.
                        </p>
                        <a
                            href="/register"
                            className="inline-block px-8 py-3 bg-brand-orange hover:bg-amber-500 text-black font-bold rounded-xl transition-all"
                        >
                            Hemen Başla - Ücretsiz Dene
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
