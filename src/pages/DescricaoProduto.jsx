import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";

export default function DescricaoProduto() {
  const location = useLocation();
  const navigate = useNavigate();
  // Recebe o produto via state
  const produto = location.state?.produto || {
    nome: "SUCO DE UVA DEL VALLE",
    descricao:
      "Ingredientes: Suco concentrado de uva, água, açúcar, ácido cítrico, conservador (benzoato de sódio), corante artificial. Informações sobre alergênicos: Não contém ingredientes alergênicos conhecidos, mas pode conter traços de outros alergênicos devido ao processo de fabricação.",
    preco: 4.59,
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=300&q=80",
  };
  const [quantidade, setQuantidade] = useState(1);

  function adicionarAoCarrinho() {
    // Aqui você pode implementar lógica para adicionar ao carrinho (ex: contexto ou localStorage)
    // Redireciona para a página do carrinho
    navigate("/carrinhoSesc", { state: { produto, quantidade } });
  }

  return (
    <div className="min-h-screen w-full bg-[#00529B] flex flex-col px-8 py-6 items-center relative">
      {/* Menu hambúrguer */}
      <div className="self-start mb-4">
        <Menu size={32} className="text-white" />
      </div>
      <hr className="border-white/40 w-full mb-8" />
      {/* Imagem do produto */}
      <img src={produto.img} alt={produto.nome} className="w-80 h-56 object-cover bg-white rounded mx-auto mb-4" />
      {/* Descrição */}
      <div className="bg-[#1565A5] rounded px-6 py-4 mb-6 text-center max-w-lg mx-auto">
        <span className="text-white font-bold text-base block mb-2">{produto.nome}</span>
        <span className="text-white text-sm font-normal">{produto.descricao}</span>
      </div>
      {/* Quantidade e valor */}
      <div className="flex justify-center items-center gap-16 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-white font-bold mb-2">Quantidade</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))} className="bg-[#1565A5] text-white px-2 rounded">-</button>
            <span className="bg-[#1565A5] text-white px-4 py-1 rounded">{quantidade}</span>
            <button onClick={() => setQuantidade(quantidade + 1)} className="bg-[#1565A5] text-white px-2 rounded">+</button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-bold mb-2">Valor</span>
          <span className="bg-[#1565A5] text-white px-4 py-1 rounded font-bold">R${(produto.preco * quantidade).toFixed(2)}</span>
        </div>
      </div>
      {/* Botão fazer pedido */}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xl px-8 py-2 rounded w-80 mx-auto"
        onClick={adicionarAoCarrinho}
      >
        fazer pedido
      </button>
      {/* Ícone de carrinho no canto inferior direito */}
      <div className="fixed bottom-8 right-10 bg-white rounded-full p-2 shadow">
        <ShoppingCart size={32} className="text-[#00529B]" />
      </div>
    </div>
  );
}
