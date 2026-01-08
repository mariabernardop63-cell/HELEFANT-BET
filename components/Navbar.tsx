
import React, { useState } from 'react';

interface Props {
  onSupportClick: () => void;
  onWinnersClick: () => void;
  onEarningsClick: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<Props> = ({ onSupportClick, onWinnersClick, onEarningsClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMobileSupport = () => {
    setIsMenuOpen(false);
    onSupportClick();
  };

  const handleMobileWinners = () => {
    setIsMenuOpen(false);
    onWinnersClick();
  };

  const handleMobileEarnings = () => {
    setIsMenuOpen(false);
    onEarningsClick();
  };

  return (
    <>
      <nav className="w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-2xl sticky top-0 z-[60] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transform rotate-6 hover:rotate-0 transition-transform">
              <span className="text-white font-black text-xl italic">H</span>
            </div>
            <span className="text-xl font-extrabold tracking-tighter uppercase text-white">
              Helefant <span className="text-emerald-500">Bet</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-300 uppercase tracking-widest">
            <button onClick={onHomeClick} className="hover:text-emerald-400 transition-colors">Início</button>
            <button onClick={onWinnersClick} className="hover:text-emerald-400 transition-colors">Vencedores</button>
            <button onClick={onSupportClick} className="hover:text-emerald-400 transition-colors">Suporte</button>
            <button 
              onClick={onEarningsClick}
              className="bg-emerald-500 text-slate-950 px-8 py-3 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
              MEUS GANHOS
            </button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="w-12 h-12 flex flex-col justify-center items-center gap-1.5 cursor-pointer bg-white/5 rounded-xl border border-white/10"
              aria-label="Abrir menu"
            >
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-slate-950 transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
          <button onClick={() => { setIsMenuOpen(false); onHomeClick(); }} className="text-3xl font-black text-white hover:text-emerald-500 transition-colors uppercase">INÍCIO</button>
          <button onClick={handleMobileWinners} className="text-3xl font-black text-white hover:text-emerald-500 transition-colors uppercase">VENCEDORES</button>
          <button onClick={handleMobileSupport} className="text-3xl font-black text-white hover:text-emerald-500 transition-colors uppercase">SUPORTE</button>
          <button onClick={handleMobileEarnings} className="bg-emerald-500 text-slate-950 w-full max-w-xs py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 uppercase tracking-widest">
            MEUS GANHOS
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            FECHAR
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;