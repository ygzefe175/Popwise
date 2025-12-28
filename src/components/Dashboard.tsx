"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, AlertOctagon, MessageSquare, MousePointerClick, ArrowUpRight, Ban, Loader2, CheckCircle2, MoreHorizontal, Calendar, ArrowRight, Eye } from 'lucide-react';
import clsx from 'clsx';

// --- Utility: Number Ticker Animation ---
const NumberTicker = ({ value, delay = 0 }: { value: string | number, delay?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    const isPercentage = typeof value === 'string' && value.includes('%');
    const isCurrency = typeof value === 'string' && value.includes('₺');

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = numericValue / steps;

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                start += increment;
                if (start >= numericValue) {
                    start = numericValue;
                    clearInterval(interval);
                }
                setDisplayValue(start);
            }, stepTime);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [numericValue, delay]);

    const formatted = displayValue.toLocaleString('en-US', { maximumFractionDigits: (numericValue % 1 === 0) ? 0 : 1 });

    return (
        <span>
            {isCurrency ? '₺' : ''}{formatted}{isPercentage ? '%' : ''}
        </span>
    );
};

// --- Sub-Component: Area Chart (SVG) ---
const AreaChart = () => {
    // Generate some smooth random data
    const points = [20, 45, 30, 60, 55, 80, 70, 95, 85, 120, 100, 140];
    const max = Math.max(...points);
    const width = 1000;
    const height = 200;

    // Create path d string
    const pathD = points.map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - (p / max) * height; // Invert Y
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const fillPath = `${pathD} L ${width} ${height} L 0 ${height} Z`;

    return (
        <div className="w-full h-[200px] relative overflow-hidden group">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/5"></div>
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/5 border-t border-dashed border-white/5"></div>

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={fillPath} fill="url(#gradient)" className="opacity-0 lg:opacity-100 animate-fade-in duration-1000 delay-500" />
                <path d={pathD} fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-draw-stroke" />
            </svg>

            {/* Hover Indicator (Simulated) */}
            <div className="absolute top-[30%] left-[60%] w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded border border-white/10 whitespace-nowrap z-10">
                    248 Ziyaretçi
                </div>
            </div>
        </div>
    );
};


const StatCard = ({ label, value, trend, sub, positive, delay }: { label: string, value: string, trend?: string, sub?: string, positive?: boolean, delay?: number }) => (
    <div className="premium-card p-6 rounded-2xl cursor-default group hover:bg-white/[0.02] flex flex-col justify-between h-full min-h-[140px] animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
        <div className="flex justify-between items-start mb-4">
            <div className="text-slate-500 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                {label}
            </div>
            {trend && (
                <div className={clsx("flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border transition-colors",
                    positive
                        ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30"
                        : "bg-red-500/5 text-red-500 border-red-500/20 group-hover:bg-red-500/10 group-hover:border-red-500/30"
                )}>
                    {positive ? <ArrowUpRight size={10} strokeWidth={3} /> : <TrendingUp size={10} className="rotate-180" strokeWidth={3} />}
                    {trend}
                </div>
            )}
        </div>
        <div>
            <div className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-100 transition-colors tabular-nums">
                <NumberTicker value={value} delay={delay} />
            </div>
            {sub && <div className="text-slate-500 text-xs font-medium flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-slate-500 transition-colors" />{sub}</div>}
        </div>
    </div>
);

const SuggestionCard = ({ text, type, onApply }: { text: string, type: 'critical' | 'info' | 'idea', onApply?: () => void }) => (
    <div className={clsx("p-4 rounded-xl border-l-[3px] flex items-start gap-4 transition-all hover:bg-white/5 animate-fade-in group relative overflow-hidden",
        type === 'critical' ? "border-red-500 bg-red-500/5" :
            type === 'idea' ? "border-amber-500 bg-amber-500/5" :
                "border-indigo-500 bg-indigo-500/5"
    )}>
        <div className={clsx("mt-0.5 shrink-0",
            type === 'critical' ? "text-red-400" :
                type === 'idea' ? "text-amber-400" :
                    "text-indigo-400"
        )}>
            {type === 'critical' ? <AlertOctagon size={18} /> :
                type === 'idea' ? <TrendingUp size={18} /> :
                    <MessageSquare size={18} />}
        </div>
        <div className="flex-1 relative z-10">
            <h4 className={clsx("font-semibold text-xs uppercase tracking-wider mb-1",
                type === 'critical' ? "text-red-400" :
                    type === 'idea' ? "text-amber-400" :
                        "text-indigo-400"
            )}>
                {type === 'critical' ? 'Kritik Uyarı' : type === 'idea' ? 'Büyüme Fırsatı' : 'Sistem Önerisi'}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-3">{text}</p>
            {onApply && (
                <button
                    onClick={onApply}
                    className="text-xs font-medium flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity border-b border-transparent hover:border-white/20 pb-0.5"
                >
                    Otomatik Uygula <ArrowRight size={10} />
                </button>
            )}
        </div>
    </div>
);

export default function Dashboard() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [suggestions, setSuggestions] = useState<{ id: number; type: 'critical' | 'info' | 'idea'; text: string }[]>([
        { id: 1, type: 'idea', text: "'Kararsız' kitleye 'Şimdi almazsan tükeniyor' mesajı gösterirsen dönüşüm %5 artabilir." },
        { id: 2, type: 'critical', text: "Ziyaretçilerin %20'si 'Pahalı' diyor. Onlara çıkışta özel %5 indirim tanımla." },
        { id: 3, type: 'info', text: "Gece 00:00-02:00 arası 'Aceleci' kitle artıyor. Sayaçlı pop-up modunu aç." }
    ]);
    const [appliedIds, setAppliedIds] = useState<number[]>([]);

    useEffect(() => {
        // Simulate random AI analysis happening
        const interval = setInterval(() => {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
            }, 2000);
        }, 12000);

        return () => clearInterval(interval);
    }, []);

    const handleApplyAll = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setAppliedIds(suggestions.map(s => s.id));
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="w-full h-full text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

            <div className="p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Genel Bakış</h2>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider animate-fade-in delay-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Canlı
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm">Son 30 günlük conversion ve davranış analizi.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center bg-[#0F1117] border border-white/5 rounded-lg px-1 p-1">
                            <button className="px-3 py-1 text-xs font-medium text-white bg-white/10 rounded-md shadow-sm">30 Gün</button>
                            <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-300">7 Gün</button>
                            <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-300">24 Saat</button>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-colors flex items-center gap-2">
                            <Calendar size={14} /> Tarih
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Analiz Edilen Ziyaretçi" value="12,240" trend="240" sub="Son 24 saat" positive={true} delay={0} />
                    <StatCard label="Dönüşüm Oranı" value="%4.2" trend="0.8%" sub="Geçen haftaya göre" positive={true} delay={100} />
                    <StatCard label="Kurtarılan Satış" value="₺42,850" trend="12.5%" sub="Bu ay" positive={true} delay={200} />
                    <StatCard label="Vazgeçme Oranı" value="%64" trend="2%" sub="Ortalamanın altında" positive={false} delay={300} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content: Layout Shift */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Chart Container */}
                        <div className="premium-card p-6 rounded-xl relative overflow-hidden animate-slide-up animation-delay-300 transition-all hover:border-white/10">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-semibold text-white text-lg">Ziyaretçi Trafiği</h3>
                                    <p className="text-xs text-slate-500 mt-1">Son 24 saatteki site yoğunluğu.</p>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            <AreaChart />
                        </div>

                        {/* Sub Stats Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="premium-card p-5 rounded-xl flex items-center gap-4 animate-slide-up animation-delay-400 group">
                                <div className="p-3 rounded-xl bg-red-500/10 text-red-500 group-hover:scale-110 transition-transform"><Ban size={22} /></div>
                                <div>
                                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">En Çok Kayıp</div>
                                    <div className="text-white font-bold text-lg">Ödeme Sayfası</div>
                                    <div className="text-xs text-slate-500 mt-1">Kargo ücreti görünce <span className="text-red-400 font-bold">%62</span> çıkıyor.</div>
                                </div>
                            </div>
                            <div className="premium-card p-5 rounded-xl flex items-center gap-4 animate-slide-up animation-delay-500 group">
                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform"><MousePointerClick size={22} /></div>
                                <div>
                                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">En Çok Tıklanan</div>
                                    <div className="text-white font-bold text-lg">"Risk Yok" Mesajı</div>
                                    <div className="text-xs text-slate-500 mt-1">Güven arayanların <span className="text-emerald-400 font-bold">%18'i</span> dönüyor.</div>
                                </div>
                            </div>
                        </div>

                        {/* Live Visitor Table (Mini) */}
                        <div className="premium-card rounded-xl overflow-hidden animate-slide-up animation-delay-500">
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0F1117]">
                                <h3 className="font-semibold text-white text-sm">Canlı Ziyaretçiler</h3>
                                <span className="text-xs text-emerald-400 flex items-center gap-1"><Eye size={12} /> 4 kişi bakıyor</span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {[
                                    { ip: "85.110.*.*", page: "/pricing", tag: "Fiyat Odaklı", time: "2dk", status: "orange" },
                                    { ip: "176.240.*.*", page: "/demo", tag: "Kararsız", time: "45sn", status: "indigo" },
                                    { ip: "212.156.*.*", page: "/", tag: "Yeni", time: "10sn", status: "slate" },
                                ].map((row, i) => (
                                    <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-white/[0.02] transition-colors text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono text-slate-400 border border-white/5">
                                                {row.ip.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{row.page}</div>
                                                <div className="text-slate-500 text-xs">{row.ip}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={clsx("text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1",
                                                row.status === 'orange' ? "bg-amber-500/10 text-amber-500" :
                                                    row.status === 'indigo' ? "bg-indigo-500/10 text-indigo-500" : "bg-slate-700/30 text-slate-400"
                                            )}>{row.tag}</div>
                                            <div className="text-slate-600 text-[10px]">{row.time} önce</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar: AI Suggestions */}
                    <div className="space-y-4 flex flex-col h-full animate-slide-up animation-delay-200">
                        <div className="premium-card p-6 h-full flex flex-col relative overflow-hidden ring-1 ring-indigo-500/20">
                            {/* Decorative Background for AI */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none"></div>

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                    AI Asistanı
                                </h3>
                                {isAnalyzing && (
                                    <span className="text-[10px] text-indigo-400 flex items-center gap-1 animate-pulse font-mono">
                                        <Loader2 size={10} className="animate-spin" /> İŞLENİYOR...
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar relative z-10">
                                {suggestions.map((suggestion) => (
                                    <div key={suggestion.id} className={clsx("transition-all duration-500", appliedIds.includes(suggestion.id) ? "opacity-30 grayscale" : "opacity-100")}>
                                        <SuggestionCard
                                            type={suggestion.type}
                                            text={suggestion.text}
                                            onApply={() => !appliedIds.includes(suggestion.id) && setAppliedIds([...appliedIds, suggestion.id])}
                                        />
                                    </div>
                                ))}

                                {appliedIds.length > 0 && (
                                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-400 text-xs font-medium animate-fade-in">
                                        <CheckCircle2 size={14} />
                                        {appliedIds.length} öneri başarıyla uygulandı.
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-white/5 mt-auto relative z-10">
                                <button
                                    onClick={handleApplyAll}
                                    disabled={isAnalyzing || appliedIds.length === suggestions.length}
                                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2"
                                >
                                    {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <MousePointerClick size={16} />}
                                    {appliedIds.length === suggestions.length ? 'Tümü Uygulandı' : 'Önerileri Uygula'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
