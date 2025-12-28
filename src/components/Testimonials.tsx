"use client";

import React from 'react';
import { ShoppingCart, FileText, Briefcase, Rocket, TrendingUp, Users } from 'lucide-react';

const testimonials = [
    {
        name: "Mehmet Kaya",
        role: "E-ticaret Sahibi",
        company: "TeknoMağaza",
        avatar: "MK",
        icon: ShoppingCart,
        quote: "İlk haftada sepet terk oranımız %18 düştü. Exit-intent pop-up'lar gerçekten işe yarıyor.",
        result: "%18 düşüş sepet terkinde",
        color: "emerald"
    },
    {
        name: "Ayşe Demir",
        role: "Blog Yazarı",
        company: "YemekBlog",
        avatar: "AD",
        icon: FileText,
        quote: "Mail listeme 3 ayda 2.400 abone ekledim. Önceden ayda 200 kazanıyordum, şimdi 800.",
        result: "4x daha fazla abone",
        color: "sky"
    },
    {
        name: "Burak Yılmaz",
        role: "Küçük İşletme",
        company: "Ahşap Atölye",
        avatar: "BY",
        icon: Briefcase,
        quote: "Müşterilerim artık siteyi terk etmeden önce fiyat soruyorlar. Dönüşüm %31 arttı.",
        result: "%31 artış dönüşümde",
        color: "amber"
    },
    {
        name: "Zeynep Arslan",
        role: "Dijital Pazarlamacı",
        company: "GrowthLab",
        avatar: "ZA",
        icon: Rocket,
        quote: "Müşterilerime kuruyorum. Ortalama %27 daha fazla lead topluyorlar. 5 dakikada kurulum bitmiş oluyor.",
        result: "%27 daha fazla lead",
        color: "purple"
    },
    {
        name: "Can Öztürk",
        role: "SaaS Kurucusu",
        company: "BilgiBank",
        avatar: "CÖ",
        icon: TrendingUp,
        quote: "Trial'a kayıt oranı %22 yükseldi. Pop-up'ları landing page'ime ekledim, 2 haftada fark etti.",
        result: "%22 artış kayıt oranında",
        color: "indigo"
    },
    {
        name: "Elif Çelik",
        role: "Online Eğitim",
        company: "DilAkademisi",
        avatar: "EÇ",
        icon: Users,
        quote: "Kurs satışlarım 40% arttı. Mail toplama pop-up'ı sayesinde retargeting yapabiliyorum artık.",
        result: "40% artış satışlarda",
        color: "rose"
    }
];

const stats = [
    { value: "214", label: "Sitede aktif kullanımda", sublabel: "son 30 günde" },
    { value: "%27", label: "Ortalama dönüşüm artışı", sublabel: "ilk 2 haftada" },
    { value: "12dk", label: "Ortalama kurulum süresi", sublabel: "kod kopyala-yapıştır" },
    { value: "4.8/5", label: "Kullanıcı memnuniyeti", sublabel: "127 değerlendirme" }
];

interface TestimonialsProps {
    variant?: 'grid' | 'slider' | 'compact';
    showStats?: boolean;
}

export default function Testimonials({ variant = 'grid', showStats = true }: TestimonialsProps) {
    const colorMap: Record<string, string> = {
        emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        sky: "text-sky-500 bg-sky-500/10 border-sky-500/20",
        amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        indigo: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
        rose: "text-rose-500 bg-rose-500/10 border-rose-500/20"
    };

    return (
        <div className="w-full">
            {/* Stats */}
            {showStats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-slate-300">{stat.label}</div>
                            <div className="text-xs text-slate-500 mt-1">{stat.sublabel}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
                    >
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-bold text-sm">
                                {t.avatar}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                <p className="text-slate-400 text-xs">{t.role}</p>
                                <p className="text-slate-600 text-[10px] font-mono">{t.company}</p>
                            </div>
                            <div className={`p-2 rounded-lg ${colorMap[t.color]}`}>
                                <t.icon size={16} />
                            </div>
                        </div>

                        {/* Quote */}
                        <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">
                            "{t.quote}"
                        </p>

                        {/* Result Badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${colorMap[t.color]}`}>
                            <TrendingUp size={12} />
                            {t.result}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
