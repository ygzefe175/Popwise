"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Lock, Sparkles, Crown, ArrowRight, LogIn } from 'lucide-react';

interface PremiumGateProps {
    children: ReactNode;
    feature: 'ai-content' | 'site-analiz' | 'para-kocu' | 'analytics';
    freeUsesAllowed?: number;
    currentUses?: number;
    requiredPlan?: 'pro' | 'growth';
    /** If true, shows a preview with overlay instead of completely blocking */
    showPreview?: boolean;
}

interface FeatureConfig {
    name: string;
    description: string;
    icon: ReactNode;
    color: string;
    freeLimit: number;
    proLimit: number;
    growthLimit: number;
}

const featureConfigs: Record<string, FeatureConfig> = {
    'ai-content': {
        name: 'AI İçerik Üretici',
        description: 'Yapay zeka ile profesyonel pazarlama metinleri oluşturun',
        icon: <Sparkles size={24} />,
        color: 'purple',
        freeLimit: 3,
        proLimit: 50,
        growthLimit: -1 // unlimited
    },
    'site-analiz': {
        name: 'Site Analiz Aracı',
        description: 'Web sitenizin SEO, hız ve performans skorlarını analiz edin',
        icon: <Sparkles size={24} />,
        color: 'emerald',
        freeLimit: 2,
        proLimit: 20,
        growthLimit: -1
    },
    'para-kocu': {
        name: 'Para Koçu',
        description: 'Kişisel finans yönetimi ve bütçe planlama aracı',
        icon: <Crown size={24} />,
        color: 'amber',
        freeLimit: 0, // Pro only
        proLimit: -1,
        growthLimit: -1
    },
    'analytics': {
        name: 'Gelişmiş Analitik',
        description: 'Detaylı trafik analizi ve dönüşüm raporları',
        icon: <Crown size={24} />,
        color: 'blue',
        freeLimit: 0,
        proLimit: -1,
        growthLimit: -1
    }
};

export default function PremiumGate({
    children,
    feature,
    freeUsesAllowed,
    currentUses = 0,
    requiredPlan = 'pro',
    showPreview = false
}: PremiumGateProps) {
    const { user, loading } = useAuth();
    const config = featureConfigs[feature];

    // For now, we'll check localStorage for usage counts
    // In production, this should be fetched from the database
    const getUsageKey = () => `poplift_${feature}_uses`;

    const [usageCount, setUsageCount] = React.useState<number>(0);
    const [userPlan, setUserPlan] = React.useState<'free' | 'pro' | 'growth'>('free');
    const [planLoading, setPlanLoading] = React.useState(true);

    React.useEffect(() => {
        // Get usage from localStorage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(getUsageKey());
            setUsageCount(stored ? parseInt(stored, 10) : 0);
        }
    }, [feature]);

    React.useEffect(() => {
        const fetchPlan = async () => {
            if (!user?.id) {
                setPlanLoading(false);
                return;
            }
            try {
                const response = await fetch(`/api/subscription?user_id=${user.id}`);
                const data = await response.json();
                if (data.success && data.subscription) {
                    setUserPlan(data.subscription.plan_type || 'free');
                }
            } catch (error) {
                console.error('Plan fetch error:', error);
            } finally {
                setPlanLoading(false);
            }
        };

        if (user?.id) {
            fetchPlan();
        } else if (!loading) {
            setPlanLoading(false);
        }
    }, [user?.id, loading]);

    // Determine limits based on plan
    const getLimit = () => {
        switch (userPlan) {
            case 'growth': return config.growthLimit;
            case 'pro': return config.proLimit;
            default: return freeUsesAllowed ?? config.freeLimit;
        }
    };

    const limit = getLimit();
    const effectiveUses = currentUses || usageCount;
    const hasAccess = limit === -1 || effectiveUses < limit;
    const remainingUses = limit === -1 ? '∞' : Math.max(0, limit - effectiveUses);

    // If loading, show skeleton
    if (loading || planLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    // If not logged in
    if (!user) {
        return (
            <div className="min-h-[500px] flex items-center justify-center px-6 py-12">
                <div className="max-w-md w-full text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-${config.color}-500/20 flex items-center justify-center mx-auto mb-6`}>
                        <LogIn size={32} className={`text-${config.color}-400`} />
                    </div>

                    <h2 className="text-2xl font-black text-white mb-3">
                        Giriş Yapmalısınız
                    </h2>

                    <p className="text-slate-400 mb-8">
                        <span className="text-white font-bold">{config.name}</span> özelliğini kullanmak için
                        önce hesabınıza giriş yapın.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/login"
                            className="block w-full py-4 px-6 bg-brand-orange hover:bg-amber-500 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} />
                            Giriş Yap
                        </Link>

                        <Link
                            href="/register"
                            className="block w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all"
                        >
                            Ücretsiz Hesap Oluştur
                        </Link>
                    </div>

                    <p className="text-slate-500 text-sm mt-6">
                        Ücretsiz kullanıcılar {config.freeLimit} ücretsiz hak kazanır
                    </p>
                </div>
            </div>
        );
    }

    // If user has access
    if (hasAccess) {
        return (
            <>
                {/* Usage indicator for limited access */}
                {limit !== -1 && (
                    <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-4 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-${config.color}-500/20 flex items-center justify-center`}>
                                {config.icon}
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">{config.name}</p>
                                <p className="text-slate-500 text-xs">
                                    {userPlan === 'free' ? 'Ücretsiz Plan' : userPlan === 'pro' ? 'Pro Plan' : 'Growth Plan'}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-white font-bold">
                                {remainingUses} <span className="text-slate-500 font-normal text-sm">kalan hak</span>
                            </p>
                            {userPlan === 'free' && (
                                <Link href="/pricing" className="text-brand-orange text-xs font-bold hover:underline">
                                    Pro'ya geç →
                                </Link>
                            )}
                        </div>
                    </div>
                )}
                {children}
            </>
        );
    }

    // If no access - show upgrade prompt
    return (
        <div className="min-h-[500px] flex items-center justify-center px-6 py-12">
            <div className="max-w-lg w-full">
                <div className="bg-[#1C1C1E] border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${config.color}-500 to-${config.color}-400`} />

                    {/* Lock Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-${config.color}-500/20 flex items-center justify-center mx-auto mb-6`}>
                        <Lock size={32} className={`text-${config.color}-400`} />
                    </div>

                    <h2 className="text-2xl font-black text-white mb-3">
                        {config.name}
                    </h2>

                    <p className="text-slate-400 mb-2">
                        {config.description}
                    </p>

                    {limit > 0 && (
                        <p className="text-amber-400 text-sm mb-6">
                            ⚠️ Ücretsiz kullanım hakkınız doldu ({limit}/{limit})
                        </p>
                    )}

                    {limit === 0 && (
                        <p className="text-amber-400 text-sm mb-6">
                            Bu özellik {requiredPlan === 'growth' ? 'Growth' : 'Pro'} plan kullanıcılarına özeldir
                        </p>
                    )}

                    {/* Plan Comparison Mini */}
                    <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left">
                        <p className="text-white font-bold text-sm mb-3">Plan Karşılaştırması</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-400">Ücretsiz</span>
                                <span className="text-slate-500">{config.freeLimit === 0 ? '❌' : `${config.freeLimit} kullanım`}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-brand-orange font-bold">Pro</span>
                                <span className="text-brand-orange">{config.proLimit === -1 ? '∞ Sınırsız' : `${config.proLimit} kullanım`}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-cyan-400 font-bold">Growth</span>
                                <span className="text-cyan-400">{config.growthLimit === -1 ? '∞ Sınırsız' : `${config.growthLimit} kullanım`}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/pricing"
                            className="block w-full py-4 px-6 bg-gradient-to-r from-brand-orange to-amber-500 text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                        >
                            <Crown size={20} />
                            Pro'ya Yükselt
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <p className="text-slate-500 text-xs mt-6">
                        Tüm Pro planlarda 7 gün para iade garantisi
                    </p>
                </div>

                {/* Preview section if enabled */}
                {showPreview && (
                    <div className="mt-8 opacity-30 pointer-events-none blur-sm">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

// Hook to increment usage
export function useFeatureUsage(feature: string) {
    const incrementUsage = () => {
        if (typeof window !== 'undefined') {
            const key = `poplift_${feature}_uses`;
            const current = parseInt(localStorage.getItem(key) || '0', 10);
            localStorage.setItem(key, (current + 1).toString());
        }
    };

    const resetUsage = () => {
        if (typeof window !== 'undefined') {
            const key = `poplift_${feature}_uses`;
            localStorage.setItem(key, '0');
        }
    };

    return { incrementUsage, resetUsage };
}
