
import React, { useState, useEffect } from 'react';
import { UserData } from '../types';

interface Props {
  userData: UserData | null;
  hasSimulatedShare: boolean;
  onComplete: () => void;
}

const StepProcessing: React.FC<Props> = ({ userData, hasSimulatedShare, onComplete }) => {
  const [status, setStatus] = useState('Analisando as informações...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 80);

    const statusUpdate = setInterval(() => {
      setProgress(current => {
        if (current < 25) {
          setStatus('Analisando as informações...');
        } else if (current < 50) {
          setStatus('Analisando o número de celular...');
        } else if (current < 75) {
          setStatus('VERICANDO SIMULACOES DE CONVITE...');
        } else {
          const prefix = userData?.phonePrimary?.substring(0, 2) || '';
          const provider = (prefix === '84' || prefix === '85') ? 'M-PESA' : 
                          (prefix === '86' || prefix === '87') ? 'e-Mola' : 'Banco Nacional';
          setStatus(`Confirmando a transação via ${provider}...`);
        }
        return current;
      });
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(statusUpdate);
    };
  }, [userData, onComplete]);

  return (
    <div className="bg-slate-950/80 border border-emerald-500/20 p-12 rounded-[3rem] backdrop-blur-3xl shadow-[0_0_100px_rgba(16,185,129,0.1)] flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10">
        <div className="relative w-40 h-40 mb-12 mx-auto">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-white/5"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-emerald-500 transition-all duration-100 ease-linear shadow-lg"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white italic">{progress}%</span>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Sync</span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-center text-white mb-4 tracking-tighter uppercase italic">
          PROCESSAMENTO <span className="text-emerald-500">HELEFANT</span>
        </h2>
        <div className="h-8 overflow-hidden">
            <p className="text-emerald-400 text-sm font-black uppercase tracking-widest text-center animate-pulse">
                {status}
            </p>
        </div>

        <div className="mt-16 flex justify-center gap-2">
            {[...Array(4)].map((_, i) => (
                <div 
                    key={i} 
                    className="w-12 h-1 bg-white/5 rounded-full relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-emerald-500 animate-[shimmer_1.5s_infinite]" style={{ animationDelay: `${i * 0.2}s` }}></div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StepProcessing;
