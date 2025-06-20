import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
  const [rutaData, setRutaData] = useState(null);
  const [cierreRutaData, setCierreRutaData] = useState(null);

  // Función para obtener datos de la API de Ruta
  const fetchRutaData = async () => {
    try {
      const response = await fetch('http://localhost:3307/graficas/ruta');
      const data = await response.json();
      console.log('Ruta data (consola de validación):', data);

      // Acceder al primer objeto y convertir los valores a números
      const ruta = data[0];  // Accede al primer objeto dentro del array
      setRutaData({
        lps_totales: Number(ruta.lps_totales),  // Convertir a número
        remisiones_totales: Number(ruta.remisiones_totales),  // Convertir a número
      });
    } catch (error) {
      console.error('Error al obtener datos de Ruta:', error);
    }
  };

  // Función para obtener datos de la API de CierreRuta
  const fetchCierreRutaData = async () => {
    try {
      const response = await fetch('http://localhost:3307/graficas/cierre-ruta');
      const data = await response.json();
      console.log('CierreRuta data:', data);

      // Acceder al primer objeto y convertir los valores a números
      const cierreRuta = data[0];  // Accede al primer objeto dentro del array
      setCierreRutaData({
        lps_exitosos: Number(cierreRuta.lps_exitosos),  // Convertir a número
        lps_fallidos: Number(cierreRuta.lps_fallidos),  // Convertir a número
      });
    } catch (error) {
      console.error('Error al obtener datos de CierreRuta:', error);
    }
  };

  useEffect(() => {
    fetchRutaData();
    fetchCierreRutaData();
  }, []);

  if (!rutaData || !cierreRutaData) {
    return <div>Cargando datos...</div>; // Mostrar mensaje de carga mientras no se obtienen los datos
  }

  // Datos para el gráfico de Ruta (Pastel)
  const rutaChartData = {
    labels: ['LPs Totales', 'Remisiones Totales'],
    datasets: [
      {
        label: 'Datos de Ruta',
        data: [rutaData.lps_totales, rutaData.remisiones_totales],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de CierreRuta (Pastel)
  const cierreRutaChartData = {
    labels: ['LPs Exitosos', 'LPs Fallidos'],
    datasets: [
      {
        label: 'Datos de CierreRuta',
        data: [cierreRutaData.lps_exitosos, cierreRutaData.lps_fallidos],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Gráfica de LPs Totales y Remisiones</h2>
      <Pie data={rutaChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />

      <h2>Gráfica de LPs Exitosos y Fallidos</h2>
      <Pie data={cierreRutaChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default Graph;
