import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/cleaningData';
import { BookingSubmission } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicePreset?: string;
  estimatePreset?: {
    serviceName: string;
    area: number;
    price: string;
    details: string;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  servicePreset,
  estimatePreset,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('عَمّان');
  const [areaName, setAreaName] = useState('');
  const [serviceId, setServiceId] = useState('post-construction');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingSubmission | null>(null);

  useEffect(() => {
    if (servicePreset) {
      setServiceId(servicePreset);
    }
  }, [servicePreset]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !preferredDate) return;

    const selectedServiceObj = SERVICES_LIST.find((s) => s.id === serviceId);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : 'خدمة تنظيف عامة';

    const submission: BookingSubmission = {
      id: `7C-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      city,
      areaName: areaName.trim() || city,
      serviceId,
      serviceName,
      preferredDate,
      preferredTime: preferredTime === 'morning' ? 'صباحي (8:00 ص - 1:00 م)' : preferredTime === 'afternoon' ? 'ظهراً (1:00 م - 5:00 م)' : 'مسائي (5:00 م - 9:00 م)',
      estimatedPrice: estimatePreset?.price,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    setBookingConfirmed(submission);

    // Save to localStorage history
    try {
      const existing = JSON.parse(localStorage.getItem('7clean_bookings') || '[]');
      localStorage.setItem('7clean_bookings', JSON.stringify([submission, ...existing]));
    } catch {
      // LocalStorage fallback
    }
  };

  const sendConfirmationToWhatsApp = () => {
    if (!bookingConfirmed) return;
    const text = `السلام عليكم شركة سفن كلين 7 Clean،
قمت بحجز موعد تنظيف عبر الموقع الإلكتروني:
• رقم الحجز: ${bookingConfirmed.id}
• الاسم: ${bookingConfirmed.customerName}
• الهاتف: ${bookingConfirmed.phone}
• الخدمة المطلوبة: ${bookingConfirmed.serviceName}
• الموقع: ${bookingConfirmed.city} - ${bookingConfirmed.areaName}
• التاريخ المفضل: ${bookingConfirmed.preferredDate}
• التوقيت: ${bookingConfirmed.preferredTime}
${bookingConfirmed.estimatedPrice ? `• التقدير التلقائي: ${bookingConfirmed.estimatedPrice}` : ''}
${bookingConfirmed.notes ? `• ملاحظات إضافية: ${bookingConfirmed.notes}` : ''}

يرجى تأكيد الحجز وإرسال الفريق في الموعد المحدد. شكراً لكم!`;

    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingConfirmed ? (
          /* Confirmation View */
          <div className="text-center py-4 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                رقم الحجز: <strong className="text-slate-900">{bookingConfirmed.id}</strong>
              </span>
              <h3 className="text-2xl font-black text-slate-900">تم تسجيل حجزك بنجاح!</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                أهلاً بك يا أخ <strong className="text-slate-900">{bookingConfirmed.customerName}</strong>. فريق سفن كلين على أتم الاستعداد لخدمتك في الوقت المحدد.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-slate-50 rounded-xl p-4 text-xs text-right space-y-2 border border-slate-200">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">الخدمة المحجوزة:</span>
                <span className="font-bold text-slate-900">{bookingConfirmed.serviceName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">تاريخ الموعد:</span>
                <span className="font-bold text-slate-900">{bookingConfirmed.preferredDate} ({bookingConfirmed.preferredTime})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">الموقع:</span>
                <span className="font-bold text-slate-900">{bookingConfirmed.city} - {bookingConfirmed.areaName}</span>
              </div>
              {bookingConfirmed.estimatedPrice && (
                <div className="flex justify-between text-sky-700 font-bold">
                  <span>السعر التقديري:</span>
                  <span>{bookingConfirmed.estimatedPrice}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={sendConfirmationToWhatsApp}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>إرسال تفاصيل الحجز للواتساب للتأكيد الفوري</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                إغلاق والعودة للرئيسية
              </button>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>أو اتصل فوراً بالمشرف: {COMPANY_INFO.phoneDisplay}</span>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-3 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-700 mb-1">
                <Calendar className="w-4 h-4" />
                <span>حجز موعد إلكتروني مباشر</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">احجز فريق سفن كلين لعقارك</h3>
              <p className="text-xs text-slate-500">املأ البيانات البسيطة وسيتواصل معك مشرف الميدان لتثبيت الموعد.</p>
            </div>

            {/* Pre-set estimate banner if applicable */}
            {estimatePreset && (
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 flex items-center justify-between text-xs text-sky-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>محسوب بالحاسبة: {estimatePreset.serviceName}</span>
                </div>
                <span className="font-bold text-sky-700">{estimatePreset.price}</span>
              </div>
            )}

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اختر نوع الخدمة:</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-sky-500"
              >
                {SERVICES_LIST.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكريم:</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: يوسف الكردي"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف (أردني):</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="079XXXXXXX"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 dir-ltr text-right"
                />
              </div>
            </div>

            {/* City & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المحافظة:</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {COMPANY_INFO.cityCoverage.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الحي / المنطقة بالتفصيل:</label>
                <input
                  type="text"
                  required
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  placeholder="مثال: دابوق - قرب مدرسة البكالوريا"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التاريخ المفضل لبدء العمل:</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الفترة الزمنية المفضلة:</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="morning">صباحية (8:00 ص - 1:00 م)</option>
                  <option value="afternoon">ظهراً (1:00 م - 5:00 م)</option>
                  <option value="evening">مسائية (5:00 م - 9:00 م)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ملاحظات إضافية أو وصف العقار:</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: شقة دوبلكس بحاجة لغسيل شبابيك وإزالة دهان أرضيات..."
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>تأكيد تسجيل الحجز المبدئي</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
