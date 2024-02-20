import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import md5 from 'md5';
import axios from '../services/axiosConfig';
import './login.css';

function Login() {
  const [ndocumento, setNdocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleDocumentoChange = (event) => {
    setNdocumento(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Realiza una petición POST al backend para el login
      const response = await axios.post('/login', {
        ndocumento,
        contrasena,
      });
  
      // Verifica si el login fue exitoso
      if (response.data.success) {
        // Utilizando el estado para redirigir al usuario
        setRedirect(true);
      } else {
        alert('Documento o contraseña no coinciden :/');
      }
    } catch (error) {
      console.error('Error al realizar el login:', error);
      alert('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  // Si el estado de redirección es verdadero, redirigir al usuario
  if (redirect) {
    return <Navigate to="/Todo" />;
  }

  return (
    <div>
      <div id="fondo2">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <header>
              <legend><h1>Login</h1></legend>
              <nav>
                <Link to="/registro">Registrarte</Link>
              </nav>
            </header>
            <section id="contenido">
              <p>
                <label htmlFor="NúmeroDeDocumento"><strong>Número De Documento:</strong></label>
                <input type="text" id="ndocumento" name="ndocumento" maxLength={12} autoFocus placeholder="Ej: 1050782170" required value={ndocumento} onChange={handleDocumentoChange} />
                <br /><br />
                <label htmlFor="Contraseña"><strong>Contraseña:</strong></label>
                <input type="password" id="contrasena" name="contrasena" maxLength={8} autoFocus placeholder="Ej: Seguridad!" required value={contrasena} onChange={handleContrasenaChange} />
              </p>
            </section>
            <footer>
              <p>
                <input type="submit" id="enviar" value="Entrar" />
              </p>
            </footer>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Login;
