import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import classes from './Relatorios.module.css';

const Relatorios = () => {
  const historicoEstoque = [
    { produto: 'Tênis Adidas Run', tipo: 'Entrada', quantidade: 20, data: '2025-06-16' },
    { produto: 'Camiseta Nike DryFit', tipo: 'Saída', quantidade: 5, data: '2025-06-15' },
    { produto: 'Calça Jeans Slim', tipo: 'Ajuste', quantidade: -2, data: '2025-06-14' },
    { produto: 'Tênis Nike Air', tipo: 'Saída', quantidade: 8, data: '2025-06-13' },
    { produto: 'Bermuda Jeans', tipo: 'Entrada', quantidade: 10, data: '2025-06-12' },
  ];

  const estoqueBaixo = [
    { produto: 'Chinelo Havaianas', estoque: 2 },
    { produto: 'Boné Puma', estoque: 3 },
    { produto: 'Camiseta Branca Básica', estoque: 4 },
    { produto: 'Tênis Vans Old Skool', estoque: 1 },
    { produto: 'Jaqueta Jeans Slim', estoque: 2 },
  ];

  const produtosParados = [
    { produto: 'Jaqueta Couro Zíper', diasSemMovimentar: 45 },
    { produto: 'Camisa Polo Branca', diasSemMovimentar: 30 },
    { produto: 'Blusa Manga Longa', diasSemMovimentar: 27 },
    { produto: 'Tênis Fila Sport', diasSemMovimentar: 60 },
  ];

  const relatorioFinanceiro = {
    totalCompras: 3200,
    totalVendas: 7800,
    lucro: 4600,
  };

  const exportarPDF = (titulo, colunas, dados) => {
    const doc = new jsPDF();
    doc.text(titulo, 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [colunas],
      body: dados,
    });
    doc.save(`${titulo.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  return (
    <div className={classes.relatorios}>
      <section className={`${classes.card} ${classes.vermelho}`}>
        <h3>📉 Produtos com Estoque Baixo</h3>
        <ul>
          {estoqueBaixo.slice(0, 3).map((item, i) => (
            <li key={i}><strong>{item.produto}</strong> – {item.estoque} unidades</li>
          ))}
        </ul>
        <button onClick={() => exportarPDF('Produtos com Estoque Baixo', ['Produto', 'Estoque'], estoqueBaixo.map(item => [item.produto, item.estoque]))}>
          Ver Todos (PDF)
        </button>
      </section>

      <section className={`${classes.card} ${classes.amarelo}`}>
        <h3>💤 Produtos Parados</h3>
        <ul>
          {produtosParados.slice(0, 3).map((item, i) => (
            <li key={i}><strong>{item.produto}</strong> – {item.diasSemMovimentar} dias sem movimentação</li>
          ))}
        </ul>
        <button onClick={() => exportarPDF('Produtos Parados', ['Produto', 'Dias sem movimentação'], produtosParados.map(item => [item.produto, item.diasSemMovimentar]))}>
          Ver Todos (PDF)
        </button>
      </section>

      <section className={`${classes.card} ${classes.azulClaro}`}>
        <h3>🧾 Histórico de Alterações no Estoque</h3>
        <ul>
          {historicoEstoque.slice(0, 3).map((item, i) => (
            <li key={i}><strong>{item.data}</strong> – {item.tipo}: {item.produto} ({item.quantidade > 0 ? '+' : ''}{item.quantidade})</li>
          ))}
        </ul>
        <button onClick={() => exportarPDF('Histórico de Alterações no Estoque', ['Data', 'Tipo', 'Produto', 'Quantidade'], historicoEstoque.map(item => [item.data, item.tipo, item.produto, item.quantidade]))}>
          Ver Todos (PDF)
        </button>
      </section>

      <section className={`${classes.card} ${classes.verdeClaro}`}>
        <h3>💰 Relatório Financeiro Básico</h3>
        <p>Total Comprado: <strong>R$ {relatorioFinanceiro.totalCompras.toFixed(2)}</strong></p>
        <p>Total Vendido: <strong>R$ {relatorioFinanceiro.totalVendas.toFixed(2)}</strong></p>
        <p className={classes.lucro}>Lucro: <strong>R$ {relatorioFinanceiro.lucro.toFixed(2)}</strong></p>
        <button onClick={() => exportarPDF('Relatório Financeiro Básico', ['Total Comprado', 'Total Vendido', 'Lucro'], [[relatorioFinanceiro.totalCompras, relatorioFinanceiro.totalVendas, relatorioFinanceiro.lucro]])}>
          Exportar PDF
        </button>
      </section>
    </div>
  );
};

export default Relatorios;

