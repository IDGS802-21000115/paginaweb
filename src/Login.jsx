import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de importar el CSS

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3307/login', { usuario, contrasena });
      const { tipo } = res.data;
      if (tipo === 'Administrador') navigate('/admin');
      else if (tipo === 'Encargado') navigate('/encargado');
      else if (tipo === 'Operador') navigate('/operador');
      else setError('Tipo de usuario no reconocido');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <input
            type="text"
            id="usuario"
            placeholder=" "
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <label htmlFor="usuario">Usuario</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            id="contrasena"
            placeholder=" "
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <label htmlFor="contrasena">Contraseña</label>
        </div>

        <button type="submit">Ingresar</button>

        <div className="register-link">
          ¿No tienes una cuenta?{' '}
          <a href="#">Regístrate</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
