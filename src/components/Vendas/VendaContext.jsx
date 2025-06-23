import { createContext, useContext, useState } from "react";

const VendaContext = createContext();

export const useVendas = () => useContext(VendaContext);

export const VendaProvider = ({ children }) => {
  const [vendas, setVendas] = useState([]);

  const registrarVenda = (vendaData) => {
    setVendas((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...vendaData
      },
    ]);
  };

  return (
    <VendaContext.Provider value={{ vendas, registrarVenda }}>
      {children}
    </VendaContext.Provider>
  );
};

export { VendaContext };