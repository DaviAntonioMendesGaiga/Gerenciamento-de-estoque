import {
  LayoutDashboard,
  Package,
  ArrowDownCircle,
  ShoppingCart,
  BarChart,
  Search,
  LogOut,
} from "lucide-react";
import classes from "./sidebar.module.css";
import GSGerenciamentosLogo from "../../assets/GSGerenciamentosLogo.png";
import { Link } from "react-scroll";

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <img src={GSGerenciamentosLogo} alt="Logo" />
          </li>
          <li>
            <Link
              to="dashboard"
              containerId="scroll-container"
              smooth={true}
              duration={600}
              offset={-40}
              className={classes.navLink}
            >
              <LayoutDashboard size={20} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="produtos"
              containerId="scroll-container"
              smooth={true}
              duration={600}
              offset={-40}
              className={classes.navLink}
            >
              <Package size={20} /> Produtos
            </Link>
          </li>
          <li>
            <Link
              to="entradas"
              containerId="scroll-container"
              smooth={true}
              duration={600}
              offset={-40}
              className={classes.navLink}
            >
              <ArrowDownCircle size={20} /> Entradas
            </Link>
          </li>
          <li>
            <Link
              to="vendas"
              containerId="scroll-container"
              smooth={true}
              duration={600}
              offset={-40}
              className={classes.navLink}
            >
              <ShoppingCart size={20} /> Vendas
            </Link>
          </li>
          <li>
            <Link
              to="relatorios"
              containerId="scroll-container"
              smooth={true}
              duration={600}
              offset={-40}
              className={classes.navLink}
            >
              <BarChart size={20} /> Relatórios
            </Link>
          </li>
          <li>
            <Link
              to="buscar"
              containerId="scroll-container"
              smooth={true}
              duration={600}
              offset={-40}
              className={classes.navLink}
            >
              <Search size={20} /> Buscar Produtos
            </Link>
          </li>
          <li className={classes.sairBtn}>
            <LogOut size={20} /> Sair
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;