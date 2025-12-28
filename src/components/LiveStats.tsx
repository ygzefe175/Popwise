"use client";

import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, Zap } from 'lucide-react';

export default function LiveStats() {
    const [activeUsers, setActiveUsers] = useState(47);
    const [todaySales, setTodaySales] = useState(142);

    useEffect(() => {
        // Animate numbers slightly
        const interval = setInterval(() => {
            setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
            setTodaySales(prev => prev + Math.floor(Math.random() * 5));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50 hidden lg:block">
            <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl w-64">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Canlı İstatistikler</span>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <Users size={16} className="text-blue-400" />
                            </div>
                            <span className="text-slate-300 text-sm font-medium">Şu an aktif</span>
                        </div>
                        <span className="text-white font-black text-lg">{activeUsers}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <TrendingUp size={16} className="text-emerald-400" />
                            </div>
                            <span className="text-slate-300 text-sm font-medium">Bugün satış</span>
                        </div>
                        <span className="text-emerald-400 font-black text-lg">{todaySales}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                                <Zap size={16} className="text-brand-orange" />
                            </div>
                            <span className="text-slate-300 text-sm font-medium">Son 30 gün</span>
                        </div>
                        <span className="text-brand-orange font-black text-lg">4.2K</span>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-slate-600 text-center">
                    Gerçek zamanlı kullanım verileri
                </div>
            </div>
        </div>
    );
}
