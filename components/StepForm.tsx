
import React, { useState } from 'react';
import { UserData } from '../types';
import { PROVINCES, GENDERS } from '../constants';

interface Props {
  onSubmit: (data: UserData) => void;
}

const StepForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<UserData>({
    phonePrimary: '',
    phoneSecondary: '',
    accountName: '',
    province: '',
    gender: '',
    purpose: ''
  });

  const [errors, setErrors] = useState<string>('');

  const handlePhoneChange = (val: string, field: 'phonePrimary' | 'phoneSecondary') => {
    // Only numbers allowed, max 9 digits
    const cleaned = val.replace(/\D/g, '').slice(0, 9);
    setForm(prev => ({ ...prev, [field]: cleaned }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(form).some(val => val === '')) {
      setErrors('Atenção: Todos os campos são de preenchimento obrigatório.');
      return;
    }

    if (form.phonePrimary.length !== 9) {
      setErrors('O número de celular deve conter exatamente 9 dígitos.');
      return;
    }

    if (form.phonePrimary !== form.phoneSecondary) {
      setErrors('Os números de celular digitados não são idênticos. Verifique novamente.');
      return;
    }

    setErrors('');
    onSubmit(form);
  };

  const inputClasses = "w-full bg-slate-900 border border-white/10 rounded-2xl px-8 py-5 text-base focus:border-emerald-500/50 focus:bg-slate-800 outline-none transition-all input-glow text-white placeholder:text-slate-600 font-medium";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold uppercase tracking-widest text-emerald-500 ml-1">Titular da Conta</label>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{form.accountName.length}/50</span>
          </div>
          <input
            type="text"
            maxLength={50}
            placeholder="Nome completo conforme registrado no celular"
            className={inputClasses}
            value={form.accountName}
            onChange={e => setForm({...form, accountName: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1 text-left">Número de Celular</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-bold border-r border-white/10 pr-4 pointer-events-none">
              +258
            </div>
            <input
              type="tel"
              placeholder="Ex: 84XXXXXXX"
              className={`${inputClasses} pl-24`}
              value={form.phonePrimary}
              onChange={e => handlePhoneChange(e.target.value, 'phonePrimary')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1 text-left">Confirmar Número</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-bold border-r border-white/10 pr-4 pointer-events-none">
              +258
            </div>
            <input
              type="tel"
              placeholder="Repita o número"
              className={`${inputClasses} pl-24`}
              value={form.phoneSecondary}
              onChange={e => handlePhoneChange(e.target.value, 'phoneSecondary')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1 text-left">Província</label>
          <select
            className={`${inputClasses} cursor-pointer bg-slate-900 text-white`}
            value={form.province}
            onChange={e => setForm({...form, province: e.target.value})}
          >
            <option value="">Selecione...</option>
            {PROVINCES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1 text-left">Gênero</label>
          <select
            className={`${inputClasses} cursor-pointer bg-slate-900 text-white`}
            value={form.gender}
            onChange={e => setForm({...form, gender: e.target.value})}
          >
            <option value="">Selecione...</option>
            {GENDERS.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1">Finalidade do Prêmio</label>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${form.purpose.length === 160 ? 'text-red-500' : 'text-slate-500'}`}>
              {form.purpose.length}/160
            </span>
          </div>
          <textarea
            maxLength={160}
            placeholder="Como esses 1000 MT farão diferença hoje?"
            rows={4}
            className={`${inputClasses} resize-none`}
            value={form.purpose}
            onChange={e => setForm({...form, purpose: e.target.value})}
          ></textarea>
        </div>

        <div className="md:col-span-2 mt-8">
          {errors && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
              <div className="bg-red-500 p-1 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <p className="text-red-400 text-sm font-bold">{errors}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-6 rounded-[2rem] transition-all shadow-[0_20px_60px_-15px_rgba(16,185,129,0.4)] uppercase tracking-[0.3em] text-xl group active:scale-95"
          >
            SOLICITAR AGORA
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
          
          <div className="flex flex-col items-center mt-16">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-widest mb-10 italic">Redes de Pagamento Autorizadas</p>
            <div className="grid grid-cols-2 gap-x-20 gap-y-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="flex flex-col items-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/M-Pesa_Logo.png" alt="M-Pesa" className="h-10 object-contain" title="M-Pesa" />
                <span className="text-[10px] font-black text-white/50 tracking-widest uppercase">M-PESA</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img src="https://logos-world.net/wp-content/uploads/2023/04/E-mola-Logo.png" alt="e-Mola" className="h-10 object-contain" title="e-Mola" />
                <span className="text-[10px] font-black text-white/50 tracking-widest uppercase">E-MOLA</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepForm;
