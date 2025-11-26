import React, { useState } from "react";
import { produtos } from "../data/produtos";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";

function ProductTile({ item, store = "senac" }) {
  return (
    <Link to={`/produto/${item.id}?store=${store}`} className="flex flex-col items-center gap-2 text-center">
      <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
        <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
      </div>
      <div className="text-xs font-extrabold uppercase text-white">{item.nome}</div>
      <div className="text-xs text-white/90">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</div>
    </Link>
  );
}

export default function ProdutoSenac() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Café Sesc", path: "/sesc" },
    { label: "Carrinho", path: "/carrinhoSenac" },
    { label: "Lanchonete", path: "/ProdutoSenac" },
    { label: "Sair", path: "/senac" },
  ];

  return (
    <div className="min-h-screen bg-[#FF7700] text-white">
      <SideMenu
        open={open}
        onClose={() => setOpen(false)}
        title="Café Senac"
        items={menuItems}
        accent="bg-[#ff6600]"
      />

      <header className="h-20 flex items-center px-5">
        <button
          onClick={() => setOpen(true)}
          className="text-white text-3xl px-3 py-2 rounded hover:bg-white/10"
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </header>

      <main className="px-6 pb-24 max-w-6xl mx-auto">
        {Object.keys(produtos).map((cat) => (
          <section key={cat} className="mb-12">
            <div className="flex justify-center mb-6">
              <div
                data-source="src/data/produtos.js"
                title={`categoria: ${cat} — definida em src/data/produtos.js`}
                className="bg-orange-500 w-28 sm:w-40 md:w-56 py-1 rounded-sm font-bold uppercase text-sm text-center"
              >
                {cat}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 items-start justify-items-center">
              {produtos[cat].map((item) => (
                <ProductTile key={item.id} item={item} store="senac" />
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
