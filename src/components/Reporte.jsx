import React, { useState } from 'react';
import axios from 'axios';

function Reporte() {
  const [fecha, setFecha] = useState('');
  const [datos, setDatos] = useState([]);

  const obtenerDatos = async () => {
    if (!fecha) return alert('Selecciona una fecha');

    try {
      const response = await axios.get(`http://localhost:3307/ruta-por-fecha?fecha=${fecha}`);
      setDatos(response.data);
    } catch (err) {
      alert('Error al obtener datos: ' + (err.response?.data?.error || err.message));
    }
  };

  const descargarExcel = async () => {
    try {
      const response = await axios.get(`http://localhost:3307/exportar-ruta?fecha=${fecha}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ruta_${fecha}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert('Error al descargar archivo: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2>Reporte de Rutas por Fecha</h2>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <button onClick={obtenerDatos}>Buscar</button>

      {datos.length > 0 && (
        <>
          <table border="1" cellPadding="5" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Número Ruta</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>LPs Totales</th>
                <th>Remisiones Totales</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((ruta) => (
                <tr key={ruta.id_ruta}>
                  <td>{ruta.id_ruta}</td>
                  <td>{ruta.numero_ruta}</td>
                  <td>{ruta.tipo_ruta}</td>
                  <td>{ruta.categoria_ruta}</td>
                  <td>{ruta.lps_totales}</td>
                  <td>{ruta.remisiones_totales}</td>
                  <td>{ruta.fecha_registro}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={descargarExcel} style={{ marginTop: '15px' }}>
            Descargar Excel
          </button>
        </>
      )}
    </div>
  );
}

export default Reporte;
