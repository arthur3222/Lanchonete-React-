import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./index.css";
<<<<<<< HEAD
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
=======
import { CartProvider } from "./components/CartContext";

// páginas
import Home from "./pages/home.jsx";
import SescEscolha from "./pages/sescEscolha.jsx";
import SenacEscolha from "./pages/senacEscolha.jsx";
import SescLogin from "./pages/sescLogin.jsx";
import SenacLogin from "./pages/senacLogin.jsx";
import SescCadastro from "./pages/sescCadastro.jsx"; // Usar sescCadastro.jsx
import SenacCadastro from "./pages/senacCadastro.jsx";
import LojasSesc from "./pages/lojasesc.jsx";
import LojasSenac from "./pages/lojasenac.jsx";
import ProdutoSesc from "./pages/produtoSesc.jsx";
import ProdutoSenac from "./pages/produtoSenac.jsx";
import DetalheProduto from "./pages/detalheProduto.jsx";
import CarrinhoSesc from "./pages/carrinhoSesc.jsx";
import AdminSenac from "./pages/adminSenac.jsx";
import AdminSesc from "./pages/adminSesc.jsx";
import MasterAdmin from "./pages/masterAdmin.jsx";
import CadastroProdutos from "./pages/cadastroProdutos.jsx";
import ListarProdutos from "./pages/listarProdutos.jsx";
import CadastroEstabelecimentos from "./pages/cadastroEstabelecimentos.jsx";
import Pedidos from "./pages/pedidos.jsx"; // Adicione esta linha
import PedidosAdmin from "./pages/PedidosAdmin.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<CartProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sesc" element={<SescEscolha />} />
					<Route path="/senac" element={<SenacEscolha />} />
					<Route path="/sesc/login" element={<SescLogin />} />
					<Route path="/senac/login" element={<SenacLogin />} />
					<Route path="/sesc/cadastro" element={<SescCadastro />} />
					<Route path="/senac/cadastro" element={<SenacCadastro />} />
					<Route path="/lojasesc" element={<LojasSesc />} />
					<Route path="/lojasenac" element={<LojasSenac />} />
					<Route path="/ProdutoSesc" element={<ProdutoSesc />} />
					<Route path="/ProdutoSenac" element={<ProdutoSenac />} />
					<Route path="/produto/:id" element={<DetalheProduto />} />
					<Route path="/carrinhoSesc" element={<CarrinhoSesc />} />
					<Route path="/adminSenac" element={<AdminSenac />} />
					<Route path="/adminSesc" element={<AdminSesc />} />
					<Route path="/masterAdmin" element={<MasterAdmin />} />
					<Route path="/cadastroProdutos" element={<CadastroProdutos />} />
					<Route path="/listarProdutos" element={<ListarProdutos />} />
					<Route path="/cadastroEstabelecimentos" element={<CadastroEstabelecimentos />} />
					<Route path="/pedidos" element={<Pedidos />} /> {/* Adicione esta linha */}
					<Route path="/pedidos-admin" element={<PedidosAdmin />} />
				</Routes>
			</CartProvider>
		</BrowserRouter>
	</React.StrictMode>
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
);
