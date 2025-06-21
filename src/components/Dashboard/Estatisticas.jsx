import {
  Boxes,
  Wallet,
  ShoppingBag,
  AlertTriangle
} from "lucide-react";
import classes from "./Estatisticas.module.css";

const Estatisticas = () => {
    return(
        <div className={classes.estatisticasContainer}>
            <div className={classes.produtosCadastrados}>
                    <h2>Produtos Cadastrados <Boxes size={20} className={classes.icon} /></h2>
                    <p>Dado</p>
                  </div>
            
                  <div className={classes.itensEstoque}>
                    <h2>Faturamento do mês <Wallet size={20} className={classes.icon} /></h2>
                    <p>Dado</p>
                  </div>
            
                  <div className={classes.vendasDia}>
                    <h2>Vendas do dia <ShoppingBag size={20} className={classes.icon} /></h2>
                    <p>Dado</p>
                  </div>
            
                  <div className={classes.baixoEstoque}>
                    <h2>Produtos com baixo estoque <AlertTriangle size={20} className={classes.icon} /></h2>
                    <p>Dado</p>
            </div>
        </div>
    )
}

export default Estatisticas