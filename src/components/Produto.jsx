import React from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { produtos } from "../data/produtos";

// CardProduto reutilizável
export function CardProduto({ img, nome, preco, produtoId, store = "sesc" }) {
	// ...visual existente...
	return (
		<Link to={`/produto/${produtoId}?store=${store}`} className="flex flex-col items-center gap-2 text-center">
			<div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
				<img src={img} alt={nome} className="w-full h-full object-cover" />
			</div>
			<div className="text-xs font-extrabold uppercase">{nome}</div>
			<div className="text-xs">R$ {Number(preco).toFixed(2).replace(".", ",")}</div>
		</Link>
	);
}

// Página de detalhe do produto
export default function ProdutoDetalhe() {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const store = searchParams.get("store") || "sesc";

	// procurar produto por id
	let item = null;
	for (const cat of Object.keys(produtos)) {
		const found = produtos[cat].find(p => String(p.id) === String(id));
		if (found) {
			item = found;
			break;
		}
	}

	if (!item) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<span>Produto não encontrado.</span>
			</div>
		);
	}

	const voltarPath = store === "sesc" ? "/ProdutoSesc" : "/ProdutoSenac";

	return (
		<div className="min-h-screen bg-[#0B4A80] text-white p-6">
			<div className="max-w-3xl mx-auto bg-white/5 p-6 rounded-md">
				<div className="flex gap-6 flex-col md:flex-row items-start">
					<div className="w-full md:w-40 h-40 bg-white rounded overflow-hidden flex items-center justify-center">
						<img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
					</div>
					<div className="flex-1">
						<h1 className="text-2xl font-bold">{item.nome}</h1>
						<p className="mt-2 text-lg">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</p>
						<p className="mt-4 text-sm text-white/80">{item.descricao || ""}</p>
						<div className="mt-6 flex gap-3">
							<button onClick={() => navigate(voltarPath)} className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">
								Voltar
							</button>
							<button onClick={() => alert("Adicionar ao carrinho (implementar)")} className="px-4 py-2 bg-green-600 text-white rounded">
								Adicionar ao carrinho
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
