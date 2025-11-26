import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function HamburgerMenu({ light = false }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  // Fecha ao mudar de rota
  useEffect(() => {
    close();
  }, [location.pathname]);

  // Fecha ao clicar fora / ESC e gerencia foco
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

    // bloquear scroll do body quando o menu estiver aberto
    if (open) {
      document.body.style.overflow = "hidden";
      // foca o primeiro link disponível
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const baseColor = light ? "text-gray-900" : "text-white";
  const bgPanel = light ? "bg-white text-gray-900" : "bg-gray-900 text-white";

  const menuItems = [
    { label: "inicial", path: "/" },
    { label: "sesc", path: "/sesc" },
    { label: "senac", path: "/senac" },
    { label: "lojas", path: "/lojas" },
    // ajuste os caminhos conforme sua aplicação
  ];

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
        className={`fixed top-0 left-0 z-50 h-full w-24 md:w-28 ${bgPanel} flex flex-col items-center py-6 gap-4 shadow-lg transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-label="Menu lateral"
        aria-hidden={!open}
      >
        <nav className="flex flex-col items-center w-full gap-3" aria-label="Navegação principal">
          {menuItems.map((it, idx) => (
            <Link
              key={it.path + it.label}
              to={it.path}
              onClick={close}
              ref={idx === 0 ? firstLinkRef : null}
              className="w-16 md:w-20 mx-auto text-center px-2 py-2 bg-orange-400 hover:bg-orange-500 border border-black/30 rounded-full text-white font-semibold text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
<<<<<<< HEAD
              {it.label}
            </Link>
          ))}
=======
              <X size={20} />
            </button>
        </div>
        <nav className="flex flex-col gap-2 px-4 py-4 text-sm">
          <div className="px-3 py-2 rounded">Home</div>
          <div className="px-3 py-2 rounded">Sesc</div>
          <div className="px-3 py-2 rounded">Senac</div>
          <div className="px-3 py-2 rounded">Produtos Sesc</div>
          <div className="px-3 py-2 rounded">Produtos Senac</div>
          {/* Sair (estático) */}
          <div className="mt-2 px-3 py-2 rounded bg-red-600/60 text-white font-semibold">Sair</div>
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
        </nav>

        <div className="mt-auto mb-6">
          <Link to="/" onClick={close} className="inline-block text-white/90 px-2 py-1">
            ←
          </Link>
        </div>
      </aside>
    </>
  );
}
