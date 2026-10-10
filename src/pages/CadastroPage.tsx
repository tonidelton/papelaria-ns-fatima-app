import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function CadastroPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nomeCompleto: '', email: '', senha: '', confirmarSenha: '',
    telefone: '', endereco: '', tipo: 'consumidor' as 'consumidor' | 'empresa',
    empresa: '', cnpj: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nomeCompleto || !form.email || !form.senha) { setError('Preencha todos os campos'); return; }
    if (form.senha.length < 6) { setError('Senha deve ter pelo menos 6 caracteres'); return; }
    if (form.senha !== form.confirmarSenha) { setError('Senhas não coincidem'); return; }
    setError(''); setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.telefone || !form.endereco) { setError('Preencha todos os campos'); return; }
    setError(''); setLoading(true);
    try {
      await register({
        nomeCompleto: form.nomeCompleto, email: form.email, senha: form.senha,
        telefone: form.telefone, endereco: form.endereco, tipo: form.tipo,
        empresa: form.empresa || undefined, cnpj: form.cnpj || undefined,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.code === 'auth/email-already-in-use' ? 'E-mail já cadastrado' : 'Erro ao criar conta');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Card shadow="md" className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-[#25B4D2]' : 'bg-[#E0E0E0]'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-[#25B4D2]' : 'bg-[#E0E0E0]'}`} />
        </div>
        {step === 1 ? (
          <form onSubmit={handleNext}>
            <h1 className="text-2xl font-bold text-[#333333] mb-4">Criar Conta</h1>
            {error && <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-lg p-3 mb-4"><p className="text-sm text-[#C62828]">{error}</p></div>}
            <Input label="Nome Completo" value={form.nomeCompleto} onChangeText={(v) => update('nomeCompleto', v)} />
            <Input label="E-mail" value={form.email} onChangeText={(v) => update('email', v)} type="email" />
            <Input label="Senha" value={form.senha} onChangeText={(v) => update('senha', v)} type="password" />
            <Input label="Confirmar Senha" value={form.confirmarSenha} onChangeText={(v) => update('confirmarSenha', v)} type="password" />
            <Button variant="primary" fullWidth size="lg" onPress={() => {}} type="submit">Próximo</Button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h1 className="text-2xl font-bold text-[#333333] mb-4">Contato e Endereço</h1>
            {error && <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-lg p-3 mb-4"><p className="text-sm text-[#C62828]">{error}</p></div>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#333333] mb-2">Tipo de Conta</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => update('tipo', 'consumidor')} className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium ${form.tipo === 'consumidor' ? 'border-[#25B4D2] bg-[#E8F7FB] text-[#25B4D2]' : 'border-[#E0E0E0] text-[#666666]'}`}>
                  👤 Pessoa Física
                </button>
                <button type="button" onClick={() => update('tipo', 'empresa')} className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium ${form.tipo === 'empresa' ? 'border-[#25B4D2] bg-[#E8F7FB] text-[#25B4D2]' : 'border-[#E0E0E0] text-[#666666]'}`}>
                  🏢 Empresa
                </button>
              </div>
            </div>
            <Input label="Telefone" value={form.telefone} onChangeText={(v) => update('telefone', v)} type="tel" />
            <Input label="Endereço" value={form.endereco} onChangeText={(v) => update('endereco', v)} />
            {form.tipo === 'empresa' && (
              <>
                <Input label="Nome da Empresa" value={form.empresa} onChangeText={(v) => update('empresa', v)} />
                <Input label="CNPJ" value={form.cnpj} onChangeText={(v) => update('cnpj', v)} />
              </>
            )}
            <Button variant="primary" fullWidth size="lg" onPress={() => {}} loading={loading} type="submit">Criar Conta</Button>
            <button type="button" onClick={() => setStep(1)} className="w-full mt-3 text-sm text-[#25B4D2] font-medium">
              ← Voltar
            </button>
          </form>
        )}
        <p className="text-center text-sm text-[#666666] mt-6">
          Já tem conta? <Link to="/login" className="text-[#25B4D2] font-semibold">Faça login</Link>
        </p>
      </Card>
    </div>
  );
}
