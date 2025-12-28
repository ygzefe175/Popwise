"use client";

import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

interface Notification {
    id: number;
    logo: string; // Emoji veya text logo
    iconBg: string;
    title: string;
    message: string;
    time: string;
    delay: number;
}

const notifications: Notification[] = [
    {
        id: 1,
        logo: '💳',
        iconBg: '#6366F1',
        title: 'Mert Güler Katıldı',
        message: 'Profesyonel Paket satın alımı tamamlandı.',
        time: 'şimdi',
        delay: 3000
    },
    {
        id: 2,
        logo: '📈',
        iconBg: '#10B981',
        title: 'Harika Haber! 🔥',
        message: 'Bir ziyaretçi sepetini terk etmekten vazgeçti.',
        time: '1dk',
        delay: 15000
    },
    {
        id: 3,
        logo: '🏬',
        iconBg: '#3B82F6',
        title: 'İndirim Hazır',
        message: 'Sepetini bırakanlara otomatik teklifler iletildi.',
        time: 'şimdi',
        delay: 28000
    },
    {
        id: 4,
        logo: '💡',
        iconBg: '#F59E0B',
        title: 'AI Önerisi',
        message: "Kampanya süresini uzatırsanız dönüşüm artabilir.",
        time: 'şimdi',
        delay: 42000
    },
    {
        id: 5,
        logo: '🚀',
        iconBg: '#06B6D4',
        title: 'Hız Analizi: %99.9',
        message: 'Akıllı script sitenizi yavaşlatmadan çalışıyor.',
        time: 'şimdi',
        delay: 55000
    }
];

const NotificationCard = ({ notification, onClose }: { notification: Notification, onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, notification.delay);
        return () => clearTimeout(timer);
    }, [notification.delay]);

    if (!isVisible) return null;

    return (
        <div
            onClick={onClose}
            className={clsx(
                "group relative flex items-start gap-3 p-3 pr-6 rounded-xl bg-[#1C1C1E] border border-white/5 shadow-xl w-full mb-3 transform transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) hover:bg-[#27272a] cursor-pointer hover:border-white/10 sm:gap-3.5 sm:p-3.5 sm:pr-6 sm:hover:translate-x-[-5px]",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px] pointer-events-none"
            )}
        >
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg sm:w-10 sm:h-10 sm:text-xl"
                style={{ backgroundColor: notification.iconBg }}
            >
                {notification.logo}
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-start justify-between mb-0.5 sm:mb-1">
                    <h4 className="text-[13px] font-bold text-white leading-tight truncate sm:text-sm">{notification.title}</h4>
                    <span className="text-[9px] text-slate-500 font-bold ml-2 whitespace-nowrap sm:text-[10px]">{notification.time}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug font-medium line-clamp-2 sm:text-xs">
                    {notification.message}
                </p>
            </div>

            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-slate-500 font-bold px-1 rounded bg-black/20">
                KAPAT
            </div>
        </div>
    );
};

export default function NotificationStack() {
    const [visibleNotifications, setVisibleNotifications] = useState<number[]>(
        notifications.map(n => n.id)
    );

    const handleClose = (id: number) => {
        setVisibleNotifications(prev => prev.filter(nId => nId !== id));
    };

    return (
        <div className="fixed top-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-[320px] pointer-events-none sm:w-[320px]">
            <div className="pointer-events-auto flex flex-col items-end">
                {notifications
                    .filter(n => visibleNotifications.includes(n.id))
                    .map(notification => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                            onClose={() => handleClose(notification.id)}
                        />
                    ))
                }
            </div>
        </div>
    );
}
