import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    endereco: '',
    tipo: 'consumidor' as 'consumidor' | 'empresa',
    empresa: '',
    cnpj: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.nomeCompleto || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Preencha todos os campos');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('E-mail inválido');
      return false;
    }
    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.telefone || !formData.endereco) {
      setError('Preencha todos os campos');
      return false;
    }
    if (formData.tipo === 'empresa' && (!formData.empresa || !formData.cnpj)) {
      setError('Preencha os dados da empresa');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!validateStep2()) return;
    
    setLoading(true);
    try {
      await register({
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
        endereco: formData.endereco,
        tipo: formData.tipo,
        empresa: formData.empresa || undefined,
        cnpj: formData.cnpj || undefined,
      });
      onNavigate('inicio');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está cadastrado');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha é muito fraca');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="pb-20 lg:pb-8">
      <Header title="Criar Conta" showBack onBack={() => step > 1 ? setStep(step - 1) : onNavigate('login')} />
      
      <div className="px-4 lg:px-6 py-6 max-w-md mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex-1 h-1.5 rounded-full ${step >= 1 ? 'bg-[#25B4D2]' : 'bg-[#E0E0E0]'}`} />
          <div className={`flex-1 h-1.5 rounded-full ${step >= 2 ? 'bg-[#25B4D2]' : 'bg-[#E0E0E0]'}`} />
        </div>

        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#333333]">Dados Pessoais</h2>
              <p className="text-sm text-[#666666] mt-1">
                Preencha seus dados para criar uma conta
              </p>
            </div>

            {error && (
              <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-[10px] p-3 mb-4">
                <p className="text-sm text-[#C62828]">{error}</p>
              </div>
            )}

            <Input
              label="Nome Completo"
              value={formData.nomeCompleto}
              onChangeText={(v) => updateField('nomeCompleto', v)}
              placeholder="Seu nome completo"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              }
            />

            <Input
              label="E-mail"
              value={formData.email}
              onChangeText={(v) => updateField('email', v)}
              placeholder="seu@email.com"
              type="email"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              }
            />

            <Input
              label="Senha"
              value={formData.senha}
              onChangeText={(v) => updateField('senha', v)}
              placeholder="Mínimo 6 caracteres"
              type="password"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              }
            />

            <Input
              label="Confirmar Senha"
              value={formData.confirmarSenha}
              onChangeText={(v) => updateField('confirmarSenha', v)}
              placeholder="Repita a senha"
              type="password"
            />

            <Button variant="primary" fullWidth size="lg" onPress={handleNext}>
              Próximo
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#333333]">Contato e Endereço</h2>
              <p className="text-sm text-[#666666] mt-1">
                Complete seu cadastro
              </p>
            </div>

            {error && (
              <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-[10px] p-3 mb-4">
                <p className="text-sm text-[#C62828]">{error}</p>
              </div>
            )}

            {/* Tipo de conta */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#333333] mb-2">Tipo de Conta</label>
              <div className="flex gap-3">
                <button
                  onClick={() => updateField('tipo', 'consumidor')}
                  className={`flex-1 py-3 px-4 rounded-[10px] border-2 text-sm font-medium transition-colors ${
                    formData.tipo === 'consumidor'
                      ? 'border-[#25B4D2] bg-[#E8F7FB] text-[#25B4D2]'
                      : 'border-[#E0E0E0] text-[#666666]'
                  }`}
                >
                  👤 Pessoa Física
                </button>
                <button
                  onClick={() => updateField('tipo', 'empresa')}
                  className={`flex-1 py-3 px-4 rounded-[10px] border-2 text-sm font-medium transition-colors ${
                    formData.tipo === 'empresa'
                      ? 'border-[#25B4D2] bg-[#E8F7FB] text-[#25B4D2]'
                      : 'border-[#E0E0E0] text-[#666666]'
                  }`}
                >
                  🏢 Empresa
                </button>
              </div>
            </div>

            <Input
              label="Telefone"
              value={formData.telefone}
              onChangeText={(v) => updateField('telefone', v)}
              placeholder="(00) 00000-0000"
              type="tel"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              }
            />

            <Input
              label="Endereço"
              value={formData.endereco}
              onChangeText={(v) => updateField('endereco', v)}
              placeholder="Rua, número, bairro, cidade"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              }
            />

            {formData.tipo === 'empresa' && (
              <>
                <Input
                  label="Nome da Empresa"
                  value={formData.empresa}
                  onChangeText={(v) => updateField('empresa', v)}
                  placeholder="Razão social ou nome fantasia"
                />
                <Input
                  label="CNPJ"
                  value={formData.cnpj}
                  onChangeText={(v) => updateField('cnpj', v)}
                  placeholder="00.000.000/0000-00"
                />
              </>
            )}

            <Button variant="primary" fullWidth size="lg" onPress={handleRegister} loading={loading}>
              Criar Conta
            </Button>
          </>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-[#666666]">
            Já tem uma conta?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#25B4D2] font-semibold"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
