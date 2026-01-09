
import React from 'react';
import { UserData } from '../types';

interface Props {
  balance: number;
  userData: UserData | null;
  hasSimulatedShare: boolean;
  onBack: () => void;
}

const StepEarnings: React.FC<Props> = ({ balance, userData, hasSimulatedShare, onBack }) => {
  const cardBgClass = hasSimulatedShare 
    ? "bg-gradient-to-br from-red-700 to-red-500 shadow-[0_20px_60px_-15px_rgba(220,38,38,0.4)]" 
    : "bg-gradient-to-br from-emerald-600 to-emerald-400 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)]";

  const statusText = hasSimulatedShare ? "Saldo Bloqueado" : "Saldo Disponível";
  const balanceColor = hasSimulatedShare ? "text-slate-100" : "text-slate-950";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Meus Ganhos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className={`md:col-span-2 p-10 rounded-[3rem] relative overflow-hidden group transition-all duration-500 ${cardBgClass}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${hasSimulatedShare ? 'text-white/70' : 'text-slate-950/60'}`}>{statusText}</div>
            <div className={`text-6xl font-black italic tabular-nums ${balanceColor}`}>
              {balance.toLocaleString('pt-MZ')} <span className="text-2xl font-black opacity-60">MT</span>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className={`px-4 py-2 rounded-xl font-bold text-xs border border-white/10 ${hasSimulatedShare ? 'bg-red-900/30 text-white' : 'bg-slate-950/20 text-slate-950'}`}>
                {hasSimulatedShare ? 'Acesso Restrito' : 'Resgate Pendente'}
              </div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${hasSimulatedShare ? 'bg-white' : 'bg-slate-950'}`}></div>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] flex flex-col justify-center backdrop-blur-md">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Conta Destino</div>
          <div className="text-xl font-bold text-white mb-1">
            {userData?.accountName || 'Nenhuma conta'}
          </div>
          <div className={`text-sm font-mono font-black ${hasSimulatedShare ? 'text-red-500' : 'text-emerald-500'}`}>
            {userData?.phonePrimary ? `+258 ${userData.phonePrimary}` : 'Pendente'}
          </div>
        </div>
      </div>

      <div className={`bg-white/[0.02] border rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl transition-colors duration-500 ${hasSimulatedShare ? 'border-red-500/30' : 'border-white/5'}`}>
        <h3 className="text-xl font-black uppercase tracking-widest text-slate-200 mb-8 px-2">Histórico de Atividade</h3>
        
        <div className="space-y-4">
          {balance > 0 ? (
            <div className={`flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border transition-all ${hasSimulatedShare ? 'border-red-500/20 hover:bg-red-500/5' : 'border-white/5 hover:bg-white/[0.04]'}`}>
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${hasSimulatedShare ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {hasSimulatedShare ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-200 text-lg">Bônus de Registro Helefant</div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${hasSimulatedShare ? 'text-red-500/60' : 'text-slate-500'}`}>
                    {hasSimulatedShare ? 'REJEITADO PELO SISTEMA' : 'Processado agora mesmo'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-black ${hasSimulatedShare ? 'text-red-500 line-through' : 'text-emerald-500'}`}>+1.000 MT</div>
                <div className={`text-[10px] font-black uppercase tracking-widest ${hasSimulatedShare ? 'text-red-500/50' : 'text-emerald-500/50'}`}>
                  {hasSimulatedShare ? 'Cancelado' : 'Aguardando Saque'}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Nenhuma atividade registrada ainda.</p>
              <button onClick={onBack} className="mt-6 text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Solicitar meu prêmio de 1000 MT</button>
            </div>
          )}
        </div>
      </div>

      <div className={`mt-10 p-8 border rounded-3xl animate-pulse ${hasSimulatedShare ? 'bg-red-500/10 border-red-500/30' : 'bg-red-500/5 border-red-500/10'}`}>
         <div className="flex gap-4 items-start">
           <div className="bg-red-600 p-2 rounded-full text-white flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
           </div>
           <div>
             <h4 className="text-red-500 font-black text-xs uppercase tracking-widest mb-1">
               {hasSimulatedShare ? 'RESTRIÇÃO DE CONTA ATIVA' : 'Bloqueio Temporário'}
             </h4>
             <p className="text-red-400 text-sm font-bold leading-relaxed">
               {hasSimulatedShare 
                 ? "Esta conta foi flagrada simulando o compartilhamento obrigatório. O saldo foi anulado permanentemente conforme nossos Termos de Serviço."
                 : "O seu saldo está bloqueado por falta de verificação de convites. Conclua o compartilhamento no WhatsApp para liberar a retirada imediata via M-Pesa ou e-Mola."}
             </p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default StepEarnings;
