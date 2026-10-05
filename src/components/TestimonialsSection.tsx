import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, MapPin } from 'lucide-react';
import { TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/cleaningData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('عَمّان');
  const [newService, setNewService] = useState('تنظيف ما بعد التشطيب');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: Testimonial = {
      id: `t-${Date.now()}`,
      name: newName.trim(),
      role: 'عميل معتمد',
      location: newLocation,
      rating: newRating,
      date: 'اليوم',
      serviceUsed: newService,
      comment: newComment.trim(),
    };

    setTestimonials([newRev, ...testimonials]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddForm(false);
      setNewName('');
      setNewComment('');
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 tracking-wide">
              <span>تجارب حقيقية موثقة</span>
              <span aria-hidden="true">·</span>
              <span>تقييمات عملاء سفن كلين في الأردن</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              ماذا يقول عملاؤنا بعد استلام عقاراتهم نظيفة تماماً؟
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              نفخر بثقة أصحاب المنازل والمهندسين ومدراء المصانع والمستودعات في عمّان وباقي المحافظات.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-sky-700 font-bold rounded-xl border border-sky-200 text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-2xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-sky-600" />
            <span>{showAddForm ? 'إخفاء نموذج التقييم' : 'أضف تقييمك وتجربتك'}</span>
          </button>
        </div>

        {/* Add Review Form Modal / Collapse */}
        {showAddForm && (
          <div className="mb-10 bg-white p-6 sm:p-8 rounded-2xl border border-sky-200 shadow-sm transition-all max-w-2xl mx-auto">
            {submittedSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">شكراً جزيلاً لتقييمك!</h4>
                <p className="text-xs text-slate-500">تمت إضافة تقييمك مباشرة بنجاح. نقدر ثقتك بفريق سفن كلين.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-base font-bold text-slate-900">شاركنا تجربتك مع سفن كلين</h4>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكريم:</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="مثال: م. أحمد التميمي"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">المدينة / المنطقة:</label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="مثال: عَمّان - الجبيهة"
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الخدمة التي طلبتها:</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="تنظيف ما بعد التشطيب">تنظيف ما بعد التشطيب</option>
                    <option value="تنظيف مصنع أو هنجر أو باريكة">تنظيف مصنع أو هنجر أو باريكة</option>
                    <option value="غسيل كنب وسجاد بالبخار">غسيل كنب وسجاد بالبخار</option>
                    <option value="تنظيف فيلا أو شقة سكنية">تنظيف فيلا أو شقة سكنية</option>
                    <option value="جلي وتلميع رخام بالكريستال">جلي وتلميع رخام بالكريستال</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رأيك الصادق في الشغل والتعامل:</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="اكتب تفاصيل تجربتك مع الفريق والنتيجة..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg cursor-pointer"
                  >
                    نشر التقييم الآن
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header with Rating and Service */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{t.date}</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-medium">
                  "{t.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{t.name}</h5>
                    <span className="text-slate-500 text-[11px]">{t.role}</span>
                  </div>
                </div>

                <div className="text-left">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <MapPin className="w-3 h-3 text-sky-600" />
                    {t.location}
                  </span>
                  <span className="text-[10px] text-sky-700 font-semibold block">{t.serviceUsed}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
