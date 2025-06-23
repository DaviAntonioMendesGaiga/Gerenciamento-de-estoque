import { useContext } from "react";
import { ProdutoContext } from "../Produto/ProdutoContext"; // <- corrigido aqui
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function GraficoVendasCompras() {
  const { produtos } = useContext(ProdutoContext);

  const data = [
    { mes: 'Jan', vendas: 4000, compras: 2400 },
    { mes: 'Fev', vendas: produtos.length * 100, compras: 1398 },
    { mes: 'Mar', vendas: 5000, compras: produtos.length * 150 },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Vendas x Compras</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="vendas" stroke="#82ca9d" />
          <Line type="monotone" dataKey="compras" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}