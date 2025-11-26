import React, { useState } from "react";
import { User } from "lucide-react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Link } from "react-router-dom"; // <-- adicionado
import SideMenu from "../components/SideMenu"; // novo import
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6

export default function Lojas() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Sesc (início)", path: "/sesc" },
    { label: "Senac (início)", path: "/senac" },
    { label: "Carrinho Sesc", path: "/carrinhoSesc" },
    { label: "Lanchonete Sesc", path: "/ProdutoSesc" },
    { label: "Sair", path: "/" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-start px-4 pt-8">
      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        title="Café Sesc"
        items={menuItems}
        accent="bg-[#003a73]"
      />

      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        className="absolute top-4 left-4 z-30 w-10 h-10 flex items-center justify-center rounded-md border border-white/20 bg-black/20 hover:bg-black/30"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      <h1 className="mt-2 text-sm md:text-base font-bold tracking-[0.3em] uppercase">
<<<<<<< HEAD
=======
=======
<<<<<<< HEAD
>>>>>>> 758e0468464b7e591210941d5a35d6e80e509992
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Lojas() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-start pt-10 px-6 space-y-8">
      <HamburgerMenu />
      <h1 className="mt-2 text-lg md:text-2xl lg:text-3xl font-bold tracking-[0.3em] uppercase text-center">
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6
        SEJA BEM VINDO
      </h1>

      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
        <User size={80} className="text-black" />
      </div>

<<<<<<< HEAD
      <span className="text-xs font-semibold tracking-wide mt-4 mb-6">LOJAS</span>

=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
      <span className="text-xs font-semibold tracking-wide mt-4 mb-6">LOJAS</span>
=======
<<<<<<< HEAD
>>>>>>> 758e0468464b7e591210941d5a35d6e80e509992
      <span className="text-sm md:text-base font-semibold tracking-wide mb-2">
        LOJAS
      </span>

      <div className="w-80 h-52 relative flex items-center justify-center rounded-lg overflow-hidden border-6 border-white shadow-2xl">
<<<<<<< HEAD
=======
=======
      <span className="text-xs font-semibold tracking-wide mb-10">LOJAS</span>
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d

      {/* Cartão de pedido (tamanho e estilo ajustados para ficar igual à imagem) */}
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6
      <Link
        to="/ProdutoSesc"
        aria-label="Fazer pedido Sesc"
        className="mt-6 w-[340px] h-[180px] relative rounded-md overflow-hidden border border-white/30 shadow-lg"
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
<<<<<<< HEAD
=======
=======
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-900 to-black z-0" />
        <div className="absolute inset-0 " />
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
>>>>>>> 758e0468464b7e591210941d5a35d6e80e509992
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6
        <img
          src="/img/pedido.png"
          alt="Loja"
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-[20px] md:text-[22px] font-extrabold text-center leading-tight text-white drop-shadow">
            FAZER
            <br />
            PEDIDO
          </span>
        </div>
      </Link>

      <div className="mt-10 flex gap-4">
<<<<<<< HEAD
        <Link to="/sesc" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">voltar</Link>
        <Link to="/sesc" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">sesc</Link>
        <Link to="/senac" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">senac</Link>
=======
        <Link
          to="/sesc"
          className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10"
        >
=======
<<<<<<< HEAD
>>>>>>> 758e0468464b7e591210941d5a35d6e80e509992

        <div className="absolute inset-0 bg-black/50 z-10" />

        <button
          type="button"
          aria-label="Fazer pedido - ver produtos Sesc"
          onClick={() => navigate("/ProdutoSesc")}
          className="relative z-20 inline-block text-white drop-shadow-md text-2xl md:text-3xl font-extrabold text-center leading-tight px-4 py-2 focus:outline-none focus:ring-4 focus:ring-orange-300 rounded"
        >
          FAZER <br />PEDIDO
        </button>
      </div>

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
<<<<<<< HEAD
=======
=======
      <div className="mt-12 flex gap-4">
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
          voltar
        </Link>
        <Link
          to="/sesc"
          className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10"
        >
          sesc
<<<<<<< HEAD
        </Link>
        <Link
          to="/senac"
          className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10"
        >
=======
        </div>
        <div className="px-4 py-2 border border-white/40 rounded text-sm">
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
>>>>>>> 758e0468464b7e591210941d5a35d6e80e509992
          senac
        </Link>
>>>>>>> 6b1698639184a748b2f631a0a79bb7b43f1bdeb6
      </div>
    </div>
  );
}
