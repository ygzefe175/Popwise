"use client";

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Clock, Percent, AlertCircle, Mail, Sparkles } from 'lucide-react';
import { useVisitorTracker } from '@/hooks/useVisitorTracker';
import { VisitorTag, PopupConfig } from '@/lib/types';
import clsx from 'clsx';

const CONTENT_MAP: Record<VisitorTag, PopupConfig> = {
    indecisive: {
        tag: 'indecisive',
        headline: '🎁 %10 İndirim Kazan!',
        subtext: 'İlk alışverişine özel %10 indirim kodu: ILKSIPARIS10',
        cta: 'Sepetime Ekle & İndirimi Kullan'
    },
    trust_seeking: {
        tag: 'trust_seeking',
        headline: '✉️ Mail Bırak → Hediye Kazan',
        subtext: 'Mail adresini bırak, sana özel 50₺ değerinde kupon hediye edelim!',
        cta: 'Hemen Hediyemi İstiyorum'
    },
    benefit_oriented: {
        tag: 'benefit_oriented',
        headline: '⚡ Sınırlı Stok Uyarısı!',
        subtext: 'Bu üründen sadece 3 adet kaldı. Kaçırma!',
        cta: 'Hemen Satın Al'
    },
    newsletter: {
        tag: 'newsletter',
        headline: '📩 VIP Kampanyalar Sadece Sende!',
        subtext: 'Mail listeye katıl, %20\'ye kadar özel indirimlerden ilk sen haberdar ol.',
        cta: 'VIP Listesine Katıl'
    },
    standard: {
        tag: 'standard',
        headline: '🔥 Son Şans: %15 İndirim',
        subtext: 'Bu sayfadan çıkmadan siparişini tamamla, %15 indirim kazan!',
        cta: '₺630 Tasarruf Et'
    }
};

interface SmartPopupProps {
    forcedConfig?: {
        isVisible: boolean;
        tag: VisitorTag;
        position?: 'center' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'top_center' | 'bottom_center';
    };
}

export default function SmartPopup({ forcedConfig }: SmartPopupProps) {
    const { tag: trackerTag, isExitIntent } = useVisitorTracker();

    // Config priority: Forced > Hook
    const tag = forcedConfig ? forcedConfig.tag : trackerTag;

    // Internal state for natural behavior
    const [internalVisible, setInternalVisible] = useState(false);
    const [hideOverride, setHideOverride] = useState(false);

    // Derived visibility
    const isVisible = (forcedConfig ? forcedConfig.isVisible : internalVisible) && !hideOverride;

    useEffect(() => {
        if (forcedConfig?.isVisible) {
            setHideOverride(false);
        }
    }, [forcedConfig]);

    // Trigger logic (Only runs if NOT forced)
    useEffect(() => {
        if (forcedConfig) return;

        // Session control: If shown once, don't show again this session
        const hasBeenShown = sessionStorage.getItem('popup_shown_this_session');
        if (hasBeenShown) return;

        if (isExitIntent && !internalVisible) {
            setInternalVisible(true);
            sessionStorage.setItem('popup_shown_this_session', 'true');
        }
    }, [isExitIntent, internalVisible, forcedConfig]);

    // Fallback timer trigger (Only runs if NOT forced)
    useEffect(() => {
        if (forcedConfig) return;

        const timer = setTimeout(() => {
            const hasBeenShown = sessionStorage.getItem('popup_shown_this_session');
            if (!hasBeenShown) {
                setInternalVisible(true);
                sessionStorage.setItem('popup_shown_this_session', 'true');
            }
        }, 30000); // Increased to 30s to be less intrusive
        return () => clearTimeout(timer);
    }, [forcedConfig]);

    const baseContent = CONTENT_MAP[tag];
    const content = {
        ...baseContent,
        position: forcedConfig?.position || baseContent.position
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHideOverride(true);
        if (!forcedConfig) {
            setInternalVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className={clsx(
            "fixed z-[100] transition-all duration-700 ease-in-out flex pointer-events-none px-4",
            isVisible ? "opacity-100" : "opacity-0",
            // Position Logic
            (!content.position || content.position === 'center')
                ? "inset-0 items-center justify-center bg-[#000212]/80 backdrop-blur-sm"
                : "p-4 sm:p-6",
            content.position?.includes('top') && "top-0 items-start",
            content.position?.includes('bottom') && "bottom-0 items-end font-sans",
            content.position?.includes('left') && "left-0 justify-start",
            content.position?.includes('right') && "right-0 justify-end",
            content.position?.includes('center') && content.position !== 'center' && "left-1/2 -translate-x-1/2 justify-center"
        )}>
            <div className={clsx(
                "relative w-full rounded-2xl bg-[#0F1117] border border-white/10 shadow-2xl overflow-hidden animate-slide-up ring-1 ring-white/5 pointer-events-auto sm:rounded-3xl",
                (!content.position || content.position === 'center') ? "max-w-[340px] sm:max-w-sm" : "max-w-[280px] sm:max-w-xs shadow-indigo-500/10"
            )}>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/10 transition-colors z-20"
                >
                    <X size={(!content.position || content.position === 'center') ? 18 : 14} />
                </button>

                <div className={clsx(
                    "relative",
                    (!content.position || content.position === 'center') ? "p-6 sm:p-8" : "p-4 sm:p-6"
                )}>
                    {/* Background Glow */}
                    <div className={clsx(
                        "absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none",
                        (!content.position || content.position === 'center') ? "opacity-100" : "opacity-50"
                    )} />

                    <div className={clsx(
                        "relative z-10 flex flex-col",
                        (!content.position || content.position === 'center') ? "items-center text-center" : "items-start text-left"
                    )}>
                        <div className={clsx(
                            "p-4 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 text-indigo-400 shadow-xl shadow-indigo-500/10",
                            (!content.position || content.position === 'center') ? "mb-6 p-4" : "mb-4 p-2"
                        )}>
                            {tag === 'trust_seeking' ? <ShieldCheck size={(!content.position || content.position === 'center') ? 36 : 24} /> :
                                tag === 'newsletter' ? <Mail size={(!content.position || content.position === 'center') ? 36 : 24} /> :
                                    tag === 'benefit_oriented' ? <Sparkles size={(!content.position || content.position === 'center') ? 36 : 24} /> :
                                        <Clock size={(!content.position || content.position === 'center') ? 36 : 24} />}
                        </div>

                        <h2 className={clsx(
                            "font-bold text-white mb-2 tracking-tight",
                            (!content.position || content.position === 'center') ? "text-2xl" : "text-lg"
                        )}>
                            {content.headline}
                        </h2>
                        <p className={clsx(
                            "text-slate-400 leading-relaxed font-light",
                            (!content.position || content.position === 'center') ? "text-sm mb-8 px-2" : "text-xs mb-4 line-clamp-2"
                        )}>
                            {content.subtext}
                        </p>

                        {/* Social Proof Timer - Only for main modal */}
                        {(!content.position || content.position === 'center') && (
                            <div className="w-full bg-red-500/5 border border-red-500/10 rounded-xl p-3 mb-6 flex items-center justify-center gap-2 text-xs text-red-400 font-medium">
                                <Clock size={14} />
                                <span className="animate-pulse">
                                    {tag === 'indecisive' && 'İndirim kodu 2 dakika içinde sona eriyor!'}
                                    {tag === 'trust_seeking' && 'Hediye kupon 24 saat geçerli'}
                                    {tag === 'benefit_oriented' && 'Son 3 ürün! Hızlı ol'}
                                    {(tag === 'newsletter' || tag === 'standard') && 'Bu teklif 04:59 içinde sona eriyor.'}
                                </span>
                            </div>
                        )}

                        {/* Email Input for Mail Collection */}
                        {tag === 'trust_seeking' && (!content.position || content.position === 'center') && (
                            <input
                                type="email"
                                placeholder="E-posta adresin"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 text-sm mb-3"
                            />
                        )}

                        <button className={clsx(
                            "primary-glow-button w-full rounded-xl text-white font-bold shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group transition-all hover:brightness-110 active:scale-[0.98]",
                            (!content.position || content.position === 'center') ? "py-4 text-sm" : "py-2.5 text-xs"
                        )}>
                            {content.cta} <ArrowRight size={(!content.position || content.position === 'center') ? 16 : 14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
