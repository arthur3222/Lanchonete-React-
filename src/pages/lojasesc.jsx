import React from "react";
import { User } from "lucide-react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
=======
import HamburgerMenu from "../components/HamburgerMenu"; // import adicionado
import { Link } from "react-router-dom"; // <-- adicionado
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e

export default function Lojas() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-start pt-10 px-6 space-y-8">
      <HamburgerMenu />
      <h1 className="mt-2 text-lg md:text-2xl lg:text-3xl font-bold tracking-[0.3em] uppercase text-center">
        SEJA BEM VINDO
      </h1>

      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
        <User size={64} className="text-black" />
      </div>

<<<<<<< HEAD
      <span className="text-sm md:text-base font-semibold tracking-wide mb-2">
        LOJAS
      </span>

      <div className="w-80 h-52 relative flex items-center justify-center rounded-lg overflow-hidden border-6 border-white shadow-2xl">
=======
      <span className="text-xs font-semibold tracking-wide mb-10">LOJAS</span>

      <div
        aria-disabled="true"
        className="w-64 h-56 relative flex items-center justify-center rounded-sm overflow-hidden group cursor-default opacity-95"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-black z-0" />
        <div className="absolute inset-0 " />
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
        <img
          src="/img/pedido.png"
          alt="Loja"
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
<<<<<<< HEAD

        <div className="absolute inset-0 bg-black/50 z-10" />

        <button
          type="button"
          aria-label="Fazer pedido - ver produtos Sesc"
          onClick={() => navigate("/ProdutoSesc")}
          className="relative z-20 inline-block text-white drop-shadow-md text-2xl md:text-3xl font-extrabold text-center leading-tight px-4 py-2 focus:outline-none focus:ring-4 focus:ring-orange-300 rounded"
        >
=======
        <span className="relative text-lg font-extrabold text-center leading-tight z-20 text-white">
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
          FAZER <br />PEDIDO
        </button>
      </div>

<<<<<<< HEAD
      <div className="mt-12 flex gap-6">
        <Link
          to="/"
          className="px-6 py-3 border border-white/40 rounded-lg text-base hover:bg-white/10 transition"
        >
          voltar
        </Link>
        <Link
          to="/sesc"
          className="px-6 py-3 border border-white/40 rounded-lg text-base hover:bg-white/10 transition"
        >
          sesc
        </Link>
        <Link
          to="/senac"
          className="px-6 py-3 border border-white/40 rounded-lg text-base hover:bg-white/10 transition"
        >
=======
      <div className="mt-12 flex gap-4">
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
          voltar
        </div>
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
          sesc
        </div>
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
          senac
        </div>
      </div>
    </div>
  );
}
