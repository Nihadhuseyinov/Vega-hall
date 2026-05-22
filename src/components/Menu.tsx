import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuCategories } from '../menuData';
import { MenuItem } from '../types';
import { Search, ChefHat, Gift, Star } from 'lucide-react';
import { Language, translations } from '../translations';

interface MenuProps {
  lang: Language;
  menuItems: MenuItem[];
}

export default function Menu({ lang, menuItems }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('soyuq');
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[lang];

  // Filter items based on category & search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const nameStr = (
      lang === 'aze' ? item.nameAz : lang === 'rus' ? item.nameRu : item.nameEn
    ).toLowerCase();
    const descStr = (
      lang === 'aze' ? item.descriptionAz : lang === 'rus' ? item.descriptionRu : item.descriptionEn
    ).toLowerCase();
    
    return matchesCategory && (nameStr.includes(searchQuery.toLowerCase()) || descStr.includes(searchQuery.toLowerCase()));
  });

  return (
    <section className="bg-cream min-h-screen pt-32 pb-20 px-6 font-sans text-darkgray" id="menu-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header container */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-mono uppercase tracking-widest">
            <ChefHat size={12} className="animate-bounce" />
            <span>Vega Hall Master Chefs</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1a365d] tracking-tight">
            {lang === 'aze' ? 'Nəfis Mətbəximiz' : lang === 'rus' ? 'Наше Благородное Меню' : 'Explore Our Culinary Art'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            {lang === 'aze' 
              ? 'Xəzər dənizinin qara kəhərindən, naxışlı ləziz qutablara, bütöv samovar çay dəsgahlarından xüsusi hədiyyələrə qədər tam rəsmi Vega Hall menyusu.' 
              : lang === 'rus'
              ? 'От черной осетровой икры до сочных национальных кутабов на садже и безупречных подарочных банкетных предложений.'
              : 'Our authentic traditional Azerbaijani cold appetizers, sizzling wood-fired skewers, and custom event highlights.'}
          </p>
        </div>

        {/* Search Input and Information Helper */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder={
              lang === 'aze' 
                ? "Lavaş, kabab, kürü, plov..." 
                : lang === 'rus' 
                ? "Икра, люля, плов, кутаб..." 
                : "Search for kebabs, pilaf, desserts..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#d4a574]/20 text-sm rounded-full focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574]/40 shadow-sm transition-colors text-primary"
            id="menu-search-input"
          />
        </div>

        {/* Dynamic Category Tabs with Translated Titles */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-6 mb-10 gap-2 scrollbar-none border-b border-gray-150">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSearchQuery('');
              }}
              className={`px-5 py-3 rounded-full text-xs uppercase font-semibold tracking-wider transition-all duration-300 cursor-pointer border shrink-0 focus:outline-none ${
                selectedCategory === category.id
                  ? 'bg-primary text-secondary border-secondary shadow-md scale-[1.02]'
                  : 'bg-white text-primary border-gray-200 hover:border-secondary/40 hover:bg-gray-55'
              }`}
            >
              {lang === 'aze' ? category.titleAz : lang === 'rus' ? category.titleRu : category.titleEn}
            </button>
          ))}
        </div>

        {/* Items Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const name = lang === 'aze' ? item.nameAz : lang === 'rus' ? item.nameRu : item.nameEn;
              const description = lang === 'aze' ? item.descriptionAz : lang === 'rus' ? item.descriptionRu : item.descriptionEn;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#d4a574]/15 shadow-sm hover:shadow-navy hover:border-[#d4a574]/35 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Card Design: Image top, item info */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 shrink-0">
                    <img 
                      src={item.image} 
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Price Tag */}
                    <div className="absolute bottom-3 right-3 bg-primary/95 text-secondary px-3.5 py-1.5 rounded-full text-sm font-bold font-mono tracking-wider border border-secondary/20 shadow-md">
                      {item.price === 0 ? (
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">FREE</span>
                      ) : (
                        <span>{item.price}₼</span>
                      )}
                    </div>

                    {/* Highly stylized badge for complimentary items */}
                    {item.price === 0 && (
                      <div className="absolute top-3 left-3 bg-[#38a169]/90 text-white rounded-full p-2" title="Complimentary Event Item">
                        <Gift size={14} className="animate-pulse" />
                      </div>
                    )}

                    {/* Premium tags banner if present */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-1">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="bg-primary/95 text-secondary border border-secondary/35 font-mono text-[9px] font-bold uppercase rounded px-2.5 py-0.5 shadow">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Body textual Segment */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1 text-left">
                      <div className="flex justify-between items-start gap-1">
                        <h3 className="font-serif text-lg font-bold text-[#1a365d] group-hover:text-secondary transition-colors line-clamp-1">
                          {name}
                        </h3>
                        {item.price > 18 && (
                          <Star size={13} className="text-[#d4a574] shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans line-clamp-3">
                        {description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-[10px] uppercase font-mono tracking-wider text-[#d4a574]">
                      <span>{item.id.replace('s_', '').replace('i_', '').replace('t_', '').toUpperCase()}</span>
                      <span className="text-gray-300">/ &bull; VEGA VIEW</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty Search Result feedback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-sm text-gray-400 font-mono italic">
              {lang === 'aze' ? 'Axtarışa uyğun yemək tapılmadı.' : lang === 'rus' ? 'Ничего не найдено по вашему запросу.' : 'No mouth-watering recipes matching search.'}
            </p>
          </div>
        )}

        {/* Highlight banner indicating coordinator access */}
        <div className="mt-16 bg-white border border-[#d4a574]/15 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between max-w-4xl mx-auto shadow-sm">
          <div className="flex items-start gap-3">
            <Gift className="text-secondary shrink-0 mt-1" size={20} />
            <div className="text-xs text-darkgray/80 leading-relaxed text-left font-sans">
              <strong className="text-[#1a365d] font-semibold">{t.specialEventPackages}</strong> {t.specialEventDesc}
            </div>
          </div>
          <a 
            href="tel:+994513735157"
            className="bg-[#1a365d] hover:bg-[#1a365d]/90 text-secondary border border-secondary/40 hover:border-secondary transition-all duration-300 font-sans text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-full shrink-0 shadow-md cursor-pointer active:scale-95 text-center block"
          >
            {t.callCoordinator}
          </a>
        </div>

        {/* Official authenticity label */}
        <div className="mt-6 text-center text-[10px] text-gray-400 font-mono tracking-wider max-w-md mx-auto">
          ⚠️ <strong>{t.authenticityNote}</strong>: {t.authenticityDesc}
        </div>

      </div>
    </section>
  );
}
