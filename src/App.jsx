import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Produto from "./components/Produto/Produto";
import DivisorCatg from "./components/DivisorCatg/DivisorCatg";
import Entradas from "./components/Entradas/Entradas";
import Vendas from "./components/Vendas/Vendas";
import Relatorios from "./components/Relatórios/Relatorios";
import BuscarProdutos from "./components/BuscarProdutos/BuscarProdutos";
import Footer from "./components/Footer/Footer";
import { Element } from "react-scroll";

function App() {
  return (
    <>
      <div className="app-container">
        <Sidebar />
        <main className="main-content" id="scroll-container">
          <Element name="dashboard">
            <h1>Dashboard</h1>
            <Dashboard />
          </Element>

          <DivisorCatg />

          <Element name="produtos">
            <h1 className="h1-margin">Produtos</h1>
            <Produto />
          </Element>

          <DivisorCatg />

          <Element name="entradas">
            <h1 className="h1-margin">Entradas</h1>
            <Entradas />
          </Element>

          <DivisorCatg />

          <Element name="vendas">
            <h1 className="h1-margin">Vendas</h1>
            <Vendas />
          </Element>

          <DivisorCatg />

          <Element name="relatorios">
            <h1 className="h1-margin">Relatórios</h1>
            <Relatorios />
          </Element>

          <DivisorCatg />

          <Element name="buscar">
            <h1 className="h1-margin">Buscar Produtos</h1>
            <BuscarProdutos />
          </Element>

          <div className="footer-margin">
            <h1>Feito por Davi</h1>
            <Footer/>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;