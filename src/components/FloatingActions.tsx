import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/cleaningData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Speed Dials (Desktop & Tablet) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex flex-col gap-3">
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-white text-slate-700 hover:text-sky-600 border border-slate-300 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105"
            aria-label="الرجوع للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct Call */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
          title={`اتصال: ${COMPANY_INFO.phoneDisplay}`}
          aria-label="اتصال هاتفي"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Direct WhatsApp */}
        <a
          href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين، أود حجز خدمة تنظيف')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
          title="واتساب مباشر"
          aria-label="محادثة واتساب"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Mobile Sticky Bar (Strictly <= 15% mobile viewport height constraint) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        {/* Quick Call */}
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex-1 py-2 px-2 bg-slate-900 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-sky-400" />
          <span>اتصال: {COMPANY_INFO.phoneDisplay}</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين، أود حجز خدمة تنظيف')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-2 bg-emerald-600 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>واتساب فوري</span>
        </a>

        {/* Quick Booking */}
        <button
          onClick={onOpenBooking}
          className="py-2 px-3 bg-sky-600 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1 whitespace-nowrap"
        >
          <span>احجز</span>
        </button>
      </div>
    </>
  );
};
