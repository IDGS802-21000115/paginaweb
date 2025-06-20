import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <h1 className="header-title">Panel de Administración</h1>
      </div>
      <div className="header-right">
        <button className="logout-btn">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Header;
