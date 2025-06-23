import { createContext, useContext, useState } from "react";

const ProdutoContext = createContext();

export const useProdutos = () => useContext(ProdutoContext);

export const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = (produto) => {
    setProdutos((prev) => [...prev, { ...produto, id: Date.now() }]);
  };

  const removerProduto = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const diminuirEstoque = (id, quantidade) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantidade: p.quantidade - quantidade }
          : p
      )
    );
  };

  // Adicione esta função para aumentar o estoque
  const adicionarEstoque = (id, quantidade) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantidade: p.quantidade + quantidade }
          : p
      )
    );
  };

  return (
    <ProdutoContext.Provider 
      value={{ 
        produtos, 
        adicionarProduto, 
        removerProduto,
        diminuirEstoque,
        adicionarEstoque // Adicione esta linha
      }}
    >
      {children}
    </ProdutoContext.Provider>
  );
};

export { ProdutoContext };