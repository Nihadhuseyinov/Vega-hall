import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, MessageCircle, ChevronRight, Share2, ClipboardSignature, MessageSquare } from 'lucide-react';
import { Language, translations } from '../translations';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];

  // Load configuration from local Storage so admin changes apply in real-time
  const [address, setAddress] = useState('Binə qəsəbəsi, Bakı, Azərbaycan');
  const [workingHours, setWorkingHours] = useState('12:00 PM – 12:00 AM (Midnight)');
  const [phone1, setPhone1] = useState('051 373-51-57');
  const [phone2, setPhone2] = useState('070 288-96-26');
  const [phone3, setPhone3] = useState('070 602-12-72');

  useEffect(() => {
    const storedAddress = localStorage.getItem('vega_address');
    const storedHours = localStorage.getItem('vega_hours');
    const storedPhone1 = localStorage.getItem('vega_phone1');
    const storedPhone2 = localStorage.getItem('vega_phone2');
    const storedPhone3 = localStorage.getItem('vega_phone3');

    if (storedAddress) setAddress(storedAddress);
    if (storedHours) setWorkingHours(storedHours);
    if (storedPhone1) setPhone1(storedPhone1);
    if (storedPhone2) setPhone2(storedPhone2);
    if (storedPhone3) setPhone3(storedPhone3);
  }, []);

  const contactPhones = [
    { num: phone1, raw: `+994${phone1.replace(/[^0-9]/g, '')}` },
    { num: phone2, raw: `+994${phone2.replace(/[^0-9]/g, '')}` },
    { num: phone3, raw: `+994${phone3.replace(/[^0-9]/g, '')}` }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Vega Hall Restaurant',
        text: 'Join me for fine dining and memorable events at Vega Hall, Binə, Baku!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'aze' ? 'Paylaşım linki kopyalandı!' : lang === 'rus' ? 'Ссылка для отправки скопирована!' : 'Link copied to clipboard!');
    }
  };

  // WhatsApp numbers prefilled text
  const messageText = encodeURIComponent(
    lang === 'aze' 
      ? 'Salam! Vega Hall-da boş yerlər və özəl tədbir qiymətləri haqqında məlumat almaq istəyirəm.' 
      : lang === 'rus'
      ? 'Здравствуйте! Хотелось бы узнать о свободных датах и ценах на банкеты в Vega Hall.'
      : 'Hello! I would like to inquire about reservation slots and banquet prices at Vega Hall.'
  );

  return (
    <section className="bg-cream min-h-screen pt-32 pb-20 px-6 font-sans text-[#2d3748]" id="contact-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header container */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-mono uppercase tracking-widest">
            <ClipboardSignature size={12} className="animate-pulse" />
            <span>{t.operationalHub}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1a365d] tracking-tight">
            {t.connectWithVega}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            {t.contactDescription}
          </p>
        </div>

        {/* 2 columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Info panel (lg:col-span-12 or 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-gray-150 shadow-sm flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-serif text-xl font-bold text-[#1a365d]">Vega Hall &bull; Binə</h3>
                <p className="text-xs text-gray-400 mt-1">{t.navContact}</p>
              </div>

              {/* Address card */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 rounded-xl border border-[#d4a574]/25 text-secondary shrink-0">
                  <MapPin size={22} className="text-[#d4a574]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">{t.addressTitle}</h4>
                  <p className="text-xs text-gray-500 mt-1 font-sans leading-relaxed">
                    {address}<br />
                    Baku, Azerbaijan
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Binə+qəsəbəsi,+Baku,+Azerbaijan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono font-bold text-secondary hover:underline flex items-center gap-1 mt-2 uppercase tracking-wider"
                  >
                    <span>{lang === 'aze' ? 'Xəritədə açın' : lang === 'rus' ? 'Открыть карту' : 'Open in external maps'}</span>
                    <ChevronRight size={12} />
                  </a>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 rounded-xl border border-[#d4a574]/25 text-secondary shrink-0">
                  <Phone size={22} className="text-[#d4a574]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">{t.phoneLines}</h4>
                  <div className="mt-1.5 space-y-2">
                    {contactPhones.map((phone, i) => (
                      <a 
                        key={i}
                        href={`tel:${phone.raw}`}
                        className="block font-mono text-xs text-gray-500 hover:text-secondary hover:underline transition-colors focus:outline-none"
                      >
                        {phone.num} <span className="text-[10px] text-[#d4a574] font-bold">({lang === 'aze' ? 'Zəng et' : lang === 'rus' ? 'Позвонить' : 'Call'})</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/5 rounded-xl border border-[#d4a574]/25 text-secondary shrink-0">
                  <Clock size={22} className="text-[#d4a574]" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-primary text-sm uppercase tracking-wider">{t.contactWorkingHours}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal font-sans">
                    {workingHours}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 font-mono italic">
                    {lang === 'aze' ? 'Qeyd: Banket sifarişləri daha tez fəaliyyətə başlayır.' : lang === 'rus' ? 'Примечание: Банкеты координируются заранее.' : 'Note: Receptions can align earlier upon request.'}
                  </p>
                </div>
              </div>
            </div>

            {/* share segment */}
            <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
              <div>
                <h5 className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">{lang === 'aze' ? 'Məkanı paylaşın' : lang === 'rus' ? 'Поделиться локацией' : 'Share this venue'}</h5>
                <p className="text-[9px] text-gray-500 mt-0.5 font-sans">{lang === 'aze' ? 'Qohumlarınıza ünvanı göndərin' : lang === 'rus' ? 'Отправьте координаты семье' : 'Send location links to family.'}</p>
              </div>
              <button
                onClick={handleShare}
                className="p-2.5 bg-cream hover:bg-secondary/20 text-[#d4a574] hover:text-primary rounded-full transition-all border border-secondary/20 focus:outline-none cursor-pointer"
                title="Copy shareable link"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Right: Embedded Styled Vector Google Map (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-primary rounded-3xl overflow-hidden shadow-navy border border-secondary/20 relative flex flex-col justify-between py-6 px-4 text-cream">
            
            {/* Real Map Title overlay */}
            <div className="absolute top-4 left-4 z-20 bg-primary/95 border border-secondary/35 rounded-2xl p-4 text-cream text-xs backdrop-blur-md max-w-xs font-sans text-left">
              <strong className="text-secondary font-bold text-sm block">📍 Vega Hall Baku</strong>
              <p className="text-[10px] text-cream/80 leading-normal mt-1">
                {lang === 'aze' 
                  ? 'Binə qəsəbəsinin mərkəzində, təmiz hava və qızılı işıqlarla bəzənmiş əsl gecə bağçası.' 
                  : lang === 'rus'
                  ? 'Расположен в самом центре поселка Бина, Баку. Волшебный сад с гирляндами.'
                  : 'Located in the heart of Binə settlement, Baku. Featuring lush greenery walks.'}
              </p>
            </div>

            {/* SVG Mock Map representing Binə Baku streets with coordinate nodes */}
            <div className="flex-1 aspect-video md:aspect-[4/3] w-full rounded-2xl bg-emerald-950/60 border border-secondary/30 relative overflow-hidden flex items-center justify-center min-h-[300px]">
              
              {/* Simulated street outlines */}
              <svg className="absolute inset-0 w-full h-full stroke-secondary/20 stroke-1 opacity-40 fill-none" viewBox="0 0 400 300">
                <line x1="0" y1="50" x2="400" y2="50" />
                <line x1="0" y1="180" x2="400" y2="180" />
                <line x1="120" y1="0" x2="120" y2="300" />
                <line x1="280" y1="0" x2="280" y2="300" />
                
                <path d="M 50 0 Q 150 100 250 300" />
                <path d="M 350 0 Q 200 150 50 300" />
                
                <path d="M 0 280 Q 200 290 400 280 L 400 300 L 0 300 Z" className="fill-secondary/5 stroke-none" />
              </svg>

              <div className="absolute bottom-3 left-3 bg-black/60 font-mono text-[9px] text-cream/50 px-2 py-0.5 rounded">
                Binə Town &bull; 40.4503° N, 50.0886° E
              </div>

              {/* Core Vega Hall marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-secondary/40 animate-ping" />
                  <div className="w-10 h-10 rounded-full bg-secondary border-2 border-primary text-primary flex items-center justify-center shadow-lg relative cursor-pointer hover:scale-115 transition-transform">
                    <MapPin size={22} className="text-primary" />
                  </div>
                </div>
                <span className="font-serif text-[11px] font-bold tracking-widest text-secondary mt-1 text-center bg-black/80 px-2 py-0.5 rounded border border-secondary/20">
                  VEGA HALL
                </span>
                <span className="text-[9px] font-mono text-cream/70">Binə, Baku</span>
              </div>
            </div>

            {/* Directions assistance */}
            <div className="px-4 pt-4 border-t border-cream/10 text-center font-sans space-y-1">
              <p className="text-xs text-secondary font-bold">{lang === 'aze' ? 'İstiqamət rəhbəri:' : lang === 'rus' ? 'Как добраться:' : 'Directions helper:'}</p>
              <p className="text-[10px] md:text-[11px] text-cream/85">
                {lang === 'aze' 
                  ? 'Heydər Əliyev Beynəlxalq Hava Limanından şərqə, Binə qəsəbəsi mərkəzinə doğru yönəlin (təxminən 10 dəqiqə piyada şose yolu).' 
                  : lang === 'rus'
                  ? 'Двигайтесь от Международного аэропорта Гейдар Алиев на восток в сторону поселка Бина (около 10 минут езды).'
                  : 'Drive eastwards from Heydar Aliyev International Airport towards Binə settlement (approximately 10 minutes drive).'}
              </p>
            </div>

          </div>

        </div>

        {/* WhatsApp Floating Call-To-Action Button / green circle widget */}
        <div className="fixed bottom-6 right-6 z-40 group flex flex-col items-end gap-1 font-sans">
          
          <div className="max-w-xs scale-90 opacity-0 transform translate-y-2 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-[#1a365d] border border-secondary/35 text-secondary text-[10px] font-mono py-1 px-3 rounded-md shadow-md mb-1 uppercase tracking-wider shrink-0 whitespace-nowrap">
            {lang === 'aze' ? '💬 WhatsApp ilə əlaqə' : lang === 'rus' ? '💬 Чат в WhatsApp' : '💬 Chat with Coordinator'}
          </div>
          <a
            href={`https://wa.me/994513735157?text=${messageText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none hover:rotate-6 hover:scale-110 active:scale-95"
            title="Start traditional WhatsApp consultation thread"
            id="whatsapp-floating-button"
          >
            <MessageCircle size={30} className="fill-white stroke-none" />
          </a>
        </div>

      </div>
    </section>
  );
}
