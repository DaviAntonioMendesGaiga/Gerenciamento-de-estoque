import Estatisticas from "./Estatisticas";
import GraficoVendasCompras from "./GraficoVendasCompras";
import GraficoReceitaDespesa from "./GraficoReceitaDespesa";
import GraficoMaisVendidos from "./GraficoMaisVendidos";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={classes.dashboardContainer}>
      <Estatisticas />
      <div className={classes.graficoContainer}>
        <GraficoVendasCompras />
      </div>
      <div className={classes.graficoContainer}>
        <GraficoReceitaDespesa />
      </div>
      <div className={classes.graficoContainer}>
        <GraficoMaisVendidos />
      </div>
    </div>
  );
};

export default Dashboard;