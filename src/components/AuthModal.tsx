import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (user: { email: string; name: string }) => void;
}

export default function AuthModal({ isOpen, onClose, lang, onLoginSuccess }: AuthModalProps) {
  const t = translations[lang];
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (password.length < 6) {
      setError(lang === 'aze' 
        ? 'Şifrə ən azı 6 simvoldan ibarət olmalıdır!' 
        : lang === 'rus'
        ? 'Пароль должен содержать минимум 6 символов!'
        : 'Password must be at least 6 characters long!');
      return;
    }

    const savedUsersStr = localStorage.getItem('vega_registered_users') || '[]';
    let savedUsers: Array<{ name: string; email: string; password: string }> = [];
    try {
      savedUsers = JSON.parse(savedUsersStr);
    } catch {
      savedUsers = [];
    }

    if (isSignUp) {
      // Sign Up / Register
      const userExists = savedUsers.some(u => u.email.trim().toLowerCase() === email.trim().toLowerCase());
      if (userExists) {
        setError(lang === 'aze' 
          ? 'Bu e-poçt ünvanı artıq qeydiyyatdan keçib!' 
          : lang === 'rus'
          ? 'Этот адрес электронной почты уже зарегистрирован!'
          : 'This email address is already registered!');
        return;
      }

      const newUser = {
        name: name.trim() || 'Guest User',
        email: email.trim().toLowerCase(),
        password: password
      };

      savedUsers.push(newUser);
      localStorage.setItem('vega_registered_users', JSON.stringify(savedUsers));
      
      setSuccessMsg(t.authSuccessRegister);
      setIsSignUp(false);
      setPassword('');
    } else {
      // Sign In / Login
      // Always allow the default admin user with authorized email and any password (or let him register first)
      const inputEmail = email.trim().toLowerCase();
      let foundUser = savedUsers.find(u => u.email.trim().toLowerCase() === inputEmail && u.password === password);

      if (!foundUser && inputEmail === 'nihadhuseynovtt@gmail.com') {
        // If admin tries to log in but hasn't registered yet, register them by default for standard high convenience,
        // or prompt them to sign up. Let's log them in with high quality hospitality.
        foundUser = {
          name: 'Nihad Huseynov',
          email: 'nihadhuseynovtt@gmail.com',
          password: password
        };
        savedUsers.push({ ...foundUser, password });
        localStorage.setItem('vega_registered_users', JSON.stringify(savedUsers));
      }

      if (foundUser) {
        onLoginSuccess({
          email: foundUser.email,
          name: foundUser.name
        });
        onClose();
      } else {
        setError(lang === 'aze'
          ? 'E-poçt və ya şifrə yalnışdır!' 
          : lang === 'rus'
          ? 'Неверный адрес почты или пароль!'
          : 'Invalid email or password!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl border border-[#d4a574]/25 shadow-2xl max-w-md w-full overflow-hidden p-8 space-y-6 text-left"
        id="auth-modal-card"
      >
        {/* Subtle Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-primary transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#1a365d]/10 rounded-2xl mx-auto flex items-center justify-center text-[#d4a574]">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary">
            {isSignUp ? t.authSignUp : t.authSignIn}
          </h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
            {t.authSubtitle}
          </p>
        </div>

        {/* Error / Success Notices */}
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-100 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-emerald-50 text-[#38a169] rounded-xl text-xs border border-emerald-100 flex items-center gap-2">
            <span>✅</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {t.authName}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={15} />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="Ali Aliyev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {t.authEmail}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={15} />
              </span>
              <input 
                type="email" 
                required
                placeholder="ali@gmail.com / nihadhuseynovtt@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {t.authPassword}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={15} />
              </span>
              <input 
                type="password" 
                required
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#faf9f6] border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#d4a574]"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-accent-green hover:bg-emerald-600 text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
          >
            {isSignUp ? t.authSignUp : t.authSignIn}
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center pt-2">
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccessMsg('');
            }}
            className="text-xs text-secondary hover:underline font-semibold focus:outline-none cursor-pointer"
          >
            {isSignUp ? t.authHasAccount : t.authNoAccount}
          </button>
        </div>
      </div>
    </div>
  );
}
