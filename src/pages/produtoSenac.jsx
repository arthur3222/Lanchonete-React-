import React, { useState, useEffect } from "react";
import { produtos } from "../data/produtos";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";

function ProductTile({ item, store = "senac" }) {
	return (
		<Link to={`/produto/${item.id}?store=${store}`} className="flex flex-col items-center gap-2 text-center">
			<div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
				<img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
			</div>
			<div className="text-xs font-extrabold uppercase text-white">{item.nome}</div>
			<div className="text-xs text-white/90">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</div>
		</Link>
	);
}

export default function ProdutoSenac() {
	const [open, setOpen] = useState(false);
	const [userRole, setUserRole] = useState(null);

	const menuItems = [
		{ label: "inicial", path: "/" },
		{ label: "criar pedido", path: "/ProdutoSenac" },
		{ label: "pagina", path: "/lojasenac" },
		{ label: "carrinho", path: "/carrinhoSenac" },
	];

	useEffect(() => {
		try {
			const stored = localStorage.getItem("authUser");
			const user = stored ? JSON.parse(stored) : null;
			setUserRole(user?.role || null);
		} catch {
			setUserRole(null);
		}
	}, []);

	return (
		<div className="min-h-screen bg-[#FF7700] text-white">
			<SideMenu open={open} onClose={() => setOpen(false)} title="hamburger pedido senac" items={menuItems} accent="bg-orange-500" role={userRole} />

			<header className="h-20 flex items-center px-5 relative">
				<button
					onClick={() => setOpen(true)}
					className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-md border border-white/20 bg-black/20 hover:bg-black/30"
					aria-label="Abrir menu"
				>
					<svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M3 6h18M3 12h18M3 18h18" />
					</svg>
				</button>
				<h1 className="ml-14 text-2xl font-extrabold tracking-wide">Lanchonete</h1>
			</header>

			<main className="px-6 pb-24 max-w-6xl mx-auto">
				{Object.keys(produtos).map((cat) => (
					<section key={cat} className="mb-12">
						<div className="flex justify-center mb-6">
							<div
								data-source="src/data/produtos.js"
								title={`categoria: ${cat} — definida em src/data/produtos.js`}
								className="bg-orange-500 w-28 sm:w-40 md:w-56 py-1 rounded-sm font-bold uppercase text-sm text-center"
							>
								{cat}
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 items-start justify-items-center">
							{produtos[cat].map((item) => (
								<div key={item.id} className="w-[48%] min-w-[220px]">
									<ProductTile item={item} store="senac" />
								</div>
							))}
						</div>
					</section>
				))}
			</main>

			<Link
				to="/lojasenac"
				className="fixed bottom-5 left-5 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold hover:bg-white/20"
				aria-label="Voltar para Lojas Senac"
			>
				voltar
			</Link>
		</div>
	);
}
