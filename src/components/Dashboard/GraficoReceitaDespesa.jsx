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

const dadosFinanceiros = [
  { mes: 'Jan', receita: 7000, despesa: 4000 },
  { mes: 'Fev', receita: 6500, despesa: 4200 },
  { mes: 'Mar', receita: 8000, despesa: 4500 },
];

export default function GraficoReceitaDespesa() {
  return (
    <div style={{ width: '100%', height: 300, marginTop: 30 }}>
      <h3>Receita x Despesa</h3>
      <ResponsiveContainer>
        <LineChart data={dadosFinanceiros}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="receita" stroke="#28a745" />
          <Line type="monotone" dataKey="despesa" stroke="#dc3545" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}