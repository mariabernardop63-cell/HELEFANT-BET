
import React, { useState, useEffect } from 'react';

const Stats: React.FC = () => {
  const [totalDistributed, setTotalDistributed] = useState(500000);
  const [citizensPaid, setCitizensPaid] = useState(500); // Updated to start at 500
  const [processingCount, setProcessingCount] = useState(1284);

  useEffect(() => {
    // Reference start time to calculate the "doubling" effect every 12 hours
    const startTimeKey = 'stats_reference_start';
    let referenceStart = localStorage.getItem(startTimeKey);
    if (!referenceStart) {
      referenceStart = Date.now().toString();
      localStorage.setItem(startTimeKey, referenceStart);
    }
    const startTimestamp = parseInt(referenceStart);

    const updateStats = () => {
      const now = Date.now();
      const elapsedMs = now - startTimestamp;
      const elapsedHours = elapsedMs / (1000 * 60 * 60);
      
      // Doubling logic: Growth rate doubles every 12 hours
      const doublingFactor = Math.pow(2, Math.floor(elapsedHours / 12));
      
      // Calculate Total Distributed: 500k + growth
      // Base growth: ~4,000 MT per minute -> ~66 MT per second
      const baseGrowthPerSec = 66;
      const currentGrowthPerSec = baseGrowthPerSec * doublingFactor;
      const totalGrowth = (elapsedMs / 1000) * currentGrowthPerSec;
      setTotalDistributed(Math.floor(500000 + totalGrowth));

      // Calculate Citizens Paid: Starting from 500 + growth
      // Base growth: ~4 citizens per minute -> 1 every 15 seconds
      const baseUserGrowthPerSec = 1/15;
      const currentUserGrowthPerSec = baseUserGrowthPerSec * doublingFactor;
      const userGrowth = (elapsedMs / 1000) * currentUserGrowthPerSec;
      setCitizensPaid(Math.floor(500 + userGrowth)); // Updated to start at 500

      // Processing Count: Fluctuates slightly but trends up
      setProcessingCount(prev => {
        const jitter = Math.floor(Math.random() * 5) - 2;
        const trend = 0.1 * doublingFactor;
        return Math.max(1200, Math.floor(prev + trend + jitter));
      });
    };

    const interval = setInterval(updateStats, 1000); // Update every second for realism
    updateStats(); // Initial call

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-MZ').format(val) + ' MT';
  };

  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('pt-MZ').format(val);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-12">
      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center backdrop-blur-md shadow-xl transition-all hover:border-emerald-500/30">
        <div className="text-3xl font-black mb-2 text-emerald-500 tabular-nums">
          {formatCurrency(totalDistributed)}
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Total Distribuído</div>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center backdrop-blur-md shadow-xl transition-all hover:border-emerald-500/30">
        <div className="text-3xl font-black mb-2 text-white tabular-nums">
          {formatNumber(citizensPaid)}
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Cidadãos Pagos</div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2.5rem] text-center backdrop-blur-md shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
        <div className="relative z-10 text-3xl font-black mb-2 text-emerald-400 tabular-nums">
          {formatNumber(processingCount)}
        </div>
        <div className="relative z-10 text-[10px] uppercase tracking-[0.2em] font-black text-emerald-500/60">Processando Agora</div>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center backdrop-blur-md shadow-xl transition-all hover:border-emerald-500/30">
        <div className="text-3xl font-black mb-2 text-white tabular-nums">12 Min</div>
        <div className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">Tempo Médio</div>
      </div>
    </div>
  );
};

export default Stats;
