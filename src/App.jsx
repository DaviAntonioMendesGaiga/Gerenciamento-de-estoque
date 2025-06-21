import './App.css';
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Produto from './components/Produto/Produto';
import DivisorCatg from './components/DivisorCatg/DivisorCatg';
import Entradas from './components/Entradas/Entradas';
import Vendas from './components/Vendas/Vendas';
import Relatorios from './components/Relatórios/Relatorios';
import BuscarProdutos from './components/BuscarProdutos/BuscarProdutos';

import { Element } from 'react-scroll';

function App() {
  return (
    <div className='app-container'>
      <Sidebar />
      <main id="scroll-container" className='main-content'>
        <Element name="dashboard" className='section'>
          <h1>Dashboard</h1>
          <Dashboard />
        </Element>

        <DivisorCatg />

        <Element name="produtos" className='section'>
          <h1 className='h1-margin'>Produtos</h1>
          <Produto />
        </Element>

        <DivisorCatg />

        <Element name="entradas" className='section'>
          <h1 className='h1-margin'>Entradas</h1>
          <Entradas />
        </Element>

        <DivisorCatg />

        <Element name="vendas" className='section'>
          <h1 className='h1-margin'>Vendas</h1>
          <Vendas />
        </Element>

        <DivisorCatg />

        <Element name="relatorios" className='section'>
          <h1 className='h1-margin'>Relatórios</h1>
          <Relatorios />
        </Element>

        <DivisorCatg />

        <Element name="buscar" className='section'>
          <h1 className='h1-margin'>Buscar Produtos</h1>
          <BuscarProdutos />
        </Element>
      </main>
    </div>
  );
}

export default App;