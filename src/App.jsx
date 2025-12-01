<<<<<<< HEAD
import UploadImage from "./UploadImage";

function App() {
  return (
    <div>
      <UploadImage />
    </div>
=======
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
>>>>>>> 223ed2eb9cba02cfdf0ff53711b4acee8a3b373d
  );
}

export default App;
