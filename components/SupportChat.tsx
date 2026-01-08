
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'file';
  fileName?: string;
}

interface Props {
  onBack: () => void;
}

const EMOJIS = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😋', '😛', '😝', '😜', '🤑', '🤝', '👍', '🔥', '✅', '💸', '💰'];

const SupportChat: React.FC<Props> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: 'Olá! Bem-vindo ao Suporte Helefant 24 Horas. Como podemos ajudar com o seu prêmio de 1000 MT?',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getGeminiResponse = async (userText: string, history: Message[]) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = history.map(m => `${m.sender === 'user' ? 'Usuário' : 'Suporte'}: ${m.text}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Histórico da conversa:\n${context}\n\nUsuário: ${userText}`,
        config: {
          systemInstruction: "Você é o Agente de Suporte Oficial da Helefant Bet no WhatsApp. " +
            "REGRAS DE CONDUTA:\n" +
            "1. NUNCA use gírias como 'mambo'. Seja profissional.\n" +
            "2. Se o usuário enviou um arquivo/áudio, agradeça pelo envio e diga que a equipe técnica irá validar o anexo.\n" +
            "3. Se você ainda não sabe o nome do usuário, sua prioridade é perguntar o nome.\n" +
            "4. Use o nome do usuário em todas as frases após ele se identificar.\n" +
            "5. Confirme que a promoção de 1000 MT é real e exclusiva para Moçambique.\n" +
            "6. Responda como se estivesse no WhatsApp: frases curtas e objetivas.",
          temperature: 0.7,
        },
      });

      return response.text || "Pode repetir, por favor?";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "O sistema está com alta demanda. Por favor, aguarde um momento que já vamos lhe atender.";
    }
  };

  const handleSendMessage = async (text: string = inputText, isFile: boolean = false, fileName?: string) => {
    if (!text.trim() && !isFile) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: isFile ? `Arquivo enviado: ${fileName}` : text,
      sender: 'user',
      timestamp: new Date(),
      type: isFile ? 'file' : 'text',
      fileName: fileName
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!isFile) setInputText('');
    setShowEmojiPicker(false);
    
    setIsTyping(true);
    const aiResponseText = await getGeminiResponse(isFile ? `[Usuário enviou um arquivo: ${fileName}]` : text, updatedMessages);
    
    setIsTyping(false);
    const agentMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'agent',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, agentMsg]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'audio') => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendMessage(`Enviando ${type === 'audio' ? 'áudio' : 'arquivo'}...`, true, file.name);
    }
  };

  const addEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-[85vh] md:h-[80vh] bg-[#0b141a] rounded-none md:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500 border border-white/5 relative">
      {/* WhatsApp Header */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#aebac1] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" 
              className="w-10 h-10 rounded-full border border-white/10 object-cover" 
              alt="Suporte" 
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] border-2 border-[#202c33] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[15px] font-semibold text-[#e9edef] leading-tight">Suporte Helefant 24h</h2>
            <span className="text-[11px] text-[#00a884] font-medium">online</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-[#aebac1]">
          <button className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7Z"/><path d="m1 7 11 8 11-8"/></svg></button>
          <button className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
        </div>
      </div>

      {/* Chat Wallpaper Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#0b141a] relative"
        style={{ 
          backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          opacity: 0.9
        }}
      >
        <div className="flex justify-center mb-4">
          <span className="bg-[#182229] text-[#8696a0] text-[11px] px-3 py-1 rounded-lg uppercase font-bold tracking-wider">Hoje</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-1`}>
            <div className={`relative max-w-[85%] px-3 py-2 rounded-lg text-[14.5px] shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' 
                : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'
            }`}>
              {/* Message Tail */}
              <div className={`absolute top-0 w-2 h-3 ${
                msg.sender === 'user' 
                  ? 'right-[-8px] bg-[#005c4b]' 
                  : 'left-[-8px] bg-[#202c33]'
              }`} style={{ clipPath: msg.sender === 'user' ? 'polygon(0 0, 0 100%, 100% 0)' : 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
              
              <div className="pr-12 leading-relaxed whitespace-pre-wrap">
                {msg.type === 'file' ? (
                  <div className="flex items-center gap-3 py-1">
                    <div className="bg-black/20 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <span className="font-bold underline text-xs">{msg.fileName}</span>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
              
              <div className="absolute bottom-1 right-2 flex items-center gap-1">
                <span className={`text-[10px] ${msg.sender === 'user' ? 'text-[#aebac1]' : 'text-[#8696a0]'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.sender === 'user' && (
                  <svg className="text-[#53bdeb]" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 1L7 9.5L4.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 1L2.5 9.5L0 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-[#202c33] px-3 py-2 rounded-lg rounded-tl-none flex items-center gap-2 shadow-sm border border-white/5">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[#8696a0] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-[12px] text-[#8696a0] font-medium italic">O suporte está escrevendo...</span>
            </div>
          </div>
        )}
      </div>

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-50 bg-[#202c33] border border-white/5 p-4 rounded-2xl shadow-2xl grid grid-cols-7 gap-2 animate-in fade-in slide-in-from-bottom-2">
          {EMOJIS.map(emoji => (
            <button 
              key={emoji} 
              onClick={() => addEmoji(emoji)}
              className="text-2xl hover:scale-125 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Hidden File Inputs */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileUpload(e, 'file')} />
      <input type="file" ref={audioInputRef} accept="audio/*" className="hidden" onChange={(e) => handleFileUpload(e, 'audio')} />

      {/* WhatsApp Input Bar */}
      <div className="bg-[#202c33] p-2 flex items-center gap-2">
        <div className="flex items-center gap-3 px-2 text-[#aebac1]">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`hover:text-white transition-colors ${showEmojiPicker ? 'text-[#00a884]' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="Mensagem"
            className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-lg px-4 py-2.5 outline-none text-[15px] placeholder-[#8696a0]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            onFocus={() => setShowEmojiPicker(false)}
          />
          
          {inputText.trim() ? (
            <button
              type="submit"
              disabled={isTyping}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-[#00a884] text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => audioInputRef.current?.click()}
              disabled={isTyping}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-[#00a884] text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SupportChat;
