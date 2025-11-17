import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// páginas
import Home from "./pages/home";
import SescEscolha from "./pages/sescEscolha";
import SescLogin from "./pages/sescLogin";
import SescCadastro from "./pages/sescCadastro";
import SenacEscolha from "./pages/senacEscolha";
import SenacLogin from "./pages/senacLogin";
import SenacCadastro from "./pages/senacCadastro";
import Lojas from "./pages/lojasesc";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sesc" element={<SescEscolha />} />
        <Route path="/sesc/login" element={<SescLogin />} />
        <Route path="/sesc/cadastro" element={<SescCadastro />} />
        <Route path="/senac" element={<SenacEscolha />} />
        <Route path="/senac/login" element={<SenacLogin />} />
        <Route path="/senac/cadastro" element={<SenacCadastro />} />
        <Route path="/lojas" element={<Lojas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
