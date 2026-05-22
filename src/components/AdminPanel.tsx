import React, { useState, useEffect } from 'react';
import { 
  Lock, Settings, Plus, Edit, Trash2, CheckCircle, XCircle, 
  DollarSign, ClipboardList, Utensils, MessageSquare, LogOut, RefreshCw 
} from 'lucide-react';
import { MenuItem, ReservationData } from '../types';
import { Language, translations } from '../translations';
import { menuCategories } from '../menuData';

interface AdminPanelProps {
  lang: Language;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  reservations: ReservationData[];
  setReservations: React.Dispatch<React.SetStateAction<ReservationData[]>>;
}

export default function AdminPanel({ 
  lang, 
  menuItems, 
  setMenuItems, 
  reservations, 
  setReservations 
}: AdminPanelProps) {
  const t = translations[lang];

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('vega_admin_logged') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab State inside Admin
  const [activeAdminTab, setActiveAdminTab] = useState<'reservations' | 'menu' | 'contact'>('reservations');

  // Contact State
  const [address, setAddress] = useState(() => localStorage.getItem('vega_address') || 'Binə qəsəbəsi, Bakı, Azərbaycan');
  const [workingHours, setWorkingHours] = useState(() => localStorage.getItem('vega_hours') || '12:00 PM – 12:00 AM (Midnight)');
  const [phone1, setPhone1] = useState(() => localStorage.getItem('vega_phone1') || '051 373-51-57');
  const [phone2, setPhone2] = useState(() => localStorage.getItem('vega_phone2') || '070 288-96-26');
  const [phone3, setPhone3] = useState(() => localStorage.getItem('vega_phone3') || '070 602-12-72');

  // Add / Edit Menu Item State
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState<Omit<MenuItem, 'id'>>({
    nameAz: '',
    nameEn: '',
    nameRu: '',
    descriptionAz: '',
    descriptionEn: '',
    descriptionRu: '',
    price: 0,
    category: 'soyuq',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    tags: []
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | MenuItem['category']>('all');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'nihadhuseynovtt@gmail.com') {
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('vega_admin_logged', 'true');
    } else {
      setLoginError(lang === 'aze' 
        ? 'E-poçt yalnışdır! İcazə verilən e-poçt: nihadhuseynovtt@gmail.com' 
        : lang === 'rus'
        ? 'Неверный e-mail! Разрешенный e-mail: nihadhuseynovtt@gmail.com'
        : 'Invalid Email address! Access restricted to nihadhuseynovtt@gmail.com');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('vega_admin_logged');
  };

  // Reservation approval / cancel triggers
  const handleUpdateReservationStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setReservations(prev => prev.map(res => {
      if (res.id === id) {
        return { ...res, notes: `${res.notes || ''} [Status: ${status.toUpperCase()}]` };
      }
      return res;
    }));
  };

  // Add / Edit menu logic
  const handleOpenAdd = () => {
    setEditingItemId(null);
    setItemForm({
      nameAz: '',
      nameEn: '',
      nameRu: '',
      descriptionAz: '',
      descriptionEn: '',
      descriptionRu: '',
      price: 5,
      category: 'soyuq',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      tags: []
    });
    setIsEditingItem(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setItemForm({
      nameAz: item.nameAz,
      nameEn: item.nameEn,
      nameRu: item.nameRu,
      descriptionAz: item.descriptionAz,
      descriptionEn: item.descriptionEn,
      descriptionRu: item.descriptionRu,
      price: item.price,
      category: item.category,
      image: item.image,
      tags: item.tags || []
    });
    setIsEditingItem(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItemId) {
      // Edit existing
      setMenuItems(prev => prev.map(item => {
        if (item.id === editingItemId) {
          return { ...item, ...itemForm };
        }
        return item;
      }));
    } else {
      // Add new
      const newItem: MenuItem = {
        id: `custom_${Date.now()}`,
        ...itemForm
      };
      setMenuItems(prev => [newItem, ...prev]);
    }
    setIsEditingItem(false);
    setEditingItemId(null);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm(lang === 'aze' ? 'Bu yeməyi silməyə əminsiniz?' : 'Вы уверены, что хотите удалить это блюдо?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSaveContactParams = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vega_address', address);
    localStorage.setItem('vega_hours', workingHours);
    localStorage.setItem('vega_phone1', phone1);
    localStorage.setItem('vega_phone2', phone2);
    localStorage.setItem('vega_phone3', phone3);
    alert(lang === 'aze' ? 'Ayarlar uğurla saxlanıldı!' : 'Настройки успешно сохранены!');
  };

  // Filter Menu
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.nameAz.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nameRu.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-[#faf9f6] min-h-screen pt-32 pb-24 px-6 flex items-center justify-center font-sans text-[#2d3748]">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#d4a574]/20 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#1a365d] rounded-2xl mx-auto flex items-center justify-center text-[#d4a574]">
              <Lock size={20} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1a365d]">{t.adminLoginHeader}</h2>
            <p className="text-xs text-gray-400">Vega Hall Secure Operations Hub</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-100 flex items-center gap-2">
              <span className="font-bold">⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.adminEmailLabel}</label>
              <input 
                type="email" 
                required
                placeholder="nihadhuseynovtt@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.adminPasswordLabel}</label>
              <input 
                type="password" 
                required
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#38a169] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2f855a] transition-all cursor-pointer shadow-md active:scale-95"
            >
              {t.adminLoginBtn}
            </button>
          </form>
          
          <div className="text-center text-[10px] text-gray-400">
            Authorized Email: <strong className="text-gray-500">nihadhuseynovtt@gmail.com</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen pt-28 pb-20 px-6 font-sans text-[#2d3748]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#d4a574]/15 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#1a365d]/5 rounded text-xs font-mono text-[#1a365d] uppercase tracking-wider mb-2">
              ⚡ LIVE BACKEND MANAGEMENT STATUS: OK
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1a365d] flex items-center gap-2">
              <span>{t.adminTitle}</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Logged in as {email || 'nihadhuseynovtt@gmail.com'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full text-xs uppercase font-mono tracking-wider font-bold transition-all focus:outline-none cursor-pointer"
          >
            <LogOut size={13} />
            <span>{t.adminLogoutBtn}</span>
          </button>
        </div>

        {/* Dashboard Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#1a365d]/5 rounded-xl text-[#1a365d]">
              <ClipboardList size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{t.adminTotalRes}</p>
              <h4 className="font-serif text-xl font-bold text-[#1a365d] font-mono mt-0.5">{reservations.length}</h4>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-600">
              <RefreshCw size={22} className="animate-spin" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{t.adminPendingRes}</p>
              <h4 className="font-serif text-xl font-bold text-amber-600 font-mono mt-0.5">
                {reservations.filter(r => !r.notes?.includes('[Status:')).length}
              </h4>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#38a169]/10 rounded-xl text-[#38a169]">
              <Utensils size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{t.adminActiveMenu}</p>
              <h4 className="font-serif text-xl font-bold text-[#38a169] font-mono mt-0.5">{menuItems.length}</h4>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <MessageSquare size={22} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{t.adminContactMsgs}</p>
              <h4 className="font-serif text-xl font-bold text-blue-600 font-mono mt-0.5">3</h4>
            </div>
          </div>
        </div>

        {/* Dynamic Action Selector Segment */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveAdminTab('reservations')}
            className={`px-6 py-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer ${
              activeAdminTab === 'reservations' 
                ? 'border-[#d4a574] text-[#1a365d]' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.adminResMgr}
          </button>
          <button 
            onClick={() => setActiveAdminTab('menu')}
            className={`px-6 py-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer ${
              activeAdminTab === 'menu' 
                ? 'border-[#d4a574] text-[#1a365d]' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.adminMenuMgr}
          </button>
          <button 
            onClick={() => setActiveAdminTab('contact')}
            className={`px-6 py-3 text-xs uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer ${
              activeAdminTab === 'contact' 
                ? 'border-[#d4a574] text-[#1a365d]' 
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {t.adminContactMgr}
          </button>
        </div>

        {/* Tab content 1: Reservations Manager */}
        {activeAdminTab === 'reservations' && (
          <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm overflow-hidden space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#1a365d]">{t.adminResMgr}</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-[#faf9f6] text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4">{t.formFullName}</th>
                    <th className="p-4">{t.formDate} &amp; {t.formTime}</th>
                    <th className="p-4">{t.formGuests} / Table</th>
                    <th className="p-4">{t.formNotes}</th>
                    <th className="p-4">{t.resStatus}</th>
                    <th className="p-4 text-right">{t.resActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reservations.map((res) => {
                    const hasStatus = res.notes?.includes('[Status:');
                    const isConfirmed = res.notes?.includes('[Status: CONFIRMED]');
                    const isCancelled = res.notes?.includes('[Status: CANCELLED]');

                    return (
                      <tr key={res.id} className="hover:bg-gray-50/50">
                        <td className="p-4 font-bold text-primary">
                          <div>{res.name}</div>
                          <a href={`tel:${res.phone}`} className="text-[10px] text-gray-400 font-mono hover:underline block mt-0.5">
                            {res.phone}
                          </a>
                        </td>
                        <td className="p-4 font-mono">
                          <div>{res.date}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{res.time}</div>
                        </td>
                        <td className="p-4 font-mono">
                          <div>{res.guests} pax</div>
                          <div className="text-[10px] text-secondary mt-0.5">
                            {res.tableId ? `Table #${res.tableId}` : 'Auto Placement'}
                          </div>
                        </td>
                        <td className="p-4 text-gray-500 leading-normal max-w-xs truncate" title={res.notes}>
                          {res.notes || <span className="italic text-gray-300">No special requests</span>}
                        </td>
                        <td className="p-4 font-bold lowercase tracking-wider">
                          {isConfirmed ? (
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] uppercase font-bold">Confirmed</span>
                          ) : isCancelled ? (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] uppercase font-bold">Cancelled</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] uppercase font-bold">Pending</span>
                          )}
                        </td>
                        <td className="p-4 text-right space-x-2 whitespace-nowrap">
                          {!hasStatus && (
                            <>
                              <button
                                onClick={() => handleUpdateReservationStatus(res.id, 'confirmed')}
                                className="p-1 px-2.5 bg-emerald-50 text-[#38a169] border border-[#38a169]/30 rounded hover:bg-[#38a169] hover:text-white transition-all text-[9px] uppercase font-mono cursor-pointer"
                              >
                                {t.resConfirm}
                              </button>
                              <button
                                onClick={() => handleUpdateReservationStatus(res.id, 'cancelled')}
                                className="p-1 px-2.5 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-600 hover:text-white transition-all text-[9px] uppercase font-mono cursor-pointer"
                              >
                                {t.resCancel}
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab content 2: Menu Manager */}
        {activeAdminTab === 'menu' && (
          <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1a365d]">{t.adminMenuMgr}</h3>
                <p className="text-xs text-gray-400">Total list: {filteredMenuItems.length} dishes matches filters</p>
              </div>
              <button
                onClick={handleOpenAdd}
                className="flex items-center gap-1 bg-[#38a169] hover:bg-[#2f855a] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer active:scale-95 shadow"
              >
                <Plus size={14} />
                <span>{t.adminAddNewItem}</span>
              </button>
            </div>

            {/* Editing Box */}
            {isEditingItem && (
              <form onSubmit={handleSaveItem} className="bg-[#faf9f6] p-6 rounded-3xl border border-[#d4a574]/20 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#1a365d]">
                  {editingItemId ? t.adminEditItem : t.adminAddNewItem}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemNameAz}</label>
                    <input 
                      type="text" required
                      value={itemForm.nameAz}
                      onChange={(e) => setItemForm(prev => ({ ...prev, nameAz: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4a574]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemNameEn}</label>
                    <input 
                      type="text" required
                      value={itemForm.nameEn}
                      onChange={(e) => setItemForm(prev => ({ ...prev, nameEn: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4a574]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemNameRu}</label>
                    <input 
                      type="text" required
                      value={itemForm.nameRu}
                      onChange={(e) => setItemForm(prev => ({ ...prev, nameRu: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4a574]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemPrice}</label>
                    <input 
                      type="number" required min="0" step="1"
                      value={itemForm.price}
                      onChange={(e) => setItemForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4a574] font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1 font-sans">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemCat}</label>
                    <select
                      value={itemForm.category}
                      onChange={(e) => setItemForm(prev => ({ ...prev, category: e.target.value as MenuItem['category'] }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4a574]"
                    >
                      {menuCategories.map((c) => (
                        <option key={c.id} value={c.id}>{c.titleAz}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">Image URL</label>
                    <input 
                      type="text" required
                      value={itemForm.image}
                      onChange={(e) => setItemForm(prev => ({ ...prev, image: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#d4a574]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemDescAz}</label>
                    <textarea 
                      value={itemForm.descriptionAz}
                      onChange={(e) => setItemForm(prev => ({ ...prev, descriptionAz: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#d4a574] h-20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemDescEn}</label>
                    <textarea 
                      value={itemForm.descriptionEn}
                      onChange={(e) => setItemForm(prev => ({ ...prev, descriptionEn: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#d4a574] h-20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500">{t.itemDescRu}</label>
                    <textarea 
                      value={itemForm.descriptionRu}
                      onChange={(e) => setItemForm(prev => ({ ...prev, descriptionRu: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#d4a574] h-20"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingItem(false)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {t.itemCancel}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#38a169] hover:bg-[#2f855a] text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow active:scale-95"
                  >
                    {t.itemSave}
                  </button>
                </div>
              </form>
            )}

            {/* Filter segments */}
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text"
                placeholder={lang === 'aze' ? 'Axtarış...' : lang === 'rus' ? 'Поиск...' : 'Search items...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a574]"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#d4a574]"
              >
                <option value="all">{lang === 'aze' ? 'Bütün Kateqoriyalar' : lang === 'rus' ? 'Все Категории' : 'All Categories'}</option>
                {menuCategories.map(c => (
                  <option key={c.id} value={c.id}>{lang === 'aze' ? c.titleAz : lang === 'rus' ? c.titleRu : c.titleEn}</option>
                ))}
              </select>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenuItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-150 hover:border-[#d4a574]/35 transition-all items-center bg-white justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="truncate">
                      <h4 className="font-serif font-bold text-sm text-primary">
                        {lang === 'aze' ? item.nameAz : lang === 'rus' ? item.nameRu : item.nameEn}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-mono italic">
                        {item.category.toUpperCase()} &bull; <strong className="text-secondary">{item.price}₼</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 bg-[#faf9f6] hover:bg-[#d4a574]/10 text-secondary rounded-full transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit size={13} />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 bg-red-50 hover:bg-red-150 text-red-600 rounded-full transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab content 3: Contact/Working Hours Editor */}
        {activeAdminTab === 'contact' && (
          <form onSubmit={handleSaveContactParams} className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#1a365d]">{t.contactEditTitle}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.addressTitle}</label>
                <input 
                  type="text" required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.contactWorkingHours}</label>
                <input 
                  type="text" required
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.contactPhone1}</label>
                <input 
                  type="text" required
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.contactPhone2}</label>
                <input 
                  type="text" required
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
                />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{t.contactPhone3}</label>
                <input 
                  type="text" required
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574] max-w-md"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-[#38a169] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#2f855a] transition-all cursor-pointer active:scale-95"
              >
                {t.saveSettings}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
