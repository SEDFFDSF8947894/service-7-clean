import React, { useState } from 'react';
import { MapPin, ChevronDown, CheckCircle, ShieldCheck, Zap, HeartHandshake, Sparkles } from 'lucide-react';
import { FAQ_LIST, COMPANY_INFO } from '../data/cleaningData';

export const CoverageAreas: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-600" />,
      title: 'أمانة تامة وكادر مدرب',
      desc: 'طاقم عمل أردني محترف ومؤتمن يخضع للفحص والتدريب المستمر، مع مشرف ميداني يراقب سير العمل خطوة بخطوة.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      title: 'ماكينات ومعدات حديثة',
      desc: 'نستخدم جلايات Klindex وماكينات حقن وبخار Santoemma الإيطالية ومكانس هيبا لضمان شفط أدق ذرات الغبار الإنشائي.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      title: 'جاهزية فورية للفرش والسكن',
      desc: 'نسلمك العقار بعد إزالة كامل اللواصق والدهان والترويب، مع تعقيم الخزائن والمطابخ بحيث تستطيع إدخال أثاثك فوراً.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-indigo-600" />,
      title: 'ضمان الرضا 100%',
      desc: 'معاينة واستلام رسمي للموقع مع العميل، وإذا كان هناك أي ملاحظة يقوم الفريق بمعالجتها فوراً دون أي تكلفة إضافية.'
    }
  ];

  const ammanDistricts = [
    'دابوق', 'عبدون', 'الصويفية', 'خلدا', 'تلاع العلي', 'الجبيهة', 'الشميساني', 
    'أم أذينة', 'دير غبار', 'صويلح', 'شفا بدران', 'أبو نصير', 'طبربور', 'مرج الحمام', 
    'البيادر', 'سحاب والمناطق الصناعية', 'المقابلين', 'طريق المطار'
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Four Pillars of Excellence */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-800 tracking-wide">
              <span>لماذا سفن كلين 7 Clean؟</span>
              <span aria-hidden="true">·</span>
              <span>المعادلة الذهبية للنظافة الاحترافية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              أربع ركائز تجعلنا الخيار الأول لعملائنا في الأردن
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Jordan Regional Coverage Grid */}
        <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-sky-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-sky-400 block tracking-wide">
              تغطية جغرافية سريعة ومباشرة
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              أينما كنت في الأردن، طاقم سفن كلين يصلك بكامل معداته
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              نوفر سيارات نقل مجهزة بطواقم متكاملة، ماكينات جلي، ومعدات بخار حار، لتلبية طلبات النظافة في عمّان خلال ساعات، مع تغطية مستمرة للمحافظات والمجمعات الصناعية.
            </p>

            <div className="pt-4">
              <h4 className="text-xs font-bold text-white mb-2.5">أبرز مناطق عمّان التي نخدمها يومياً:</h4>
              <div className="flex flex-wrap gap-2">
                {ammanDistricts.map((district, dIdx) => (
                  <span
                    key={dIdx}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-sky-200 border border-white/10"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-sky-300">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <MapPin className="w-4 h-4 text-emerald-400" />
                المحافظات الأخرى:
              </span>
              <span>الزرقاء والمنطقة الحرة</span>
              <span aria-hidden="true">·</span>
              <span>إربد ومحافظات الشمال</span>
              <span aria-hidden="true">·</span>
              <span>السلط والفحيص</span>
              <span aria-hidden="true">·</span>
              <span>مادبا والبحر الميت</span>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              الأسئلة الشائعة حول خدمات سفن كلين
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              إليك إجابات لأكثر التساؤلات التي يطرحها عملاؤنا قبل الحجز
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_LIST.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === fIdx ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {openFaq === fIdx && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
