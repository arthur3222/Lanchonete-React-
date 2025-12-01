import React, { useState, useEffect } from "react";
import { produtos } from "../data/produtos";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";
import PedidoNotification from "../components/PedidoNotification";
import { supabase } from "../supabaseClient"; // Corrija para importação nomeada

function ProductTile({ item, store = "sesc" }) {
	return (
		<Link to={`/produto/${item.id}?store=${store}`} className="flex flex-col items-center gap-2 text-center">
			<div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
				{/* Só renderiza a imagem se houver valor válido */}
				{item.img ? (
					<img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
				) : (
					<div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Sem imagem</div>
				)}
			</div>
			<div className="text-xs font-extrabold uppercase text-white">{item.nome}</div>
			<div className="text-xs text-white/90">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</div>
		</Link>
	);
}

export default function ProdutoSesc() {
	const [open, setOpen] = useState(false);
	const [produtosCadastrados, setProdutosCadastrados] = useState([]);
	const [userRole, setUserRole] = useState(null);

	const menuItems = [
<<<<<<< HEAD
		{ label: "Home", path: "/" },
		{ label: "Café Senac", path: "/senac" },
		{ label: "Carrinho", path: "/carrinhoSesc" },
		{ label: "Lanchonete", path: "/ProdutoSesc" },
		{ label: "Sair", path: "/sesc" },
=======
		{ label: "home", path: "/" },
		{ label: "fazer pedido", path: "/ProdutoSesc" },
		{ label: "Loja Sesc", path: "/lojasesc" },
		{ label: "Loja Senac", path: "/lojasenac" },
		{ label: "carrinho", path: "/carrinhoSesc" },
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
	];

	useEffect(() => {
		async function fetchProdutos() {
			const { data, error } = await supabase
				.from("produtos")
				.select("*");
			if (!error) setProdutosCadastrados(data || []);
		}
		fetchProdutos();

		try {
			const stored = localStorage.getItem("authUser");
			const user = stored ? JSON.parse(stored) : null;
			setUserRole(user?.role || null);
		} catch {
			setUserRole(null);
		}
	}, []);

	return (
		<div className="min-h-screen bg-[#0B4A80] text-white">
<<<<<<< HEAD
			<SideMenu
				open={open}
				onClose={() => setOpen(false)}
				title="Café Sesc"
				items={menuItems}
				accent="bg-[#003a73]"
=======
			<PedidoNotification />

			<SideMenu 
				open={open} 
				onClose={() => setOpen(false)} 
				title="hamburger pedido sesc" 
				items={menuItems} 
				accent="bg-orange-500"
				role={userRole}
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
			/>

			<header className="h-20 flex items-center px-5">
				<button
					onClick={() => setOpen(true)}
					className="text-white text-3xl px-3 py-2 rounded hover:bg-white/10"
					aria-label="Abrir menu"
				>
					☰
				</button>
			</header>

			<main className="px-6 pb-24 max-w-6xl mx-auto">
				{/* Apenas produtos cadastrados no Supabase */}
				{produtosCadastrados.length > 0 ? (
					<section className="mb-12">
						<div className="flex justify-center mb-6">
							<div className="bg-orange-500 w-28 sm:w-40 md:w-56 py-1 rounded-sm font-bold uppercase text-sm text-center">
								Cadastrados
							</div>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 items-start justify-items-center">
<<<<<<< HEAD
							{produtos[cat].map((item) => (
								<ProductTile key={item.id} item={item} store="sesc" />
=======
							{produtosCadastrados.map((item) => (
								<div key={item.id} className="w-[48%] min-w-[220px]">
									<ProductTile item={item} store="sesc" />
								</div>
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
							))}
						</div>
					</section>
				) : (
					<div className="text-center text-white/70 mt-10">Nenhum produto cadastrado.</div>
				)}
			</main>

			<Link
				to="/"
				className="fixed bottom-5 left-5 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold"
			>
				voltar
			</Link>
		</div>
	);
}
