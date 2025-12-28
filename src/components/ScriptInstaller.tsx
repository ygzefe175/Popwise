"use client";

import React, { useState } from 'react';
import { Copy, Check, Code2, Globe } from 'lucide-react';
import clsx from 'clsx';

interface ScriptInstallerProps {
    userId: string;
    onCopy?: () => void;
}

export default function ScriptInstaller({ userId, onCopy }: ScriptInstallerProps) {
    const [copied, setCopied] = useState(false);

    // Get the base URL for the embed script
    const baseUrl = typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';

    // Production-ready embed code
    const scriptCode = `<!-- PoopUp Conversion System -->
<script src="${baseUrl}/api/pixel?id=${userId || 'YOUR_API_KEY'}" async></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(scriptCode);
        setCopied(true);
        if (onCopy) onCopy(); // Trigger the callback
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl overflow-hidden shadow-lg mb-8 animate-fade-in">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Code2 className="text-brand-orange" size={24} />
                        Kurulum Kodunuz
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                        Bu kodu sitenizin <code className="bg-white/10 px-1.5 py-0.5 rounded text-white text-xs font-mono">&lt;head&gt;</code> etiketleri arasına yapıştırın.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                        <Globe size={14} />
                        Pixel Hazır
                    </div>
                </div>
            </div>

            <div className="p-6 bg-[#0F1117]">
                <div className="relative group">
                    <pre className="font-mono text-sm text-slate-300 bg-[#090a0d] p-6 rounded-xl border border-white/10 overflow-x-auto selection:bg-indigo-500/30">
                        <code>{scriptCode}</code>
                    </pre>

                    <button
                        onClick={handleCopy}
                        className={clsx(
                            "absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg",
                            copied
                                ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                : "bg-white text-black hover:bg-brand-orange hover:text-black shadow-white/10"
                        )}
                    >
                        {copied ? (
                            <>
                                <Check size={16} /> Kopyalandı
                            </>
                        ) : (
                            <>
                                <Copy size={16} /> Kodu Kopyala
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></div>
                    <p>Wordpress, Wix, Shopify ve tüm diğer altyapılarla %100 uyumludur.</p>
                </div>
            </div>
        </div>
    );
}
