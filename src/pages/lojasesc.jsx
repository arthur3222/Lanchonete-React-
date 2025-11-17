import React from "react";
import { Link } from "react-router-dom";

export default function Lojas() {
  return (
    <div className="min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center pt-6 px-4">
      {/* Ícone menu (caixa preta) */}
      <div className="absolute top-3 left-3 w-6 h-6 bg-black rounded-sm" />

      {/* Título */}
      <h1 className="text-xs tracking-widest font-bold mb-6">SEJA BEM VINDO</h1>

      {/* Avatar (caixa preta circular) */}
      <div className="w-28 h-28 bg-black rounded-full flex items-center justify-center mb-3">
        <span className="text-4xl font-bold">👤</span>
      </div>

      {/* Subtítulo */}
      <span className="text-xs font-semibold tracking-wide mb-10">LOJAS</span>

      {/* Card Fazer Pedido (retângulo preto) */}
      <div className="w-64 h-56 bg-black relative flex items-center justify-center rounded-sm">
        <div className="absolute inset-0 bg-black/70 rounded-sm" />
        <span className="relative text-lg font-extrabold text-center leading-tight">
          FAZER<br />PEDIDO
        </span>
      </div>

      {/* Ações */}
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
