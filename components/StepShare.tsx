
import React, { useState } from 'react';

interface Props {
  onComplete: (simulated: boolean) => void;
}

const StepShare: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [groupInvites, setGroupInvites] = useState(0);
  const [friendInvites, setFriendInvites] = useState(0);
  const [showBanError, setShowBanError] = useState(false);
  const [everSimulated, setEverSimulated] = useState(false);

  const sharedMessage = `Não acreditei até ver com os meus próprios olhos. Há 30 minutos, recebi uma mensagem no MPesa: 1.000 Meticais foram depositados na minha conta. Sem explicação. Sem complicação. Só Clica e recebe.

A Helphant Bet está a fazer algo nunca visto em Moçambique: está a dar 1.000 MT a cada cidadão. Já são mais de 10 mil pessoas confirmadas. E tu? Ainda estás a espera de quê?

👉 receberaminhaparte2726789sh28822.pages.dev`;

  const encodedMessage = encodeURIComponent(sharedMessage);

  const getProgressLabel = (p: number) => {
    if (p === 0) return "VAMOS LÁ";
    if (p <= 20) return "QUASE LÁ";
    if (p <= 50) return "FALTA MAIS UM POUCO";
    if (p <= 80) return "ESTAMOS QUASE LÁ";
    if (p < 100) return "QUASE PRONTO";
    return "FEITO";
  };

  const handleShareClick = (type: 'group' | 'friend') => {
    // Simula uma detecção de fraude aleatória ou se o usuário tentar avançar rápido demais sem progresso real
    if (Math.random() < 0.15 && progress > 5) { 
       setShowBanError(true);
       setEverSimulated(true);
       return;
    }
    
    setShowBanError(false);
    if (type === 'group' && groupInvites < 5) {
      setGroupInvites(prev => prev + 1);
      setProgress(prev => Math.min(100, prev + 10));
      window.open(`whatsapp://send?text=${encodedMessage}`, '_blank');
    } else if (type === 'friend' && friendInvites < 50) {
      setFriendInvites(prev => Math.min(50, prev + 10));
      setProgress(prev => Math.min(100, prev + 10));
      window.open(`whatsapp://send?text=${encodedMessage}`, '_blank');
    }
  };

  const handleRescue = () => {
    if (progress < 100) {
      setShowBanError(true);
      setEverSimulated(true);
      return;
    }
    onComplete(everSimulated);
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

        {showBanError ? (
          <div className="bg-red-900/40 border-2 border-red-500 p-6 rounded-2xl flex items-start gap-4 text-left animate-bounce">
            <div className="flex-shrink-0 bg-red-600 p-2 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 9v4M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
            </div>
            <div>
              <h4 className="text-red-500 font-black text-sm uppercase tracking-widest mb-1">ERRO DE SIMULAÇÃO DETECTADO</h4>
              <p className="text-white text-[13px] font-bold leading-snug">
                Parece que você está tentando simular o compartilhamento. <span className="text-red-400 underline uppercase">Se continuar assim, o seu número será banido permanentemente de todas as promoções Helefant Bet.</span> Complete o envio real no WhatsApp!
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 text-left">
            <div className="flex-shrink-0 bg-red-500 p-1.5 rounded-full text-white mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
            <div>
              <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-1">Aviso Anti-Fraude</h4>
              <p className="text-red-400 text-[13px] font-bold leading-snug">
                O nosso sistema detecta simulações. Se você apenas clicar e não enviar a mensagem real para os contatos, o seu prêmio será cancelado.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-10">
        <button
          onClick={() => handleShareClick('group')}
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
          onClick={() => handleShareClick('friend')}
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
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{getProgressLabel(progress)}</span>
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
        onClick={handleRescue}
        className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all text-lg ${
          progress >= 100 
            ? 'bg-emerald-500 text-slate-950 shadow-2xl shadow-emerald-500/30 scale-105 active:scale-95' 
            : 'bg-slate-800 text-slate-600 opacity-80'
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
