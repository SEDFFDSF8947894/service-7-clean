import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Copy, Check, Send, ExternalLink, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/cleaningData';

export const ContactSocialSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(COMPANY_INFO.phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const waMsg = `مرحباً سفن كلين،
اسمي: ${name.trim()}
رقم هاتفي: ${phone.trim()}
استفساري: ${message.trim() || 'أرغب بالاستفسار عن حجز خدمة تنظيف'}`;

    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(waMsg)}`, '_blank');
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-sky-400 tracking-wide">
            <span>قنوات التواصل الرسمية</span>
            <span aria-hidden="true">·</span>
            <span>جاهزون لخدمتكم على مدار الساعة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            تواصل مباشرة مع إدارة فريق سفن كلين
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            اختر القناة الأنسب لك للتواصل الفوري، سواء عبر الاتصال الهاتفي، الواتساب، أو عبر منصات التواصل الاجتماعي.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Cards & Social Hub - 7 Cols */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Direct Big Call Box */}
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-7 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-sky-400 font-bold block">الرقم المباشر للحجز والاستفسار:</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-white dir-ltr inline-block">
                    {COMPANY_INFO.phoneDisplay}
                  </div>
                  <p className="text-xs text-slate-400">متاح طوال أيام الأسبوع من 8:00 صباحاً حتى 10:00 مساءً</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال الآن</span>
                  </a>

                  <button
                    onClick={handleCopyPhone}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition-colors cursor-pointer"
                    title="نسخ الرقم"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {copiedPhone && (
                <div className="mt-2 text-xs text-emerald-400 font-semibold">
                  تم نسخ الرقم إلى الحافظة بنجاح!
                </div>
              )}
            </div>

            {/* Social Media Grid (Facebook, Messenger, WhatsApp, Instagram, TikTok) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-300">قنوات التواصل ومنصات السوشيال ميديا:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* WhatsApp */}
                <a
                  href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('مرحباً سفن كلين، أرغب بالاستفسار عن خدماتكم')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-750 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        واتساب مباشر
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">0790222197</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* Facebook */}
                <a
                  href={COMPANY_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-750 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg font-serif">
                      f
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        فيسبوك | Facebook
                      </div>
                      <div className="text-[11px] text-slate-400">سفن كلين Clean 7</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* Messenger */}
                <a
                  href={COMPANY_INFO.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500/50 hover:bg-slate-750 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-400 transition-colors">
                        ماسنجر | Messenger
                      </div>
                      <div className="text-[11px] text-slate-400">شات فوري عبر الصفحة</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* Instagram */}
                <a
                  href={COMPANY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-pink-500/50 hover:bg-slate-750 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                      📸
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                        إنستغرام | Instagram
                      </div>
                      <div className="text-[11px] text-slate-400">@7clean_jo</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* TikTok */}
                <a
                  href={COMPANY_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-teal-500/50 hover:bg-slate-750 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                      🎵
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                        تيك توك | TikTok
                      </div>
                      <div className="text-[11px] text-slate-400">@7clean_jo</div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                {/* Working Hours & Location */}
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white">ساعات العمل الرسمية</div>
                    <div className="text-[11px] text-slate-400">طوال الأسبوع (8:00ص - 10:00م)</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Quick Contact Form - 5 Cols */}
          <div className="lg:col-span-5 bg-slate-800 rounded-2xl border border-slate-700 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2">أرسل استفسارك وسنعاود الاتصال بك</h3>
            <p className="text-xs text-slate-400 mb-6">
              اكتب تفاصيل عقارك أو موقعك وسيصلنا إشعار فوري لمساعدتك وتقديم المعاينة المجانية.
            </p>

            {formSent ? (
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-5 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">تم فتح محادثة الواتساب بنجاح!</h4>
                <p className="text-xs text-slate-300">سيتواصل معك المشرف المختص لتأكيد طلبك فوراً.</p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-3 text-xs text-sky-400 underline cursor-pointer"
                >
                  إرسال استفسار آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickInquiry} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكريم:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: عمر العبداللات"
                    className="w-full text-xs p-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف الأردني:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="079XXXXXXX"
                    className="w-full text-xs p-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 dir-ltr text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">تفاصيل العقار أو الاستفسار:</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="مثال: تنظيف فيلا بعد التشطيب في دابوق 400م²..."
                    className="w-full text-xs p-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الاستفسار ومتابعة الرد الفوري</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
