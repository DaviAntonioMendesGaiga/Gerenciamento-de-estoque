import React, { useState, useEffect } from 'react';
import { useProdutos } from '../Produto/ProdutoContext';
import { useVendas } from '../Vendas/VendaContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import classes from './Relatorios.module.css';

const Relatorios = () => {
  const { produtos } = useProdutos();
  const { vendas } = useVendas();
  
  const [estoqueBaixo, setEstoqueBaixo] = useState([]);
  const [produtosParados, setProdutosParados] = useState([]);
  const [historicoEstoque, setHistoricoEstoque] = useState([]);
  const [relatorioFinanceiro, setRelatorioFinanceiro] = useState({
    totalCompras: 0,
    totalVendas: 0,
    lucro: 0
  });

  // Calcular produtos com estoque baixo
  useEffect(() => {
    const baixoEstoque = produtos
      .filter(p => p.quantidade < 10)
      .map(p => ({ produto: p.nome, estoque: p.quantidade }));
    
    setEstoqueBaixo(baixoEstoque);
  }, [produtos]);

  // Calcular produtos parados (sem movimentação nos últimos 30 dias)
  useEffect(() => {
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
    
    const produtosComMovimentacao = produtos.map(p => {
      const vendasProduto = vendas.filter(v => v.produtoId === p.id);
      const ultimaVenda = vendasProduto.length > 0 
        ? new Date(Math.max(...vendasProduto.map(v => new Date(v.data)))) 
        : null;
      
      const diasSemMovimentar = ultimaVenda 
        ? Math.floor((new Date() - ultimaVenda) / (1000 * 60 * 60 * 24)) 
        : 'Nunca vendido';
      
      return {
        produto: p.nome,
        diasSemMovimentar: typeof diasSemMovimentar === 'number' ? diasSemMovimentar : 999
      };
    });
    
    const parados = produtosComMovimentacao
      .filter(p => p.diasSemMovimentar > 30)
      .map(p => ({
        produto: p.produto,
        diasSemMovimentar: p.diasSemMovimentar === 999 ? 'Nunca vendido' : p.diasSemMovimentar
      }));
    
    setProdutosParados(parados);
  }, [produtos, vendas]);

  // Criar histórico de estoque combinando vendas e entradas
  useEffect(() => {
    const historico = [];
    
    // Adicionar vendas como saídas
    vendas.forEach(venda => {
      historico.push({
        produto: venda.produtoNome,
        tipo: 'Saída',
        quantidade: -venda.quantidadeVendida,
        data: venda.data
      });
    });
    
    // Ordenar por data
    historico.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    setHistoricoEstoque(historico.slice(0, 50)); // Limitar a 50 registros
  }, [vendas]);

  // Calcular relatório financeiro
  useEffect(() => {
    const totalVendas = vendas.reduce((acc, v) => acc + (v.quantidadeVendida * v.preco), 0);
    
    // Para este exemplo, vamos considerar que o custo é 60% do preço de venda
    const custoTotal = vendas.reduce((acc, v) => acc + (v.quantidadeVendida * v.preco * 0.6), 0);
    
    setRelatorioFinanceiro({
      totalCompras: custoTotal,
      totalVendas: totalVendas,
      lucro: totalVendas - custoTotal
    });
  }, [vendas]);

  const exportarPDF = (titulo, colunas, dados) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(titulo, 14, 20);
    
    // Formatar dados monetários
    const formattedData = dados.map(row => {
      return row.map(cell => {
        if (typeof cell === 'number' && cell > 100) {
          return `R$ ${cell.toFixed(2)}`;
        }
        return cell;
      });
    });
    
    autoTable(doc, {
      startY: 30,
      head: [colunas],
      body: formattedData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    doc.save(`${titulo.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  return (
    <div className={classes.relatorios}>
      <section className={`${classes.card} ${classes.vermelho}`}>
        <h3>📉 Produtos com Estoque Baixo ({estoqueBaixo.length})</h3>
        <ul>
          {estoqueBaixo.slice(0, 3).map((item, i) => (
            <li key={i}><strong>{item.produto}</strong> – {item.estoque} unidades</li>
          ))}
        </ul>
        {estoqueBaixo.length > 0 ? (
          <button onClick={() => exportarPDF('Produtos com Estoque Baixo', ['Produto', 'Estoque'], estoqueBaixo.map(item => [item.produto, item.estoque]))}>
            Ver Todos (PDF)
          </button>
        ) : (
          <p className={classes.semDados}>Nenhum produto com estoque baixo</p>
        )}
      </section>

      <section className={`${classes.card} ${classes.amarelo}`}>
        <h3>💤 Produtos Parados ({produtosParados.length})</h3>
        <ul>
          {produtosParados.slice(0, 3).map((item, i) => (
            <li key={i}>
              <strong>{item.produto}</strong> – 
              {typeof item.diasSemMovimentar === 'number' 
                ? ` ${item.diasSemMovimentar} dias sem movimentação` 
                : ` ${item.diasSemMovimentar}`}
            </li>
          ))}
        </ul>
        {produtosParados.length > 0 ? (
          <button onClick={() => exportarPDF('Produtos Parados', ['Produto', 'Dias sem movimentação'], produtosParados.map(item => [item.produto, item.diasSemMovimentar]))}>
            Ver Todos (PDF)
          </button>
        ) : (
          <p className={classes.semDados}>Todos os produtos tiveram movimentação recente</p>
        )}
      </section>

      <section className={`${classes.card} ${classes.azulClaro}`}>
        <h3>🧾 Histórico de Movimentações ({historicoEstoque.length})</h3>
        <ul>
          {historicoEstoque.slice(0, 3).map((item, i) => (
            <li key={i}>
              <strong>{item.data}</strong> – {item.tipo}: {item.produto} ({item.quantidade > 0 ? '+' : ''}{item.quantidade})
            </li>
          ))}
        </ul>
        {historicoEstoque.length > 0 ? (
          <button onClick={() => exportarPDF('Histórico de Movimentações', ['Data', 'Tipo', 'Produto', 'Quantidade'], historicoEstoque.map(item => [item.data, item.tipo, item.produto, item.quantidade]))}>
            Ver Todos (PDF)
          </button>
        ) : (
          <p className={classes.semDados}>Nenhuma movimentação registrada</p>
        )}
      </section>

      <section className={`${classes.card} ${classes.verdeClaro}`}>
        <h3>💰 Relatório Financeiro</h3>
        <p>Total Comprado: <strong>R$ {relatorioFinanceiro.totalCompras.toFixed(2)}</strong></p>
        <p>Total Vendido: <strong>R$ {relatorioFinanceiro.totalVendas.toFixed(2)}</strong></p>
        <p className={classes.lucro}>Lucro: <strong>R$ {relatorioFinanceiro.lucro.toFixed(2)}</strong></p>
        <button onClick={() => {
          const dados = [
            ['Total Comprado', relatorioFinanceiro.totalCompras.toFixed(2)],
            ['Total Vendido', relatorioFinanceiro.totalVendas.toFixed(2)],
            ['Lucro', relatorioFinanceiro.lucro.toFixed(2)]
          ];
          exportarPDF('Relatório Financeiro', ['Descrição', 'Valor (R$)'], dados);
        }}>
          Exportar PDF
        </button>
      </section>
    </div>
  );
};

export default Relatorios;