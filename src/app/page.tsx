import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationStack from '@/components/NotificationStack';
import Testimonials from '@/components/Testimonials';
import ProblemSolution from '@/components/ProblemSolution';
import ROICalculator from '@/components/ROICalculator';
import LiveStats from '@/components/LiveStats';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import { ArrowRight, Check, Zap, MousePointer2, Sparkles, Building2, ShieldCheck, Mail, Target, Rocket, Clock } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen font-sans overflow-x-hidden selection:bg-brand-orange/30">
      <Navbar />
      <NotificationStack />
      <LiveStats />

      {/* 1️⃣ HERO SECTION (EN KRİTİK) */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6 drop-shadow-xl">
            Sitenizden Ayrılanları <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-200">
              Müşteriye Dönüştürün
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Ziyaretçilerinizi anlamayan pop-up'ları unutun. <span className="text-white font-bold">Popwise</span>, yapay zekasıyla terk etme anını yakalar ve her 4 ziyaretçiden 1'ini satın almaya ikna eder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
            <Link href="/register" className="btn-primary py-4 px-12 text-xl shadow-[0_6px_0_0_#D97706] hover:translate-y-[1px] hover:shadow-[0_4px_0_0_#D97706] group flex items-center gap-3 justify-center">
              Ücretsiz Başla <span className="text-xs opacity-70 font-medium">(Kart Gerekmez)</span>
            </Link>
            <Link href="/demo" className="btn-secondary py-4 px-12 text-xl flex items-center gap-2 justify-center border-white/20 hover:bg-white/10">
              Canlı Demo <ArrowRight size={20} className="opacity-50" />
            </Link>
          </div>

          {/* 2️⃣ ANINDA GÜVEN VEREN SOSYAL KANIT */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-y border-white/5 py-8 w-full max-w-4xl opacity-80">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">4.000+</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Site Kullanıyor</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-brand-orange">%27+</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Dönüşüm Artışı</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white">3 Dakika</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hızlı Kurulum</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ NEDEN POPWISEE? (FARK BÖLÜMÜ) */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-orange font-bold text-xs uppercase tracking-[0.2em] mb-4">Neden Popwise?</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Karmaşık Rakiplerin Aksine <br /> Hafif, Akıllı ve Sonuç Odaklı</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="text-yellow-400" />,
                title: "Sıfır Yavaşlama",
                desc: "Sadece 8kb boyutuyla sitenizin PageSpeed skorunu etkilemez, anında yüklenir."
              },
              {
                icon: <Target className="text-brand-orange" />,
                title: "Exit-Intent 2.0",
                desc: "Sadece mouse hareketini değil, ziyaretçinin davranışsal psikolojisini analiz eder."
              },
              {
                icon: <ShieldCheck className="text-emerald-400" />,
                title: "Türkçe Destek",
                desc: "Global araçların aksine Türkiye pazarını ve yerel e-ticaret dinamiklerini bilir."
              },
              {
                icon: <Rocket className="text-blue-400" />,
                title: "Fiyat Avantajı",
                desc: "Aylık yüksek abonelikler yerine, büyüyen işletmelere uygun şeffaf fiyatlandırma."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange/20 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 shadow-lg">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ CANLI DEMO'YU SATIŞA BAĞLA (Customized Section) */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-brand-orange to-amber-600 p-1 md:p-1.5 shadow-2xl">
          <div className="bg-[#000212] rounded-[22px] p-8 md:p-12 flex flex-col items-center text-center">
            <Sparkles className="text-brand-orange mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Bu Teknolojiyi Kendi Sitenizde <br /> Görmek İster misiniz?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl">
              Demo sayfamızda gördüğünüz tüm akıllı özellikleri tek bir satır kodla kendi sitenizde aktifleştirebilirsiniz.
            </p>
            <Link href="/register" className="btn-primary py-4 px-12 text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
              Aynısını Kur
            </Link>
          </div>
        </div>
      </section>

      {/* 5️⃣ KULLANIM SENARYOLARI */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">Tek Platform <br /> Sınırsız Senaryo</h2>
              <div className="space-y-6">
                {[
                  { t: "E-Ticaret Dönüşümü", d: "Sepeti terk edenlere özel kuponlar sunarak %15 ek ciro yaratın.", i: <Zap size={20} /> },
                  { t: "E-Posta Listesi Büyütme", d: "Ziyaretçileri rahatsız etmeden en doğru anda mail listenize katın.", i: <Mail size={20} /> },
                  { t: "Exit-Intent (Çıkış Anı)", d: "Siteden tam çıkacakken 'Dur, Bu Fırsatı Kaçırma' diyerek yakalayın.", i: <MousePointer2 size={20} /> },
                  { t: "Kampanya Duyuru", d: "Yeni ürün veya indirimleri en yüksek görünürlükle tüm siteye duyurun.", i: <Sparkles size={20} /> }
                ].map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">{s.i}</div>
                    <div>
                      <h4 className="font-bold text-white text-base mb-1">{s.t}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-3xl border border-white/10 p-2 overflow-hidden shadow-2xl">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#0A0B14] flex items-center justify-center">
                <div className="w-64 bg-white rounded-2xl p-6 shadow-2xl text-slate-900 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                  <div className="text-xs font-bold text-brand-orange mb-2 italic">POPWISSEE ÖZEL</div>
                  <h4 className="text-xl font-black mb-2 tracking-tight">Gitmeden Önce Bak! 🎁</h4>
                  <p className="text-xs text-slate-500 mb-6">Şu an sepete eklersen %15 anlık indirim senin olur. Kod: <span className="text-black font-black">SAVE15</span></p>
                  <div className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold text-center">İndirimi Kullan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ GÜÇLÜ SOSYAL KANIT (DETAY) */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Popwise Gerçekten İşliyor mu?</h2>
            <p className="text-slate-400">Rakamlarla konuşan bazı mutlu kullanıcılarımız:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "Ahmet Erten", r: "Giyim Mağazası Sahibi", q: "Reklam verip getirdiğim trafiğin %70'i geri dönmemek üzere gidiyordu. Popwise ile sepet terklerini %22 oranında azalttım.", s: "+120 Satış/Ay" },
              { n: "Selin Yılmaz", r: "Eğitim Girişimcisi", q: "Mail listemi büyütmekte zorlanıyordum. Akıllı tetikleyici sayesinde ilk ayda 1.400 yeni abone kazandım.", s: "%31 Liste Artışı" },
              { n: "Oğuzhan Kaya", r: "E-Ticaret Ajansı", q: "Müşteri sitelerimizde kullandığımız tek araç. Kurulum 3 dakika, sonuçlar ise ilk günden itibaren ekranda.", s: "9x ROI Getirisi" }
            ].map((t, i) => (
              <div key={i} className="bg-[#0A0B14] p-8 rounded-2xl border border-white/5 relative">
                <div className="text-brand-orange font-black text-4xl absolute top-4 right-8 opacity-20">"</div>
                <div className="text-sm font-bold text-emerald-400 mb-4 bg-emerald-400/10 inline-block px-3 py-1 rounded-full">{t.s}</div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-8">"{t.q}"</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
                  <div>
                    <p className="font-bold text-white text-sm">{t.n}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7️⃣ RİSKİ SIFIRLAYAN KAPANIŞ */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full text-brand-orange text-xs font-bold mb-8 uppercase tracking-widest leading-none">
          Risk Payı Sıfır
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
          Satış Kaybetmeyi Bugün Durdurun.
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          Kredi kartı istemiyoruz. Kurulum dakikalar sürer. İstediğiniz zaman iptal edebilirsiniz. Tek yapmanız gereken bir hesap oluşturmak.
        </p>
        <div className="flex flex-col items-center">
          <Link href="/register" className="btn-primary inline-flex text-2xl px-16 py-5 shadow-2xl shadow-brand-orange/30 hover:scale-105 active:scale-95 transition-all">
            Hemen Ücretsiz Başla 👉
          </Link>
          <div className="mt-8 flex gap-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> Kredi Kartı Yok</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-500" /> Hızlı Kurulum</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
