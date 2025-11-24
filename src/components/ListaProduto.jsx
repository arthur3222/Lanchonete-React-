import React from "react";
import { CardProduto } from "./Produto";

export default function ListaProdutos({ categoria, itens }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.tituloSecao}>{categoria}</h3>
      <div style={styles.linhaCards}>
        {itens.map((item, i) => (
          <CardProduto
            key={i}
            img={item.img}
            nome={item.nome}
            preco={item.preco}
            produtoId={item.id || item.productId}
            store={item.store}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { marginBottom: 20 },
  tituloSecao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    margin: "10px 0 10px 20px",
  },
  linhaCards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4%",
    justifyContent: "space-evenly",
  },
};
