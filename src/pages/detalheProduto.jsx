import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useCart } from "../components/CartContext";
import { ShoppingCart } from "lucide-react";

export default function DetalheProduto() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const store = searchParams.get("store") || "sesc";
  
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduto();
  }, [id]);

  const loadProduto = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      setProduto(data);
    } catch (err) {
      console.error("Erro ao carregar produto:", err);
      alert("Produto não encontrado");
      navigate(store === "sesc" ? "/ProdutoSesc" : "/ProdutoSenac");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!produto) return;
    
    addToCart(store, {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      img: produto.img,
      descricao: produto.descricao,
      quantidade: quantidade
    });

    alert(`${produto.nome} adicionado ao carrinho!`);
    navigate(store === "sesc" ? "/carrinhoSesc" : "/carrinhoSenac");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B4A80] flex items-center justify-center">
        <span className="text-white text-xl">Carregando...</span>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#0B4A80] flex items-center justify-center">
        <span className="text-white text-xl">Produto não encontrado</span>
      </div>
    );
  }

  const bgColor = store === "sesc" ? "bg-[#0B4A80]" : "bg-[#FF7700]";
  const voltarPath = store === "sesc" ? "/ProdutoSesc" : "/ProdutoSenac";

  return (
    <div className={`min-h-screen ${bgColor} text-white p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(voltarPath)}
          className="mb-6 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
        >
          ← Voltar
        </button>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Imagem do Produto */}
            <div className="flex-shrink-0">
              <div className="w-full md:w-80 h-64 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                {produto.img ? (
                  <img
                    src={produto.img}
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">Sem imagem</div>
                )}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-extrabold mb-4">{produto.nome}</h1>
              
              {produto.descricao && (
                <p className="text-white/80 mb-6 text-base leading-relaxed">
                  {produto.descricao}
                </p>
              )}

              <div className="mb-6">
                <span className="text-xs px-3 py-1 bg-white/10 rounded-full">
                  {produto.categoria}
                </span>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-orange-400">
                  R$ {parseFloat(produto.preco).toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Controle de Quantidade */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">
                  Quantidade
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-xl transition"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-2xl font-bold">
                    {quantidade}
                  </span>
                  <button
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg font-bold text-xl transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Valor Total */}
              <div className="mb-8 p-4 bg-white/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Valor Total:</span>
                  <span className="text-2xl font-bold text-orange-400">
                    R$ {(parseFloat(produto.preco) * quantidade).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Botão Adicionar ao Carrinho */}
              <button
                onClick={handleAddToCart}
                disabled={!produto.disponivel}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-xl transition flex items-center justify-center gap-3"
              >
                <ShoppingCart size={24} />
                {produto.disponivel ? "Adicionar ao Carrinho" : "Indisponível"}
              </button>

              {!produto.disponivel && (
                <p className="text-red-400 text-sm mt-2 text-center">
                  Este produto não está disponível no momento
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
