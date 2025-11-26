import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// páginas
import Home from "./pages/home.jsx";
import SescEscolha from "./pages/sescEscolha.jsx";
import SescLogin from "./pages/sescLogin.jsx";
import SescCadastro from "./pages/sescCadastro.jsx";
import SenacEscolha from "./pages/senacEscolha.jsx";
import SenacLogin from "./pages/senacLogin.jsx";
import SenacCadastro from "./pages/senacCadastro.jsx";
import LojasSesc from "./pages/lojasesc.jsx";
import LojasSenac from "./pages/lojasenac.jsx";
import ProdutoDetalhe from "./components/Produto.jsx";
import ProdutoSesc from "./pages/produtoSesc.jsx";
import ProdutoSenac from "./pages/produtoSenac";
<<<<<<< HEAD
import ConcluirPedido from "./pages/concluirPedido"; // <-- nova rota

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sesc" element={<SescEscolha />} />
        <Route path="/sesc/login" element={<SescLogin />} />
        <Route path="/sesc/cadastro" element={<SescCadastro />} />
        <Route path="/senac" element={<SenacEscolha />} />
        <Route path="/senac/login" element={<SenacLogin />} />
        <Route path="/senac/cadastro" element={<SenacCadastro />} />
        <Route path="/lojas" element={<Lojas />} />
        <Route path="/senac/lojas" element={<LojasSenac />} />
        <Route path="/produto/:id" element={<ProdutoDetalhe />} />
        <Route path="/concluir-pedido" element={<ConcluirPedido />} />
        <Route path="/ProdutoSesc" element={<ProdutoSesc />} />
        <Route path="/ProdutoSenac" element={<ProdutoSenac />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
=======
import { CartProvider } from "./components/CartContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sesc" element={<SescEscolha />} />
          <Route path="/sesc/login" element={<SescLogin />} />
          <Route path="/sesc/cadastro" element={<SescCadastro />} />
          <Route path="/senac" element={<SenacEscolha />} />
          <Route path="/senac/login" element={<SenacLogin />} />
          <Route path="/senac/cadastro" element={<SenacCadastro />} />
          <Route path="/lojasesc" element={<LojasSesc />} />
          <Route path="/lojasenac" element={<LojasSenac />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />
          <Route path="/ProdutoSesc" element={<ProdutoSesc />} />
          <Route path="/ProdutoSenac" element={<ProdutoSenac />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
  </React.StrictMode>
);
