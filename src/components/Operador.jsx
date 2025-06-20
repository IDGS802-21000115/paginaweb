import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Operador.css';

function Operador() {
  const [vehiculos, setVehiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    id_usuario: '',
    id_propio: '',
    tipo: '',
    marca: '',
    modelo: '',
    anio: '',
    ubicacion: '',
    color: '',
    transmision: '',
    numero_serie: '',
    numero_motor: '',
    placas: '',
    cuenta_seguro: '',
    aseguradora: '',
    fecha_inicio_seguro: '',
    fecha_vencimiento_seguro: ''
  });

  useEffect(() => {
    fetchVehiculos();
    fetchUsuarios();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const res = await axios.get('http://localhost:3307/vehiculos');
      setVehiculos(res.data);
    } catch (err) {
      console.error('Error al obtener vehículos', err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3307/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios', err);
    }
  };

  const eliminarVehiculo = async (id) => {
    if (!window.confirm('¿Seguro que deseas desactivar este vehículo?')) return;
    try {
      await axios.delete(`http://localhost:3307/vehiculos/${id}`);
      fetchVehiculos();
    } catch (err) {
      console.error('Error al eliminar', err);
    }
  };

  const handleChange = (e) => {
    setNuevoVehiculo({ ...nuevoVehiculo, [e.target.name]: e.target.value });
  };

  const agregarVehiculo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3307/vehiculos', nuevoVehiculo);
      setNuevoVehiculo({
        id_usuario: '', id_propio: '', tipo: '', marca: '', modelo: '', anio: '',
        ubicacion: '', color: '', transmision: '', numero_serie: '', numero_motor: '',
        placas: '', cuenta_seguro: '', aseguradora: '', fecha_inicio_seguro: '', fecha_vencimiento_seguro: ''
      });
      setShowModal(false);
      fetchVehiculos();
    } catch (err) {
      console.error('Error al agregar vehículo', err);
    }
  };

  return (
    <div className="operador-container">
      <header>
        <h1>🚗 Gestión de Vehículos</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Agregar Vehículo</button>
      </header>

      <table className="vehiculo-tabla">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Usuario</th>
            <th>Placas</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.id_vehiculo}>
              <td>{v.modelo}</td>
              <td>{v.usuario || 'N/A'}</td>
              <td>{v.placas}</td>
              <td><span className={`badge ${v.status === 1 ? 'activo' : 'inactivo'}`}>{v.status === 1 ? 'Activo' : 'Inactivo'}</span></td>
              <td>
                <button className="btn-delete" onClick={() => eliminarVehiculo(v.id_vehiculo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Agregar Vehículo</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={agregarVehiculo} className="form-grid">
              <select name="id_usuario" value={nuevoVehiculo.id_usuario} onChange={handleChange} required>
                <option value="">Seleccionar Usuario</option>
                {usuarios.map((u) => (
                  <option key={u.id_usuario} value={u.id_usuario}>{u.nombre}</option>
                ))}
              </select>
              <input name="id_propio" placeholder="ID Propio" value={nuevoVehiculo.id_propio} onChange={handleChange} required />
              <input name="tipo" placeholder="Tipo" value={nuevoVehiculo.tipo} onChange={handleChange} required />
              <input name="marca" placeholder="Marca" value={nuevoVehiculo.marca} onChange={handleChange} required />
              <input name="modelo" placeholder="Modelo" value={nuevoVehiculo.modelo} onChange={handleChange} required />
              <input type="number" name="anio" placeholder="Año" value={nuevoVehiculo.anio} onChange={handleChange} />
              <input name="ubicacion" placeholder="Ubicación" value={nuevoVehiculo.ubicacion} onChange={handleChange} />
              <input name="color" placeholder="Color" value={nuevoVehiculo.color} onChange={handleChange} />
              <input name="transmision" placeholder="Transmisión" value={nuevoVehiculo.transmision} onChange={handleChange} />
              <input name="numero_serie" placeholder="Número de Serie" value={nuevoVehiculo.numero_serie} onChange={handleChange} />
              <input name="numero_motor" placeholder="Número de Motor" value={nuevoVehiculo.numero_motor} onChange={handleChange} />
              <input name="placas" placeholder="Placas" value={nuevoVehiculo.placas} onChange={handleChange} required />
              <input name="cuenta_seguro" placeholder="Cuenta de Seguro" value={nuevoVehiculo.cuenta_seguro} onChange={handleChange} />
              <input name="aseguradora" placeholder="Aseguradora" value={nuevoVehiculo.aseguradora} onChange={handleChange} />
              <input type="date" name="fecha_inicio_seguro" value={nuevoVehiculo.fecha_inicio_seguro} onChange={handleChange} />
              <input type="date" name="fecha_vencimiento_seguro" value={nuevoVehiculo.fecha_vencimiento_seguro} onChange={handleChange} />
              <button type="submit" className="btn-primary">Guardar Vehículo</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Operador;
