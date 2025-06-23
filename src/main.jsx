import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProdutoProvider } from "./components/Produto/ProdutoContext";
import { VendaProvider } from "./components/Vendas/VendaContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProdutoProvider>
      <VendaProvider>
        <App />
      </VendaProvider>
    </ProdutoProvider>
  </React.StrictMode>
);