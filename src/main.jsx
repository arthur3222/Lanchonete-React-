import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// páginas
import Home from "./pages/home";
import SescEscolha from "./pages/sescEscolha";
import SescLogin from "./pages/sescLogin";
import SescCadastro from "./pages/sescCadastro";
import SenacEscolha from "./pages/senacEscolha";
import SenacLogin from "./pages/senacLogin";
import SenacCadastro from "./pages/senacCadastro";
import Lojas from "./pages/lojasesc";
import LojasSenac from "./pages/lojasenac";
import ProdutoDetalhe from "./components/Produto";
import ProdutoSesc from "./pages/produtoSesc";
import ProdutoSenac from "./pages/produtoSenac";
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
  </React.StrictMode>
);
