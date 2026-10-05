import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowLeft, CheckCircle2, Shield, Sparkles, Building, Factory, Home, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/cleaningData';

interface HeroProps {
  onOpenBooking: (servicePreset?: string) => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenCalculator }) => {
  const [activeTab, setActiveTab] = useState<'fitout' | 'industrial' | 'home'>('fitout');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Subtle Background Geometry */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Hero Copy - 7 Columns */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Editorial Category Kicker (Unboxed metadata with subtle separator) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-800 tracking-wide">
              <span>شركة تنظيف معتمدة في الأردن</span>
              <span aria-hidden="true">·</span>
              <span>عَمّان وكافة المحافظات</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 inline" />
                جاهزية فورية للفرش
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.18] [text-wrap:balance]">
              نظافة شاملة بمواصفات عالمية للمنازل، المصانع، وما بعد التشطيب.
            </h1>

            {/* Concrete Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              فريق <strong className="text-slate-900 font-bold">سفن كلين 7 Clean</strong> المتخصص في تنظيف المباني بعد انتهاء البناء والديكور لإزالة بقايا الإسمنت والدهانات والجبس، وغسيل المصانع والباريكات والهناجر الكبرى، وتنظيف الكنب والسجاد بالبخار الحار لتسليم عقارك جاهزاً تماماً للفرش والاستخدام.
            </p>

            {/* Bullet Proof Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>إزالة رواسب الدهان والجبس دون خدش الأرضيات</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ماكينات غسيل صناعية متطورة للباريكات والمستودعات</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>حقن وبخار إيطالي للكنب والسجاد مع تجفيف فائق</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>طاقم أردني مدرب ومؤتمن مع مشرف ميداني</span>
              </div>
            </div>

            {/* Action Group */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              {/* Primary Booking Button */}
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-base shadow-sm hover:shadow-md transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>احجز موعد تنظيف الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Price Calculator CTA */}
              <button
                onClick={onOpenCalculator}
                className="px-5 py-3.5 bg-white hover:bg-slate-100 text-sky-700 font-bold rounded-xl text-sm border border-sky-200 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>احسب التكلفة التقديرية</span>
              </button>

              {/* Instant WhatsApp Direct */}
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين، أريد الاستفسار عن حجز خدمة تنظيف لموقعي')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب مباشر</span>
              </a>
            </div>

            {/* Direct Phone Trust Line */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-500">
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <Phone className="w-4 h-4 text-sky-600" />
                اتصل بنا هاتفياً مباشرة:
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="font-mono tabular-nums text-base font-extrabold text-sky-700 hover:underline dir-ltr inline-block"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
              <span className="text-slate-400">·</span>
              <span className="text-emerald-700 font-medium">رد فوري خلال دقائق</span>
            </div>

          </div>

          {/* Focal Carrier Card - 5 Columns */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 relative">
              
              {/* Card Header & Interactive Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">سفن كلين الميداني</h3>
                  <p className="text-xs text-slate-500">تجهيز العقار من الأساس إلى الفرش</p>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('fitout')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      activeTab === 'fitout' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ما بعد التشطيب
                  </button>
                  <button
                    onClick={() => setActiveTab('industrial')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      activeTab === 'industrial' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    مصانع وباريكات
                  </button>
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      activeTab === 'home' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    منازل وبخار
                  </button>
                </div>
              </div>

              {/* Dynamic Tab Visual Panel */}
              {activeTab === 'fitout' && (
                <div className="space-y-4">
                  <div className="h-48 sm:h-56 rounded-xl bg-gradient-to-tr from-sky-900 via-sky-800 to-slate-900 p-5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-500/20 rounded-full blur-xl" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase bg-white/20 px-2 py-1 rounded tracking-wide backdrop-blur-xs">
                        جاهزية تسليم المفتاح
                      </span>
                      <Building className="w-6 h-6 text-sky-300" />
                    </div>

                    <div className="space-y-1.5 relative z-10">
                      <h4 className="text-xl font-bold">تسليم فيلا أو شقة جاهزة للفرش</h4>
                      <p className="text-xs text-sky-100 leading-relaxed">
                        نزع التلزيق والحماية، إزالة بقع الدهان والترويب من السيراميك، شفط الغبار الدقيق من النوافذ والمطابخ.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-sky-200">
                      <span>المدة المتوقعة: 4 – 8 ساعات</span>
                      <span className="font-bold text-white">ضمان الرضا 100%</span>
                    </div>
                  </div>

                  {/* Checklist Summary */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between font-bold text-slate-900 pb-1 border-b border-slate-200">
                      <span>خطة العمل المعتمدة:</span>
                      <span className="text-sky-600">طاقم مجهز بمكائن ثقيلة</span>
                    </div>
                    <p className="leading-relaxed">
                      1. قشط دهان الأرضيات ومجاري الألمنيوم بمعدات متخصصة.
                    </p>
                    <p className="leading-relaxed">
                      2. جلي وتلميع بالبخار وماكينات السنجل ديسك الإيطالية.
                    </p>
                    <p className="leading-relaxed">
                      3. تعقيم شامل للمطابخ وخزائن الملابس والحمامات لتستلم وأنت مطمئن.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBooking('post-construction')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>طلب معاينة أو حجز ما بعد التشطيب</span>
                  </button>
                </div>
              )}

              {activeTab === 'industrial' && (
                <div className="space-y-4">
                  <div className="h-48 sm:h-56 rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-950 p-5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-200 px-2 py-1 rounded tracking-wide">
                        قطاع المصانع والهناجر
                      </span>
                      <Factory className="w-6 h-6 text-amber-400" />
                    </div>

                    <div className="space-y-1.5 relative z-10">
                      <h4 className="text-xl font-bold">تنظيف مستودعات وباريكات شاسعة</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        غسيل أرضيات الإيبوكسي من الزيوت والشحوم، تنظيف الهياكل المعدنية والأسقف والجمالونات بمعدات السلامة.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-slate-300">
                      <span>مكائن ركوب 250 بار</span>
                      <span className="font-bold text-amber-300">مرونة العمل ليلاً</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between font-bold text-slate-900 pb-1 border-b border-slate-200">
                      <span>مواصفات التنظيف الصناعي:</span>
                      <span className="text-sky-600">معدات حماية شخصية (PPE)</span>
                    </div>
                    <p className="leading-relaxed">
                      • مذيبات دهون عضوية معتمدة لا تضر طبقة الإيبوكسي.
                    </p>
                    <p className="leading-relaxed">
                      • تنظيف خطوط الإنتاج والباريكات اللوجستية قبل الفحص والترخيص.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBooking('industrial-warehouses')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>طلب معاينة ميدانية للمصنع أو الباريكة</span>
                  </button>
                </div>
              )}

              {activeTab === 'home' && (
                <div className="space-y-4">
                  <div className="h-48 sm:h-56 rounded-xl bg-gradient-to-tr from-sky-800 via-teal-800 to-slate-900 p-5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase bg-emerald-500/20 text-emerald-200 px-2 py-1 rounded tracking-wide">
                        بخار حار وتعقيم
                      </span>
                      <Home className="w-6 h-6 text-emerald-300" />
                    </div>

                    <div className="space-y-1.5 relative z-10">
                      <h4 className="text-xl font-bold">غسيل أطقم الكنب والسجاد</h4>
                      <p className="text-xs text-teal-100 leading-relaxed">
                        ماكينة حقن وشفط إيطالية فورية لإزالة البقع المستعصية والروائح وتعقيم الأنسجة بحرارة 120° مئوية.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs text-teal-200">
                      <span>جفاف سريع: 2–3 ساعات</span>
                      <span className="font-bold text-white">معطرات فرنسية</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between font-bold text-slate-900 pb-1 border-b border-slate-200">
                      <span>نتائج التنظيف المنزلي:</span>
                      <span className="text-emerald-600">آمن تماماً للأطفال والحيوانات</span>
                    </div>
                    <p className="leading-relaxed">
                      • إزالة بقع القهوة والشوكولاتة والدهون دون تغيير ملمس النسيج.
                    </p>
                    <p className="leading-relaxed">
                      • تعقيم وسائد الكنب والموكيت وسحب الأتربة العميقة.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBooking('steam-upholstery')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>حجز موعد غسيل الكنب والسجاد بالبخار</span>
                  </button>
                </div>
              )}

              {/* Direct Instant Trust Callout */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  مواعيد دقيقة والتزام كامل
                </span>
                <span className="font-bold text-slate-700">عَمّان · الزرقاء · إربد · السلط</span>
              </div>

            </div>
          </div>

        </div>

        {/* Quantified Metrics Band (Claim-to-Proof Adjacency) */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              +1,850
            </div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">عقار ومنشأة تم تسليمها بنجاح</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">جاهزية فورية للفرش والسكن</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
              24/7
            </div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">جاهزية لمشاريع المصانع والشركات</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              0790222197
            </div>
            <div className="text-xs sm:text-sm text-slate-500 font-medium">خط خدمة العملاء والحجز المباشر</div>
          </div>
        </div>

      </div>
    </section>
  );
};
