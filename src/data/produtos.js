export const produtos = {
  Comidas: [
    {
      id: "Misto-quente",
      nome: "Misto-quente",
      preco: 5,
      img: "../img/misto-quente.jpg",
    },
    {
      id: "Esfirra",
      nome: "Esfirra",
      preco: 5,
      img: "",
    },
    {
      id: "Pão de Queijo",
      nome: "Esfirra",
      preco: 4,
      img: "",
    }
  ],
  Bebidas: [
    {
      id: "Suco",
      nome: "Suco",
      preco: 4,
      img: "",
    },
    {
      id: "Café",
      nome: "Café",
      preco: 4,
      img: "",
    },
    {
      id: "Cappuccino",
      nome: "Cappuccino",
      preco: 4,
      img: "",
    },
    ],
    Sobremesas: [
      {
        id: "Salada de frutas",
        nome: "Salada de frutas",
        preco: 4,
        img: "",
        },
        {
          id: "Bolo",
          nome: "Bolo",
          preco: 4,
          img: "",
        },
        {
          id: "Pavê",
          nome: "Pávê",
          preco: 4,
          img: "",
        }

    ]
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
