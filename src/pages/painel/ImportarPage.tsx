import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { readExcelFile, mapExcelToProducts, ExcelRow } from '../../lib/excel';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { logActivity } from '../../lib/activity';

export default function ImportarPage() {
  const { userProfile } = useAuth();
  const [rows, setRows] = useState<ExcelRow[]>([]);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    try {
      const data = await readExcelFile(file);
      setRows(data);
    } catch (err) {
      console.error('Erro ao ler arquivo:', err);
      alert('Erro ao ler o arquivo Excel');
    }
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      const products = mapExcelToProducts(rows);
      for (const p of products) {
        await addDoc(collection(db, 'products'), {
          ...p,
          categoriaId: '1',
          slug: p.nome.toLowerCase().replace(/\s+/g, '-'),
          descricao: p.descricao || '',
          precoCusto: 0,
          destaque: false,
          ativo: true,
          imagemUrl: '',
          criadoEm: new Date(),
          atualizadoEm: new Date(),
        });
      }
      if (userProfile) {
        await logActivity(userProfile.uid, 'importar_produtos', 'products', { quantidade: products.length, arquivo: fileName });
      }
      setSuccess(true);
      setRows([]);
      setFileName('');
    } catch (err) {
      console.error('Erro ao importar:', err);
      alert('Erro ao importar produtos');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-6">Importar Produtos (Excel)</h1>
      
      <Card shadow="md" className="p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-bold text-[#333333] mb-4">Selecionar Arquivo</h2>
        <p className="text-sm text-[#666666] mb-4">
          O arquivo Excel deve conter as colunas: <strong>nome</strong>, <strong>preco</strong>, <strong>estoque</strong>, <strong>descricao</strong> (opcional).
        </p>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFile}
          className="block w-full text-sm text-[#666666] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8F7FB] file:text-[#25B4D2] hover:file:bg-[#25B4D2]/10"
        />
        {fileName && (
          <p className="text-sm text-[#2E7D32] mt-2">✓ Arquivo carregado: {fileName}</p>
        )}
      </Card>

      {rows.length > 0 && (
        <Card shadow="md" className="p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-bold text-[#333333] mb-4">Prévia ({rows.length} linhas)</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E0E0E0]">
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key} className="text-left py-2 px-2 font-medium text-[#666666]">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 5).map((row, idx) => (
                  <tr key={idx} className="border-b border-[#E0E0E0]">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="py-2 px-2 text-[#333333]">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length > 5 && <p className="text-xs text-[#999999] mb-4">... e mais {rows.length - 5} linhas</p>}
          <Button variant="cta" fullWidth onPress={handleImport} loading={loading}>
            Importar {rows.length} Produtos
          </Button>
        </Card>
      )}

      {success && (
        <Card shadow="md" className="p-4 sm:p-6 bg-[#E8F5E9] border border-[#2E7D32]/20">
          <p className="text-sm text-[#2E7D32] font-medium">✓ Produtos importados com sucesso!</p>
        </Card>
      )}
    </div>
  );
}
