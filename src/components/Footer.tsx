import React from 'react';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO } from '../data/cleaningData';
import { Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo size="md" light />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              شركة <strong className="text-white">سفن كلين 7 Clean</strong> المتخصصة في خدمات التنظيف العميق والشامل للمنازل، الفلل، المصانع، الباريكات، وتنظيف ما بعد البناء والتشطيب في المملكة الأردنية الهاشمية.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              عَمّان · الزرقاء · إربد · السلط · البحر الميت
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  خدمات التنظيف
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  حاسبة الأسعار التقديرية
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  باقات ما بعد التشطيب والمصانع
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-white transition-colors">
                  معرض قبل وبعد
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  آراء وتقييمات العملاء
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">اتصال مباشر</h4>
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono tabular-nums text-sm font-bold text-white">{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>واتساب: {COMPANY_INFO.phoneDisplay}</span>
              </a>
              <p className="text-slate-500 text-[11px]">
                {COMPANY_INFO.workingHours}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} سفن كلين 7 Clean. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href={COMPANY_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              فيسبوك
            </a>
            <span aria-hidden="true">·</span>
            <a href={COMPANY_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              إنستغرام
            </a>
            <span aria-hidden="true">·</span>
            <a href={COMPANY_INFO.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              تيك توك
            </a>
            <span aria-hidden="true">·</span>
            <a href={COMPANY_INFO.messengerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              ماسنجر
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
