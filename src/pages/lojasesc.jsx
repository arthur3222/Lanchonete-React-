import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../components/SideMenu";

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
    { label: "inicial", path: "/" },
    { label: "criar pedido", path: "/ProdutoSesc" },
    { label: "pagina", path: "/lojasesc" },
    { label: "carrinho", path: "/carrinhoSesc" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#003E7E] text-white flex flex-col items-center justify-start px-4 pt-8">
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
        SEJA BEM VINDO
      </h1>

      {/* Avatar círculo branco */}
      <div className="mt-6 w-40 h-40 bg-white rounded-full flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-20 h-20 text-black" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>

      <span className="text-xs font-semibold tracking-wide mt-4 mb-6">LOJAS</span>

      <Link
        to="/ProdutoSesc"
        aria-label="Fazer pedido Sesc"
        className="mt-6 w-[340px] h-[180px] relative rounded-md overflow-hidden border border-white/30 shadow-lg"
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <img
          src="/img/pedido.png"
          alt="Loja"
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-[20px] md:text-[22px] font-extrabold text-center leading-tight text-white drop-shadow">
            FAZER
            <br />
            PEDIDO
          </span>
        </div>
      </Link>

      <div className="mt-10 flex gap-4">
        <Link to="/" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">home</Link>
        <Link to="/sesc" className="px-4 py-2 border border-white/40 rounded text-sm hover:bg-white/10">voltar</Link>
      </div>
    </div>
  );
}
