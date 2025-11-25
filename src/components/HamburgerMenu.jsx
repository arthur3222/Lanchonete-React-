import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function HamburgerMenu({ light = false }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const panelRef = useRef(null);

  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  // Fechar ao mudar de rota
  useEffect(() => {
    close();
  }, [location.pathname]);

  // Fechar ao clicar fora
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
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const baseColor = light ? "text-white" : "text-white";
  const bgPanel = light ? "bg-white text-gray-900" : "bg-gray-900 text-white";

  return (
    <>
      <button
        onClick={toggle}
        aria-label="Abrir menu"
        aria-expanded={open}
        className={`absolute top-4 left-4 z-40 p-2 rounded-md backdrop-blur bg-black/30 hover:bg-black/50 transition ${baseColor} focus:outline-none focus:ring-2 focus:ring-white`}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      )}

      <div
        ref={panelRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 ${bgPanel} shadow-xl transform transition
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
        aria-label="Menu de navegação"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <span className="font-bold tracking-wide">MENU</span>
            <button
              onClick={close}
              aria-label="Fechar menu"
              className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
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
        </nav>
        <div className="mt-auto px-4 pb-6 text-xs opacity-60">
          <span>© {new Date().getFullYear()} Navegação</span>
        </div>
      </div>
    </>
  );
}
