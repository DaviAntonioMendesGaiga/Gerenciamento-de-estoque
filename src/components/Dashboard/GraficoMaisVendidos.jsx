import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useProdutos } from "../Produto/ProdutoContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#d63a3a"];

const GraficoMaisVendidos = () => {
  const { produtos } = useProdutos();

  const data = produtos.reduce((acc, p) => {
    const item = acc.find((i) => i.name === p.categoria);
    if (item) item.value += p.quantidade;
    else acc.push({ name: p.categoria, value: p.quantidade });
    return acc;
  }, []);

  return (
    <div style={{ width: "100%", height: 300, backgroundColor: "#fff", borderRadius: "12px", padding: "1rem" }}>
      <h4 style={{ marginBottom: "1rem" }}>Produtos Mais Vendidos por Categoria</h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoMaisVendidos;