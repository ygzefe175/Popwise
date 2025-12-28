import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationStack from '@/components/NotificationStack';
import Dashboard from '@/components/Dashboard';
import Testimonials from '@/components/Testimonials';
import ProblemSolution from '@/components/ProblemSolution';
import ROICalculator from '@/components/ROICalculator';
import LiveStats from '@/components/LiveStats';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import { ArrowRight, Check, Zap, MousePointer2, Sparkles, Building2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange/30">
      <Navbar />
      <NotificationStack />
      <LiveStats />

      {/* Hero Section - Reduced Padding and Font Sizes */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
            Ziyaretçilerinizi satışa çevirmenin en hızlı yolu.
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6 drop-shadow-xl">
            Saniyeler İçinde <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-200">
              Satışları Artırın
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Exit-intent ve akıllı pop-up'larla terk eden ziyaretçileri yakalayın.
            <span className="text-white font-bold block mt-1"> 3 dakikada kurulum, anlık dönüşüm artışı.</span>
          </p>

          <div className="flex flex-col items-center gap-5 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/register" className="btn-primary py-4 px-10 text-lg shadow-[0_6px_0_0_#D97706] hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#D97706] group flex items-center gap-3 justify-center">
                Ücretsiz Başla <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo" className="btn-secondary py-4 px-10 text-lg flex items-center gap-2 justify-center border-white/20 hover:bg-white/10">
                Canlı Demo
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Check className="text-emerald-500" size={14} /> Kredi Kartı Gerekmez
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                <Check className="text-emerald-500" size={14} /> 3 Ücretsiz Pop-up
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution Flow - Compact */}
      <div className="scale-95 origin-top">
        <ProblemSolution />
      </div>

      {/* Trust & Social Proof - Compact */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-3">Güvenilir Ortağınız</p>
              <h2 className="text-3xl font-bold text-white mb-4">4,000+ Girişimci PoopUp Kullanıyor</h2>
              <p className="text-slate-400 text-base mb-6">
                Dünya çapında binlerce site, ziyaretçilerini kaybetmek yerine onlara değer katan teklifler sunarak büyüyor.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#000212] bg-slate-800 flex items-center justify-center font-bold text-[10px]`}>
                      U{i}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#000212] bg-brand-orange text-black flex items-center justify-center font-bold text-[10px]">
                    +4k
                  </div>
                </div>
                <div className="text-xs font-bold">
                  <span className="text-white">4.9/5</span> <span className="text-slate-500">Kullanıcı Memnuniyeti</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex gap-1 text-amber-500 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-base text-slate-200 font-medium mb-4 italic leading-relaxed">
                "PoopUp'ı kurduğum ilk gece 3 tane sepet terkini satışa çevirdim. Aylık reklam maliyetimin yarısını o gece geri kazandım."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                <div>
                  <p className="font-bold text-white text-sm">Caner Bakıcı</p>
                  <p className="text-xs text-slate-500">TechLabs Kurucusu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Reduced Header */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-orange font-bold text-xs uppercase mb-3">Gerçek Sonuçlar</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Müşterilerimizin Hikayeleri</h2>
          </div>
          <div className="scale-95">
            <Testimonials showStats={true} />
          </div>
        </div>
      </section>

      {/* How It Works - Compact Steps */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">3 Basit Adımda Başla</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { n: 1, t: "Şablon Seç", d: "Dönüşüm odaklı tasarımlardan birini seçin.", c: "brand-orange" },
              { n: 2, t: "Özelleştir", d: "Metin ve renkleri markanıza uyarlayın.", c: "blue-400" },
              { n: 3, t: "Yayına Al", d: "Kodunuzu ekleyin ve izlemeye başlayın.", c: "emerald-400" }
            ].map((s) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl bg-${s.c}/10 border border-${s.c}/20 flex items-center justify-center text-${s.c} font-black text-xl mb-6`}>{s.n}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Comparison - Compact */}
      <div className="scale-95 origin-top -mt-10">
        <ROICalculator />
        <ComparisonTable />
      </div>

      <FAQ />

      {/* Final CTA - Much Smaller */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
          Satış Kaybetmeyi <br /> Bugün Durdurun.
        </h2>
        <div className="flex flex-col items-center">
          <Link href="/register" className="btn-primary inline-flex text-xl px-12 py-4 shadow-xl shadow-brand-orange/20">
            Ücretsiz Başlat
          </Link>
          <p className="mt-6 text-slate-500 text-sm font-bold flex items-center gap-2">
            <Sparkles className="text-brand-orange" size={16} /> 3 dakikada kurulum. Kredi kartı yok.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
