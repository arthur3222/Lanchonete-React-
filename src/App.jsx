import React from "react";
import { Routes, Route } from "react-router-dom";
import Pedidos from "./pages/pedidos";

// App não é mais usado; as rotas estão em src/main.jsx
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </>
  );
}
