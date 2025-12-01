import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./index.css";
import { ShoppingCart } from "lucide-react";
import { CartProvider } from "./components/CartContext";
// import CarrinhoSesc from "./pages/carrinhoSesc"; // <-- MANTER APENAS UMA
import ProdutoSenac from "./pages/produtoSenac";
import ConcluirPedido from "./pages/concluirPedido";
import CarrinhoSesc from "./pages/carrinhoSesc";

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
import ConcluirPedido from "./pages/concluirPedido";

ReactDOM.createRoot(document.getElementById("root")).render(
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
          <Route path="/lojas" element={<Lojas />} />
          <Route path="/senac/lojas" element={<LojasSenac />} />
          <Route path="/produto/:id" element={<ProdutoDetalhe />} />
          <Route path="/concluir-pedido" element={<ConcluirPedido />} />
          <Route path="/ProdutoSesc" element={<ProdutoSesc />} />
          <Route path="/ProdutoSenac" element={<ProdutoSenac />} />
          <Route path="/carrinhoSesc" element={<CarrinhoSesc />} /> {/* rota do carrinho */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* ícone fixo de carrinho */}
        <Link
          to="/carrinhoSesc"
          aria-label="Abrir carrinho"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white text-[#0B4A80] shadow-lg focus:outline-none focus:ring-4 focus:ring-white"
        >
          <ShoppingCart size={22} />
        </Link>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
