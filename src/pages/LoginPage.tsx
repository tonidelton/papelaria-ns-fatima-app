import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      setError('Preencha todos os campos');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, senha);
      onNavigate('inicio');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('E-mail ou senha incorretos');
      } else if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setError('Informe seu e-mail');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await resetPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('E-mail não encontrado');
      } else {
        setError('Erro ao enviar e-mail. Tente novamente.');
      }
    }
    setLoading(false);
  };

  if (showForgotPassword) {
    return (
      <div className="pb-20">
        <Header title="Recuperar Senha" showBack onBack={() => setShowForgotPassword(false)} />
        <div className="px-4 py-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#E8F7FB] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#25B4D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#333333]">Esqueceu sua senha?</h2>
            <p className="text-sm text-[#666666] mt-1">
              Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          {forgotSuccess ? (
            <div className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-[14px] p-4 text-center">
              <span className="text-2xl mb-2 block">✅</span>
              <p className="text-sm text-[#2E7D32] font-medium">
                E-mail de recuperação enviado!
              </p>
              <p className="text-xs text-[#666666] mt-1">
                Verifique sua caixa de entrada e siga as instruções.
              </p>
              <Button 
                variant="primary" 
                fullWidth 
                onPress={() => { setShowForgotPassword(false); setForgotSuccess(false); }}
                className="mt-4"
              >
                Voltar ao Login
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-[10px] p-3 mb-4">
                  <p className="text-sm text-[#C62828]">{error}</p>
                </div>
              )}
              <Input
                label="E-mail"
                value={forgotEmail}
                onChangeText={setForgotEmail}
                placeholder="seu@email.com"
                type="email"
              />
              <Button variant="primary" fullWidth onPress={handleForgotPassword} loading={loading}>
                Enviar Link de Recuperação
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-8">
      <Header title="Entrar" showBack onBack={() => onNavigate('inicio')} />
      
      <div className="px-4 lg:px-6 py-6 max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#25B4D2] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-white font-bold text-2xl">PF</span>
          </div>
          <h2 className="text-xl font-bold text-[#333333]">Bem-vindo de volta!</h2>
          <p className="text-sm text-[#666666] mt-1">
            Acesse sua conta para continuar
          </p>
        </div>

        {error && (
          <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-[10px] p-3 mb-4">
            <p className="text-sm text-[#C62828]">{error}</p>
          </div>
        )}

        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
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
          value={senha}
          onChangeText={setSenha}
          placeholder="••••••••"
          type="password"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          }
        />

        <button
          onClick={() => setShowForgotPassword(true)}
          className="text-sm text-[#25B4D2] font-medium mb-6 block text-right"
        >
          Esqueci minha senha
        </button>

        <Button variant="primary" fullWidth size="lg" onPress={handleLogin} loading={loading}>
          Entrar
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#666666]">
            Não tem uma conta?{' '}
            <button
              onClick={() => onNavigate('cadastro')}
              className="text-[#25B4D2] font-semibold"
            >
              Cadastre-se
            </button>
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#E0E0E0]" />
          <span className="text-xs text-[#999999]">ou</span>
          <div className="flex-1 h-px bg-[#E0E0E0]" />
        </div>

        <Button variant="outline" fullWidth onPress={() => onNavigate('cadastro')}>
          Criar Nova Conta
        </Button>
      </div>
    </div>
  );
}
