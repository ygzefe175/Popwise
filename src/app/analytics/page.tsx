"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Smartphone, Monitor, Globe, Calendar } from 'lucide-react';

const DATA_VISITORS = [
    { name: 'Pzt', visits: 4000, conversions: 2400 },
    { name: 'Sal', visits: 3000, conversions: 1398 },
    { name: 'Çar', visits: 2000, conversions: 9800 },
    { name: 'Per', visits: 2780, conversions: 3908 },
    { name: 'Cum', visits: 1890, conversions: 4800 },
    { name: 'Cmt', visits: 2390, conversions: 3800 },
    { name: 'Paz', visits: 3490, conversions: 4300 },
];

const DATA_DEVICES = [
    { name: 'Masaüstü', value: 65, color: '#F59E0B' }, // Orange
    { name: 'Mobil', value: 30, color: '#10B981' },    // Emerald
    { name: 'Tablet', value: 5, color: '#6366F1' },     // Indigo
];

export default function AnalyticsPage() {
    return (
        <main className="min-h-screen bg-[#000212]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white mb-2">Analitik Raporu</h1>
                        <p className="text-slate-400">Kampanyalarınızın performansını detaylı inceleyin.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#1C1C1E] border border-white/10 rounded-lg text-white text-sm font-bold flex items-center gap-2 hover:bg-white/5">
                            <Calendar size={16} className="text-slate-400" /> Son 7 Gün
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <KpiCard title="Toplam Gösterim" value="124,592" change="+12.5%" trend="up" />
                    <KpiCard title="Tıklama Oranı (CTR)" value="4.2%" change="+0.8%" trend="up" />
                    <KpiCard title="Dönüşümler" value="1,845" change="-2.1%" trend="down" />
                    <KpiCard title="Kazanılan Gelir" value="₺45,230" change="+8.4%" trend="up" />
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Traffic Chart */}
                    <div className="lg:col-span-2 bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6">Trafik ve Dönüşüm Trendi</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={DATA_VISITORS}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="visits" stroke="#F59E0B" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Device Breakdown */}
                    <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6">Cihaz Dağılımı</h3>
                        <div className="space-y-6">
                            {DATA_DEVICES.map((item) => (
                                <div key={item.name}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
                                            {item.name === 'Masaüstü' && <Monitor size={16} />}
                                            {item.name === 'Mobil' && <Smartphone size={16} />}
                                            {item.name === 'Tablet' && <Globe size={16} />}
                                            {item.name}
                                        </span>
                                        <span className="text-white font-bold">{item.value}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <span className="text-brand-orange font-bold">İpucu:</span> Mobil trafiğiniz geçen haftaya göre %5 arttı. Mobil öncelikli kampanyalar oluşturmayı deneyin.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}

function KpiCard({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) {
    return (
        <div className="bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-white">{value}</span>
                <span className={`text-xs font-bold flex items-center gap-1 px-2 py-1 rounded-full ${trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {change}
                </span>
            </div>
        </div>
    );
}
