
import React, { useState, useEffect } from 'react';
import { AppStep, UserData } from './types';
import StepForm from './components/StepForm';
import StepShare from './components/StepShare';
import StepProcessing from './components/StepProcessing';
import FinalMessage from './components/FinalMessage';
import Navbar from './components/Navbar';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import SupportChat from './components/SupportChat';
import StepWinners from './components/StepWinners';
import StepEarnings from './components/StepEarnings';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.FORM);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [daysRemaining, setDaysRemaining] = useState(17);
  const [balance, setBalance] = useState(0);

  // Countdown logic: Decrease every 24 hours
  useEffect(() => {
    const startDateKey = 'helefant_promo_start_date';
    let startDate = localStorage.getItem(startDateKey);
    
    if (!startDate) {
      startDate = new Date().toISOString();
      localStorage.setItem(startDateKey, startDate);
    }

    const calculateDays = () => {
      const start = new Date(startDate!).getTime();
      const now = new Date().getTime();
      const elapsedDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
      const remaining = Math.max(1, 17 - elapsedDays);
      setDaysRemaining(remaining);
    };

    calculateDays();
    const timer = setInterval(calculateDays, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setBalance(1000);
    setCurrentStep(AppStep.SHARE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareComplete = () => {
    setCurrentStep(AppStep.PROCESSING);
  };

  const handleProcessingComplete = () => {
    setCurrentStep(AppStep.SUCCESS);
  };

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('solicitar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSupportClick = () => {
    setCurrentStep(AppStep.SUPPORT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWinnersClick = () => {
    setCurrentStep(AppStep.WINNERS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEarningsClick = () => {
    setCurrentStep(AppStep.EARNINGS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setCurrentStep(AppStep.FORM);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 relative">
      <Navbar 
        onSupportClick={handleSupportClick} 
        onWinnersClick={handleWinnersClick}
        onEarningsClick={handleEarningsClick}
        onHomeClick={handleHomeClick}
      />
      
      {/* Floating Support Button */}
      {currentStep !== AppStep.SUPPORT && (
        <button
          onClick={handleSupportClick}
          className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#00a884] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,168,132,0.4)] hover:scale-110 active:scale-95 transition-all group animate-bounce"
          aria-label="Suporte"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span className="absolute right-full mr-4 bg-[#202c33] text-white text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Falar com Suporte Online
          </span>
        </button>
      )}

      {currentStep === AppStep.FORM && (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=1920" 
              alt="Mulher Moçambicana Feliz" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-emerald-900/60 to-slate-950"></div>
          </div>

          <div className="relative z-10 w-full max-w-6xl px-4 py-20 text-center animate-in fade-in zoom-in duration-1000">
            <div className="mb-10">
              <span className="inline-block px-8 py-3 mb-8 text-sm font-black tracking-[0.4em] uppercase bg-emerald-500 text-slate-950 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-pulse">
                EXPIRA DAQUI A {daysRemaining} DIAS
              </span>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter">
                  <span className="block text-white drop-shadow-lg">ESTAMOS A DAR</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    1.000 METICAIS
                  </span>
                </h1>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-300 italic opacity-80">
                  PARA TODOS OS MOÇAMBICANOS
                </h2>
              </div>

              <div className="max-w-3xl mx-auto mt-10 space-y-6">
                <p className="text-lg md:text-2xl text-slate-100 font-medium leading-relaxed drop-shadow-md">
                  A <span className="text-emerald-400 font-extrabold underline decoration-emerald-500/50">HELEFANT COMPANY</span> celebra o faturamento recorde de 126 Milhões de MT partilhando o sucesso com você.
                </p>
              </div>
            </div>
            
            <div className="mt-16 flex justify-center">
               <button 
                onClick={scrollToForm}
                className="group relative bg-emerald-500 text-slate-950 px-16 py-6 rounded-2xl font-black text-2xl uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 overflow-hidden"
               >
                 <span className="relative z-10">RECEBER</span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               </button>
            </div>
          </div>
        </section>
      )}

      <main id="solicitar" className="w-full max-w-6xl px-4 py-12 flex flex-col items-center min-h-[60vh]">
        {currentStep === AppStep.FORM && (
          <>
            <Stats />
            
            <div className="w-full max-w-4xl mt-12 bg-white/[0.02] border border-white/5 p-8 md:p-16 rounded-[4rem] backdrop-blur-3xl shadow-2xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Dados de Recebimento</h2>
                <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-slate-400 font-medium">Preencha corretamente para garantir o envio instantâneo.</p>
              </div>
              <StepForm onSubmit={handleFormSubmit} />
            </div>

            <div className="w-full mt-32">
              <Testimonials />
            </div>
          </>
        )}

        {currentStep === AppStep.WINNERS && (
          <div className="w-full py-10">
            <StepWinners onBack={handleHomeClick} />
          </div>
        )}

        {currentStep === AppStep.EARNINGS && (
          <div className="w-full py-10">
            <StepEarnings balance={balance} userData={userData} onBack={handleHomeClick} />
          </div>
        )}

        {currentStep === AppStep.SUPPORT && (
          <div className="w-full py-10">
            <SupportChat onBack={handleHomeClick} />
          </div>
        )}

        {currentStep !== AppStep.FORM && currentStep !== AppStep.SUPPORT && currentStep !== AppStep.WINNERS && currentStep !== AppStep.EARNINGS && (
          <div className="w-full max-w-xl py-20 animate-in fade-in scale-95 duration-500">
            {currentStep === AppStep.SHARE && <StepShare onComplete={handleShareComplete} />}
            {currentStep === AppStep.PROCESSING && <StepProcessing onComplete={handleProcessingComplete} />}
            {currentStep === AppStep.SUCCESS && <FinalMessage />}
          </div>
        )}
      </main>

      <footer className="w-full border-t border-white/5 py-16 bg-slate-950/80 backdrop-blur-md mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-black italic tracking-tighter text-emerald-400 mb-4 cursor-pointer" onClick={handleHomeClick}>HELEFANT BET</div>
            <p className="text-slate-500 text-sm leading-relaxed text-center md:text-left">
              A maior casa de apostas de Moçambique, agora celebrando com o povo. Regulado e licenciado para operar em todo território nacional.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Links Rápidos</h4>
            <div className="flex flex-col gap-3 text-slate-400 text-sm font-medium items-center">
              <button onClick={handleWinnersClick} className="hover:text-emerald-400 transition-colors">Vencedores da Semana</button>
              <button onClick={handleSupportClick} className="hover:text-emerald-400 transition-colors">Como funciona o prêmio</button>
              <a href="#" className="hover:text-emerald-400 transition-colors">Termos e Condições</a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Apoio ao Cliente</h4>
             <button 
               onClick={handleSupportClick}
               className="bg-slate-900 border border-slate-800 px-8 py-3 rounded-xl text-emerald-400 font-bold hover:bg-slate-800 transition-all"
             >
               Falar com Suporte
             </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] uppercase tracking-[0.2em] font-bold">
           © 2024 Helefant Company - Jogue com Responsabilidade (18+)
        </div>
      </footer>
    </div>
  );
};

export default App;