import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) { setError('Preencha todos os campos'); return; }
    setError(''); setLoading(true);
    try {
      await login(email, senha);
      navigate('/');
    } catch (err: any) {
      setError(err.code === 'auth/invalid-credential' ? 'E-mail ou senha incorretos' : 'Erro ao fazer login');
    }
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { setError('Informe seu e-mail'); return; }
    setError(''); setLoading(true);
    try {
      await resetPassword(forgotEmail);
      setForgotSuccess(true);
    } catch { setError('Erro ao enviar e-mail'); }
    setLoading(false);
  };

  if (showForgot) {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <Card shadow="md" className="p-6">
          <h1 className="text-2xl font-bold text-[#333333] mb-2">Recuperar Senha</h1>
          <p className="text-sm text-[#666666] mb-6">Informe seu e-mail para receber um link de recuperação.</p>
          {forgotSuccess ? (
            <div className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-lg p-4 text-center">
              <p className="text-sm text-[#2E7D32] font-medium">E-mail enviado!</p>
              <p className="text-xs text-[#666666] mt-1">Verifique sua caixa de entrada.</p>
              <Button variant="primary" fullWidth onPress={() => { setShowForgot(false); setForgotSuccess(false); }} className="mt-4">
                Voltar ao Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleForgot}>
              {error && <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-lg p-3 mb-4"><p className="text-sm text-[#C62828]">{error}</p></div>}
              <Input label="E-mail" value={forgotEmail} onChangeText={setForgotEmail} placeholder="seu@email.com" type="email" />
              <Button variant="primary" fullWidth onPress={() => {}} loading={loading} type="submit">Enviar Link</Button>
              <button type="button" onClick={() => setShowForgot(false)} className="w-full mt-3 text-sm text-[#25B4D2] font-medium">
                ← Voltar ao login
              </button>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <Card shadow="md" className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#25B4D2] rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-xl">PF</span>
          </div>
          <h1 className="text-2xl font-bold text-[#333333]">Entrar</h1>
          <p className="text-sm text-[#666666] mt-1">Acesse sua conta</p>
        </div>
        <form onSubmit={handleLogin}>
          {error && <div className="bg-[#FFEBEE] border border-[#C62828]/20 rounded-lg p-3 mb-4"><p className="text-sm text-[#C62828]">{error}</p></div>}
          <Input label="E-mail" value={email} onChangeText={setEmail} placeholder="seu@email.com" type="email" />
          <Input label="Senha" value={senha} onChangeText={setSenha} placeholder="••••••••" type="password" />
          <button type="button" onClick={() => setShowForgot(true)} className="text-sm text-[#25B4D2] font-medium mb-4 block text-right">
            Esqueci minha senha
          </button>
          <Button variant="primary" fullWidth size="lg" onPress={() => {}} loading={loading} type="submit">Entrar</Button>
        </form>
        <p className="text-center text-sm text-[#666666] mt-6">
          Não tem conta? <Link to="/cadastro" className="text-[#25B4D2] font-semibold">Cadastre-se</Link>
        </p>
      </Card>
    </div>
  );
}
