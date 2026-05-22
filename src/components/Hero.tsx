import { motion } from 'motion/react';
import { Sparkles, Compass, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroProps {
  onSetTab: (tab: 'home' | 'menu' | 'reserve' | 'contact' | 'about' | 'admin') => void;
  lang: Language;
}

export default function Hero({ onSetTab, lang }: HeroProps) {
  const t = translations[lang];

  // Configured with high quality rustic and premium pictures of fine restaurants and garden evening setups
  const buildingImage = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200";
  const gardenImage = "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1200";

  // Simulate string lights coordinates to mimic the image uploaded by the user
  const bulbCounts = [
    { id: 1, delay: 0, left: '5%' },
    { id: 2, delay: 0.2, left: '15%' },
    { id: 3, delay: 0.1, left: '25%' },
    { id: 4, delay: 0.4, left: '35%' },
    { id: 5, delay: 0.3, left: '45%' },
    { id: 6, delay: 0.5, left: '55%' },
    { id: 7, delay: 0.2, left: '65%' },
    { id: 8, delay: 0.6, left: '75%' },
    { id: 9, delay: 0.4, left: '85%' },
    { id: 10, delay: 0.1, left: '95%' },
  ];

  const features = [
    { 
      title: lang === 'aze' ? 'Qurme Mətbəx' : lang === 'rus' ? 'Изысканная Кухня' : 'Gourmet Cuisine', 
      desc: lang === 'aze' 
        ? 'Şeflərimiz tərəfindən sevgi ilə hazırlanan ənənəvi və müasir Azərbaycan mətbəxinin incilərini dadın.' 
        : lang === 'rus' 
        ? 'Отведайте шедевры традиционной и современной азербайджанской кухни, приготовленные нашими мастерами.'
        : 'Savour fresh, traditional, and modern Azerbaijani culinary masterworks prepared by master chefs.', 
      icon: Sparkles 
    },
    { 
      title: lang === 'aze' ? 'Zərif Atmosfer' : lang === 'rus' ? 'Элегантная Атмосфера' : 'Elegant Atmosphere', 
      desc: lang === 'aze' 
        ? 'Qızılı işıqlarla bəzədilmiş sakit və lüks gecə bağçamızda huzurlu anlar yaşayın.' 
        : lang === 'rus' 
        ? 'Наслаждайтесь ужином в тихом оазисе нашего ночного сада, утопающего в лучах декоративного света.'
        : 'Dine in a tranquil, glowing night oasis decorated with authentic local and international design values.', 
      icon: Compass 
    },
    { 
      title: lang === 'aze' ? 'Möhtəşəm Tədbirlər' : lang === 'rus' ? 'Идеальные Торжества' : 'Perfect Events', 
      desc: lang === 'aze' 
        ? 'Toy, nişan, ad günləri və korporativ tədbirlərinizi möhtəşəm atəşfəşanlıq və şoularla qeyd edin.' 
        : lang === 'rus' 
        ? 'Проводите свадьбы, банкеты и памятные мероприятия в окружении великолепного ландшафта.'
        : 'Celebrate weddings, banquets, and customized life celebrations surrounded by pristine landscaping and pyrotechnics.', 
      icon: Heart 
    }
  ];

  return (
    <section className="relative overflow-hidden bg-primary text-cream min-h-screen">
      
      {/* Dynamic string lights background representing the actual photo uploaded by the user */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none flex justify-around overflow-hidden z-10 bg-gradient-to-b from-black/80 to-transparent">
        {/* String wire */}
        <svg className="absolute top-0 left-0 w-full h-[35px] stroke-secondary/20 fill-none stroke-[0.5px]">
          <path d="M 0 5 Q 200 35 400 5 Q 600 35 800 5 Q 1000 35 1200 5 Q 1400 35 1600 5 Q 1800 35 2000 5" />
          <path d="M 0 15 Q 250 45 500 15 Q 750 45 1000 15 Q 1250 45 1500 15 Q 1750 45 2000 15" />
        </svg>
        
        {/* Render hanging bulbs */}
        {bulbCounts.map((bulb) => (
          <div 
            key={bulb.id} 
            className="absolute top-[16px] transform -translate-x-1/2 flex flex-col items-center group pointer-events-auto"
            style={{ left: bulb.left }}
          >
            {/* Short hanger wire */}
            <div className="w-[1px] h-3 bg-secondary/50 group-hover:bg-secondary transition-colors" />
            {/* Glass glow bulb */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                boxShadow: [
                  '0 0 4px #fef08a, 0 0 10px #f59e0b',
                  '0 0 12px #fef08a, 0 0 22px #d4a574',
                  '0 0 4px #fef08a, 0 0 10px #f59e0b'
                ]
              }}
              transition={{
                duration: 2 + bulb.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: bulb.delay
              }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-100 border border-secondary/40 cursor-pointer flex items-center justify-center hover:bg-yellow-250 transition-colors"
              title="Click to spark bulb"
              onClick={(e) => {
                const target = e.currentTarget;
                target.style.boxShadow = '0 0 30px #ffffff, 0 0 50px #f59e0b';
                setTimeout(() => {
                  target.style.boxShadow = '';
                }, 800);
              }}
            />
          </div>
        ))}
      </div>

      {/* Hero Body Context */}
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center relative z-20">
        
        {/* Subtle decorative leaf banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-3 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs uppercase tracking-[0.2em] font-mono"
        >
          <Sparkles size={11} />
          <span>{t.welcomeExcellence}</span>
        </motion.div>

        {/* Large "VEGA HALL" text with gold accent */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-8xl tracking-tight font-extrabold max-w-4xl leading-tight"
        >
          VEGA <span className="text-secondary font-light font-serif bg-gradient-to-r from-secondary to-yellow-300 bg-clip-text text-transparent italic">HALL</span>
        </motion.h1>

        {/* Tagline below */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-lg md:text-2xl mt-4 max-w-2xl text-cream/90 font-light tracking-wider"
        >
          {t.heroHeading2}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-1 text-[11px] font-mono tracking-widest text-[#a0aec0] mt-2 mb-8 uppercase"
        >
          <MapPin size={11} className="text-secondary" /> <span>{t.addressValue}</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md items-center justify-center"
        >
          <button
            onClick={() => onSetTab('menu')}
            className="w-full sm:w-auto bg-[#d4a574] hover:bg-transparent border-2 border-secondary text-primary hover:text-secondary hover:border-secondary transition-all duration-300 font-sans text-xs uppercase tracking-widest font-bold px-10 py-4 rounded-full cursor-pointer shadow-lg focus:outline-none"
            id="hero-menu-cta"
          >
            {t.viewMenu}
          </button>
          <button
            onClick={() => onSetTab('reserve')}
            className="w-full sm:w-auto bg-accent-green hover:bg-transparent border-2 border-accent-green hover:border-emerald-600 text-white hover:text-white transition-all duration-300 font-sans text-xs uppercase tracking-widest font-bold px-10 py-4 rounded-full cursor-pointer shadow-lg focus:outline-none"
            id="hero-reserve-cta"
          >
            {t.bookTable}
          </button>
        </motion.div>
      </div>

      {/* Images Section: Two main images (restaurant building + outdoor dining) */}
      <div className="bg-cream text-darkgray py-16 px-6 relative z-10 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
            
            {/* Large Image Card 1: Restaurant Building */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden shadow-navy border border-gray-100 flex flex-col h-[480px]"
            >
              <div className="absolute inset-0 bg-black/35 z-10 group-hover:bg-black/20 transition-all duration-500" />
              <img 
                src={buildingImage} 
                alt="Vega Hall Signature Grand Building Facade" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-cream bg-gradient-to-t from-black/95 to-transparent">
                <span className="text-secondary text-xs uppercase font-mono tracking-widest block mb-1">Vega Hall</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                  {lang === 'aze' ? 'Dəbdəbəli Banket Sarayı' : lang === 'rus' ? 'Роскошный Купол' : 'Our Grand Banquet Venue'}
                </h3>
                <p className="text-sm text-cream/80 max-w-md font-sans leading-relaxed">
                  {lang === 'aze' 
                    ? 'Binə qəsəbəsinin mərkəzində qurulmuş lüks tədbir mərkəzimiz hər cür banket və özəl şadlıq gecələri üçün hazırdır.' 
                    : lang === 'rus'
                    ? 'Расположенный в самом сердце поселка Бина, наш зал готов принять банкеты любого масштаба.'
                    : 'Our elegant receptions and dynamic dining hall of Vega Hall glows magnificently with historic royal columns.'}
                </p>
              </div>
            </motion.div>

            {/* Large Image Card 2: Outdoor Dining */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden shadow-navy border border-gray-100 flex flex-col h-[480px]"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/25 transition-all duration-500" />
              
              <img 
                src={gardenImage} 
                alt="Vega Hall Romantic Backyard Garden Dining under Hanging String Bulbs" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay floating badge highlighting the string lights */}
              <div className="absolute top-4 right-4 z-20 bg-[#1a365d]/90 text-secondary border border-secondary/30 rounded-full py-1 px-3 text-[10px] uppercase font-mono tracking-widest flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                <span>Overhead Illumination</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-cream bg-gradient-to-t from-black/95 to-transparent">
                <span className="text-secondary text-xs uppercase font-mono tracking-widest block mb-1">Atmosphere</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                  {lang === 'aze' ? 'Ulduzlar Altında Gecə Bağçası' : lang === 'rus' ? 'Ночной Сад под Звездами' : 'Garden Under the Stars'}
                </h3>
                <p className="text-sm text-cream/80 max-w-md font-sans leading-relaxed">
                  {lang === 'aze' 
                    ? 'İsti simli işıqlar altında, təbii güllərin əhatəsində unudulmaz romantik şam yeməkləri və musiqili gecələr bəxş edirik.' 
                    : lang === 'rus'
                    ? 'Проведите незабываемый вечер в оазисе живой зелени под чарующей иллюминацией на открытом воздухе.'
                    : 'Experience romantic garden seating surrounded by rows of beautiful flowers, and illuminated by hundreds of overhead warm wire bulbs.'}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Features Block: Fine Cuisine, Elegant Atmosphere, Perfect Events */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300 flex flex-col items-start"
                >
                  <div className="p-3 bg-[#1a365d]/5 rounded-xl border border-[#d4a574]/25 text-secondary mb-5">
                    <Icon size={24} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#1a365d] mb-2.5">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* User's garden photo preview section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-primary text-cream rounded-3xl overflow-hidden shadow-2xl relative border border-secondary/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between"
          >
            <div className="space-y-4 max-w-lg text-left">
              <span className="font-mono text-xs uppercase text-secondary tracking-widest font-semibold block">&bull; Actual Backyard Experience &bull;</span>
              <h3 className="font-serif text-2xl md:text-4xl font-bold">{t.aboutStoryTitle}</h3>
              <p className="text-xs text-cream/70 leading-relaxed font-sans">
                {lang === 'aze' 
                  ? 'Bağçamız minlərlə ailəvi şənliklərə, özəl nişan gecələrinə və şərəfli qonaqlıqlara şahidlik etmişdir. Binə qəsəbəsindəki unikal yerləşməmiz təmiz hava və qızılı işıqlandırma bəxş edir.' 
                  : lang === 'rus'
                  ? 'Наш уютный сад стал местом сотен теплых семейных праздников и предложений руки и сердца. Формат садовой рассадки с ровными дорожками сделает ваш вечер идеальным.'
                  : 'Our garden has hosted thousands of family reunions, weddings, and premium dinners. The actual garden layout in Binə features beautiful square chequered garden walks, decorated with local green shrubbery.'}
              </p>
              <button 
                onClick={() => onSetTab('contact')}
                className="text-secondary hover:text-white transition-colors text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2 pt-2 cursor-pointer focus:outline-none bg-transparent border-none p-0"
              >
                <span>{lang === 'aze' ? 'Xəritə vərəqi' : lang === 'rus' ? 'Как нас найти' : 'Find Us & View Map'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
            
            {/* Visual simulation of the garden chequer grid inside a box to save user requests */}
            <div className="w-full max-w-sm shrink-0 border border-secondary/35 rounded-2xl overflow-hidden aspect-video relative flex flex-col justify-end bg-black">
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
              <div className="absolute top-2 left-2 z-10 bg-secondary/85 text-primary text-[9px] uppercase font-mono font-bold tracking-widest py-0.5 px-2 rounded-full">
                {lang === 'aze' ? 'Canlı Vayb' : lang === 'rus' ? 'Садовый Уют' : 'Live Garden Vibe'}
              </div>
              
              <div className="absolute inset-0 bg-cover bg-center brightness-90 bg-[url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=400')]" />
              <div className="absolute bg-gradient-to-t from-primary p-4 z-10 w-full text-center">
                <span className="text-[10px] font-mono tracking-widest text-secondary block font-semibold">WEEKLY LIVE MUSIC TRIO</span>
                <p className="text-xs text-cream font-serif italic mt-0.5">{lang === 'aze' ? 'Skripka, kamança və orkestr musiqisi' : lang === 'rus' ? 'Скрипичное трио под навесом огней' : 'Classic violin, accordion, and key accompaniment under the string lights.'}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
