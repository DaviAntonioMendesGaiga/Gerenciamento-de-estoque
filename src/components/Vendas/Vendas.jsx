import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Vendas.module.css';

const todasVendas = [
  { produto: 'Tênis Adidas Run', valor: 'R$ 499,90', categoria: 'Calçados', preco: 499.9, ultimaVenda: '2025-06-15', quantidadeVendida: 120 },
  { produto: 'Camiseta Nike DryFit', valor: 'R$ 129,90', categoria: 'Camisas', preco: 129.9, ultimaVenda: '2025-06-14', quantidadeVendida: 90 },
  { produto: 'Calça Jeans Slim', valor: 'R$ 189,90', categoria: 'Calças', preco: 189.9, ultimaVenda: '2025-06-12', quantidadeVendida: 75 },
  { produto: 'Tênis Puma Smash', valor: 'R$ 279,90', categoria: 'Calçados', preco: 279.9, ultimaVenda: '2025-06-13', quantidadeVendida: 50 },
  { produto: 'Boné Vans Classic', valor: 'R$ 99,90', categoria: 'Bonés', preco: 99.9, ultimaVenda: '2025-06-10', quantidadeVendida: 40 },
  { produto: 'Camiseta Lacoste Polo', valor: 'R$ 349,90', categoria: 'Camisas', preco: 349.9, ultimaVenda: '2025-06-08', quantidadeVendida: 60 },
  { produto: 'Moletom Adidas', valor: 'R$ 229,90', categoria: 'Acessórios', preco: 229.9, ultimaVenda: '2025-06-11', quantidadeVendida: 30 },
  { produto: 'Jaqueta Nike Windrunner', valor: 'R$ 499,90', categoria: 'Acessórios', preco: 499.9, ultimaVenda: '2025-06-07', quantidadeVendida: 20 },
  { produto: 'Chinelo Havaianas', valor: 'R$ 39,90', categoria: 'Calçados', preco: 39.9, ultimaVenda: '2025-06-06', quantidadeVendida: 80 },
  { produto: 'Meia Nike Kit c/3', valor: 'R$ 49,90', categoria: 'Acessórios', preco: 49.9, ultimaVenda: '2025-06-05', quantidadeVendida: 150 },
];

const categorias = ['Todas', 'Camisas', 'Calças', 'Acessórios', 'Bonés', 'Calçados'];

const Vendas = () => {
  const [showPainelInfo, setShowPainelInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [dataMin, setDataMin] = useState('');
  const [dataMax, setDataMax] = useState('');
  const [precoMin, setPrecoMin] = useState('');
  const [precoMax, setPrecoMax] = useState('');

  const vendasTop10 = todasVendas
    .sort((a, b) => new Date(b.ultimaVenda) - new Date(a.ultimaVenda))
    .slice(0, 10);

  const resumo = [
    { titulo: 'Total de Vendas', valor: 'R$ 12.345,00' },
    { titulo: 'Ticket Médio', valor: 'R$ 275,00' },
    { titulo: 'Quantidade Vendida', valor: '45 itens' },
  ];

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório de Vendas', 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [['Produto', 'Valor']],
      body: vendasTop10.map(venda => [venda.produto, venda.valor]),
    });
    doc.save('relatorio-vendas.pdf');
  };

  const vendasFiltradas = vendasTop10.filter(venda => {
    if (!venda.produto.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (categoriaFiltro !== 'Todas' && venda.categoria !== categoriaFiltro) return false;
    if (dataMin && new Date(venda.ultimaVenda) < new Date(dataMin)) return false;
    if (dataMax && new Date(venda.ultimaVenda) > new Date(dataMax)) return false;
    if (precoMin && venda.preco < parseFloat(precoMin)) return false;
    if (precoMax && venda.preco > parseFloat(precoMax)) return false;
    return true;
  });

  return (
    <div className={classes.container}>
      <div className={classes.resumoCartoes}>
        {resumo.map((item, index) => (
          <div key={index} className={classes.cartao}>
            <p className={classes.tituloCartao}>{item.titulo}</p>
            <p className={classes.valorCartao}>{item.valor}</p>
          </div>
        ))}
      </div>

      <div className={classes.secaoVendas}>
        <h2 className={classes.tituloVendas}>Top 10 Produtos Vendidos</h2>
        <div className={classes.listaVendas}>
          {vendasTop10.map((venda, index) => (
            <div key={index} className={classes.itemVenda}>
              {venda.produto} — <strong>{venda.valor}</strong>
            </div>
          ))}
        </div>
        <button className={classes.botaoExportarPDF} onClick={exportarPDF}>
          Exportar PDF
        </button>
      </div>

      <button
        className={classes.botaoAbrirPainel}
        onClick={() => setShowPainelInfo(!showPainelInfo)}
      >
        {showPainelInfo ? 'Fechar Informações de Vendas' : 'Informações de Vendas'}
      </button>

      <AnimatePresence>
        {showPainelInfo && (
          <motion.div
            className={classes.painelInformacoesGerais}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
          >
            <h3>Informações de Vendas</h3>

            <div className={classes.buscaDiv}>
              <input
                type="text"
                placeholder="Pesquisar produto..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={classes.inputFiltro}
              />
              <select
                value={categoriaFiltro}
                onChange={e => setCategoriaFiltro(e.target.value)}
                className={classes.inputFiltro}
              >
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className={classes.filtrosDatasPrecos}>
              <div className={classes.filtroItem}>
                <label>Data mínima:</label>
                <input
                  type="date"
                  value={dataMin}
                  onChange={e => setDataMin(e.target.value)}
                  className={classes.inputFiltro}
                />
              </div>
              <div className={classes.filtroItem}>
                <label>Data máxima:</label>
                <input
                  type="date"
                  value={dataMax}
                  onChange={e => setDataMax(e.target.value)}
                  className={classes.inputFiltro}
                />
              </div>
              <div className={classes.filtroItem}>
                <label>Preço mínimo:</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="R$ 0,00"
                  value={precoMin}
                  onChange={e => setPrecoMin(e.target.value)}
                  className={classes.inputFiltro}
                />
              </div>
              <div className={classes.filtroItem}>
                <label>Preço máximo:</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="R$ 0,00"
                  value={precoMax}
                  onChange={e => setPrecoMax(e.target.value)}
                  className={classes.inputFiltro}
                />
              </div>
            </div>

            <table className={classes.tabelaVendasDetalhes}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Última Data de Venda</th>
                  <th>Preço</th>
                  <th>Quantidade Vendida</th>
                </tr>
              </thead>
              <tbody>
                {vendasFiltradas.length > 0 ? (
                  vendasFiltradas.map((venda, idx) => (
                    <tr key={idx}>
                      <td>{venda.produto}</td>
                      <td>{venda.categoria}</td>
                      <td>{venda.ultimaVenda}</td>
                      <td>R$ {venda.preco.toFixed(2)}</td>
                      <td>{venda.quantidadeVendida}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '0.75rem' }}>
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Vendas;