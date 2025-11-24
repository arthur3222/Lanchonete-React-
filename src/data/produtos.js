export const produtos = {
  Bebidas: [
    {
      id: "cafe",
      nome: "Café",
      preco: 5,
      descricao: "Café passado quente.",
      ingredientes: ["Água", "Pó de café"],
      img: "https://via.placeholder.com/300x200?text=Cafe",
    },
    {
      id: "suco-laranja",
      nome: "Suco de Laranja",
      preco: 8.5,
      descricao: "Suco natural de laranja.",
      ingredientes: ["Laranja"],
      img: "https://via.placeholder.com/300x200?text=Suco",
    },
  ],
  Lanches: [
    {
      id: "pao-queijo",
      nome: "Pão de Queijo",
      preco: 4,
      descricao: "Pão de queijo mineiro.",
      ingredientes: ["Queijo", "Polvilho"],
      img: "https://via.placeholder.com/300x200?text=Pao+de+Queijo",
    },
    {
      id: "mistao",
      nome: "Misto Quente",
      preco: 9,
      descricao: "Pão com queijo e presunto quente.",
      ingredientes: ["Pão", "Queijo", "Presunto"],
      img: "https://via.placeholder.com/300x200?text=Misto",
    },
  ],
};

export const produtosMap = Object.freeze(
  Object.values(produtos)
    .flat()
    .reduce((acc, p) => {
      if (p.id) acc[p.id] = p;
      return acc;
    }, {})
);

export function getProdutoById(id) {
  if (!id) return undefined;
  return produtosMap[id] || undefined;
}
