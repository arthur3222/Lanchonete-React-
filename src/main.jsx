import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
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
);
