import React, { useState } from 'react';
import { Plus, Trash2, Power, MousePointer2 } from 'lucide-react';
import { Popup } from '@/hooks/usePopups';
import CreateCampaignModal from './CreateCampaignModal';
import clsx from 'clsx';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface CampaignListProps {
    popups: Popup[];
    loading: boolean;
    createPopup: (name: string, headline: string, subtext: string, cta: string, position: 'center' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'top_center' | 'bottom_center', type: string) => Promise<any>;
    deletePopup: (id: string) => Promise<void>;
    togglePopupStatus: (id: string, currentStatus: boolean) => Promise<void>;
}

export default function CampaignList({ popups, loading, createPopup, deletePopup, togglePopupStatus }: CampaignListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreate = async (name: string, headline: string, subtext: string, cta: string, position: 'center' | 'top_right' | 'top_left' | 'bottom_right' | 'bottom_left' | 'top_center' | 'bottom_center', type: string) => {
        await createPopup(name, headline, subtext, cta, position, type);
        setIsModalOpen(false);
    };

    if (loading) return <div className="text-white text-center py-10">Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-white">Kampanyalarım</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-brand-orange transition-colors"
                >
                    <Plus size={18} /> Yeni Kampanya
                </button>
            </div>

            {popups.length === 0 ? (
                <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto flex items-center justify-center text-slate-500 mb-4">
                        <MousePointer2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Henüz Bir Kampanyanız Yok</h3>
                    <p className="text-slate-400 max-w-sm mx-auto mb-8">Hemen ilk pop-up kampanyanızı oluşturun ve dönüşümleri artırmaya başlayın.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 bg-brand-orange text-black font-bold rounded-xl hover:brightness-110 transition-all"
                    >
                        İlk Kampanyayı Oluştur
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popups.map((popup) => (
                        <div key={popup.id} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className={clsx("px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                                    popup.is_active ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
                                )}>
                                    {popup.is_active ? 'Aktif' : 'Pasif'}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => togglePopupStatus(popup.id, popup.is_active)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                                        title={popup.is_active ? "Durdur" : "Başlat"}
                                    >
                                        <Power size={16} />
                                    </button>
                                    <button
                                        onClick={() => deletePopup(popup.id)}
                                        className="p-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 text-red-500"
                                        title="Sil"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-white text-lg mb-1">{popup.name}</h3>
                            <p className="text-xs text-slate-500 mb-4 font-mono">
                                {format(new Date(popup.created_at), 'd MMMM yyyy, HH:mm', { locale: tr })}
                            </p>

                            <div className="bg-[#0F1117] rounded-xl p-4 border border-white/5">
                                <p className="text-sm font-bold text-white mb-1">{popup.headline}</p>
                                <p className="text-xs text-slate-400 truncate">{popup.subtext}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateCampaignModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
}
