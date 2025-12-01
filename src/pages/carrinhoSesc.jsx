import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import HamburgerMenu from "../components/HamburgerMenu";
import { useCart } from "../components/CartContext";

export default function CarrinhoSesc() {
  const { carts, removeFromCart, clearCart, setCartItems } = useCart();
  const navigate = useNavigate();
  const items = (carts && carts.sesc) || [];

  const updateQty = (index, newQty) => {
    const copy = [...items];
    copy[index] = { ...copy[index], quantidade: Math.max(1, Number(newQty || copy[index].quantidade || copy[index].qtd || 1)) };
    setCartItems("sesc", copy);
  };

  const total = items.reduce((acc, it) => {
    const preco = Number(it.preco || 0);
    const qtd = Number(it.quantidade || it.qtd || 1);
    return acc + preco * qtd;
  }, 0);

  return (
    <div className="min-h-screen w-full bg-[#0B4A80] text-white">
      {/* hambúrguer consistente com outras páginas */}
      <HamburgerMenu />

      <main className="max-w-6xl mx-auto px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6">Carrinho</h1>

        {items.length === 0 ? (
          <div className="bg-[#083a63] rounded-lg p-8 text-center">
            <p className="text-lg font-semibold mb-4">Seu carrinho está vazio</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/ProdutoSesc"
                className="inline-block bg-orange-400 hover:bg-orange-500 text-black font-bold px-5 py-2 rounded"
              >
                VER PRODUTOS
              </Link>
              <Link
                to="/"
                className="inline-block border border-white/30 px-5 py-2 rounded hover:bg-white/5"
              >
                voltar
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="space-y-8">
              {items.map((it, idx) => (
                <li key={idx} className="flex items-center gap-6 bg-[#083a63] p-4 rounded-lg">
                  <img
                    src={typeof it.img === "string" ? it.img : (it.img && it.img.uri) || "/img/pedido.png"}
                    alt={it.nome}
                    className="w-28 h-28 object-cover rounded"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg md:text-xl font-extrabold uppercase">{it.nome}</h2>
                        {it.descricao && <p className="text-sm text-white/80 mt-1">{it.descricao}</p>}
                      </div>

                      <div className="text-right">
                        <div className="font-bold">R$ {Number(it.preco || 0).toFixed(2).replace(".", ",")}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4">
                      <label className="text-sm text-white/80">Qtd:</label>
                      <input
                        type="number"
                        min="1"
                        value={it.quantidade ?? it.qtd ?? 1}
                        onChange={(e) => updateQty(idx, e.target.value)}
                        className="w-20 text-black rounded px-2 py-1"
                      />

                      <button
                        onClick={() => removeFromCart("sesc", idx)}
                        aria-label="Remover item"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 ml-6"
                      >
                        <Trash2 size={16} /> <span className="text-sm">Remover</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm text-white/80">Total</div>
                <div className="text-2xl font-extrabold">R$ {total.toFixed(2).replace(".", ",")}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => clearCart("sesc")}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  LIMPAR
                </button>

                <button
                  onClick={() => navigate("/concluir-pedido")}
                  className="px-6 py-3 rounded bg-orange-400 hover:bg-orange-500 font-bold text-black"
                >
                  CONCLUIR PEDIDO
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Link
        to="/ProdutoSesc"
        className="fixed bottom-8 left-10 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold hover:bg-white/20"
      >
        voltar
      </Link>
    </div>
  );
}
