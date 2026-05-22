import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Clock, Phone, MapPin, Globe, Shield } from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  currentTab: 'home' | 'menu' | 'reserve' | 'contact' | 'about' | 'admin';
  setTab: (tab: 'home' | 'menu' | 'reserve' | 'contact' | 'about' | 'admin') => void;
  onOpenDesignSystem: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  currentUser: { email: string; name: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({ 
  currentTab, 
  setTab, 
  onOpenDesignSystem,
  lang,
  setLang,
  currentUser,
  onOpenAuth,
  onLogout
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.navHome },
    { id: 'menu', label: t.navMenu },
    { id: 'reserve', label: t.navReserve },
    { id: 'about', label: t.aboutUs },
    { id: 'contact', label: t.navContact },
  ] as const;

  const navigateTo = (tab: 'home' | 'menu' | 'reserve' | 'contact' | 'about' | 'admin') => {
    setTab(tab);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-md shadow-navy border-b border-secondary/20 py-2.5' 
          : 'bg-primary/90 md:bg-primary/45 py-4'
      }`}
      id="main-app-header"
    >
      {/* Top micro helper bar for genuine night restaurant atmosphere on desktop */}
      <div className="hidden lg:block border-b border-cream/10 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[11px] font-mono tracking-widest text-cream/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Clock size={11} className="text-secondary" /> 12:00 - 00:00 Daily</span>
            <span className="flex items-center gap-1.5"><MapPin size={11} className="text-secondary" /> {t.addressValue}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Click-to-call link with clean numbers */}
            <a href="tel:+994513735157" className="flex items-center gap-1.5 hover:text-secondary hover:underline transition-colors focus:outline-none">
              <Phone size={11} className="text-secondary" /> 051 373-51-57
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo/Brand */}
        <button 
          onClick={() => navigateTo('home')} 
          className="flex flex-col items-start group select-none text-left cursor-pointer focus:outline-none bg-transparent border-none p-0"
          id="nav-logo-button"
        >
          <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-cream group-hover:text-secondary transition-colors duration-300">
            VEGA <span className="text-secondary font-light">HALL</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-secondary font-mono -mt-1 group-hover:text-cream transition-colors duration-300">
            {lang === 'aze' ? "Ləzzətli Yeməklər" : lang === 'rus' ? "Изысканная Кухня" : "Delicious Fine Dining"}
          </span>
        </button>

        {/* Desktop Navigation Link Cluster */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`relative font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 py-1 cursor-pointer focus:outline-none bg-transparent border-none ${
                currentTab === item.id 
                  ? 'text-secondary' 
                  : 'text-cream/80 hover:text-secondary'
              }`}
            >
              {item.label}
              {currentTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-secondary rounded-full" />
              )}
            </button>
          ))}

          {/* Secure Admin link */}
          {currentUser?.email === 'nihadhuseynovtt@gmail.com' && (
            <button
              onClick={() => navigateTo('admin')}
              className={`font-sans text-xs uppercase tracking-widest font-semibold py-1 flex items-center gap-1 cursor-pointer bg-transparent border-none ${
                currentTab === 'admin' 
                  ? 'text-secondary' 
                  : 'text-cream/80 hover:text-secondary'
              }`}
            >
              <Shield size={12} className="text-secondary" />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Language Switches + Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Active Language Switch Selector */}
          <div className="flex items-center gap-1.5 border border-cream/20 rounded-full px-2 py-1 bg-primary/20 z-10 shrink-0">
            <Globe size={11} className="text-secondary shrink-0" />
            {(['aze', 'eng', 'rus'] as Language[]).map((lg) => (
              <button
                key={lg}
                onClick={() => setLang(lg)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold transition-all focus:outline-none uppercase bg-transparent cursor-pointer ${
                  lang === lg 
                    ? 'bg-secondary text-primary shadow-sm' 
                    : 'text-cream/70 hover:text-secondary'
                }`}
              >
                {lg === 'aze' ? 'AZE' : lg === 'rus' ? 'РУС' : 'ENG'}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenDesignSystem}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider bg-primary/45 text-secondary border border-secondary/35 hover:border-secondary hover:bg-secondary/20 px-4 py-2 rounded-full transition-all duration-300 font-mono shadow-md cursor-pointer active:scale-95"
            title="View Interactive Design Tokens"
            id="nav-ds-button"
          >
            <BookOpen size={13} />
            <span>{t.designTokenSpec}</span>
          </button>
          
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-secondary text-xs font-mono font-medium truncate max-w-[100px]" title={currentUser.name}>
                👤 {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                className="text-[10px] font-mono tracking-wider font-bold border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-2.5 py-1.5 rounded-full transition-all focus:outline-none cursor-pointer"
              >
                {t.authSignOut}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="border border-secondary/35 hover:border-secondary hover:bg-secondary/15 text-[#d4a574] hover:text-[#d4a574] text-xs uppercase tracking-widest font-bold px-4 py-2.5 rounded-full transition-all duration-300 font-mono active:scale-95 cursor-pointer shrink-0"
            >
              {t.authSignIn}
            </button>
          )}

          <button
            onClick={() => navigateTo('reserve')}
            className="bg-accent-green hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            id="nav-reserve-button"
          >
            {t.bookTable}
          </button>
        </div>

        {/* Mobile Controller Cluster */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Language Switcher Pill */}
          <div className="flex items-center bg-primary/50 border border-secondary/20 rounded-full px-1.5 py-0.5 shrink-0 max-w-fit">
            {(['aze', 'eng', 'rus'] as Language[]).map((lg) => (
              <button
                key={lg}
                onClick={() => setLang(lg)}
                className={`px-1 rounded text-[9px] font-mono transition-all font-bold uppercase cursor-pointer ${
                  lang === lg ? 'bg-secondary text-primary' : 'text-cream/70'
                }`}
              >
                {lg === 'aze' ? 'AZ' : lg === 'rus' ? 'RU' : 'EN'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-cream hover:text-secondary focus:outline-none transition-colors"
            id="nav-hamburger-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[56px] bg-primary z-50 flex flex-col justify-between p-6 border-t border-cream/10 animate-fade-in"
          id="mobile-drawer"
        >
          <div className="space-y-4 pt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full text-left py-3 font-serif text-xl tracking-wide uppercase border-b border-cream/5 flex items-center justify-between bg-transparent border-none ${
                  currentTab === item.id 
                    ? 'text-secondary font-bold' 
                    : 'text-cream/80 hover:text-secondary'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-secondary/50 font-mono">/ &bull; {item.id.toUpperCase()}</span>
              </button>
            ))}

            {currentUser?.email === 'nihadhuseynovtt@gmail.com' && (
              <button
                onClick={() => navigateTo('admin')}
                className={`w-full text-left py-3 font-serif text-xl tracking-wide uppercase border-b border-cream/5 flex items-center justify-between bg-transparent border-none ${
                  currentTab === 'admin' 
                    ? 'text-secondary font-bold' 
                    : 'text-cream/80 hover:text-secondary'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield size={18} className="text-secondary" />
                  <span>Admin Control</span>
                </span>
                <span className="text-xs text-secondary/50 font-mono">/ &bull; SECURE</span>
              </button>
            )}
          </div>

          <div className="space-y-3 pb-8">
            {currentUser ? (
              <div className="flex items-center justify-between bg-primary/20 p-3 rounded-2xl border border-cream/10">
                <span className="text-cream text-xs font-mono">👤 {currentUser.name}</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="text-xs font-mono text-red-400 font-bold hover:underline"
                >
                  {t.authSignOut}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full bg-cream/5 border border-secondary/30 text-secondary py-3.5 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-secondary/10 transition-colors"
              >
                {t.authSignIn}
              </button>
            )}

            <button
               onClick={() => {
                 setIsOpen(false);
                 onOpenDesignSystem();
               }}
              className="w-full flex items-center justify-center gap-2 bg-cream/5 border border-secondary/40 text-secondary py-3.5 rounded-full text-sm uppercase tracking-wider font-semibold hover:bg-secondary/10 transition-colors"
            >
              <BookOpen size={16} />
              <span>{t.designTokenSpec}</span>
            </button>
            <button
              onClick={() => navigateTo('reserve')}
              className="w-full bg-accent-green hover:bg-emerald-600 text-white text-center py-3.5 rounded-full text-sm uppercase tracking-widest font-bold block transition-all"
            >
              {t.bookTable}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
