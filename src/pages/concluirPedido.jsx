import React from "react";
import { Link } from "react-router-dom";

export default function ConcluirPedido() {
  return (
    <div className="min-h-screen w-full bg-[#0B4A80] text-white flex items-center justify-center p-6">
      {/* Card centralizado tipo Alert */}
      <div className="w-full max-w-sm bg-gray-100 text-black rounded-lg shadow-xl p-6 text-center">
        <h3 className="font-extrabold text-sm uppercase tracking-wide mb-3">ADICIONADO AO CARRINHO</h3>
        <p className="text-xs text-gray-700 mb-6">
          Verifique o carrinho para mais informações
        </p>

        <div>
          <Link
            to="/carrinhoSesc"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-black font-bold px-6 py-2 rounded-full shadow-md border border-black/20 transition"
          >
            CARRINHO
          </Link>
        </div>
      </div>
    </div>
  );
}
