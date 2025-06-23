import React, { useState, useEffect } from 'react';
import { useProdutos } from '../Produto/ProdutoContext';
import classes from './BuscarProdutos.module.css';

const BuscarProdutos = () => {
  const { produtos } = useProdutos();
  const [filtros, setFiltros] = useState({
    nome: '',
    categoria: '',
    estoqueMin: '',
    estoqueMax: '',
    dataInicio: '',
    dataFim: '',
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  // Carrega os 5 produtos mais caros por padrão
  useEffect(() => {
    const produtosOrdenados = [...produtos].sort((a, b) => b.preco - a.preco).slice(0, 5);
    setProdutosFiltrados(produtosOrdenados);
  }, [produtos]);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limparFiltros = () => {
    setFiltros({
      nome: '',
      categoria: '',
      estoqueMin: '',
      estoqueMax: '',
      dataInicio: '',
      dataFim: '',
    });
    setMostrarFiltros(false);
    
    // Volta a mostrar os 5 produtos mais caros
    const produtosOrdenados = [...produtos].sort((a, b) => b.preco - a.preco).slice(0, 5);
    setProdutosFiltrados(produtosOrdenados);
  };

  const aplicarFiltros = () => {
    let resultado = [...produtos];
    
    // Aplicar filtros
    if (filtros.nome) {
      resultado = resultado.filter(p => 
        p.nome.toLowerCase().includes(filtros.nome.toLowerCase())
      );
    }
    
    if (filtros.categoria) {
      resultado = resultado.filter(p => p.categoria === filtros.categoria);
    }
    
    if (filtros.estoqueMin) {
      resultado = resultado.filter(p => p.quantidade >= parseInt(filtros.estoqueMin));
    }
    
    if (filtros.estoqueMax) {
      resultado = resultado.filter(p => p.quantidade <= parseInt(filtros.estoqueMax));
    }
    
    // Ordenar por preço (mais caro primeiro) e limitar a 10
    resultado = resultado.sort((a, b) => b.preco - a.preco).slice(0, 10);
    setProdutosFiltrados(resultado);
  };

  // Aplica filtros quando os valores mudam
  useEffect(() => {
    // Se não há filtros ativos, mostra os 5 mais caros
    if (!filtros.nome && !filtros.categoria && !filtros.estoqueMin && !filtros.estoqueMax) {
      const produtosOrdenados = [...produtos].sort((a, b) => b.preco - a.preco).slice(0, 5);
      setProdutosFiltrados(produtosOrdenados);
    } else {
      aplicarFiltros();
    }
  }, [filtros, produtos]);

  const deveMostrarResultados = produtosFiltrados.length > 0 || 
                                filtros.nome || 
                                mostrarFiltros;

  return (
    <div className={classes.buscaContainer}>
      <div className={classes.pesquisaContainer}>
        <input
          type="text"
          name="nome"
          placeholder="Pesquisar produto..."
          value={filtros.nome}
          onChange={handleChange}
        />
        <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
          {mostrarFiltros ? 'Ocultar filtros' : 'Adicionar filtros'}
        </button>
        <button className={classes.botaoLimpar} onClick={limparFiltros}>
          Limpar filtros
        </button>
      </div>

      <div className={`${classes.filtros} ${mostrarFiltros ? classes.mostrar : ''}`}>
        <select name="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todas as categorias</option>
          {/* Gerar opções de categorias únicas */}
          {[...new Set(produtos.map(p => p.categoria))].map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          name="estoqueMin"
          placeholder="Estoque mínimo"
          value={filtros.estoqueMin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="estoqueMax"
          placeholder="Estoque máximo"
          value={filtros.estoqueMax}
          onChange={handleChange}
        />
      </div>

      <ul className={`${classes.listaProdutos} ${deveMostrarResultados ? classes.mostrar : ''}`}>
        {produtosFiltrados.map((produto, i) => (
          <li key={i} className={classes.card}>
            <strong>{produto.nome}</strong><br />
            Categoria: {produto.categoria} | Estoque: {produto.quantidade}<br />
            <strong>Valor: R$ {produto.preco.toFixed(2)}</strong>
          </li>
        ))}
        {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
      </ul>
    </div>
  );
};

export default BuscarProdutos;