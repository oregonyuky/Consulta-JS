import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../views/ConsultaHome";
import Consultas from "../views/ConsultaDetalhes";
import PacientesManager from "../views/PacienteManager";
import PacienteCadastro from "../views/PacienteCadastro";
import PacienteEditar from "../views/PacienteEditar";

export default function Rotas()
{
    return (
        <Router>
            <Routes>

                {}
                <Route path="/" element={<Home />} />
                <Route path="/formulario" element={<Consultas />} />
                <Route path="/formulario/:idC" element={<Consultas />} />

                {}
                <Route path="/pacientes" element={<PacientesManager />} />
                <Route path="/pacientes/novo" element={<PacienteCadastro />} />
                <Route path="/pacientes/:id" element={<PacienteEditar />} />

            </Routes>
        </Router>
    );
}