
import React from 'react';

interface Props {
  onBack: () => void;
}

const WINNERS_DATA = [
  { name: 'Bernardo Machava', phone: '841234***', amount: 1000 },
  { name: 'Helena Mondlane', phone: '829988***', amount: 1000 },
  { name: 'Samuel Guambe', phone: '874455***', amount: 1000 },
  { name: 'Clara Sitoe', phone: '862233***', amount: 1000 },
  { name: 'Isac Matola', phone: '831122***', amount: 1000 },
  { name: 'Ana Langa', phone: '857766***', amount: 1000 },
  { name: 'Zacarias Matsinhe', phone: '848877***', amount: 1000 },
  { name: 'Fátima Tembe', phone: '825544***', amount: 1000 },
  { name: 'Júlio Nhaca', phone: '873322***', amount: 1000 },
  { name: 'Marta Chivambo', phone: '861100***', amount: 1000 },
  { name: 'Elias Moiane', phone: '839988***', amount: 1000 },
  { name: 'Beatriz Mabote', phone: '852211***', amount: 1000 },
];

const StepWinners: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Vencedores Recentes</h2>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nome do Beneficiário</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Número de Celular</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Valor Sacado</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {WINNERS_DATA.map((winner, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-slate-200 font-bold text-base group-hover:text-emerald-400 transition-colors">{winner.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-mono text-slate-400 font-bold">{winner.phone}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-emerald-500 font-black">{winner.amount.toLocaleString('pt-MZ')} MT</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest">Sucedido</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-12 text-center p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
        <p className="text-slate-400 text-sm font-medium italic">
          * Por motivos de segurança e privacidade, os últimos 3 dígitos dos números foram ocultados.
        </p>
      </div>
    </div>
  );
};

export default StepWinners;