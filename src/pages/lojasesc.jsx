import React from "react";
import { User } from "lucide-react";
import HamburgerMenu from "../components/HamburgerMenu"; // import adicionado
import { Link } from "react-router-dom"; // <-- adicionado

export default function Lojas() {
  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-center px-4">
      <HamburgerMenu /> {/* hambúrguer funcional */}
      <h1 className="mt-0 text-sm md:text-base font-bold tracking-[0.3em] uppercase">
        SEJA BEM VINDO
      </h1>

      {/* Avatar círculo branco */}
      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
        <User size={80} className="text-black" />
      </div>

      <span className="text-xs font-semibold tracking-wide mb-10">LOJAS</span>

      <div
        aria-disabled="true"
        className="w-64 h-56 relative flex items-center justify-center rounded-sm overflow-hidden group cursor-default opacity-95"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-black z-0" />
        <div className="absolute inset-0 " />
        <img
          src="/img/pedido.png"
          alt="Loja"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <span className="relative text-lg font-extrabold text-center leading-tight z-20 text-white">
          FAZER <br />PEDIDO
        </span>
      </div>

      <div className="mt-12 flex gap-4">
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
          voltar
        </div>
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
          sesc
        </div>
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
          senac
        </div>
      </div>
    </div>
  );
}
