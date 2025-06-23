import React, { useState } from "react";
import { useProdutos } from "../Produto/ProdutoContext";
import { useVendas } from "../Vendas/VendaContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import classes from "./Vendas.module.css";

const categorias = ['Todas', 'Camisas', 'Calças', 'Acessórios', 'Bonés', 'Calçados'];

const Vendas = () => {
  const { produtos, diminuirEstoque } = useProdutos();
  const { vendas, registrarVenda } = useVendas();

  const [showPainelInfo, setShowPainelInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [dataMin, setDataMin] = useState("");
  const [dataMax, setDataMax] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  // Estados do formulário de nova venda
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeVenda, setQuantidadeVenda] = useState("");

  // Função para lidar com a venda - CORRIGIDA
  const handleNovaVenda = (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!produtoSelecionado) {
      alert("Selecione um produto válido.");
      return;
    }
    
    const quantidade = parseInt(quantidadeVenda);
    if (isNaN(quantidade) || quantidade <= 0) {
      alert("Insira uma quantidade válida.");
      return;
    }

    // Encontrar o produto atualizado no estado
    const produto = produtos.find((p) => p.id === Number(produtoSelecionado));
    if (!produto) {
      alert("Produto não encontrado!");
      return;
    }

    // Verificar estoque
    if (quantidade > produto.quantidade) {
      alert(`Estoque insuficiente! Temos apenas ${produto.quantidade} unidades.`);
      return;
    }

    try {
      // Diminuir o estoque
      diminuirEstoque(produto.id, quantidade);
      
      // Registrar a venda
      registrarVenda({
        produtoId: produto.id,
        produtoNome: produto.nome,
        categoria: produto.categoria,
        preco: produto.preco,
        quantidadeVendida: quantidade,
        data: new Date().toISOString().split('T')[0]
      });
      
      // Limpar formulário após sucesso
      setProdutoSelecionado("");
      setQuantidadeVenda("");
      
      alert("Venda registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      alert("Ocorreu um erro ao registrar a venda. Por favor, tente novamente.");
    }
  };

  // Filtragem das vendas para mostrar
  const vendasFiltradas = vendas.filter((venda) => {
    if (!venda.produtoNome.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (categoriaFiltro !== "Todas" && venda.categoria !== categoriaFiltro) return false;
    if (dataMin && venda.data < dataMin) return false;
    if (dataMax && venda.data > dataMax) return false;
    if (precoMin && venda.preco < parseFloat(precoMin)) return false;
    if (precoMax && venda.preco > parseFloat(precoMax)) return false;
    return true;
  });

  // Calculando resumo dinâmico a partir das vendas registradas
  const totalVendas = vendas.reduce(
    (acc, venda) => acc + venda.preco * venda.quantidadeVendida,
    0
  );
  const quantidadeTotal = vendas.reduce((acc, venda) => acc + venda.quantidadeVendida, 0);
  const ticketMedio = quantidadeTotal ? totalVendas / quantidadeTotal : 0;

  const resumo = [
    { titulo: "Total de Vendas", valor: `R$ ${totalVendas.toFixed(2)}` },
    { titulo: "Ticket Médio", valor: `R$ ${ticketMedio.toFixed(2)}` },
    { titulo: "Quantidade Vendida", valor: `${quantidadeTotal} itens` },
  ];

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Vendas", 14, 22);
    autoTable(doc, {
      startY: 30,
      head: [["Produto", "Categoria", "Preço", "Quantidade", "Data"]],
      body: vendasFiltradas.map((venda) => [
        venda.produtoNome,
        venda.categoria,
        `R$ ${venda.preco.toFixed(2)}`,
        venda.quantidadeVendida,
        venda.data,
      ]),
    });
    doc.save("relatorio-vendas.pdf");
  };

  return (
    <div className={classes.container}>
      {/* Resumo dinâmico */}
      <div className={classes.resumoCartoes}>
        {resumo.map((item, index) => (
          <div key={index} className={classes.cartao}>
            <p className={classes.tituloCartao}>{item.titulo}</p>
            <p className={classes.valorCartao}>{item.valor}</p>
          </div>
        ))}
      </div>

      {/* Formulário nova venda */}
      <div className={classes.formularioNovaVenda}>
        <h2>Registrar Nova Venda</h2>
        <form onSubmit={handleNovaVenda}>
          <select
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione o produto
            </option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} (Estoque: {p.quantidade})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidadeVenda}
            onChange={(e) => setQuantidadeVenda(e.target.value)}
            min="1"
            required
          />
          <button type="submit">Registrar Venda</button>
        </form>
      </div>

      <div className={classes.secaoVendas}>
        <h2 className={classes.tituloVendas}>Vendas Registradas</h2>

        <button className={classes.botaoExportarPDF} onClick={exportarPDF}>
          Exportar PDF
        </button>
      </div>

      <button
        className={classes.botaoAbrirPainel}
        onClick={() => setShowPainelInfo(!showPainelInfo)}
      >
        {showPainelInfo ? "Fechar Informações de Vendas" : "Informações de Vendas"}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className={classes.inputFiltro}
              />
              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className={classes.inputFiltro}
              >
                {categorias.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={classes.filtrosDatasPrecos}>
              <div className={classes.filtroItem}>
                <label>Data mínima:</label>
                <input
                  type="date"
                  value={dataMin}
                  onChange={(e) => setDataMin(e.target.value)}
                  className={classes.inputFiltro}
                />
              </div>
              <div className={classes.filtroItem}>
                <label>Data máxima:</label>
                <input
                  type="date"
                  value={dataMax}
                  onChange={(e) => setDataMax(e.target.value)}
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
                  onChange={(e) => setPrecoMin(e.target.value)}
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
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className={classes.inputFiltro}
                />
              </div>
            </div>

            <table className={classes.tabelaVendasDetalhes}>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th>Preço</th>
                  <th>Quantidade Vendida</th>
                </tr>
              </thead>
              <tbody>
                {vendasFiltradas.length > 0 ? (
                  vendasFiltradas.map((venda, idx) => (
                    <tr key={idx}>
                      <td>{venda.produtoNome}</td>
                      <td>{venda.categoria}</td>
                      <td>{venda.data}</td>
                      <td>R$ {venda.preco.toFixed(2)}</td>
                      <td>{venda.quantidadeVendida}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: "0.75rem" }}>
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