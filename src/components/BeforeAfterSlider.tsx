import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { BEFORE_AFTER_ITEMS } from '../data/cleaningData';

export const BeforeAfterSlider: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100

  const activeCase = BEFORE_AFTER_ITEMS[selectedCaseIndex];

  return (
    <section id="before-after" className="py-16 sm:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-800 tracking-wide">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>معرض النتائج الواقعية</span>
            <span aria-hidden="true">·</span>
            <span>فرق النظافة قبل وبعد بالعين المجردة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            شاهد الفرق الحقيقي مع فريق سفن كلين
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            حرّك المؤشر لمشاهدة التحوّل الجذري من آثار البناء ورواسب الباطون والدهان والزيوت إلى أسطح كريستالية معقمة جاهزة للفرش.
          </p>

          {/* Case Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {BEFORE_AFTER_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg border transition-all cursor-pointer ${
                  selectedCaseIndex === idx
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.category}: {item.title.split(' ')[0]} {item.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Frame */}
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
          
          {/* Main Visual Arena with Slider */}
          <div className="relative h-72 sm:h-96 md:h-[420px] select-none overflow-hidden">
            
            {/* "AFTER" Clean Surface (Background Base) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-950 via-slate-900 to-sky-900 flex items-center justify-center p-6 text-center">
              {/* Stylized Pristine Clean Architectural Illustration */}
              <div className="w-full h-full border border-sky-400/20 rounded-xl relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
                {/* Tile grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                
                {/* Clean reflection glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-sky-500/20 via-transparent to-transparent" />
                <div className="absolute -top-24 left-1/3 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-3 p-6 max-w-md">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>النتيجة بعد تنظيف سفن كلين</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white">{activeCase.title}</h4>
                  <p className="text-xs sm:text-sm text-sky-200 leading-relaxed font-medium">
                    {activeCase.afterLabel}
                  </p>
                  <div className="inline-block text-xs font-mono bg-sky-900/60 text-sky-300 px-3 py-1 rounded-md border border-sky-700/50">
                    {activeCase.afterStats}
                  </div>
                </div>
              </div>
            </div>

            {/* "BEFORE" Dusty / Dirty Surface (Clipped via Slider width) */}
            <div
              className="absolute inset-y-0 right-0 bg-gradient-to-tr from-stone-900 via-amber-950/70 to-stone-950 border-l-2 border-white flex items-center justify-center overflow-hidden transition-all duration-75"
              style={{ width: `${100 - sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-950/95">
                {/* Dusty concrete pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 space-y-3 p-6 max-w-md">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                    <span>الحالة قبل التنظيف</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-stone-200">{activeCase.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-medium">
                    {activeCase.beforeLabel}
                  </p>
                  <div className="inline-block text-xs font-mono bg-stone-900 text-amber-400 px-3 py-1 rounded-md border border-amber-900/50">
                    {activeCase.beforeStats}
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none -ml-4"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-1 h-full bg-white relative flex items-center justify-center shadow-lg">
                <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-xl border border-slate-300 pointer-events-auto cursor-ew-resize">
                  <Sliders className="w-4 h-4 text-sky-600" />
                </div>
              </div>
            </div>

            {/* Slider Drag Input Range (Invisible overlay to enable touch/mouse scrubbing) */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
              aria-label="مؤشر المقارنة بين قبل وبعد"
            />
          </div>

          {/* Bottom Card Bar */}
          <div className="p-4 sm:p-5 bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sky-400">ملاحظة الخبير الميداني:</span>
              <span className="text-slate-400 max-w-xl">{activeCase.description}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSelectedCaseIndex((prev) => (prev > 0 ? prev - 1 : BEFORE_AFTER_ITEMS.length - 1))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                title="السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {selectedCaseIndex + 1} / {BEFORE_AFTER_ITEMS.length}
              </span>
              <button
                onClick={() => setSelectedCaseIndex((prev) => (prev < BEFORE_AFTER_ITEMS.length - 1 ? prev + 1 : 0))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                title="التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
