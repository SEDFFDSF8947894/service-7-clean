import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, Calendar, Check, Info, Sparkles, Building2, Factory, Home, Armchair, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/cleaningData';

interface PriceCalculatorProps {
  onBookWithEstimate: (estimateSummary: {
    serviceName: string;
    area: number;
    price: string;
    details: string;
  }) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onBookWithEstimate }) => {
  const [serviceType, setServiceType] = useState<'fitout' | 'industrial' | 'home' | 'sofa' | 'marble'>('fitout');
  const [areaSize, setAreaSize] = useState<number>(140);
  const [rooms, setRooms] = useState<number>(3);
  const [sofaSets, setSofaSets] = useState<number>(1);
  const [includeMarblePolish, setIncludeMarblePolish] = useState<boolean>(false);
  const [includeSteamSofa, setIncludeSteamSofa] = useState<boolean>(false);
  const [includeHighGlass, setIncludeHighGlass] = useState<boolean>(true);
  const [city, setCity] = useState<string>('عَمّان');

  // Realistic calculation engine based on Jordan market rates (in JOD)
  const calculation = useMemo(() => {
    let basePrice = 0;
    let minPrice = 0;
    let maxPrice = 0;
    let estimatedHours = '4 - 6 ساعات';
    let suggestedStaff = '3 عمال + مشرف';
    let serviceLabel = '';

    if (serviceType === 'fitout') {
      serviceLabel = 'تنظيف ما بعد التشطيب والبناء';
      // Average 0.40 - 0.60 JOD per sqm in Amman for turnkey post-construction
      const rate = areaSize > 300 ? 0.38 : 0.45;
      basePrice = Math.round(areaSize * rate);
      if (basePrice < 45) basePrice = 45; // Minimum callout
      minPrice = Math.round(basePrice * 0.9);
      maxPrice = Math.round(basePrice * 1.15);
      estimatedHours = areaSize > 250 ? '6 - 9 ساعات' : '4 - 6 ساعات';
      suggestedStaff = areaSize > 300 ? '5 عمال + مشرف وماكينة سنجل' : '3 عمال + مشرف ومكائن هيبا';
    } else if (serviceType === 'industrial') {
      serviceLabel = 'تنظيف مصنع أو هنجر أو باريكة';
      const rate = areaSize > 600 ? 0.25 : 0.35;
      basePrice = Math.round(areaSize * rate);
      if (basePrice < 90) basePrice = 90;
      minPrice = Math.round(basePrice * 0.85);
      maxPrice = Math.round(basePrice * 1.2);
      estimatedHours = 'يوم عمل كامل / وردية خاصة';
      suggestedStaff = 'طاقم صناعي + ماكينة ركوب صناعية';
    } else if (serviceType === 'home') {
      serviceLabel = 'تنظيف عميق لشقة أو فيلا مفروشة';
      basePrice = 35 + rooms * 8 + (areaSize > 150 ? (areaSize - 150) * 0.15 : 0);
      minPrice = Math.round(basePrice * 0.9);
      maxPrice = Math.round(basePrice * 1.15);
      estimatedHours = '3 - 5 ساعات';
      suggestedStaff = '2 - 3 عمال مع مواد تعقيم';
    } else if (serviceType === 'sofa') {
      serviceLabel = 'غسيل كنب وسجاد بالبخار الحار';
      basePrice = sofaSets * 25;
      minPrice = basePrice;
      maxPrice = basePrice + 10;
      estimatedHours = '2 - 3 ساعات (وجفاف خلال ساعتين)';
      suggestedStaff = 'فني ماكينة بخار إيطالية متخصص';
    } else if (serviceType === 'marble') {
      serviceLabel = 'جلي وتلميع رخام بالكريستال والألماس';
      const rate = 1.35;
      basePrice = Math.round(areaSize * rate);
      if (basePrice < 60) basePrice = 60;
      minPrice = Math.round(basePrice * 0.92);
      maxPrice = Math.round(basePrice * 1.15);
      estimatedHours = '5 - 8 ساعات حسب حالة الفواصل';
      suggestedStaff = 'معلم جلي إيطالي + ماكينة كليندكس';
    }

    // Addons
    let addonsTotal = 0;
    if (includeMarblePolish && serviceType !== 'marble') {
      addonsTotal += Math.round(areaSize * 0.6);
    }
    if (includeSteamSofa && serviceType !== 'sofa') {
      addonsTotal += 25;
    }
    if (includeHighGlass) {
      addonsTotal += 15;
    }

    const finalMin = minPrice + addonsTotal;
    const finalMax = maxPrice + addonsTotal;

    return {
      serviceLabel,
      finalMin,
      finalMax,
      estimatedHours,
      suggestedStaff,
      priceRangeString: `${finalMin} – ${finalMax} دينار أردني`,
      addonsSelected: [
        includeMarblePolish && serviceType !== 'marble' ? 'تلميع رخام وكريستال' : null,
        includeSteamSofa && serviceType !== 'sofa' ? 'غسيل طقم كنب بالبخار' : null,
        includeHighGlass ? 'تلميع زجاج وواجهات' : null,
      ].filter(Boolean) as string[],
    };
  }, [serviceType, areaSize, rooms, sofaSets, includeMarblePolish, includeSteamSofa, includeHighGlass]);

  const handleSendToWhatsApp = () => {
    const text = `السلام عليكم شركة سفن كلين 7 Clean،
أرغب بطلب عرض سعر وحجز بناءً على الحاسبة الفورية:
• الخدمة: ${calculation.serviceLabel}
• المساحة: ${areaSize} م² (الغرف: ${rooms})
• المدينة: ${city}
• الإضافات: ${calculation.addonsSelected.length > 0 ? calculation.addonsSelected.join(' + ') : 'بدون إضافات'}
• التقدير في الموقع: ${calculation.priceRangeString}
• الطاقم المقترح: ${calculation.suggestedStaff}

يرجى التواصل معي لتأكيد الموعد والمعاينة.`;

    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookNow = () => {
    onBookWithEstimate({
      serviceName: calculation.serviceLabel,
      area: areaSize,
      price: calculation.priceRangeString,
      details: `المساحة: ${areaSize}م² | الإضافات: ${calculation.addonsSelected.join(', ') || 'أساسي'}`,
    });
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-800 tracking-wide">
            <Calculator className="w-4 h-4 text-sky-600" />
            <span>حاسبة التكلفة الفورية والشفافة</span>
            <span aria-hidden="true">·</span>
            <span>دينار أردني (JOD)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            احسب التكلفة التقديرية لنظافة عقارك في ثوانٍ
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            حدد نوع العقار والمساحة والخدمات الإضافية للحصول على تقدير فوري شفاف مع خطة عمل واضحة وإمكانية تأكيد الطلب مباشرة عبر الواتساب.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column - 7 Cols */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* Step 1: Select Service Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                1. اختر نوع الخدمة المطلوبة:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                
                <button
                  type="button"
                  onClick={() => {
                    setServiceType('fitout');
                    if (areaSize < 80) setAreaSize(140);
                  }}
                  className={`p-3 text-right rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'fitout'
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mb-2 ${serviceType === 'fitout' ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">ما بعد التشطيب</div>
                    <div className="text-[11px] text-slate-500">للفلل والشقق الجديدة</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setServiceType('industrial');
                    if (areaSize < 300) setAreaSize(500);
                  }}
                  className={`p-3 text-right rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'industrial'
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Factory className={`w-5 h-5 mb-2 ${serviceType === 'industrial' ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">مصانع وباريكات</div>
                    <div className="text-[11px] text-slate-500">هناجر ومستودعات</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setServiceType('home');
                    if (areaSize > 300) setAreaSize(150);
                  }}
                  className={`p-3 text-right rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'home'
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Home className={`w-5 h-5 mb-2 ${serviceType === 'home' ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">منازل وفلل مفروشة</div>
                    <div className="text-[11px] text-slate-500">تنظيف عميق دوري</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('sofa')}
                  className={`p-3 text-right rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'sofa'
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Armchair className={`w-5 h-5 mb-2 ${serviceType === 'sofa' ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">كنب وسجاد بالبخار</div>
                    <div className="text-[11px] text-slate-500">حقن واستخلاص حار</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('marble')}
                  className={`p-3 text-right rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'marble'
                      ? 'border-sky-600 bg-sky-50/80 text-sky-950 ring-1 ring-sky-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <ShieldCheck className={`w-5 h-5 mb-2 ${serviceType === 'marble' ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-bold">جلي وتلميع رخام</div>
                    <div className="text-[11px] text-slate-500">معالجة بالكريستال</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Area / Size Slider or count */}
            {serviceType !== 'sofa' ? (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900">
                    2. المساحة التقريبية للعقار:
                  </label>
                  <span className="text-base font-extrabold text-sky-700 font-mono tabular-nums bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
                    {areaSize} متر مربع (م²)
                  </span>
                </div>
                <input
                  type="range"
                  min={serviceType === 'industrial' ? 200 : 50}
                  max={serviceType === 'industrial' ? 3000 : 800}
                  step={serviceType === 'industrial' ? 50 : 10}
                  value={areaSize}
                  onChange={(e) => setAreaSize(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>{serviceType === 'industrial' ? '200 م²' : '50 م² (شقة صغيرة)'}</span>
                  <span>{serviceType === 'industrial' ? '1,500 م²' : '300 م² (فيلا)'}</span>
                  <span>{serviceType === 'industrial' ? '3,000+ م² (هنجر ضخم)' : '800 م² (قصر)'}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900">
                    2. عدد أطقم الكنب أو الصالونات:
                  </label>
                  <span className="text-base font-extrabold text-sky-700 font-mono tabular-nums bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
                    {sofaSets} {sofaSets === 1 ? 'طقم كامل' : 'أطقم'}
                  </span>
                </div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSofaSets(num)}
                      className={`flex-1 py-2 rounded-lg font-bold text-sm border transition-colors cursor-pointer ${
                        sofaSets === num
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Room breakdown for residential */}
            {serviceType === 'home' && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">عدد الغرف والصالونات:</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-7 h-7 bg-slate-200 rounded text-slate-700 font-bold hover:bg-slate-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-7 h-7 bg-slate-200 rounded text-slate-700 font-bold hover:bg-slate-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Add-on Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-900">
                3. خدمات إضافية ترغب بإدراجها:
              </label>

              {serviceType !== 'marble' && (
                <label className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMarblePolish}
                    onChange={(e) => setIncludeMarblePolish(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800">إضافة جلي وتلميع رخام وكريستال إيطالي</span>
                    <span className="text-slate-500 block">إزالة الخدوش وتلميع زجاجي عاكس</span>
                  </div>
                </label>
              )}

              {serviceType !== 'sofa' && (
                <label className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSteamSofa}
                    onChange={(e) => setIncludeSteamSofa(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800">إضافة غسيل طقم كنب بالبخار الحار في الموقع</span>
                    <span className="text-slate-500 block">تعقيم حراري وسحب بقع فورية</span>
                  </div>
                </label>
              )}

              <label className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHighGlass}
                  onChange={(e) => setIncludeHighGlass(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800">تلميع شامل لواجهات الزجاج والألمنيوم الداخلية والخارجية</span>
                  <span className="text-slate-500 block">نزع اللواصق وتلميع مجاري النوافذ بدقة</span>
                </div>
              </label>
            </div>

            {/* City Selection */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800">المحافظة / المدينة في الأردن:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {COMPANY_INFO.cityCoverage.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Result Estimate Summary Card - 5 Cols */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs text-sky-400 font-bold block">ملخص التقدير الفوري</span>
                <h3 className="text-lg font-bold text-white">سفن كلين 7 Clean</h3>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30">
                تسليم معتمد
              </span>
            </div>

            {/* Big Price Display */}
            <div className="space-y-2 mb-6">
              <span className="text-xs text-slate-300">التكلفة التقديرية المتوقعة:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-sky-400 font-mono tabular-nums">
                  {calculation.finalMin} – {calculation.finalMax}
                </span>
                <span className="text-base font-bold text-white">دينار أردني</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                * السعر تقديري ويتم تثبيته بعد المعاينة الميدانية المجانية للمساحات الكبرى بدون أي رسوم خفية.
              </p>
            </div>

            {/* Breakdown Specification */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2.5 text-xs text-slate-300 mb-6">
              <div className="flex justify-between">
                <span>الخدمة الأساسية:</span>
                <span className="font-bold text-white">{calculation.serviceLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>المساحة المحسوبة:</span>
                <span className="font-mono text-white">{areaSize} م²</span>
              </div>
              <div className="flex justify-between">
                <span>الوقت المقدر للإنجاز:</span>
                <span className="text-white">{calculation.estimatedHours}</span>
              </div>
              <div className="flex justify-between">
                <span>الطاقم والمعدات:</span>
                <span className="text-white">{calculation.suggestedStaff}</span>
              </div>
              {calculation.addonsSelected.length > 0 && (
                <div className="pt-2 border-t border-white/10 text-sky-300">
                  <span>الإضافات المشمولة: {calculation.addonsSelected.join(' + ')}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>إرسال التقدير وحجز موعد عبر الواتساب</span>
              </button>

              <button
                type="button"
                onClick={handleBookNow}
                className="w-full py-3 bg-white/15 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>تثبيت الموعد واستكمال تفاصيل الموقع</span>
              </button>
            </div>

            {/* Guarantee note */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>فحص واستلام ميداني قبل مغادرة الفريق للموقع</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
