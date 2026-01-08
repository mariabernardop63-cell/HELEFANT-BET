
import React from 'react';

const FinalMessage: React.FC = () => {
  return (
    <div className="glass-effect p-10 rounded-3xl shadow-2xl text-center animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/40">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>

      <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter italic">
        SOLICITAÇÃO CONCLUÍDA!
      </h2>
      
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6">
        <p className="text-slate-300 text-lg leading-relaxed">
          Os seus dados foram enviados com sucesso para o departamento financeiro da 
          <span className="text-emerald-400 font-bold"> Helefant Company</span>.
        </p>
      </div>

      <p className="text-emerald-400 font-bold text-xl animate-bounce">
        VOCÊ IRÁ RECEBER EM MENOS DE 30 MINUTOS
      </p>

      <div className="mt-10 pt-8 border-t border-slate-800">
        <p className="text-xs text-slate-500 uppercase font-medium tracking-widest">
          Obrigado por confiar na Helefant Bet
        </p>
      </div>
    </div>
  );
};

export default FinalMessage;
