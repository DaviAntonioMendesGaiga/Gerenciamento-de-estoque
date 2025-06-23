import React, { useState, useEffect } from "react";
import { useProdutos } from "../Produto/ProdutoContext";
import classes from "./Entradas.module.css";

export default function Entradas() {
  const { produtos, adicionarEstoque } = useProdutos();
  const [cardAberto, setCardAberto] = useState(null);
  const [dadosEntradas, setDadosEntradas] = useState([]);
  
  // Estados para o formulário de nova entrada
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoEntrada, setTipoEntrada] = useState("compra");
  const [historicoEntradas, setHistoricoEntradas] = useState([]);
  const [erro, setErro] = useState("");
  
  // Estados para o histórico completo
  const [mostrarHistoricoCompleto, setMostrarHistoricoCompleto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  // Carrega o histórico do localStorage ao iniciar
  useEffect(() => {
    const historicoSalvo = localStorage.getItem('historicoEntradas');
    if (historicoSalvo) {
      try {
        setHistoricoEntradas(JSON.parse(historicoSalvo));
      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
        setHistoricoEntradas([]);
      }
    }
  }, []);

  // Atualiza localStorage quando o histórico muda
  useEffect(() => {
    try {
      localStorage.setItem('historicoEntradas', JSON.stringify(historicoEntradas));
    } catch (e) {
      console.error("Erro ao salvar histórico:", e);
    }
  }, [historicoEntradas]);

  // Atualiza os dados dos cartões quando produtos ou histórico mudam
  useEffect(() => {
    const entradasHoje = historicoEntradas.filter(
      e => new Date(e.data).toDateString() === new Date().toDateString()
    ).length;

    const entradasSemana = historicoEntradas.filter(
      e => {
        const hoje = new Date();
        const dataEntrada = new Date(e.data);
        return hoje.getTime() - dataEntrada.getTime() <= 7 * 24 * 60 * 60 * 1000;
      }
    ).length;

    const entradasMes = historicoEntradas.filter(
      e => new Date(e.data).getMonth() === new Date().getMonth() &&
            new Date(e.data).getFullYear() === new Date().getFullYear()
    ).length;

    const produtosBaixoEstoque = produtos.filter(p => p.quantidade < 10).length;
    const totalEstoque = produtos.reduce((acc, p) => acc + p.quantidade, 0);
    
    const novosProdutos = produtos.filter(p => {
      if (!p.dataCadastro) return false;
      const umaSemanaAtras = new Date();
      umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);
      return new Date(p.dataCadastro) > umaSemanaAtras;
    }).length;

    setDadosEntradas([
      { titulo: "Entradas do Dia", valor: entradasHoje, cor: "#4CAF50", detalhes: "Entradas registradas hoje." },
      { titulo: "Entradas da Semana", valor: entradasSemana, cor: "#2196F3", detalhes: "Entradas acumuladas nesta semana." },
      { titulo: "Entradas do Mês", valor: entradasMes, cor: "#FF9800", detalhes: "Total de entradas no mês atual." },
      { titulo: "Produtos com Estoque Baixo", valor: produtosBaixoEstoque, cor: "#F44336", detalhes: "Produtos com estoque abaixo de 10 unidades." },
      { titulo: "Estoque Total", valor: totalEstoque, cor: "#9C27B0", detalhes: "Quantidade total em estoque de todos os produtos." },
      { titulo: "Produtos Novos", valor: novosProdutos, cor: "#3F51B5", detalhes: "Novos produtos cadastrados na última semana." },
    ]);
  }, [produtos, historicoEntradas]);

  const toggleDetalhes = (index) => {
    setCardAberto(cardAberto === index ? null : index);
  };

  const handleRegistrarEntrada = (e) => {
    e.preventDefault();
    setErro("");

    // Validações
    if (!produtoSelecionado) {
      setErro("Selecione um produto válido");
      return;
    }

    const quantidadeNum = parseInt(quantidade);
    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      setErro("Informe uma quantidade válida (maior que zero)");
      return;
    }

    // Encontrar o produto pelo ID selecionado
    const produto = produtos.find(p => p.id.toString() === produtoSelecionado);
    
    if (!produto) {
      setErro("Produto selecionado não foi encontrado no sistema");
      return;
    }

    try {
      // Atualiza o estoque no contexto
      adicionarEstoque(produto.id, quantidadeNum);

      // Registra no histórico
      const novaEntrada = {
        produtoId: produto.id,
        produtoNome: produto.nome,
        quantidade: quantidadeNum,
        tipo: tipoEntrada,
        data: new Date().toISOString()
      };

      setHistoricoEntradas(prev => [novaEntrada, ...prev]);
      
      // Limpa o formulário
      setQuantidade("");
      setProdutoSelecionado("");
      setTipoEntrada("compra");

      alert("Entrada registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar entrada:", error);
      setErro("Ocorreu um erro ao registrar a entrada. Por favor, tente novamente.");
    }
  };

  // Funções para paginação do histórico completo
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;
  const entradasPaginaAtual = historicoEntradas.slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(historicoEntradas.length / itensPorPagina);

  const irParaPagina = (pagina) => {
    setPaginaAtual(pagina);
  };

  return (
    <div className={classes.container} id="entradas">
      <h2>Resumo de Entradas</h2>
      <div className={classes.grid}>
        {dadosEntradas.map((card, index) => (
          <div
            key={index}
            className={`${classes.card} ${cardAberto === index ? classes.cardAberto : ""}`}
            style={{ borderLeft: `6px solid ${card.cor}` }}
          >
            <h3>{card.titulo}</h3>
            <p className={classes.valor} style={{ color: card.cor }}>{card.valor}</p>
            <button className={classes.botao} onClick={() => toggleDetalhes(index)}>
              Ver detalhes
            </button>
            <div className={classes.detalhes}>{card.detalhes}</div>
          </div>
        ))}
      </div>

      <div className={classes.formulario}>
        <h3>Registrar Nova Entrada</h3>
        {erro && <div className={classes.erro}>{erro}</div>}
        <form onSubmit={handleRegistrarEntrada}>
          <select
            value={produtoSelecionado}
            onChange={(e) => setProdutoSelecionado(e.target.value)}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id.toString()}>
                {produto.nome} (Estoque: {produto.quantidade})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            min="1"
            required
          />

          <select
            value={tipoEntrada}
            onChange={(e) => setTipoEntrada(e.target.value)}
          >
            <option value="compra">Compra</option>
            <option value="devolucao">Devolução</option>
            <option value="ajuste">Ajuste de Estoque</option>
            <option value="producao">Produção Própria</option>
          </select>

          <button type="submit">Registrar Entrada</button>
        </form>
      </div>

      {historicoEntradas.length > 0 && (
        <div className={classes.historico}>
          <div className={classes.historicoHeader}>
            <h3>Histórico de Entradas</h3>
            <button 
              onClick={() => setMostrarHistoricoCompleto(!mostrarHistoricoCompleto)}
              className={classes.botaoHistorico}
            >
              {mostrarHistoricoCompleto ? "Ver Últimas 10" : "Ver Histórico Completo"}
            </button>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {(mostrarHistoricoCompleto ? entradasPaginaAtual : historicoEntradas.slice(0, 10)).map((entrada, index) => {
                const produtoExiste = produtos.some(p => p.id === entrada.produtoId);
                return (
                  <tr key={index}>
                    <td>{new Date(entrada.data).toLocaleDateString()}</td>
                    <td>{produtoExiste ? entrada.produtoNome : `${entrada.produtoNome} (Removido)`}</td>
                    <td>{entrada.quantidade}</td>
                    <td>{entrada.tipo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {mostrarHistoricoCompleto && totalPaginas > 1 && (
            <div className={classes.paginacao}>
              <button 
                disabled={paginaAtual === 1}
                onClick={() => irParaPagina(paginaAtual - 1)}
              >
                Anterior
              </button>
              
              <span>Página {paginaAtual} de {totalPaginas}</span>
              
              <button 
                disabled={paginaAtual === totalPaginas}
                onClick={() => irParaPagina(paginaAtual + 1)}
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}