"use client";

import React from 'react';
import { CheckCircle2, Circle, PartyPopper, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

interface OnboardingChecklistProps {
    hasCampaigns: boolean;
    hasInstalledScript: boolean; // In a real app, we'd check if we received data from their site
}

export default function OnboardingChecklist({ hasCampaigns, hasInstalledScript }: OnboardingChecklistProps) {
    // 1. Account Created (Always true if they are here)
    // 2. Created First Campaign
    // 3. Script Installation (Simulated based on checking if they clicked 'Copy')

    // Calculate progress
    const steps = [
        { id: 1, label: 'Hesabını Oluştur', completed: true },
        { id: 2, label: 'İlk Kampanyanı Başlat', completed: hasCampaigns },
        { id: 3, label: 'Kurulum Kodunu Siteye Ekle', completed: hasInstalledScript }, // We will control this via a prop or simple state in Dashboard
    ];

    const completedCount = steps.filter(s => s.completed).length;
    const progress = (completedCount / steps.length) * 100;
    const isAllComplete = progress === 100;

    React.useEffect(() => {
        if (isAllComplete) {
            confetti({
                particleCount: 150,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#F59E0B', '#10B981', '#ffffff'] // Orange, Emerald, White
            });
        }
    }, [isAllComplete]);

    if (isAllComplete) {
        return (
            <div className="mb-8 bg-gradient-to-r from-emerald-900/40 to-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center justify-between animate-fade-in relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <PartyPopper size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Harika İş Çıkardın! 🎉</h3>
                        <p className="text-emerald-400/80 text-sm">Tüm kurulum adımlarını tamamladın. Artık dönüşümleri izlemeye hazırsın.</p>
                    </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none"></div>
            </div>
        );
    }

    return (
        <div className="mb-8 bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-brand-orange to-amber-300 transition-all duration-1000" style={{ width: `${progress}%` }} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                        🚀 Hızlı Başlangıç
                        <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {completedCount}/{steps.length} Tamamlandı
                        </span>
                    </h3>
                    <p className="text-slate-400 text-sm">Satışlarınızı artırmak için bu adımları tamamlayın.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {steps.map((step, index) => (
                        <div key={step.id} className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
                            step.completed
                                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                                : "bg-white/5 border-white/5 text-slate-400"
                        )}>
                            {step.completed ? (
                                <CheckCircle2 size={20} className="flex-shrink-0" />
                            ) : (
                                <Circle size={20} className="flex-shrink-0 opacity-40" />
                            )}
                            <span className={clsx("text-sm font-bold", step.completed && "line-through opacity-70")}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
