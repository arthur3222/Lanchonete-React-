import React from "react";
import { Trash2, ShoppingBasket, Menu } from "lucide-react";

// Mock de produtos do carrinho
const carrinho = [
  {
    id: "mistao",
    nome: "MISTO QUENTE",
    descricao: "Pão, queijo e presunto",
    preco: 4.59,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "suco-lata",
    nome: "SUCO LATA",
    descricao: "Suco sabor uva-derivado da fruta uva",
    preco: 4.59,
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "cafe",
    nome: "CAFÉ",
    descricao: "Café feito do café",
    preco: 7.0,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80",
  },
];

export default function CarrinhoSesc() {
  return (
    <div className="min-h-screen w-full bg-[#00529B] flex flex-col px-8 py-6 relative">
      {/* Menu hambúrguer */}
      <div className="mb-8">
        <Menu size={32} className="text-white" />
      </div>
      {/* Lista de produtos do carrinho */}
      <div className="flex flex-col gap-10">
        {carrinho.map((item) => (
          <div key={item.id} className="flex items-center gap-8">
            <img src={item.img} alt={item.nome} className="w-36 h-32 object-cover rounded" />
            <div className="flex flex-col flex-1">
              <span className="text-white text-2xl font-extrabold leading-tight">{item.nome}</span>
              <span className="text-white text-base font-semibold mb-2">{item.descricao}</span>
              <div className="flex items-center gap-2">
                <button className="bg-white/10 border border-white/40 rounded p-1 text-white hover:bg-white/20">
                  <Trash2 size={20} />
                </button>
                <span className="text-white text-sm font-bold ml-auto">R${item.preco.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Ícone de carrinho no canto inferior direito */}
      <div className="fixed bottom-8 right-10 bg-white rounded-full p-2 shadow">
        <ShoppingBasket size={32} className="text-[#00529B]" />
      </div>
    </div>
  );
}
