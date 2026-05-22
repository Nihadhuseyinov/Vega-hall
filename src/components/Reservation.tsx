import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, User, Phone, Mail, FileText, CheckCircle2, Sparkles, MapPin, UserCheck, Star } from 'lucide-react';
import { Language, translations } from '../translations';
import { ReservationData } from '../types';

interface ReservationProps {
  lang: Language;
  onSuccess: (details: ReservationData) => void;
}

interface Table {
  id: number;
  nameAz: string;
  nameEn: string;
  nameRu: string;
  capacity: number;
  x: string; // positioning in visual map
  y: string;
  isReserved: boolean;
}

export default function Reservation({ lang, onSuccess }: ReservationProps) {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: 4,
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    notes: '',
  });

  const [selectedTableId, setSelectedTableId] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [assignedCode, setAssignedCode] = useState('');

  // 9 Cozy Garden Tables styled with romantic tags
  const [gardenTables, setGardenTables] = useState<Table[]>([
    { id: 1, nameAz: 'Qızılgül Çardağı 1', nameEn: 'Rose Gazebo 1', nameRu: 'Беседка роз 1', capacity: 4, x: '20%', y: '15%', isReserved: false },
    { id: 2, nameAz: 'İşıqlı Tağ 2', nameEn: 'Under Garland 2', nameRu: 'Под гирляндой 2', capacity: 2, x: '50%', y: '15%', isReserved: true },
    { id: 3, nameAz: 'Musiqi Yanı VIP 3', nameEn: 'Orchestra Front 3', nameRu: 'У оркестра VIP 3', capacity: 6, x: '80%', y: '15%', isReserved: false },
    { id: 4, nameAz: 'Bağça Yolu 4', nameEn: 'Garden Pathway 4', nameRu: 'Садовая дорожка 4', capacity: 4, x: '15%', y: '45%', isReserved: false },
    { id: 5, nameAz: 'Fəvvarə Yanı 5', nameEn: 'Fountainside VIP 5', nameRu: 'У фонтана VIP 5', capacity: 8, x: '50%', y: '45%', isReserved: false },
    { id: 6, nameAz: 'Papatya Cığırı 6', nameEn: 'Chamomile Walk 6', nameRu: 'Ромашковый путь 6', capacity: 4, x: '85%', y: '45%', isReserved: false },
    { id: 7, nameAz: 'Sakit Guşə 7', nameEn: 'Cozy Nook 7', nameRu: 'Уютный уголок 7', capacity: 2, x: '20%', y: '75%', isReserved: false },
    { id: 8, nameAz: 'Çinar Altı 8', nameEn: 'Under Plane Tree 8', nameRu: 'Под платаном 8', capacity: 4, x: '50%', y: '75%', isReserved: false },
    { id: 9, nameAz: 'Tağlı Çardaq 9', nameEn: 'Pergola Arch 9', nameRu: 'Арочная пергола 9', capacity: 4, x: '80%', y: '75%', isReserved: true },
  ]);

  const handleTableClick = (table: Table) => {
    if (table.isReserved) return;
    setSelectedTableId(table.id === selectedTableId ? undefined : table.id);
    setFormData(prev => ({ ...prev, guests: table.capacity }));
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      tempErrors.name = lang === 'aze' ? 'Adınız tələb olunur' : lang === 'rus' ? 'Имя обязательно' : 'Your name is required';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = lang === 'aze' ? 'Telefon nömrəsi tələb olunur' : lang === 'rus' ? 'Номер телефона обязателен' : 'Phone number is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = lang === 'aze' ? 'Düzgün e-poçt daxil edin' : lang === 'rus' ? 'Введите корректный email' : 'Valid email is required';
    }
    if (!formData.date) {
      tempErrors.date = lang === 'aze' ? 'Tarix seçilməlidir' : lang === 'rus' ? 'Выберите дату' : 'Date is required';
    }
    if (!formData.time) {
      tempErrors.time = lang === 'aze' ? 'Saat seçilməlidir' : lang === 'rus' ? 'Выберите время' : 'Time is required';
    }
    if (formData.guests < 1 || formData.guests > 30) {
      tempErrors.guests = lang === 'aze' ? 'Qonaq sayı 1 ilə 30 arası olmalıdır' : lang === 'rus' ? 'Количество гостей: от 1 до 30' : 'Guests must be between 1 and 30';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real network submission with immediate confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `VEGA-${Math.floor(1000 + Math.random() * 9000)}-${formData.guests > 4 ? 'X' : 'A'}`;
      setAssignedCode(code);
      setShowSuccess(true);
      
      // Update local state isReserved to mock instant feedback
      if (selectedTableId) {
        setGardenTables(prev => prev.map(t => t.id === selectedTableId ? { ...t, isReserved: true } : t));
      }
    }, 1100);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    onSuccess({
      id: `res_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      notes: formData.notes + (selectedTableId ? ` [Selected Table: #${selectedTableId}]` : ''),
      tableId: selectedTableId,
      createdAt: new Date().toISOString()
    });
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      guests: 4,
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      notes: '',
    });
    setSelectedTableId(undefined);
  };

  return (
    <section className="bg-cream min-h-screen pt-32 pb-20 px-6 font-sans text-darkgray" id="reservation-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header summary */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-mono uppercase tracking-widest">
            <Calendar size={12} className="animate-pulse" />
            <span>{t.instantConfirmation}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1a365d] tracking-tight">
            {t.bookTableStars}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            {t.bookTableDesc}
          </p>
        </div>

        {/* 2 Columns Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Fields Inputs (lg:col-span-7) */}
          <form 
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-150 shadow-sm space-y-6"
            id="reservation-booking-form"
          >
            <div className="border-b border-gray-100 pb-4 text-left">
              <h3 className="font-serif text-xl font-bold text-[#1a365d]">{t.guestInfoTitle}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{t.guestInfoDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Date Input */}
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#d4a574]" />
                  <span>{t.formDate}</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className={`w-full p-3 text-sm bg-[#faf9f6] border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                    errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#d4a574] focus:ring-[#d4a574]/40'
                  }`}
                />
                {errors.date && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.date}</p>}
              </div>

              {/* Seating Time Picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                  <Clock size={12} className="text-[#d4a574]" />
                  <span>{t.formTime}</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574]/45 transition-all text-primary"
                >
                  <option value="12:00">12:00 (Lunch Welcome)</option>
                  <option value="14:00">14:00 (Afternoon Tea)</option>
                  <option value="16:00">16:00 (Early Dinner)</option>
                  <option value="18:00">18:00 (Golden Hour)</option>
                  <option value="19:00">19:00 (Garland Warm Glow)</option>
                  <option value="20:00">20:00 (Night Live Music Trio)</option>
                  <option value="21:00">21:00 (Late Night Serenade)</option>
                  <option value="22:00">22:00 (Last Seating)</option>
                </select>
              </div>

              {/* Guests Quantity */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                  <Users size={12} className="text-[#d4a574]" />
                  <span>{t.formGuests}</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={formData.guests}
                  onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                  className="w-full p-3 text-sm bg-[#faf9f6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574]/45 transition-all font-mono"
                  placeholder="e.g. 4"
                />
                {errors.guests && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.guests}</p>}
              </div>

              {/* Name String */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                  <User size={12} className="text-[#d4a574]" />
                  <span>{t.formFullName}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nihad Huseynov"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full p-3 text-sm bg-[#faf9f6] border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#d4a574] focus:ring-[#d4a574]/40'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.name}</p>}
              </div>

              {/* Phone contact */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                  <Phone size={12} className="text-[#d4a574]" />
                  <span>{t.formPhone}</span>
                </label>
                <input
                  type="tel"
                  placeholder="051 373-51-57"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={`w-full p-3 text-sm bg-[#faf9f6] border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#d4a574] focus:ring-[#d4a574]/40'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.phone}</p>}
              </div>

              {/* Email contact */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                  <Mail size={12} className="text-[#d4a574]" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. nihadhuseynovtt@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full p-3 text-sm bg-[#faf9f6] border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#d4a574] focus:ring-[#d4a574]/40'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-mono mt-0.5">{errors.email}</p>}
              </div>
            </div>

            {/* Special Notes input */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#1a365d] font-bold flex items-center gap-1.5">
                <FileText size={12} className="text-[#d4a574]" />
                <span>{t.formNotes}</span>
              </label>
              <textarea
                placeholder={lang === 'aze' ? 'Ad günü şamları, xüsusi bəzədilmiş masa, toyuq tabakası üçün fərdi istəklər...' : lang === 'rus' ? 'Свечи на день рождения, диетические требования, оформление стола...' : 'Special allergen information, musical wishes, or table requests...'}
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-3 text-sm bg-[#faf9f6] border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574]/45 transition-all text-primary"
              />
            </div>

            {/* Selected table identifier helper */}
            {selectedTableId && (
              <div className="bg-[#faf9f6] border border-[#d4a574]/25 rounded-2xl p-4 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-serif text-primary font-bold">
                  <Sparkles size={14} className="text-[#d4a574] animate-pulse" />
                  <span>{t.selectedTableLabel}: #{selectedTableId} &mdash; "{lang === 'aze' ? gardenTables.find(t=>t.id===selectedTableId)?.nameAz : lang === 'rus' ? gardenTables.find(t=>t.id===selectedTableId)?.nameRu : gardenTables.find(t=>t.id===selectedTableId)?.nameEn}"</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTableId(undefined)}
                  className="text-[10px] text-red-500 hover:text-red-700 font-mono font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
                >
                  {t.clearSelection}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-center font-sans font-bold text-xs uppercase tracking-widest text-white rounded-full transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-emerald-600/60 cursor-not-allowed' 
                  : 'bg-accent-green hover:bg-[#2f855a] shadow-lg cursor-pointer focus:outline-none hover:scale-[1.01] active:scale-95'
              }`}
              id="reservation-submit-button"
            >
              {isSubmitting ? t.schedulingBtn : t.reservationBtn}
            </button>
          </form>

          {/* Column 2: Interactive Garden Map Layout (lg:col-span-5) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="bg-primary text-cream rounded-3xl p-6 border border-secondary/20 shadow-lg relative overflow-hidden">
              
              {/* String light simulation inside map container */}
              <div className="absolute top-0 inset-x-0 h-10 bg-radial-gradient from-transparent to-black pointer-events-none flex justify-around opacity-75">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-200 glow-bulb" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-250 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-100 glow-bulb" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-250 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-200 glow-bulb" />
              </div>

              <div className="border-b border-cream/10 pb-3 mb-4 text-left">
                <h3 className="font-serif text-lg font-semibold text-secondary flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{t.gardenMapTitle}</span>
                </h3>
                <p className="text-[10px] text-[#a0aec0] font-mono mt-0.5">{t.gardenMapDesc}</p>
              </div>

              {/* Visual Grid representing the chess-board style garden tiles in photo */}
              <div className="aspect-square w-full rounded-2xl bg-emerald-950 border border-secondary/35 relative overflow-hidden p-3 flex flex-col justify-between">
                
                {/* Simulated chess-board walkway grid background overlay */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.06] pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`border border-white/40 ${
                        (Math.floor(i / 6) + (i % 6)) % 2 === 0 ? 'bg-white' : ''
                      }`} 
                    />
                  ))}
                </div>

                {/* Simulated flower shrubs represent chamomile and rose borders in picture */}
                <div className="absolute bottom-2 left-10 w-24 h-5 bg-green-900/60 rounded-full blur-xs border border-green-700/40" />
                <div className="absolute top-24 right-4 w-12 h-5 bg-green-900/60 rounded-full blur-xs border border-green-700/40" />
                <div className="absolute inset-x-12 top-11 h-4 bg-green-900/40 rounded-full blur-xs border border-green-850" />

                {/* Outer Garden borders */}
                <span className="absolute left-3 top-3 text-[9px] font-mono text-cream/35 uppercase tracking-widest pointer-events-none">{lang === 'aze' ? 'Binə Girişi' : lang === 'rus' ? 'Вход Бина' : 'Binə Entrance'}</span>
                <span className="absolute right-3 bottom-3 text-[9px] font-mono text-cream/35 uppercase tracking-widest pointer-events-none">{lang === 'aze' ? 'Canlı Trio Səhnəsi' : lang === 'rus' ? 'Живая Музыка' : 'Live Trio stage'}</span>

                {/* Table nodes mapped */}
                <div className="relative w-full h-full">
                  {gardenTables.map((table) => {
                    const isSelected = selectedTableId === table.id;
                    const name = lang === 'aze' ? table.nameAz : lang === 'rus' ? table.nameRu : table.nameEn;
                    return (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => handleTableClick(table)}
                        disabled={table.isReserved}
                        style={{ left: table.x, top: table.y }}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border flex flex-col items-center justify-center transition-all duration-300 focus:outline-none ${
                          table.isReserved
                            ? 'bg-red-950/40 border-red-700/35 text-red-500/60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-secondary text-primary border-white scale-110 shadow-lg font-bold'
                            : 'bg-primary/95 hover:bg-secondary/25 text-cream border-secondary/55 hover:scale-105 cursor-pointer'
                        }`}
                        title={`${name} &bull; ${table.capacity} pax`}
                      >
                        <span className="text-[10px] font-mono font-bold">{table.id}</span>
                        <span className="text-[8px] font-mono opacity-80 mt-[-2px]">{table.capacity}P</span>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Map Keys */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-mono text-center pt-2 border-t border-cream/10">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary border border-secondary/50 inline-block" />
                  <span className="text-cream/85">{lang === 'aze' ? 'Boş' : lang === 'rus' ? 'Свободен' : 'Vacant'}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary border border-white inline-block" />
                  <span className="text-secondary font-bold">{lang === 'aze' ? 'Seçiminiz' : lang === 'rus' ? 'Ваш выбор' : 'Your Choice'}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-950/40 border border-red-700/30 inline-block" />
                  <span className="text-red-400 opacity-60">{lang === 'aze' ? 'Dolu' : lang === 'rus' ? 'Занят' : 'Reserved'}</span>
                </div>
              </div>

            </div>

            {/* Atmosphere Testimonial Accent */}
            <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-sm text-left">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className="text-[#d4a574] fill-[#d4a574]" />
                ))}
              </div>
              <p className="font-serif italic text-xs leading-relaxed text-gray-500">
                {lang === 'aze' 
                  ? '"Vega Hall qılınclı və simli ansamblı ilə gözəl nişan bağçamızı bəzədi. Təşkilatçılıq çox yüksək idi. Səmimi simli işıqlar mühitində dadlı tabaka yeməkdən doymadıq."' 
                  : lang === 'rus'
                  ? '"Мы отпраздновали день рождения в прекрасном саду Vega Hall. Музыкальное трио, сочная курица табака и волшебные гирлянды превзошли наши ожидания."'
                  : '"We spent an elite evening under the wire lights. Highly organized traditional cuisine, excellent samovar service with sweets, and beautiful chamomile borders."'}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center font-serif text-xs text-primary font-bold">
                  NH
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary font-sans">Nihad Huseynov</h4>
                  <p className="text-[9px] text-gray-400 font-mono">Baku Resident &bull; Guest</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS MODAL AFTER SUBMIT */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xs" id="reservation-success-modal">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white text-darkgray rounded-3xl p-8 max-w-md w-full border border-secondary/35 shadow-2xl z-10 text-center"
            >
              
              {/* Success Icon */}
              <div className="w-16 h-16 bg-emerald-50 text-accent-green rounded-full flex items-center justify-center mx-auto mb-5 border border-accent-green/20">
                <CheckCircle2 size={36} className="animate-bounce" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-primary">{t.resSuccessTitle}</h3>
              <p className="text-xs text-[#d4a574] font-mono tracking-widest uppercase mt-1">CODE: {assignedCode}</p>

              <div className="bg-[#faf9f6] rounded-2xl p-4 my-6 text-left space-y-2.5 border border-gray-100 font-sans text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.formFullName}:</span>
                  <span className="font-semibold text-primary">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.formDate} &amp; {t.formTime}:</span>
                  <span className="font-semibold text-primary">{formData.date} &bull; {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">{t.formGuests}:</span>
                  <span className="font-semibold text-primary">{formData.guests} Pax</span>
                </div>
                {selectedTableId && (
                  <div className="flex justify-between border-t border-gray-150 pt-2 mt-2">
                    <span className="text-gray-400">{t.selectedTableLabel}:</span>
                    <span className="font-bold text-secondary">Table #{selectedTableId} ({lang === 'aze' ? gardenTables.find(t=>t.id===selectedTableId)?.nameAz : lang === 'rus' ? gardenTables.find(t=>t.id===selectedTableId)?.nameRu : gardenTables.find(t=>t.id===selectedTableId)?.nameEn})</span>
                  </div>
                )}
              </div>

              <div className="bg-primary/5 p-4 rounded-xl border border-secondary/20 text-left mb-6 text-xs">
                <span className="font-mono text-secondary uppercase font-bold tracking-wider block">{t.successNoticeHeader}</span>
                <p className="text-gray-600 mt-1 leading-normal font-sans">
                  {lang === 'aze' 
                    ? `Biz sizin telefon nömrənizə (${formData.phone}) SMS təsdiqi göndərdik. Əməkdaşımız tezliklə əlaqə saxlayacaq.` 
                    : lang === 'rus' 
                    ? `Мы отправили SMS-подтверждение на ваш номер (${formData.phone}). Наш менеджер из Бина свяжется с вами.` 
                    : `We sent a confirmation SMS to your phone (${formData.phone}). Our Binə representative will call you shortly.`}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full bg-primary text-secondary border border-secondary/50 hover:bg-secondary hover:text-primary transition-all duration-300 py-3.5 rounded-full uppercase font-bold text-xs tracking-wider cursor-pointer focus:outline-none"
              >
                {t.returnHomeBtn}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
