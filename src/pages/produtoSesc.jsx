import React, { useState } from "react";
import { produtos } from "../data/produtos";
import SideMenu from "../components/SideMenu";
import { Link } from "react-router-dom";


function ProductTile({ item, store = "sesc" }) {
  return (
    <Link to={`/produto/${item.id}?store=${store}`} className="flex flex-col items-center gap-2 text-center">
      {/* imagem responsiva: um pouco maior em md/lg para caber 4 colunas */}
      <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-sm overflow-hidden flex items-center justify-center shadow-sm">
        <img src={item.img} alt={item.nome} className="w-full h-full object-cover" />
      </div>
      <div className="text-xs font-extrabold uppercase text-white">{item.nome}</div>
      <div className="text-xs text-white/90">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</div>
    </Link>
  );
}

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
<<<<<<< HEAD
          className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-md border border-white/20 bg-black/20 hover:bg-black/30"
=======
          className="text-white text-3xl px-3 py-2 rounded hover:bg-white/10"
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
          aria-label="Abrir menu"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
<<<<<<< HEAD
        <h1 className="ml-14 text-2xl font-extrabold tracking-wide">Lanchonete</h1>
=======
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
      </header>

      <main className="px-6 pb-24 max-w-6xl mx-auto">
        {Object.keys(produtos).map((cat) => (
          <section key={cat} className="mb-12">
            {/* A string da categoria (ex.: "Bebidas") vem de src/data/produtos.js */}
            <div className="flex justify-center mb-6">
              {/* banner com largura alinhada aos tiles: w-28 (mobile) / sm:w-40 / md:w-56 */}
              <div
                data-source="src/data/produtos.js"
                title={`categoria: ${cat} — definida em src/data/produtos.js`}
                className="bg-orange-500 w-28 sm:w-40 md:w-56 py-1 rounded-sm font-bold uppercase text-sm text-center"
              >
                {cat}
              </div>
            </div>

            {/* grid responsivo: 1 / 2 / 3 colunas (sempre até 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8 items-start justify-items-center">
              {produtos[cat].map((item) => (
                <ProductTile key={item.id} item={item} store="sesc" />
              ))}
            </div>
          </section>
        ))}
      </main>

<<<<<<< HEAD
      <Link
        to="/lojasesc"
        className="fixed bottom-5 left-5 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold hover:bg-white/20"
        aria-label="Voltar para Lojas Sesc"
      >
        voltar
      </Link>
=======
<<<<<<< HEAD
       <Link
         to="/"
         className="fixed bottom-5 left-5 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold"
       >
         voltar
       </Link>
     </div>
   );
 }
=======
      <div className="fixed bottom-5 left-5 bg-white/15 border border-white/30 text-white px-4 py-2 rounded backdrop-blur-sm text-sm font-semibold">voltar</div>
>>>>>>> 4f30d0a141c3979a641ffe170faf928129f8962d
    </div>
  );
}
>>>>>>> 874833380f9ad48a5e7fa4d6fe9647e539ea745e
