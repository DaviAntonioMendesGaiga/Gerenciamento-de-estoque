import React, { useState } from "react";
import classes from "./Entradas.module.css";

const dadosEntradas = [
  { titulo: "Entradas do Dia", valor: 5, cor: "green", detalhes: "Entradas registradas hoje." },
  { titulo: "Entradas da Semana", valor: 32, cor: "blue", detalhes: "Entradas acumuladas nesta semana." },
  { titulo: "Entradas do Mês", valor: 123, cor: "orange", detalhes: "Total de entradas no mês atual." },
  { titulo: "Produtos com Entrada Baixa", valor: 7, cor: "red", detalhes: "Produtos com baixa entrada ou em falta." },
  { titulo: "Estoque Atualizado", valor: 289, cor: "purple", detalhes: "Estoque atualizado com base nas entradas." },
  { titulo: "Produtos Novos", valor: 11, cor: "darkblue", detalhes: "Novos produtos cadastrados recentemente." },
];

export default function Entradas() {
  const [cardAberto, setCardAberto] = useState(null);

  const toggleDetalhes = (index) => {
    setCardAberto(cardAberto === index ? null : index);
  };

  return (
    <div className={classes.container}>
      <h2>Resumo de Entradas</h2>
      <div className={classes.grid}>
        {dadosEntradas.map((card, index) => (
          <div
            key={index}
            className={`${classes.card} ${cardAberto === index ? classes.cardAberto : ""}`}
            style={{ borderLeft: `6px solid ${card.cor}` }}
          >
            <h3>{card.titulo}</h3>
            <p className={classes.valor} style={{ color: card.cor }}>{card.valor}</p>
            <button className={classes.botao} onClick={() => toggleDetalhes(index)}>
              Ver detalhes
            </button>
            <div className={classes.detalhes}>{card.detalhes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}