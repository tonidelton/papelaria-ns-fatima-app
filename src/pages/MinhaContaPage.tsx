import React, { useState } from 'react';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import MeusPedidosPage from './MeusPedidosPage';
import PedidoDetalhePage from './PedidoDetalhePage';
import MinhasCotacoesPage from './MinhasCotacoesPage';
import CotacaoDetalhePage from './CotacaoDetalhePage';

export default function MinhaContaPage() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    nomeCompleto: userProfile?.nomeCompleto || '',
    telefone: userProfile?.telefone || '',
    endereco: userProfile?.endereco || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!userProfile) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', userProfile.uid), {
        nomeCompleto: form.nomeCompleto,
        telefone: form.telefone,
        endereco: form.endereco,
      });
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      alert('Erro ao atualizar perfil');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Routes>
      <Route index element={
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#333] mb-6">Minha Conta</h1>

          {/* Perfil */}
          <Card shadow="md" className="p-4 sm:p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#25B4D2] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {userProfile?.nomeCompleto?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-[#333]">{userProfile?.nomeCompleto}</h2>
                <p className="text-sm text-[#666]">{userProfile?.email}</p>
                <span className="inline-block mt-1 text-xs bg-[#E8F7FB] text-[#25B4D2] px-2 py-0.5 rounded-full font-medium">
                  {userProfile?.tipo === 'empresa' ? '🏢 Empresa' : '👤 Pessoa Física'}
                </span>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="text-sm text-[#25B4D2] font-medium hover:underline"
              >
                {editing ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4 pt-4 border-t border-[#E0E0E0]">
                <Input
                  label="Nome Completo"
                  value={form.nomeCompleto}
                  onChangeText={(v) => setForm({ ...form, nomeCompleto: v })}
                />
                <Input
                  label="Telefone"
                  value={form.telefone}
                  onChangeText={(v) => setForm({ ...form, telefone: v })}
                  type="tel"
                />
                <Input
                  label="Endereço"
                  value={form.endereco}
                  onChangeText={(v) => setForm({ ...form, endereco: v })}
                />
                <Button variant="primary" fullWidth onPress={handleSave} loading={loading}>
                  Salvar Alterações
                </Button>
              </div>
            ) : (
              <div className="space-y-2 text-sm pt-4 border-t border-[#E0E0E0]">
                <div className="flex justify-between">
                  <span className="text-[#666]">Telefone:</span>
                  <span className="text-[#333] font-medium">{userProfile?.telefone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Endereço:</span>
                  <span className="text-[#333] font-medium text-right max-w-[200px] truncate">{userProfile?.endereco}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="mt-4 bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-lg p-3 text-center">
                <p className="text-sm text-[#2E7D32] font-medium">✓ Perfil atualizado com sucesso!</p>
              </div>
            )}
          </Card>

          {/* Links rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <Link to="/minha-conta/pedidos">
              <Card shadow="sm" className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-medium text-[#333]">Meus Pedidos</p>
                  <p className="text-xs text-[#666]">Acompanhe seus pedidos</p>
                </div>
              </Card>
            </Link>
            {userProfile?.tipo === 'empresa' ? (
              <Link to="/minha-conta/cotacoes">
                <Card shadow="sm" className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-medium text-[#333]">Minhas Cotações</p>
                    <p className="text-xs text-[#666]">Gerencie suas cotações B2B</p>
                  </div>
                </Card>
              </Link>
            ) : (
              <Link to="/cotacao">
                <Card shadow="sm" className="p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-medium text-[#333]">Cotação B2B</p>
                    <p className="text-xs text-[#666]">Solicite cotação para sua empresa</p>
                  </div>
                </Card>
              </Link>
            )}
          </div>

          {/* Logout */}
          <Button variant="outline" fullWidth onPress={handleLogout}>
            Sair da Conta
          </Button>
        </div>
      } />
      <Route path="pedidos" element={<MeusPedidosPage />} />
      <Route path="pedidos/:orderId" element={<PedidoDetalhePage />} />
      <Route path="cotacoes" element={<MinhasCotacoesPage />} />
      <Route path="cotacoes/:quotationId" element={<CotacaoDetalhePage />} />
    </Routes>
  );
}
