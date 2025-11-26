import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// páginas
import Home from "./pages/home.jsx";
import SescEscolha from "./pages/sescEscolha.jsx";
import SenacEscolha from "./pages/senacEscolha.jsx";
import SescLogin from "./pages/sescLogin.jsx";
import SenacLogin from "./pages/senacLogin.jsx";
import SescCadastro from "./pages/sescCadastro.jsx";
import SenacCadastro from "./pages/senacCadastro.jsx";
import LojasSesc from "./pages/lojasesc.jsx";
import LojasSenac from "./pages/lojasenac.jsx";
import ProdutoSesc from "./pages/produtoSesc.jsx";
import ProdutoDetalhe from "./components/Produto.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
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
				<Route path="/produto/:id" element={<ProdutoDetalhe />} />
				{/* adicione outras rotas necessárias aqui */}
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
