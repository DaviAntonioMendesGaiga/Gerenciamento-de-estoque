import { useState } from "react";
import { useProdutos } from "./ProdutoContext";
import classes from "./Produto.module.css";

// Importe suas imagens corretamente
import enviarBotaoFundo from "../../assets/EnviarBotaoFundo.png";
import enviarBotaoFundoHover from "../../assets/EnviarBotaoFundoHover.png";
import excluirBotaoFundo from "../../assets/ExcluirBotaoFundo.png";
import excluirBotaoFundoHover from "../../assets/ExcluirBotaoFundoHover.png";

const Produto = () => {
  const { produtos, adicionarProduto, removerProduto, diminuirEstoque } = useProdutos();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarGerenciamento, setMostrarGerenciamento] = useState(false);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidadeRemover, setQuantidadeRemover] = useState("");

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setMostrarGerenciamento(false);
  };

  const toggleGerenciamento = () => {
    setMostrarGerenciamento(!mostrarGerenciamento);
    setMostrarFormulario(false);
    setProdutoSelecionado(null);
    setQuantidadeRemover("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!nome || !preco || !quantidade || !categoria) {
      alert("Preencha todos os campos");
      return;
    }

    const precoNum = parseFloat(preco);
    const quantidadeNum = parseInt(quantidade);

    if (isNaN(precoNum) || isNaN(quantidadeNum) || precoNum <= 0 || quantidadeNum < 0) {
      alert("Valores inválidos para preço ou quantidade");
      return;
    }

    try {
      const novoProduto = {
        nome,
        preco: precoNum,
        quantidade: quantidadeNum,
        categoria,
        dataCadastro: new Date().toISOString()
      };

      adicionarProduto(novoProduto);

      // Limpar campos
      setNome("");
      setPreco("");
      setQuantidade("");
      setCategoria("");
      
      // Fechar formulário
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Ocorreu um erro ao adicionar o produto");
    }
  };

  const handleRemoverTotal = (id) => {
    if (window.confirm("Tem certeza que deseja remover completamente este produto?")) {
      try {
        removerProduto(id);
      } catch (error) {
        console.error("Erro ao remover produto:", error);
        alert("Ocorreu um erro ao remover o produto");
      }
    }
  };

  const handleDiminuirEstoque = (e) => {
    e.preventDefault();
    
    if (!produtoSelecionado || !quantidadeRemover) {
      alert("Selecione um produto e informe a quantidade");
      return;
    }

    const quantidadeNum = parseInt(quantidadeRemover);
    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      alert("Informe uma quantidade válida (maior que zero)");
      return;
    }

    const produto = produtos.find(p => p.id === produtoSelecionado);
    if (!produto) {
      alert("Produto não encontrado");
      return;
    }

    if (quantidadeNum > produto.quantidade) {
      alert(`Quantidade maior que o estoque atual (${produto.quantidade})`);
      return;
    }

    try {
      if (quantidadeNum === produto.quantidade) {
        if (window.confirm(`Remover todas as ${produto.quantidade} unidades deste produto?`)) {
          removerProduto(produto.id);
        }
      } else {
        if (window.confirm(`Remover ${quantidadeNum} unidades do produto ${produto.nome}?`)) {
          diminuirEstoque(produto.id, quantidadeNum);
        }
      }

      setQuantidadeRemover("");
      setProdutoSelecionado(null);
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      alert("Ocorreu um erro ao atualizar o estoque");
    }
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={classes.produtoContainer}>
      <div className={classes.botoesContainer}>
        <button 
          onClick={toggleFormulario} 
          className={classes.btnAdicionar}
          style={{
            backgroundImage: `url(${enviarBotaoFundo})`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = `url(${enviarBotaoFundoHover})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = `url(${enviarBotaoFundo})`;
          }}
        >
          Adicionar Produto
        </button>
        <button 
          onClick={toggleGerenciamento} 
          className={classes.btnGerenciar}
          style={{
            backgroundImage: `url(${excluirBotaoFundo})`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = `url(${excluirBotaoFundoHover})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = `url(${excluirBotaoFundo})`;
          }}
        >
          Gerenciar Produtos
        </button>
      </div>

      <div className={`${classes.formulario} ${mostrarFormulario ? classes.visivel : ""}`}>
        <h3>Formulário de Produto</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Estoque"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            min="0"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div className={`${classes.gerenciamento} ${mostrarGerenciamento ? classes.visivel : ""}`}>
        <h3>Gerenciamento de Produtos</h3>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        
        {produtoSelecionado ? (
          <form onSubmit={handleDiminuirEstoque} className={classes.formRemocao}>
            <h4>
              {produtos.find(p => p.id === produtoSelecionado)?.nome} - 
              Estoque: {produtos.find(p => p.id === produtoSelecionado)?.quantidade}
            </h4>
            <input
              type="number"
              placeholder="Quantidade a remover"
              value={quantidadeRemover}
              onChange={(e) => setQuantidadeRemover(e.target.value)}
              min="1"
              max={produtos.find(p => p.id === produtoSelecionado)?.quantidade}
              required
            />
            <div className={classes.botoesRemocao}>
              <button type="submit">Remover Quantidade</button>
              <button 
                type="button" 
                onClick={() => handleRemoverTotal(produtoSelecionado)}
                className={classes.removerTotal}
              >
                Remover Produto
              </button>
              <button 
                type="button" 
                onClick={() => setProdutoSelecionado(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <ul className={classes.listaProdutos}>
            {produtosFiltrados.map((p) => (
              <li key={p.id}>
                <span>
                  {p.nome} - Estoque: {p.quantidade} - R$ {p.preco.toFixed(2)}
                </span>
                <button
                  className={classes.gerenciarBtn}
                  onClick={() => setProdutoSelecionado(p.id)}
                >
                  Gerenciar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Produto;