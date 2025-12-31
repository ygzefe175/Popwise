import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-[#000212]">
            <div className="max-w-7xl mx-auto px-6 gap-12 flex flex-col">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 font-black text-2xl text-white tracking-tight mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
                            </span>
                            Popwise
                        </Link>
                        <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                            Web sitenizi terk eden ziyaretçileri saniyeler içinde müşteriye dönüştüren, en kolay ve güçlü pop-up platformu.
                        </p>

                        {/* Company Info */}
                        <div className="space-y-3 mb-6 text-sm text-slate-500">
                            <p className="font-semibold text-slate-400">Popwise Teknoloji A.Ş.</p>
                            <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>Maslak, Sarıyer / İstanbul</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} />
                                <a href="mailto:hello@popwise.com" className="hover:text-brand-orange transition-colors">
                                    hello@popwise.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} />
                                <span>+90 (212) 123 45 67</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a href="https://twitter.com/popwise" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-white">𝕏</a>
                            <a href="https://linkedin.com/company/popwise" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-white">in</a>
                            <a href="https://instagram.com/popwise" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-slate-400 hover:text-white">📷</a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Ürün</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/demo" className="hover:text-brand-orange transition-colors">Özellikler</Link></li>
                            <li><Link href="/pricing" className="hover:text-brand-orange transition-colors">Fiyatlandırma</Link></li>
                            <li><Link href="/demo" className="hover:text-brand-orange transition-colors">Canlı Demo</Link></li>
                            <li><Link href="/register" className="hover:text-brand-orange transition-colors">Şablonlar</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Destek</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/docs" className="hover:text-brand-orange transition-colors">Dokümantasyon</Link></li>
                            <li><Link href="/faq" className="hover:text-brand-orange transition-colors">Sıkça Sorulanlar</Link></li>
                            <li><a href="mailto:hello@popwise.com" className="hover:text-brand-orange transition-colors">İletişim</a></li>
                            <li><Link href="/dashboard" className="hover:text-brand-orange transition-colors">Sistem Durumu</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Yasal</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/privacy" className="hover:text-brand-orange transition-colors">Gizlilik Politikası</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-orange transition-colors">Kullanım Şartları</Link></li>
                            <li><Link href="/kvkk" className="hover:text-brand-orange transition-colors">KVKK Aydınlatma</Link></li>
                            <li><Link href="/cookies" className="hover:text-brand-orange transition-colors">Çerez Politikası</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-slate-500 text-sm">© 2024 Popwise Teknoloji A.Ş. Tüm hakları saklıdır.</p>
                        <p className="text-slate-600 text-xs">Türkiye'de 🇹🇷 tasarlandı ve geliştirildi.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Tüm sistemler çalışıyor</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
