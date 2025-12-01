import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";
=======
import { useLocation, Link } from "react-router-dom";
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d

export default function HamburgerMenu({ light = false }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);
  const [role, setRole] = useState(null);

  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  // Fecha ao mudar de rota
  useEffect(() => {
    close();
  }, [location.pathname]);

  // Fecha ao clicar fora / ESC e gerencia foco e scroll do body
  useEffect(() => {
    function handleOutside(e) {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        close();
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);

    if (open) {
      document.body.style.overflow = "hidden";
<<<<<<< HEAD
      setTimeout(() => firstLinkRef.current?.focus(), 0);
=======
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("authUser");
      const u = stored ? JSON.parse(stored) : null;
      setRole(u?.role || null);
    } catch {
      setRole(null);
    }
  }, [location.pathname]);

  const baseColor = light ? "text-gray-900" : "text-white";
  const bgPanel = light ? "bg-white text-gray-900" : "bg-gray-900 text-white";

  // Substitui pelos itens solicitados
  const menuItems = [
    { label: "inicial", path: "/" },
<<<<<<< HEAD
    { label: "café senac", path: "/senac" },
    { label: "conta", path: "/conta" },
    { label: "meu sesc", path: "/sesc" },
=======
    { label: "criar pedido", path: "/ProdutoSesc" },
    { label: "pagina", path: "/lojasesc" },
    { label: "carrinho", path: "/carrinhoSesc" },
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
  ];

  // Mostrar atalhos de Admin/Master apenas dentro das rotas de loja
  const isSescLoja = location.pathname.startsWith("/lojasesc");
  const isSenacLoja = location.pathname.startsWith("/lojasenac");
  const isInLoja = isSescLoja || isSenacLoja;

  const extraItems = [];
  if (isInLoja && (role === "admin" || role === "master")) {
    extraItems.push({
      label: "admin",
      path: isSenacLoja ? "/adminSenac" : "/adminSesc",
    });
  }
  if (isInLoja && role === "master") {
    extraItems.push({ label: "adm master", path: "/masterAdmin" });
  }

  const items = [...menuItems, ...extraItems];

  return (
    <>
      {/* botão do hambúrguer (sempre visível) */}
      <button
        onClick={toggle}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        className={`absolute top-4 left-4 z-50 p-2 rounded-md backdrop-blur bg-black/30 hover:bg-black/50 transition ${baseColor} focus:outline-none focus:ring-2 focus:ring-white`}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* overlay para fechar ao clicar fora */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* barra lateral estreita */}
      <aside
        ref={panelRef}
        className={`fixed top-0 left-0 z-50 h-full w-32 bg-blue-600 flex flex-col items-center pt-20 gap-5 shadow-lg transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-label="Menu lateral"
        aria-hidden={!open}
      >
<<<<<<< HEAD
        <nav className="flex flex-col items-center w-full gap-4 px-4" aria-label="Navegação principal">
          {menuItems.map((it, idx) => (
=======
        <nav className="flex flex-col items-center w-full gap-3" aria-label="Navegação principal">
          {items.map((it, idx) => (
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
            <Link
              key={it.path + it.label}
              to={it.path}
              onClick={close}
              ref={idx === 0 ? firstLinkRef : null}
              className="w-full text-center px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium text-sm shadow-md transition focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto mb-8">
          <Link to="/" onClick={close} className="inline-block text-white/90 text-2xl px-2 py-1">
            ←
          </Link>
        </div>
      </aside>
    </>
  );
}

// Nenhuma alteração necessária aqui, apenas garantir o uso do componente nas páginas desejadas.
