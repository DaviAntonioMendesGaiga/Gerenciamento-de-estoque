import { useState } from 'react';
import classes from './Produto.module.css';

const Produto = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarExclusao, setMostrarExclusao] = useState(false);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    setMostrarExclusao(false);
  };

  const toggleExclusao = () => {
    setMostrarExclusao(!mostrarExclusao);
    setMostrarFormulario(false);
  };

  return (
    <div className={classes.produtoContainer}>
      <div className={classes.botoesContainer}>
        <button onClick={toggleFormulario} className={classes.btnAdicionar}>Adicionar Produto</button>
        <button onClick={toggleExclusao} className={classes.btnExcluir}>Excluir Produto</button>
      </div>

      <div className={`${classes.formulario} ${mostrarFormulario ? classes.visivel : ''}`}>
        <h3>Formulário de Produto</h3>
        <form>
          <input type="text" placeholder="Nome do Produto" required />
          <input type="number" placeholder="Preço" required />
          <input type="number" placeholder="Estoque" required />
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div className={`${classes.exclusao} ${mostrarExclusao ? classes.visivel : ''}`}>
        <h3>Excluir Produtos</h3>
        <input type="text" placeholder="Buscar produto..." />
        <ul>
          <li>Produto 1 <button className={classes.remover}>X</button></li>
          <li>Produto 2 <button className={classes.remover}>X</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Produto;