<<<<<<< HEAD
import React from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Lojas() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-start pt-10 px-6 space-y-8">
      <HamburgerMenu />
      <h1 className="mt-2 text-lg md:text-2xl lg:text-3xl font-bold tracking-[0.3em] uppercase text-center">
=======
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import PedidoNotification from "../components/PedidoNotification";

export default function Lojas() {
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("authUser");
      const user = stored ? JSON.parse(stored) : null;
      setUserRole(user?.role || null);
    } catch {
      setUserRole(null);
    }
  }, []);

  const menuItems = [
    { label: "home", path: "/" },
    { label: "fazer pedido", path: "/ProdutoSesc" },
    { label: "Loja Sesc", path: "/lojasesc" },
    { label: "Loja Senac", path: "/lojasenac" },
    { label: "carrinho", path: "/carrinhoSesc" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-start px-4 pt-8">
      <PedidoNotification />

      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        title="hamburger pedido sesc"
        items={menuItems}
        accent="bg-orange-500"
        role={userRole}
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
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
        SEJA BEM VINDO
      </h1>

      {/* Avatar círculo branco */}
      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
<<<<<<< HEAD
        <User size={64} className="text-black" />
=======
        <svg viewBox="0 0 24 24" className="w-20 h-20 text-black" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
      </div>

      <span className="text-sm md:text-base font-semibold tracking-wide mb-2">
        LOJAS
      </span>

      <div className="w-80 h-52 relative flex items-center justify-center rounded-lg overflow-hidden border-6 border-white shadow-2xl">
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
          senac
        </Link>
=======
      <div className="mt-10 flex gap-4">
        <Link to="/" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">home</Link>
        <Link to="/sesc" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">voltar</Link>
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
      </div>
    </div>
  );
}
