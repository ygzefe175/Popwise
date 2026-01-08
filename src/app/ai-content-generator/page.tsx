"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIContentGenerator from '@/components/AIContentGenerator';
import PremiumGate from '@/components/PremiumGate';

/**
 * AI Content Generator Sayfası
 * Landing page içerikleri üretmek için kullanıcı arayüzü
 * Premium özellik - giriş yapmamış kullanıcılar 3 ücretsiz hak alır
 */
export default function AIContentGeneratorPage() {
    return (
        <main className="min-h-screen font-sans overflow-x-hidden bg-[#000212]">
            <Navbar />
            <div className="py-20 px-6">
                <PremiumGate
                    feature="ai-content"
                    showPreview={false}
                >
                    <AIContentGenerator />
                </PremiumGate>
            </div>
            <Footer />
        </main>
    );
}


