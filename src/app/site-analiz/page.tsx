"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SiteAnaliz from '@/components/SiteAnaliz';
import PremiumGate from '@/components/PremiumGate';

/**
 * Site Analiz Sayfası
 * Viral paylaşım potansiyeli olan SEO ve site analiz aracı
 * Ücretsiz kullanıcılar: 2 analiz/ay, Pro: 20, Growth: Sınırsız
 */
export default function SiteAnalizPage() {
    return (
        <main className="min-h-screen font-sans overflow-x-hidden bg-[#000212]">
            <Navbar />
            <div className="py-20 px-6">
                <PremiumGate
                    feature="site-analiz"
                    showPreview={false}
                >
                    <SiteAnaliz />
                </PremiumGate>
            </div>
            <Footer />
        </main>
    );
}

