import React, { useEffect, useState } from 'react';

const LoadingOverlay: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse scale-150"></div>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 transform rotate-12">
            <span className="text-white font-black text-2xl italic">H</span>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <h3 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-2">
          HELEFANT <span className="text-emerald-500">BET</span>
        </h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          Iniciando ambiente seguro{dots}
        </p>
      </div>
      <div className="absolute bottom-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 animate-[loading-bar_2.8s_ease-in-out]"></div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;