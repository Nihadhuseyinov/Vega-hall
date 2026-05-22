import { BookOpen, Sparkles, Award, Coffee, Music, Trees } from 'lucide-react';
import { Language, translations } from '../translations';

interface AboutProps {
  lang: Language;
}

export default function About({ lang }: AboutProps) {
  const t = translations[lang];

  const highlights = [
    {
      icon: <Trees className="text-[#d4a574]" size={28} />,
      titleAz: "Möhtəşəm Bağça",
      titleEn: "Splendid Night Garden",
      titleRu: "Великолепный Сад",
      descAz: "Asılmış işıqlarla bəzənmiş əsl kənd təbiəti.",
      descEn: "Authentic garden atmosphere styled with glowing fairy lights.",
      descRu: "Настоящий сад, украшенный гирляндами теплого света."
    },
    {
      icon: <Award className="text-[#d4a574]" size={28} />,
      titleAz: "Yüksək Xidmət",
      titleEn: "Premium Catering",
      titleRu: "Премиальный Сервис",
      descAz: "Lüks banketlərin peşəkar təşkili.",
      descEn: "Flawless planning for high-end celebrations and banquets.",
      descRu: "Безупречная организация роскошных праздников и банкетов."
    },
    {
      icon: <Coffee className="text-[#d4a574]" size={28} />,
      titleAz: "Zəngin Dəsgah",
      titleEn: "Grand Samovar Tea",
      titleRu: "Чайный Десгах",
      descAz: "Lənkəran çayı, ev mürəbbələri və ləpələr assortisi.",
      descEn: "Aromatic samovar tea served with fresh jams and nuts.",
      descRu: "Ароматный самоварный чай с домашним вареньем и орехами."
    },
    {
      icon: <Music className="text-[#d4a574]" size={28} />,
      titleAz: "Canlı Trio",
      titleEn: "Live Symphony Trio",
      titleRu: "Живая Симфония",
      descAz: "Mərasimlərdə həzin canlı musiqi ansamblı.",
      descEn: "Elegant violin and clarinet live welcome performances.",
      descRu: "Живая скрипичная симфония для встречи ваших гостей."
    }
  ];

  return (
    <section className="bg-[#faf9f6] min-h-screen pt-28 pb-20 px-6 font-sans text-[#2d3748]" id="about-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Animated Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4a574]/10 border border-[#d4a574]/25 rounded-full text-[#d4a574] text-xs font-mono uppercase tracking-widest">
            <Sparkles size={12} className="animate-pulse" />
            <span>{t.aboutUs}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1a365d] tracking-tight">
            {t.aboutHeader}
          </h2>
          <div className="h-0.5 w-16 bg-[#d4a574] mx-auto mt-2 rounded"></div>
          <p className="text-sm md:text-base text-gray-500 italic font-serif">
            &ldquo;{t.aboutTagline}&rdquo;
          </p>
        </div>

        {/* 2-Column Story Segment with visual minimalism */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Grid or Premium Illustration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#d4a574]/20 bg-[#1a365d] p-8 text-cream flex flex-col justify-between min-h-[350px]">
              <div className="absolute top-0 right-0 w-[50%] h-full bg-[#faf9f6]/5 -skew-x-12 transform origin-top-right pointer-events-none"></div>
              
              <div className="space-y-4 z-10">
                <span className="text-[#d4a574] font-serif italic text-lg">{t.welcomeExcellence}</span>
                <h3 className="font-serif text-3xl md:text-3xl font-bold tracking-tight text-white">
                  Vega Hall &bull; Binə
                </h3>
                <p className="text-xs leading-relaxed text-cream/80 font-sans max-w-sm">
                  {lang === 'aze' 
                    ? "Sizi möhtəşəm dizayn edilmiş təbii bağı olan premium şadlıq evimizdə görməkdən məmnunuq. Hər detal sizin rahatlığınız üçün nəzərdə tutulmuşdur." 
                    : lang === 'rus' 
                    ? "Мы рады приветствовать вас в нашем первоклассном банкетном зале с великолепным садом. Каждая деталь создана для вашего комфорта." 
                    : "We are thrilled to welcome you to our premium banqueting house featuring a stunning garden layout. Every detail is curated for your pleasure."
                  }
                </p>
              </div>

              <div className="border-t border-cream/15 pt-6 flex justify-between items-center z-10">
                <div>
                  <p className="text-[#d4a574] font-bold text-2xl font-mono">120+</p>
                  <p className="text-[9px] uppercase tracking-widest text-cream/65 font-mono">{t.statsGourmet}</p>
                </div>
                <div>
                  <p className="text-[#d4a574] font-bold text-2xl font-mono">5.0</p>
                  <p className="text-[9px] uppercase tracking-widest text-cream/65 font-mono">{t.statsRating}</p>
                </div>
                <div>
                  <p className="text-[#d4a574] font-bold text-2xl font-mono">200</p>
                  <p className="text-[9px] uppercase tracking-widest text-cream/65 font-mono">{t.statsCapacity}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif text-2xl md:text-3.5xl font-bold text-[#1a365d] tracking-wide">
              {t.aboutStoryTitle}
            </h3>
            <p className="text-[14px] md:text-base leading-relaxed text-gray-600 font-sans">
              {t.aboutStoryText1}
            </p>
            <p className="text-[14px] md:text-base leading-relaxed text-gray-600 font-sans">
              {t.aboutStoryText2}
            </p>
            
            <div className="pt-4 border-t border-gray-150 space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#1a365d]">
                {t.aboutAtmosphereTitle}
              </h4>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                {t.aboutAtmosphereText}
              </p>
            </div>
          </div>

        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-3xl border border-[#d4a574]/15 shadow-sm space-y-4 hover:shadow-md transition-shadow group duration-300"
            >
              <div className="p-3 bg-[#faf9f6] rounded-xl inline-block group-hover:bg-[#d4a574]/10 transition-colors">
                {item.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1a365d]">
                {lang === 'aze' ? item.titleAz : lang === 'rus' ? item.titleRu : item.titleEn}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {lang === 'aze' ? item.descAz : lang === 'rus' ? item.descRu : item.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
