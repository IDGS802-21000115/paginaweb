import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Operador from './components/Operador';
import Layout from './components/Layout';
import Graph from './components/Graph';
import Usuarios from './components/Usuarios';
import Reporte from './components/Reporte';

function Admin() {
  return <h1>Bienvenido, Administrador</h1>;
}

function Encargado() {
  return <h1>Bienvenido, Encargado</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login sin layout */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas o de usuarios con layout */}
        <Route path="/operador" element={<Layout><Operador /></Layout>} />
        <Route path="/graph" element={<Layout> <Graph></Graph>    </Layout>} />
        <Route path="/usuarios" element={<Layout> <Usuarios></Usuarios>   </Layout>} />
        <Route path="/reporte" element={<Layout> <Reporte></Reporte>  </Layout>} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/encargado" element={<Encargado />} />
      </Routes>
    </Router>
  );
}

export default App;
