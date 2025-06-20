import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Usuarios.css';

// Importando íconos de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Obtener los usuarios desde la API
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3307/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-container">
      <h2 className="usuarios-title">Lista de Usuarios</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <button className="btn-editar">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn-eliminar">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
