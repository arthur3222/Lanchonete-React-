import React, { useState } from "react";
import { produtos } from "../data/produtos";
import { CardProduto } from "../components/Produto";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";

export default function ProdutoSesc() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Café Senac", path: "/senac" },
    { label: "Carrinho", path: "/carrinhoSesc" },
    { label: "Lanchonete", path: "/ProdutoSesc" },
    { label: "Sair", path: "/sesc" },
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

      <header className="h-20 flex items-center px-5">
        <button
          onClick={() => setOpen(true)}
          className="text-white text-3xl font-bold px-3 py-2 rounded hover:bg-white/10"
          aria-label="Abrir menu"
        >
          ☰
        </button>
        <h1 className="ml-4 text-2xl font-extrabold tracking-wide">Lanchonete</h1>
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
        to="/"
        className="fixed bottom-5 left-5 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold"
      >
        voltar
      </Link>
    </div>
  );
}
