
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  read?: boolean;
  type?: 'text' | 'file' | 'audio';
  fileName?: string;
  audioUrl?: string;
}

interface Props {
  messages: Message[];
  isTyping: boolean;
  onSend: (msg: Message) => void;
  onBack: () => void;
}

const EMOJIS = ['🤝', '👍', '💰', '💸', '🔥', '✅', '🙏', '⏳'];

const SupportChat: React.FC<Props> = ({ messages, isTyping, onSend, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleTextSend = () => {
    if (!inputText.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      read: false,
      type: 'text'
    };
    onSend(msg);
    setInputText('');
    setShowEmojiPicker(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const msg: Message = {
          id: Date.now().toString(),
          text: "[Mensagem de Voz]",
          sender: 'user',
          timestamp: new Date(),
          read: false,
          type: 'audio',
          audioUrl: url
        };
        onSend(msg);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordTime(0);
      timerRef.current = window.setInterval(() => setRecordTime(p => p + 1), 1000);
    } catch (err) {
      alert("Acesso ao microfone negado.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-[85vh] bg-[#0b141a] rounded-none md:rounded-3xl overflow-hidden shadow-2xl relative border border-white/5 animate-in slide-in-from-bottom-4 duration-500">
      {/* WhatsApp Header */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between z-10 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#aebac1] hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg></button>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" className="w-10 h-10 rounded-full object-cover" alt="Suporte Helefant" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] border-2 border-[#202c33] rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-[15px] font-semibold text-[#e9edef] leading-tight">Suporte VIP Helefant</h2>
            <span className="text-[11px] text-[#00a884] font-bold uppercase tracking-widest">online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef} 
        className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#0b141a] relative"
        style={{ backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`, backgroundSize: '400px', opacity: 0.9 }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-30 text-center px-10">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
             <p className="text-white text-[11px] font-black uppercase tracking-[0.3em]">Ambiente de Suporte Seguro<br/>Fale com o mestre agora</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-1`}>
            <div className={`relative max-w-[85%] px-3 py-2 rounded-lg text-[14.5px] shadow-sm ${msg.sender === 'user' ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'}`}>
              <div className="pr-12 leading-relaxed whitespace-pre-wrap">
                {msg.type === 'audio' ? (
                  <div className="flex items-center gap-3 py-1 min-w-[200px]">
                    <div className="bg-[#00a884] w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative"><div className="absolute inset-y-0 left-0 w-1/3 bg-white/30 rounded-full"></div></div>
                  </div>
                ) : msg.text}
              </div>
              <div className="absolute bottom-1 right-2 flex items-center gap-1">
                <span className="text-[10px] text-[#8696a0] font-medium">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.sender === 'user' && (
                  <svg className={`${msg.read ? 'text-[#53bdeb]' : 'text-[#8696a0]'}`} width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M15.5 1L7 9.5L4.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 1L2.5 9.5L0 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && <div className="flex justify-start mb-2"><div className="bg-[#202c33] px-3 py-2 rounded-lg rounded-tl-none italic text-[12px] text-[#8696a0] animate-pulse">digitando...</div></div>}
      </div>

      {/* Input / Footer */}
      <div className="bg-[#202c33] p-2 flex items-center gap-2 relative">
        {isRecording ? (
          <div className="flex-1 flex items-center justify-between bg-[#2a3942] rounded-full px-5 py-2.5 animate-pulse">
            <div className="flex items-center gap-3 text-red-500 font-bold">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></div>
              <span className="font-mono">{Math.floor(recordTime/60)}:{String(recordTime%60).padStart(2,'0')}</span>
            </div>
            <button onClick={stopRecording} className="text-[#00a884] font-black uppercase text-[10px] tracking-widest">Soltar para enviar</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 px-1 text-[#aebac1]">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg></button>
            </div>
            <input 
              type="text" 
              placeholder="Mensagem" 
              className="flex-1 bg-[#2a3942] text-[#e9edef] rounded-xl px-4 py-2.5 outline-none text-[15px]" 
              value={inputText} 
              onChange={e => setInputText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleTextSend()}
              disabled={isTyping}
            />
            {inputText.trim() ? (
              <button onClick={handleTextSend} className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
            ) : (
              <button 
                onMouseDown={startRecording} 
                onMouseUp={stopRecording} 
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center text-white active:scale-125 transition-transform shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              </button>
            )}
          </>
        )}
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-[100] bg-[#202c33] p-4 rounded-2xl shadow-2xl grid grid-cols-4 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {EMOJIS.map(e => <button key={e} onClick={() => { setInputText(p => p + e); setShowEmojiPicker(false); }} className="text-2xl hover:scale-125 transition-transform">{e}</button>)}
        </div>
      )}
    </div>
  );
};

export default SupportChat;
