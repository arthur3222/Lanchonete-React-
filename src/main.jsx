import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./components/CartContext"; // <-- adicionar

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
<<<<<<< HEAD
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
=======
import ProdutoSenac from "./pages/produtoSenac";
import ConcluirPedido from "./pages/concluirPedido"; // <-- adicionar se não existir

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
          <Route path="/concluir-pedido" element={<ConcluirPedido />} />
          <Route path="/ProdutoSesc" element={<ProdutoSesc />} />
          <Route path="/ProdutoSenac" element={<ProdutoSenac />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6
);
