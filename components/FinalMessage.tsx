
import React from 'react';

interface Props {
  hasSimulatedShare: boolean;
}

const FinalMessage: React.FC<Props> = ({ hasSimulatedShare }) => {
  if (hasSimulatedShare) {
    return (
      <div className="glass-effect p-10 rounded-3xl shadow-2xl text-center animate-in zoom-in duration-500 border-2 border-red-500/50 bg-red-950/20">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-600/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>

        <h2 className="text-3xl font-black text-red-500 mb-4 uppercase tracking-tighter italic">
          SALDO INDISPONÍVEL!
        </h2>
        
        <div className="bg-red-900/40 border border-red-500/30 p-6 rounded-2xl mb-6">
          <p className="text-white text-lg leading-relaxed font-bold">
            O seu saldo de 1.000 MT <span className="text-red-400">não está disponível</span> porque você não seguiu os termos da Helefant Bet.
          </p>
        </div>

        <p className="text-white font-bold text-sm leading-relaxed">
          O sistema detectou que você simulou o compartilhamento obrigatório. O seu acesso às promoções foi limitado.
        </p>

        <div className="mt-10 pt-8 border-t border-red-900/40">
          <p className="text-xs text-red-400 uppercase font-black tracking-widest">
            VIOLAÇÃO DOS TERMOS DETECTADA
          </p>
        </div>
      </div>
    );
  }

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
