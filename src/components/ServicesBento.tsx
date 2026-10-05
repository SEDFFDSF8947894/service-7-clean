import React, { useState } from 'react';
import { Building2, Factory, Sparkles, Home, ShieldCheck, Landmark, Check, ArrowLeft, Wrench } from 'lucide-react';
import { SERVICES_LIST } from '../data/cleaningData';
import { ServiceItem } from '../types';

interface ServicesBentoProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-sky-600" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-cyan-600" />;
      case 'Landmark':
        return <Landmark className="w-6 h-6 text-teal-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-800 tracking-wide">
            <span>منظومة الخدمات الشاملة</span>
            <span aria-hidden="true">·</span>
            <span>أعلى معايير النظافة الإنشائية والتجارية والمنزلية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            خدمات متخصصة تُنفذ بأحدث الماكينات والمواد المعتمدة
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            سواء كانت منشأتك مصنعاً ضخماً، باريكة تخزين، فيلا جديدة بحاجة لنظافة ما بعد التشطيب، أو كنب صالونك يحتاج لتجديد فندقي، فريق سفن كلين على أتم الاستعداد.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, index) => {
            const isFeatured = index === 0 || index === 1; // Marquee capabilities

            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between relative group ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1 border-t-4 border-t-sky-600' : ''
                }`}
              >
                {/* Badge if present */}
                {service.badge && (
                  <span className="absolute top-4 left-4 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    {service.badge}
                  </span>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:scale-105 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">{service.title}</h3>
                      <span className="text-[11px] font-mono text-slate-400 block tracking-wide">
                        {service.englishTitle}
                      </span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Checklist Highlights */}
                  <div className="space-y-2 mb-5">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Equipment highlights */}
                  <div className="pt-3 border-t border-slate-100 mb-5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                      <Wrench className="w-3.5 h-3.5 text-sky-600" />
                      <span>المعدات المستخدمة:</span>
                    </div>
                    <p className="text-slate-600">{service.equipment.join(' · ')}</p>
                  </div>
                </div>

                {/* Price hint & Action button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">تسعيرة الخدمة:</span>
                    <span className="text-xs font-bold text-sky-700">{service.basePriceHint}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      التفاصيل
                    </button>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>احجز</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedService.title}</h3>
                <span className="text-xs text-slate-500 font-mono">{selectedService.englishTitle}</span>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase">ما يشمله العمل بالتفصيل:</h4>
              <ul className="space-y-1.5">
                {selectedService.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-sky-50 rounded-xl p-3 border border-sky-100 text-xs text-sky-900">
              <span className="font-bold block mb-1">الموصى به لـ:</span>
              <p>{selectedService.recommendedFor}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  const sId = selectedService.id;
                  setSelectedService(null);
                  onSelectService(sId);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg"
              >
                حجز هذه الخدمة الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
