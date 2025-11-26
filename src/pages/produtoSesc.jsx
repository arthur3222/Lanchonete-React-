import React, { useState } from "react";
import { produtos } from "../data/produtos";
import { CardProduto } from "../components/Produto";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";

export default function ProdutoSesc() {
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
    <div className="min-h-screen bg-[#0B4A80] text-white">
      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        title="Café Sesc"
        items={menuItems}
        accent="bg-[#003a73]"
      />

      <header className="h-20 flex items-center px-5 relative">
        <button
          onClick={() => setOpen(true)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-md border border-white/20 bg-black/20 hover:bg-black/30"
          aria-label="Abrir menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="ml-14 text-2xl font-extrabold tracking-wide">Lanchonete</h1>
      </header>

      <main className="px-4 pb-24">
        {Object.keys(produtos).map(cat => (
          <section key={cat} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{cat}</h2>
            <div className="flex flex-wrap gap-4">
              {produtos[cat].map(item => (
                <div key={item.id} className="w-[48%] min-w-[220px]">
                  <CardProduto
                    img={item.img}
                    nome={item.nome}
                    preco={item.preco}
                    produtoId={item.id}
                    store="sesc"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Link
        to="/lojasesc"
        className="fixed bottom-5 left-5 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold hover:bg-white/20"
        aria-label="Voltar para Lojas Sesc"
      >
        voltar
      </Link>
    </div>
  );
}
