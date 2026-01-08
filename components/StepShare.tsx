import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

const StepShare: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [groupInvites, setGroupInvites] = useState(0);
  const [friendInvites, setFriendInvites] = useState(0);

  const sharedMessage = `NÃO ESTIVE A ACREDITAR, QUE IA RECEBER OS 1000 METICAIS, ATE RECEBER UMA SMS DO MPESA APOS 30 MINUTOS!
SE AINDA NAO ESTAS A SABER, A HELEFANT BET ESTA A OFERECER 1.000 METICAIS PARA TODO MOÇAMBICANO.
SAO CERCA DE 10 MIL MOCAMBICANOS QUE JA RECEBERAM E TU, OQUE ESTAS A ESPERA? CLIQUE NO LINK ANTES QUE EXPIRA

AQUI: 
receberaminhaparte2726789sh28822.netlify.app`;

  const encodedMessage = encodeURIComponent(sharedMessage);

  const inviteGroups = () => {
    if (groupInvites < 5) {
      setGroupInvites(prev => prev + 1);
      setProgress(prev => Math.min(100, prev + 10)); 
      window.open(`whatsapp://send?text=${encodedMessage}`, '_blank');
    }
  };

  const inviteFriends = () => {
    if (friendInvites < 50) {
      setFriendInvites(prev => Math.min(50, prev + 10));
      setProgress(prev => Math.min(100, prev + 10));
      window.open(`whatsapp://send?text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <div className="bg-slate-900/40 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Quase lá!</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          Para concluir sua solicitação, você precisa compartilhar esta promoção. 
          Isso ajuda a Helefant a chegar a mais moçambicanos.
        </p>

        {/* Anti-fraud Warning Box */}
        <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 text-left animate-pulse">
          <div className="flex-shrink-0 bg-red-500 p-1.5 rounded-full text-white mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div>
            <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-1">Aviso Anti-Fraude</h4>
            <p className="text-red-400 text-[13px] font-bold leading-snug">
              O nosso sistema detecta simulações. Se você apenas clicar e não enviar a mensagem real para os contatos, <span className="underline decoration-red-500/40">o seu prêmio de 1000 MT será cancelado automaticamente</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <button
          onClick={inviteGroups}
          className="group w-full flex items-center justify-between bg-white/5 border border-white/5 hover:border-emerald-500/50 p-6 rounded-3xl transition-all"
        >
          <div className="text-left">
            <div className="font-bold text-lg group-hover:text-emerald-400 transition-colors">Convidar Grupos</div>
            <div className="text-xs text-slate-500 font-medium italic">Progresso: {groupInvites} de 5 Grupos</div>
          </div>
          <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </button>

        <button
          onClick={inviteFriends}
          className="group w-full flex items-center justify-between bg-white/5 border border-white/5 hover:border-emerald-500/50 p-6 rounded-3xl transition-all"
        >
          <div className="text-left">
            <div className="font-bold text-lg group-hover:text-emerald-400 transition-colors">Convidar Amigos</div>
            <div className="text-xs text-slate-500 font-medium italic">Progresso: {friendInvites} de 50 Amigos</div>
          </div>
          <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </button>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Verificação de Humanidade</span>
          <span className="text-3xl font-black text-emerald-500 italic">{Math.floor(progress)}%</span>
        </div>
        <div className="h-4 w-full bg-slate-950 rounded-full border border-white/5 p-1">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            style={{ width: `${progress}%` }}
          >
             <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <button
        disabled={progress < 100}
        onClick={onComplete}
        className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all text-lg ${
          progress >= 100 
            ? 'bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/30 shimmer-btn scale-105 active:scale-95' 
            : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50 grayscale'
        }`}
      >
        RESCATAR MEUS 1000 MT
      </button>
      
      <p className="mt-6 text-[10px] text-center text-slate-600 font-bold uppercase tracking-widest">
        Sistema monitorado por Inteligência Artificial
      </p>
    </div>
  );
};

export default StepShare;