import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../services/axiosConfig';
import './login.css';

function Register() {
  const navigate = useNavigate(); // Crea una instancia de useNavigate
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tdocumento: "",
    ndocumento: "",
    fecha: "",
    edad: "",
    contacto: "",
    ncontacto: "",
    contrasena: "",
    ccontrasena: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación del formulario aquí
    if (formData.contrasena !== formData.ccontrasena) {
      alert("Las contraseñas no coinciden!");
      return;
    }

    // Envío del formulario a través de la API de Fetch o similar
    try {
      // Realiza una petición POST al backend para el registro
      const response = await axios.post('/registro', {
        nombre: formData.nombre,
        apellido: formData.apellido,
        tdocumento: formData.tdocumento,
        ndocumento: formData.ndocumento,
        fecha: formData.fecha,
        edad: formData.edad,
        contacto: formData.contacto,
        ncontacto: formData.ncontacto,
        contrasena: formData.contrasena,
      });

      // Verifica si el registro fue exitoso
      if (response.data.success) {
        alert('Usuario registrado correctamente!');
        navigate('/'); // Utiliza navigate para redirigir al login
      } else {
        alert('Error al registrar el usuario :/');
      }
    } catch (error) {
      console.error('Error al realizar el registro:', error.response ? error.response.data : error.message);
      alert('Ocurrió un error al intentar registrar el usuario.');
    }
    
  };

  const calculaEdad = (fecha) => {
    const fec = new Date(fecha);
    const hoy = new Date();
    const edad = parseInt((hoy - fec) / 365 / 24 / 60 / 60 / 1000);
    return edad;
  };

  return (
    <div id="fondo">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <header>
            <legend><h1>Regístrate!</h1></legend>
            <nav>
              <Link to="/">Iniciar sesión</Link>
            </nav>
          </header>
          <section id="contenido">
            <p>
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Luis" required /> &nbsp;&nbsp;&nbsp;
              <label htmlFor="apellido">Apellido:</label>
              <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Ej: Quintero" required />
            </p>
            <p>
              <label htmlFor="TipoDeDocumento">Tipo De Documento:</label>
              <select id="tdocumento" name="tdocumento" value={formData.tdocumento} onChange={handleChange}>
                <option>TI</option>
                <option>CC</option>
                <option>CE</option>
              </select> &nbsp;&nbsp;&nbsp;
              <label htmlFor="NúmeroDeDocumento">Número De Documento:</label>
              <input type="number" id="ndocumento" name="ndocumento" value={formData.ndocumento} onChange={handleChange} placeholder="Ej: 1050782170" required />
            </p>
            <p>
              <label htmlFor="FechaDeNacimiento">Fecha De Nacimiento:</label>
              <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} onBlur={(e) => { const edad = calculaEdad(e.target.value); setFormData({ ...formData, edad }); }} required /> &nbsp;&nbsp;&nbsp;
              <label htmlFor="Edad">Edad:</label>
              <input type="number" id="edad" name="edad" value={formData.edad} disabled />
            </p>
            <p>
              <label htmlFor="Contacto">Contacto:</label>
              <label><input type="radio" name="contacto" value="telefono" onChange={handleChange} checked={formData.contacto === "telefono"} /><small><small>Telefono</small></small></label> &nbsp;&nbsp;&nbsp;
              <label><input type="radio" name="contacto" value="celular" onChange={handleChange} checked={formData.contacto === "celular"} /><small><small>Celular</small></small></label> &nbsp;&nbsp;&nbsp;
              <label htmlFor="NúmeroDeContacto">Número De Contacto:</label>
              <input type="number" id="ncontacto" name="ncontacto" value={formData.ncontacto} onChange={handleChange} placeholder="Ej: 3208075250" required />
            </p>
            <p>
              <label htmlFor="Contraseña">Contraseña:</label>
              <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Ej: Seguridad!" required /> &nbsp;&nbsp;&nbsp;
              <label htmlFor="ConfirmarContraseña">Confirmar Contraseña:</label>
              <input type="password" id="ccontrasena" name="ccontrasena" value={formData.ccontrasena} onChange={handleChange} placeholder="Ej: Seguridad!" required />
            </p>
          </section>
          <footer>
            <p>
              <input type="submit" value="Enviar" />
            </p>
          </footer>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
