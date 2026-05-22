import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import About from './components/About';
import AdminPanel from './components/AdminPanel';
import DesignSystemSpec from './components/DesignSystemSpec';
import AuthModal from './components/AuthModal';
import { Sparkles, Phone, Clock, BookOpen, AlertCircle, MapPin, BadgeAlert } from 'lucide-react';
import { Language, translations } from './translations';
import { MenuItem, ReservationData } from './types';
import { menuItems as initialMenuItems } from './menuData';

// Realistic sample list of reservations to populate dashboard securely
const initialReservations: ReservationData[] = [
  {
    id: 'res_nihad_1',
    name: 'Nihad Huseynov',
    phone: '051 373-51-57',
    email: 'nihadhuseynovtt@gmail.com',
    date: '2026-06-01',
    time: '20:00',
    guests: 8,
    notes: 'Premium Event. Engagement dinner near the Violin Orchestra stage.',
    tableId: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'res_sample_2',
    name: 'Anar Aliyev',
    phone: '070 288-96-26',
    email: 'anar.aliyev@gmail.com',
    date: '2026-06-02',
    time: '19:00',
    guests: 4,
    notes: 'Complimentary tea set request under warm light garlands.',
    tableId: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'res_sample_3',
    name: 'Irina Petrova',
    phone: '070 602-12-72',
    email: 'irina@mail.ru',
    date: '2026-06-04',
    time: '21:00',
    guests: 2,
    notes: 'Likes quiet garden walking paths. Prefer Chamomile zone.',
    tableId: 7,
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'menu' | 'reserve' | 'contact' | 'about' | 'admin'>('home');
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);

  // Active user session state
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('vega_hall_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync admin localStorage flag when logged in as Nihad
  useEffect(() => {
    if (currentUser?.email === 'nihadhuseynovtt@gmail.com') {
      localStorage.setItem('vega_admin_logged', 'true');
    } else {
      localStorage.removeItem('vega_admin_logged');
    }
  }, [currentUser]);

  const handleLoginSuccess = (user: { email: string; name: string }) => {
    setCurrentUser(user);
    localStorage.setItem('vega_hall_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('vega_hall_current_user');
    localStorage.removeItem('vega_admin_logged');
    setCurrentTab('home');
  };

  // Azerbaijani language is selected by default as per target prompt instructions
  const [lang, setLang] = useState<Language>('aze');

  // Interactive Live States synced with JSON / LocalStorage for pure high-fidelity execution
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('vega_hall_menu_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialMenuItems;
  });

  const [reservations, setReservations] = useState<ReservationData[]>(() => {
    const saved = localStorage.getItem('vega_hall_reservations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialReservations;
  });

  useEffect(() => {
    localStorage.setItem('vega_hall_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('vega_hall_reservations', JSON.stringify(reservations));
  }, [reservations]);

  const t = translations[lang];

  // Success indicator state
  const [activeReservation, setActiveReservation] = useState<{
    name: string;
    date: string;
    time: string;
    guests: number;
    tableId?: number;
  } | null>(null);

  const handleReservationSuccess = (details: ReservationData) => {
    // Add reservation to reactive state (safely synced)
    setReservations(prev => [details, ...prev]);

    setActiveReservation({
      name: details.name,
      date: details.date,
      time: details.time,
      guests: details.guests,
      tableId: details.tableId
    });

    // Switch to home after successful booking
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d3748] font-sans selection:bg-[#d4a574] selection:text-[#1a365d] relative flex flex-col justify-between overflow-x-hidden">
      
      {/* Interactive Top Notification Ribbon for Events */}
      <div className="bg-[#1a365d] text-[#d4a574] px-4 py-2 text-center text-[10px] md:text-xs font-mono uppercase tracking-widest border-b border-[#d4a574]/20 z-50 flex items-center justify-center gap-2 select-none">
        <Sparkles size={11} className="animate-spin text-[#d4a574]" />
        <span>✨ {t.mapsOverlayTitle} &mdash; 051 373-51-57 &bull; {lang === 'aze' ? 'Qızılgül şadlıq gecələri' : lang === 'rus' ? 'Престижные садовые ужины' : 'Elite garden celebrate sessions'}</span>
      </div>

      {/* Global Navigation Header Component */}
      <Navbar 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)} 
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Global Auth Register/Login Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Persistent Floating Design Spec Beacon / Lower Left Anchor */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          onClick={() => setIsDesignSystemOpen(true)}
          className="flex items-center gap-1.5 bg-[#1a365d] text-[#d4a574] border border-[#d4a574]/40 hover:border-[#d4a574] px-3.5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all duration-300 font-mono text-xs uppercase font-bold cursor-pointer"
          title="Open interactive design tokens and specs document"
          id="global-floating-spec-button"
        >
          <BookOpen size={14} className="animate-pulse" />
          <span>{lang === 'aze' ? 'Dizayn Tokenləri' : lang === 'rus' ? 'Токены спецификации' : 'Design Spec Tokens'}</span>
        </button>
      </div>

      {/* Main Container view with gorgeous route transition wrappers */}
      <main className="flex-1 w-full relative z-10">
        
        {/* Active confirmation banner atop home screen if reservation exists */}
        {activeReservation && currentTab === 'home' && (
          <div className="max-w-4xl mx-auto mt-28 px-6">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-900 border border-emerald-600/35 text-cream rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg text-left"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-[#d4a574] shrink-0" />
                <div className="text-xs font-sans leading-relaxed">
                  <span className="font-bold text-[#d4a574] uppercase tracking-wider">{t.activeReservMessage}</span> 
                  {` Mr/Ms. ${activeReservation.name} &bull; ${t.formDate}: ${activeReservation.date} &bull; ${t.formTime}: ${activeReservation.time} &bull; ${t.formGuests}: ${activeReservation.guests} ${
                    activeReservation.tableId ? `&bull; Table Selected: #${activeReservation.tableId}` : ''
                  }`}
                </div>
              </div>
              <button
                onClick={() => setActiveReservation(null)}
                className="text-[10px] font-mono text-[#d4a574] hover:text-white uppercase font-bold tracking-widest cursor-pointer whitespace-nowrap bg-emerald-950 px-3 py-1.5 rounded-full"
              >
                {t.clearedIndicator}
              </button>
            </motion.div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentTab === 'home' && <Hero onSetTab={setCurrentTab} lang={lang} />}
            {currentTab === 'menu' && <Menu lang={lang} menuItems={menuItems} />}
            {currentTab === 'reserve' && <Reservation lang={lang} onSuccess={handleReservationSuccess} />}
            {currentTab === 'contact' && <Contact lang={lang} />}
            {currentTab === 'about' && <About lang={lang} />}
            {currentTab === 'admin' && (
              <AdminPanel 
                lang={lang} 
                menuItems={menuItems} 
                setMenuItems={setMenuItems}
                reservations={reservations} 
                setReservations={setReservations}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Interactive Drawer Spec modal component */}
      <DesignSystemSpec 
        isOpen={isDesignSystemOpen} 
        onClose={() => setIsDesignSystemOpen(false)} 
      />

      {/* Global Polish Footer */}
      <footer className="bg-[#1a365d] text-cream border-t border-[#d4a574]/25 py-12 px-6 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold tracking-widest text-[#d4a574]">VEGA HALL</h4>
            <p className="text-[11px] text-cream/75 leading-relaxed max-w-sm font-sans">
              {t.footerDesc}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase font-bold tracking-widest text-[#d4a574]">{t.quickLinks}</h4>
            <ul className="space-y-2 text-[11px] font-mono">
              <li><button onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#d4a574] hover:underline transition-all cursor-pointer text-left">{lang === 'aze' ? 'Ana Səhifə' : lang === 'rus' ? 'Главная' : 'Home'}</button></li>
              <li><button onClick={() => { setCurrentTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#d4a574] hover:underline transition-all cursor-pointer text-left">{lang === 'aze' ? 'Nəfis Menyu' : lang === 'rus' ? 'Наше Меню' : 'Our Menu'}</button></li>
              <li><button onClick={() => { setCurrentTab('reserve'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#d4a574] hover:underline transition-all cursor-pointer text-left">{t.bookTable}</button></li>
              <li><button onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#d4a574] hover:underline transition-all cursor-pointer text-left">{t.aboutUs}</button></li>
              {currentUser?.email === 'nihadhuseynovtt@gmail.com' ? (
                <li><button onClick={() => setCurrentTab('admin')} className="hover:text-[#d4a574] hover:underline transition-all cursor-pointer text-left font-bold text-[#d4a574]">⚙️ Admin Access</button></li>
              ) : (
                <li><button onClick={() => setIsAuthOpen(true)} className="hover:text-[#d4a574] hover:underline transition-all cursor-pointer text-left font-mono text-cream/45 hover:text-white">🔒 {lang === 'aze' ? 'Mərkəz Girişi' : lang === 'rus' ? 'Вход для персонала' : 'Staff Login'}</button></li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase font-bold tracking-widest text-[#d4a574]">{lang === 'aze' ? 'Koordinatlar' : 'Coordinates'}</h4>
            <div className="text-[11px] font-mono space-y-1.5 text-cream/80">
              <span className="block hover:underline cursor-pointer"><MapPin size={10} className="inline text-[#d4a574] mr-1" /> {t.addressValue}</span>
              <span className="block"><Clock size={10} className="inline text-[#d4a574] mr-1" /> 12:00 PM - 12:00 AM Daily</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-xs uppercase font-bold tracking-widest text-[#d4a574]">{t.hotline}</h4>
            <div className="text-[11px] font-mono space-y-1 text-cream/80 leading-relaxed">
              <a href="tel:+994513735157" className="block hover:text-[#d4a574] focus:outline-none hover:underline">051 373-51-57 (Coordinator)</a>
              <a href="tel:+994702889626" className="block hover:text-[#d4a574] focus:outline-none hover:underline">070 288-96-26 (Banquets)</a>
              <a href="tel:+994706021272" className="block hover:text-[#d4a574] focus:outline-none hover:underline">070 602-12-72 (General)</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-cream/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-cream/55 text-left">
          <span>&copy; {new Date().getFullYear()} VEGA HALL. &bull; Binə, Bakı. {t.allRightsReserved}</span>
          <div className="flex items-center gap-4 mt-2 md:mt-0 uppercase font-bold">
            <button onClick={() => setIsDesignSystemOpen(true)} className="hover:text-[#d4a574] transition-colors cursor-pointer">Spec tokens</button>
            <span className="opacity-40">&bull;</span>
            <a href="https://wa.me/994513735157" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4a574] transition-colors">WhatsApp Help</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
