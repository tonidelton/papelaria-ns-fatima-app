// Excel import utilities using SheetJS (xlsx)
import * as XLSX from 'xlsx';

export interface ExcelRow {
  [key: string]: string | number | boolean | null;
}

export async function readExcelFile(file: File): Promise<ExcelRow[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<ExcelRow>(sheet, { defval: '' });
  return data;
}

export function exportToExcel(data: ExcelRow[], filename = 'dados.xlsx'): void {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dados');
  XLSX.writeFile(wb, filename);
}

// Map Excel rows to product format
export function mapExcelToProducts(rows: ExcelRow[]): any[] {
  return rows.map((row, idx) => ({
    nome: String(row['nome'] || row['Nome'] || row['produto'] || ''),
    descricao: String(row['descricao'] || row['Descrição'] || ''),
    preco: Number(row['preco'] || row['Preço'] || row['preço'] || 0),
    estoque: Number(row['estoque'] || row['Estoque'] || 0),
    sku: String(row['sku'] || row['SKU'] || row['codigo'] || `SKU-${idx + 1}`),
  })).filter((p) => p.nome);
}
