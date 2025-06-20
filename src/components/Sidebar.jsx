import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/usuarios', label: 'Usuarios' },
    { path: '/graph', label: 'Gráficas' },
    { path: '/operador', label: 'Operador' },
    { path: '/reporte', label: 'Reporte' },
  ];

  return (
    <div className="sidebar" style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
      {/* Imagen del camión */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img src="/img/camion.png" alt="Camión" style={{ width: '80px' }} />
      </div>

      {/* Imagen del logo de letras */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src="/img/logo-letras.png" alt="Logo letras" style={{ width: '100px' }} />
      </div>

      <ul className="sidebar-menu" style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map(item => (
          <li key={item.path} style={{ marginBottom: '1rem' }}>
            <Link
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              style={{
                textDecoration: 'none',
                color: location.pathname === item.path ? '#007bff' : '#333',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
