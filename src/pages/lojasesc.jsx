import React from "react";
import { Link } from "react-router-dom";
import { User, Menu } from "lucide-react";

export default function Lojas() {
  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center pt-6 px-4">
      <Menu size={24} className="absolute top-4 left-4 z-10" />

      <h1 className="text-3xl tracking-widest font-bold mb-10">SEJA BEM VINDO</h1>

      <div className="w-28 h-28 bg-[#2f3031] rounded-full flex items-center justify-center mb-3">
        <User size={60} color="black" />
      </div>

      <span className="text-xs font-semibold tracking-wide mb-10">LOJAS</span>

      <div className="w-64 h-56 relative flex items-center justify-center rounded-sm overflow-hidden">
        {/* fundo em gradiente estático (aparece se a imagem não carregar) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-black z-0" />

        {/* imagem de fundo (coloque em public/img/pedido.png) - se estiver em src/img, importe acima e use src={pedidoImg} */}
        <img
          src="/img/pedido.png"
          alt="Loja"
          className="absolute inset-0 w-full h-full object-cover z-10"
          onError={(e) => {
            // se falhar no carregamento, esconda a <img> para mostrar o gradiente
            e.currentTarget.style.display = "none";
          }}
        />

        {/* overlay leve para contraste sobre a imagem */}
        <div className="absolute inset-0 bg-black/30 z-20" />

        {/* texto por cima */}
        <span className="relative text-lg font-extrabold text-center leading-tight z-30 text-white">
          FAZER <br />PEDIDO
        </span>
      </div>

      <div className="mt-12 flex gap-4">
        <Link
          to="/"
          className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10 transition"
        >
          voltar
        </Link>
        <Link
          to="/sesc"
          className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10 transition"
        >
          sesc
        </Link>
        <Link
          to="/senac"
          className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10 transition"
        >
          senac
        </Link>
      </div>
    </div>
  );
}
