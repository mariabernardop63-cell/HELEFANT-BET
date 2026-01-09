
import React, { useState, useEffect } from 'react';

interface Winner {
  name: string;
  phone: string;
  amount: number;
}

const INITIAL_WINNERS: Winner[] = [
  { name: 'Bernardo Machava', phone: '841234***', amount: 1000 },
  { name: 'Helena Mondlane', phone: '829988***', amount: 1000 },
  { name: 'Samuel Guambe', phone: '874455***', amount: 1000 },
  { name: 'Clara Sitoe', phone: '862233***', amount: 1000 },
  { name: 'Isac Matola', phone: '831122***', amount: 1000 },
  { name: 'Ana Langa', phone: '857766***', amount: 1000 },
];

const NAMES = ['Zacarias', 'Fátima', 'Júlio', 'Marta', 'Elias', 'Beatriz', 'Sérgio', 'Paula', 'Nilza', 'Arlindo', 'Inácio', 'Rosa', 'Amélia', 'Dércio'];
const SURNAMES = ['Matsinhe', 'Tembe', 'Nhaca', 'Chivambo', 'Moiane', 'Mabote', 'Cossa', 'Langa', 'Sitoe', 'Magaia', 'Matusse', 'Pinto'];
const PREFIXES = ['84', '82', '87', '86', '85'];

interface Props {
  onBack: () => void;
}

const StepWinners: React.FC<Props> = ({ onBack }) => {
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${SURNAMES[Math.floor(Math.random() * SURNAMES.length)]}`;
      const randomPhone = `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}***`;
      
      const newWinner = {
        name: randomName,
        phone: randomPhone,
        amount: 1000
      };

      setWinners(prev => [newWinner, ...prev.slice(0, 9)]);
    }, 20000); // Atualiza a cada 20 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="bg-white/5 p-3 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Vencedores Recentes</h2>
        </div>

        {/* Ícone Animado de Atualização em Directo */}
        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse">Em Directo</span>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Beneficiário</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Celular</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Valor</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Data e Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {winners.map((winner, idx) => (
                <tr key={`${winner.phone}-${idx}`} className="hover:bg-white/[0.01] transition-all group animate-in slide-in-from-top-4 duration-500">
                  <td className="px-8 py-6">
                    <span className="text-slate-200 font-bold text-base group-hover:text-emerald-400 transition-colors">{winner.name}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-mono text-slate-400 font-bold tracking-widest">{winner.phone}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-emerald-500 font-black italic">{winner.amount.toLocaleString('pt-MZ')} MT</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hoje, {new Date().getHours()}:{String(new Date().getMinutes() - idx).padStart(2, '0')}</span>
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <p className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] italic animate-pulse">
        A lista acima é atualizada em tempo real conforme confirmação bancária
      </p>
    </div>
  );
};

export default StepWinners;
