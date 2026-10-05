import React from 'react';
import { Check, Shield, ArrowLeft, Star, Phone, MessageCircle } from 'lucide-react';
import { PACKAGES, COMPANY_INFO } from '../data/cleaningData';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-800 tracking-wide">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>باقات النظافة المتكاملة</span>
            <span aria-hidden="true">·</span>
            <span>حلول تسليم المفتاح للأفراد والمؤسسات</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            باقات مخصصة تضمن تسليم منشأتك على أكمل وجه
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            اختر الباقة الأنسب لعقارك، من الشقق الجديدة بعد الدهان والجبس وحتى الهناجر والمصانع الشاسعة.
          </p>
        </div>

        {/* Packages 3-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 relative ${
                pkg.popular
                  ? 'border-sky-600 ring-2 ring-sky-600/30 bg-gradient-to-b from-sky-50/50 to-white shadow-lg lg:-translate-y-2'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 bg-sky-600 text-white text-xs font-bold rounded-full shadow-xs">
                  الباقة الأكثر طلباً في الأردن
                </div>
              )}

              <div>
                {/* Header */}
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{pkg.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{pkg.subtitle}</p>
                  <div className="text-lg font-black text-sky-700 font-mono">
                    {pkg.price}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-3 mb-8">
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA Button */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectPackage(pkg.title)}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`مرحباً سفن كلين، أود الاستفسار عن تفاصيل ${pkg.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>استفسار واتساب عن هذه الباقة</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* B2B / Industrial Assurance Notice */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold">
              <Shield className="w-4 h-4" />
              <span>عقود تنظيف للشركات والمصانع والباريكات</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold">
              هل تدير مستودعاً أو مصنعاً أو مجمعاً تجارياً بمساحة تزيد عن 1,000م²؟
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              نوفر زيارة ميدانية مجانية للمهندس المشرف لتقييم الأعمال وتقديم عرض سعر رسمي مفصل مطابق لمتطلبات الدفاع المدني والسلامة العامة.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>اتصل بالمشرف الميداني</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
