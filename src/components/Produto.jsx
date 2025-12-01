import React from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { getProdutoById } from "../data/produtos";
import { useCart } from "./CartContext";

// Componente de detalhe
export default function ProdutoDetalhe() {
	const { id } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const store = searchParams.get("store");
	const productId = id;
	const produto = productId ? getProdutoById(productId) : undefined;
	const { addToCart } = useCart();
	const [qtd, setQtd] = React.useState(1);
	const [editing, setEditing] = React.useState(false);
	const [temp, setTemp] = React.useState(String(qtd));

	if (!produto) {
		return (
			<div style={styles.center}>
				<p style={styles.errorText}>Produto não encontrado</p>
				<Link to={-1} style={styles.backButton}>
					Voltar
				</Link>
			</div>
		);
	}

	const imageSource = (() => {
		if (!produto.img) return null;
		if (typeof produto.img === "string") return produto.img;
		if (typeof produto.img === "object" && produto.img.uri) return produto.img.uri;
		return null;
	})();

	return (
		<div style={styles.container}>
			<div style={styles.scrollContent}>
				{imageSource ? (
					<img src={imageSource} alt={produto.nome || "Produto"} style={styles.imagem} />
				) : (
					<div style={{ ...styles.imagem, ...styles.noImage }}>
						<span style={styles.noImageText}>Sem imagem</span>
					</div>
				)}

				<div style={styles.content}>
					<div style={styles.rowBetween}>
						<h2 style={styles.nome}>{produto.nome || "Produto"}</h2>
						<span style={styles.preco}>R$ {Number(produto.preco || 0).toFixed(2)}</span>
					</div>

					<div style={styles.separator} />

					<h3 style={styles.descricaoTitle}>Descrição</h3>
					<p style={styles.descricao}>{produto.descricao || "Sem descrição."}</p>

					{Array.isArray(produto.ingredientes) && produto.ingredientes.length > 0 && (
						<div>
							<h4 style={styles.ingredientesTitle}>Ingredientes</h4>
							{produto.ingredientes.map((ing, i) => (
								<p key={i} style={styles.ingrediente}>
									• {ing}
								</p>
							))}
						</div>
					)}
				</div>
			</div>

			<div style={styles.footer}>
				<div style={styles.footerRow}>
					{!editing ? (
						<button
							style={styles.qtyButton}
							onClick={() => {
								setTemp(String(qtd));
								setEditing(true);
							}}
						>
							Definir quantidade
						</button>
					) : (
						<div style={styles.qtyRow}>
							<input
								value={temp}
								onChange={e => setTemp(e.target.value)}
								style={styles.qtyInput}
								placeholder="Qtd"
								maxLength={2}
							/>
							<button
								style={styles.qtyOk}
								onClick={() => {
									const n = Math.max(1, Math.min(99, parseInt(temp, 10) || 1));
									setQtd(n);
									setEditing(false);
								}}
							>
								OK
							</button>
							<button
								style={styles.qtyCancel}
								onClick={() => setEditing(false)}
							>
								Cancelar
							</button>
						</div>
					)}

					<button
						style={{ ...styles.buyButton, flex: 1 }}
						onClick={() => {
							try {
								const loja = store === "sesc" || store === "senac" ? store : "sesc";
								addToCart(loja, { ...produto, quantidade: qtd });
								// navegar para confirmação (opcional)
								navigate("/concluir-pedido");
							} catch (e) {
								console.warn(e);
								window.alert("Erro ao adicionar.");
							}
						}}
					>
						Adicionar ao Carrinho
					</button>
				</div>
			</div>
		</div>
	);
}

// Card de produto (lista)
export function CardProduto({ img, nome, preco, produtoId, store }) {
	if (!produtoId) return null;

	const priceText =
		preco !== undefined && preco !== null && !Number.isNaN(Number(preco))
			? `R$ ${new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(preco))}`
			: "--";

	const imageSrc = (() => {
		if (!img) return null;
		if (typeof img === "string") return img;
		if (typeof img === "object" && img.uri) return img.uri;
		return null;
	})();

	const query = store ? `?store=${store}` : "";
	return (
		<Link to={`/produto/${produtoId}${query}`} style={styles.card}>
			{imageSrc && <img src={imageSrc} alt={nome} style={styles.cardImage} />}
			<div style={{ padding: 8, textAlign: "center" }}>
				<p style={styles.cardNome} title={nome}>
					{nome}
				</p>
				<p style={styles.cardPreco}>{priceText}</p>
			</div>
		</Link>
	);
}

const styles = {
	container: { position: "relative", minHeight: "100vh", background: "#ffffff" },
	scrollContent: { paddingBottom: 140, maxWidth: 900, margin: "0 auto" },
	center: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 },
	errorText: { color: "#666", fontSize: 18, marginBottom: 12 },
	backButton: { background: "#004586", padding: "10px 20px", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 600 },
	imagem: { width: "100%", height: 320, backgroundColor: "#f6f6f6", objectFit: "contain" },
	noImage: { display: "flex", alignItems: "center", justifyContent: "center" },
	noImageText: { color: "#999" },
	content: { padding: 20 },
	nome: { fontSize: 24, fontWeight: 700, color: "#222", margin: 0 },
	preco: { fontSize: 18, fontWeight: 700, color: "#2E7D32" },
	rowBetween: { display: "flex", justifyContent: "space-between", alignItems: "center" },
	separator: { height: 1, backgroundColor: "#e0e0e0", margin: "16px 0" },
	descricaoTitle: { fontSize: 18, fontWeight: 600, margin: "8px 0" },
	descricao: { fontSize: 16, color: "#555", lineHeight: "22px", margin: "0 0 16px" },
	ingredientesTitle: { fontSize: 16, fontWeight: 600, margin: "8px 0" },
	ingrediente: { fontSize: 14, color: "#666", margin: "0 0 4px" },
	footer: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", padding: 16, borderTop: "1px solid #e0e0e0" },
	footerRow: { display: "flex", alignItems: "center", gap: 12 },
	buyButton: { background: "#004586", padding: "14px 16px", borderRadius: 8, color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" },
	qtyButton: { background: "#ff5252", padding: "12px 14px", borderRadius: 8, color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" },
	qtyRow: { display: "flex", alignItems: "center", gap: 8 },
	qtyInput: { width: 64, height: 40, background: "#f3f3f3", borderRadius: 6, padding: "0 8px", border: "1px solid #ddd", fontSize: 16 },
	qtyOk: { background: "#28a745", padding: "10px 14px", borderRadius: 8, color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" },
	qtyCancel: { background: "#ccc", padding: "10px 14px", borderRadius: 8, color: "#333", fontWeight: 700, border: "none", cursor: "pointer" },
	card: { width: "48%", background: "#fff", borderRadius: 10, marginBottom: 12, overflow: "hidden", textDecoration: "none", color: "inherit", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
	cardImage: { width: "100%", height: 120, objectFit: "cover" },
	cardNome: { margin: "6px 0 0", fontWeight: 700, color: "#222", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
	cardPreco: { margin: "4px 0 0", color: "#444", fontSize: 13 },
};
