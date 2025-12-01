<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBasket, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { useCart } from "../components/CartContext";
import { supabase } from "../supabaseClient";
import PedidoNotification from "../components/PedidoNotification";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CarrinhoSesc() {
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const { carts, removeFromCart, clearCart, setCarts } = useCart();
  
  // Estado local para o carrinho Sesc persistente
  const [carrinho, setCarrinho] = useState([]);

  const menuItems = [
    { label: "home", path: "/" },
    { label: "fazer pedido", path: "/ProdutoSesc" },
    { label: "Loja Sesc", path: "/lojasesc" },
    { label: "Loja Senac", path: "/lojasenac" },
    { label: "carrinho", path: "/carrinhoSesc" },
  ];

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("carrinhoSesc");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCarrinho(parsed);
        // Sincronizar com contexto
        if (typeof setCarts === "function") {
          setCarts((prev) => ({ ...prev, sesc: parsed }));
        }
      } else if (carts.sesc && Array.isArray(carts.sesc)) {
        // Se não tem no localStorage mas tem no contexto
        setCarrinho(carts.sesc);
        localStorage.setItem("carrinhoSesc", JSON.stringify(carts.sesc));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  }, []);

  // Sincronizar carrinho local com contexto quando contexto mudar
  useEffect(() => {
    if (Array.isArray(carts.sesc) && JSON.stringify(carts.sesc) !== JSON.stringify(carrinho)) {
      const saved = localStorage.getItem("carrinhoSesc");
      // Se o contexto mudou e é diferente do localStorage, priorizar localStorage
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.length > 0 && carts.sesc.length === 0) {
            // Restaurar do localStorage
            setCarrinho(parsed);
            setCarts((prev) => ({ ...prev, sesc: parsed }));
            return;
          }
        } catch {}
      }
      // Caso contrário, sincronizar com contexto
      setCarrinho(carts.sesc);
      localStorage.setItem("carrinhoSesc", JSON.stringify(carts.sesc));
    }
  }, [carts.sesc]);

  // Salvar no localStorage sempre que carrinho mudar
  useEffect(() => {
    if (carrinho.length >= 0) {
      localStorage.setItem("carrinhoSesc", JSON.stringify(carrinho));
      // Sincronizar com contexto global
      if (typeof setCarts === "function") {
        setCarts((prev) => ({ ...prev, sesc: carrinho }));
      }
    }
  }, [carrinho]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("authUser");
      const user = stored ? JSON.parse(stored) : null;
      setUserRole(user?.role || null);
      setUserName(user?.nome || "Usuário");
      setUserId(user?.id || "");
    } catch {
      setUserRole(null);
      setUserName("");
      setUserId("");
    }
  }, []);

  const calcularTotal = () => {
    return carrinho.reduce((acc, item) => {
      const preco = parseFloat(item.preco || 0);
      const qtd = parseInt(item.quantidade || 1);
      return acc + (preco * qtd);
    }, 0);
  };

  const handleRemove = (index) => {
    if (window.confirm("Deseja remover este item do carrinho?")) {
      const novoCarrinho = carrinho.filter((_, i) => i !== index);
      setCarrinho(novoCarrinho);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Deseja limpar todo o carrinho?")) {
      setCarrinho([]);
      localStorage.removeItem("carrinhoSesc");
      clearCart("sesc");
    }
  };

  const handleFinalizarPedido = async () => {
    if (carrinho.length === 0) {
      alert("Carrinho vazio!");
      return;
    }

    if (!userId) {
      alert("Você precisa estar logado para finalizar o pedido!");
      return;
    }

    const confirmacao = window.confirm(
      `Confirmar pedido no valor de R$ ${calcularTotal().toFixed(2)}?`
    );
    
    if (!confirmacao) return;

    setLoading(true);
    
    try {
      const total = calcularTotal();
      
      const pedidoData = {
        usuario_id: userId,
        user_name: userName,
        tipo_loja: "sesc",
        items: carrinho.map(item => ({
          id: item.id,
          nome: item.nome,
          preco: parseFloat(item.preco),
          quantidade: parseInt(item.quantidade || 1),
        })),
        total: parseFloat(total.toFixed(2)),
        status: "pendente"
      };

      const { data, error } = await supabase
        .from("pedidos")
        .insert(pedidoData)
        .select()
        .single();

      if (error) throw error;

      alert("✅ Pedido realizado com sucesso! Aguarde a confirmação.");
      setCarrinho([]);
      localStorage.removeItem("carrinhoSesc");
      clearCart("sesc");
      
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert(`❌ Erro ao finalizar pedido: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && carrinho.length === 0) {
    return (
      <div className="min-h-screen w-full bg-[#00529B] flex items-center justify-center">
        <LoadingSpinner size="lg" color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#00529B] flex flex-col px-8 py-6 relative">
      <PedidoNotification />
      
      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        title="hamburger pedido sesc"
        items={menuItems}
        accent="bg-orange-500"
        role={userRole}
      />
      
      {/* Menu hambúrguer */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="absolute top-4 left-4 z-30 w-10 h-10 flex items-center justify-center rounded-md border border-white/20 bg-black/20 hover:bg-black/30"
      >
        <Menu size={32} className="text-white" />
      </button>

      <div className="max-w-4xl mx-auto w-full mt-16">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Carrinho de Compras</h1>

        {carrinho.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70 text-xl mb-6">Seu carrinho está vazio</p>
            <Link
              to="/ProdutoSesc"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition"
            >
              Adicionar Produtos
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de produtos do carrinho */}
            <div className="flex flex-col gap-6 mb-8">
              {carrinho.map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-white rounded overflow-hidden flex-shrink-0">
                      {item.img ? (
                        <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          Sem imagem
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-1">{item.nome}</h3>
                      {item.descricao && (
                        <p className="text-white/70 text-sm mb-2">{item.descricao}</p>
                      )}
                      <div className="flex items-center gap-4">
                        <span className="text-white/90">
                          Qtd: <span className="font-bold">{item.quantidade || 1}</span>
                        </span>
                        <span className="text-white/90">
                          Preço: <span className="font-bold">R$ {parseFloat(item.preco).toFixed(2)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span className="text-white text-xl font-bold">
                        R$ {(parseFloat(item.preco) * (item.quantidade || 1)).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemove(index)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total e Ações */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white text-2xl font-bold">Total:</span>
                <span className="text-orange-400 text-3xl font-bold">
                  R$ {calcularTotal().toFixed(2)}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleClearCart}
                  className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition"
                  disabled={loading}
                >
                  Limpar Carrinho
                </button>
                <button
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={handleFinalizarPedido}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    "Finalizar Pedido"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Link voltar */}
      <Link
        to="/ProdutoSesc"
        className="fixed bottom-8 left-10 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold hover:bg-white/20"
      >
        voltar
      </Link>
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
    </div>
  );
}
