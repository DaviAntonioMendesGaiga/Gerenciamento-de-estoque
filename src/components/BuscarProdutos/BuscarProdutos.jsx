import React, { useState } from 'react';
import classes from './BuscarProdutos.module.css';

const BuscarProdutos = () => {
  const [filtros, setFiltros] = useState({
    nome: '',
    categoria: '',
    estoqueMin: '',
    estoqueMax: '',
    dataInicio: '',
    dataFim: '',
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const produtos = [
    { nome: 'Tênis Adidas Run', categoria: 'Calçados', estoque: 10, data: '2025-06-15', hora: '14:00', valor: 499.9 },
    { nome: 'Camiseta Nike DryFit', categoria: 'Roupas', estoque: 25, data: '2025-06-14', hora: '11:30', valor: 129.9 },
    { nome: 'Boné Puma', categoria: 'Acessórios', estoque: 3, data: '2025-06-13', hora: '09:15', valor: 89.9 },
  ];

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
  };

  const produtosFiltrados = produtos
    .filter((p) => {
      return (
        p.nome.toLowerCase().includes(filtros.nome.toLowerCase()) &&
        (filtros.categoria === '' || p.categoria === filtros.categoria) &&
        (filtros.estoqueMin === '' || p.estoque >= parseInt(filtros.estoqueMin)) &&
        (filtros.estoqueMax === '' || p.estoque <= parseInt(filtros.estoqueMax)) &&
        (filtros.dataInicio === '' || p.data >= filtros.dataInicio) &&
        (filtros.dataFim === '' || p.data <= filtros.dataFim)
      );
    })
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 10);

  const deveMostrarResultados = filtros.nome.length > 0 || mostrarFiltros;

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
          <option value="Calçados">Calçados</option>
          <option value="Roupas">Roupas</option>
          <option value="Acessórios">Acessórios</option>
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
        <input
          type="date"
          name="dataInicio"
          value={filtros.dataInicio}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataFim"
          value={filtros.dataFim}
          onChange={handleChange}
        />
      </div>

      <ul className={`${classes.listaProdutos} ${deveMostrarResultados ? classes.mostrar : ''}`}>
        {produtosFiltrados.map((produto, i) => (
          <li key={i} className={classes.card}>
            <strong>{produto.nome}</strong><br />
            Categoria: {produto.categoria} | Estoque: {produto.estoque}<br />
            Data: {produto.data} | Hora: {produto.hora}<br />
            <strong>Valor: R$ {produto.valor.toFixed(2)}</strong>
          </li>
        ))}
        {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
      </ul>
    </div>
  );
};

export default BuscarProdutos;