import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO } from '../data/cleaningData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Title Wordmark */}
          <a href="#" className="flex items-center group py-2" aria-label="سفن كلين 7 Clean">
            <BrandLogo size="md" />
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a
              href="#services"
              className="hover:text-sky-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:right-0 after:transition-all"
            >
              خدمات التنظيف
            </a>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                onOpenCalculator();
              }}
              className="hover:text-sky-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:right-0 after:transition-all flex items-center gap-1.5 text-sky-700"
            >
              <Sparkles className="w-4 h-4 text-sky-500" />
              حاسبة الأسعار الفورية
            </a>
            <a
              href="#packages"
              className="hover:text-sky-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:right-0 after:transition-all"
            >
              باقات التشطيب والمصانع
            </a>
            <a
              href="#before-after"
              className="hover:text-sky-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:right-0 after:transition-all"
            >
              قبل وبعد التنظيف
            </a>
            <a
              href="#testimonials"
              className="hover:text-sky-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:right-0 after:transition-all"
            >
              آراء العملاء
            </a>
            <a
              href="#contact"
              className="hover:text-sky-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-600 after:absolute after:bottom-0 after:right-0 after:transition-all"
            >
              التواصل والمواقع
            </a>
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3">
            {/* Direct Phone Dial */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 whitespace-nowrap"
              title="اتصال هاتفي مباشر"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-mono tabular-nums text-sm font-semibold">{COMPANY_INFO.phoneDisplay}</span>
            </a>

            {/* WhatsApp Fast Link */}
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين، أرغب بالاستفسار عن خدمات التنظيف')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>واتساب سريع</span>
            </a>

            {/* Primary Action Button: Book Now */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg transition-colors shadow-xs hover:shadow-md whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>احجز موعدك</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              خدمات التنظيف
            </a>
            <a
              href="#calculator"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="px-3 py-2 rounded-md hover:bg-sky-50 text-sky-700 flex items-center justify-between"
            >
              <span>حاسبة التكلفة الفورية</span>
              <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">جرّب الآن</span>
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              باقات التشطيب والمصانع
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              قبل وبعد التنظيف
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              آراء العملاء
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-slate-100"
            >
              التواصل وقنوات السوشيال
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white font-bold rounded-lg text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>اتصال مباشر: {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين، أرغب بحجز خدمة تنظيف')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold rounded-lg text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب فورية</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
