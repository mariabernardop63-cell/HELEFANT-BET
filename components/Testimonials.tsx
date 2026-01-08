
import React, { useState } from 'react';

const INITIAL_COMMENTS = [
  {
    name: 'Bernardo Machava',
    date: 'Hoje, 09:12',
    province: 'Maputo Cidade',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'NAO TO A ACREDITAR BAY, PRIMEIRA PROPAGANDA A RECEBER TACO DE VERDADE.'
  },
  {
    name: 'Helena Mondlane',
    date: 'Hoje, 09:05',
    province: 'Gaza',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'SO AGRADECER A PESSOA QUE CPMPARTILHOU ISSO COMIGO, USEI QUASE 6 NUMEROS, FIZ 6 MIL METICAIS.'
  },
  {
    name: 'Samuel Guambe',
    date: 'Hoje, 08:45',
    province: 'Nampula',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'PARA QUEM AINDA NAO RECEBEU É SO COMUINICAR O SUPORTE DELES, TAMBEM ACONTEU COMIGO, DEPOIS DE 30 MIN RECEBI O VALOR.'
  },
  {
    name: 'Clara Sitoe',
    date: 'Ontem, 23:30',
    province: 'Sofala',
    avatar: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'GOSTARIA QUE FOSSE A UNICA A RECEBER ISSO.'
  },
  {
    name: 'Isac Matola',
    date: 'Ontem, 21:15',
    province: 'Tete',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'ESSES SAO MAFIOSOS PH, NEM DIVULGAR NAS REDES SOCIAS QUE É BOM NADA, SORTE ENTRAR ANTES DE EXPIRAR.'
  },
  {
    name: 'Ana Langa',
    date: 'Ontem, 20:02',
    province: 'Inhambane',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=150&h=150',
    text: 'Já é a segunda vez que a Helefant faz promoções assim. Adoro!'
  }
];

const Testimonials: React.FC = () => {
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    const comment = {
      name: userName,
      date: 'Agora mesmo',
      province: 'Moçambique',
      avatar: userAvatar || 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=150&h=150',
      text: newComment
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setUserName('');
    setUserAvatar(null);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">DEPOIMENTOS</h2>
          <p className="text-slate-500 font-medium italic">Depoimentos reais de quem já recebeu o prêmio.</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
          <span className="text-emerald-500 text-sm font-black uppercase tracking-widest">400 Depoimentos Verificados</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {comments.map((comment, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.06] transition-all hover:-translate-y-2 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <img src={comment.avatar} alt={comment.name} className="w-14 h-14 rounded-full border-2 border-emerald-500/30 object-cover shadow-lg" />
              <div>
                <h4 className="font-bold text-white text-lg">{comment.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">{comment.province}</span>
                  <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                  <span className="text-[10px] font-medium text-slate-500 uppercase">{comment.date}</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">"{comment.text}"</p>
          </div>
        ))}
      </div>
      
      <div className="w-full max-w-2xl mx-auto bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Deixe seu depoimento</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">Sua opinião é fundamental para nossa comunidade</p>
        </div>
        
        <form onSubmit={postComment} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Seu Nome Completo</label>
              <input
                type="text"
                placeholder="Ex: João Sitoe"
                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none transition-all"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">Sua Foto</label>
              <label className="cursor-pointer group">
                <div className="w-16 h-16 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center overflow-hidden group-hover:border-emerald-500/50 transition-colors shadow-inner">
                  {userAvatar ? (
                    <img src={userAvatar} className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-600 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2 ml-1">Seu Comentário</label>
            <textarea
              placeholder="Conte como foi receber seus 1000 MT..."
              className="w-full bg-slate-900 border border-white/10 rounded-3xl px-6 py-4 text-white focus:border-emerald-500/50 outline-none min-h-[140px] transition-all resize-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-[0.2em] transform active:scale-95"
          >
            Publicar Depoimento
          </button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
