import { Boxes, Wallet, ShoppingBag, AlertTriangle } from "lucide-react";
import { useProdutos } from "../Produto/ProdutoContext";
import { useVendas } from "../Vendas/VendaContext"; // Caminho corrigido
import classes from "./Estatisticas.module.css";

const Estatisticas = () => {
  const { produtos } = useProdutos();
  const { vendas } = useVendas();

  const produtosCadastrados = produtos.length;
  const faturamento = produtos.reduce((acc, p) => acc + p.preco * p.quantidade, 0);
  
  // Calculando vendas do dia
  const hoje = new Date().toISOString().split('T')[0];
  const vendasDoDia = vendas.filter(venda => 
    venda.data && new Date(venda.data).toISOString().split('T')[0] === hoje
  ).length;

  const baixoEstoque = produtos.filter((p) => p.quantidade <= 3).length;

  return (
    <div className={classes.estatisticasContainer}>
      <div className={classes.produtosCadastrados}>
        <h2>Produtos Cadastrados <Boxes size={20} className={classes.icon} /></h2>
        <p>{produtosCadastrados}</p>
      </div>

      <div className={classes.itensEstoque}>
        <h2>Faturamento do mês <Wallet size={20} className={classes.icon} /></h2>
        <p>R$ {faturamento.toFixed(2)}</p>
      </div>

      <div className={classes.vendasDia}>
        <h2>Vendas do dia <ShoppingBag size={20} className={classes.icon} /></h2>
        <p>{vendasDoDia}</p>
      </div>

      <div className={classes.baixoEstoque}>
        <h2>Produtos com baixo estoque <AlertTriangle size={20} className={classes.icon} /></h2>
        <p>{baixoEstoque}</p>
      </div>
    </div>
  );
};

export default Estatisticas;