import {
  LayoutDashboard,
  Package,
  ArrowDownCircle,
  ShoppingCart,
  BarChart,
  Search,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import classes from "./sidebar.module.css";
import GSGerenciamentosLogo from "../../assets/GSGerenciamentosLogo.png";
import { Link } from "react-scroll";
import { useState } from "react";

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <button
        className={classes.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${classes.sidebar} ${
          mobileMenuOpen ? classes.sidebarMobileOpen : ""
        }`}
      >
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
    </>
  );
};

export default Sidebar;