const pool = require('../config/dbConfig');
const md5 = require('md5');

const loginUser = async (req, res) => {
  const { ndocumento, contrasena } = req.body;
  const contrasenaCifrada = md5(contrasena);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    const query = 'SELECT * FROM usuario WHERE Ndocumento = ? AND Contrasena = ?';

    connection.query(query, [ndocumento, contrasenaCifrada], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al ejecutar la consulta de login:', error);
        res.status(500).send('Error interno del servidor');
        return;
      }

      if (results.length > 0) {
        // Login exitoso
        res.json({ success: true, user: results[0] });
      } else {
        // Usuario no encontrado o contraseña incorrecta
        res.json({ success: false });
      }
    });
  });
};

const registerUser = async (req, res) => {
  const { nombre, apellido, tdocumento, ndocumento, fecha, edad, contacto, ncontacto, contrasena } = req.body;

  try {
    // Intenta realizar la inserción en la base de datos
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener la conexión:', err);
        res.status(500).send('Error interno del servidor');
        return;
      }

      const contrasenaCifrada = md5(contrasena); // Cifra la contraseña antes de almacenarla

      const query = 'INSERT INTO usuario (Nombre, Apellido, Tdocumento, Ndocumento, Fnacimiento, Edad, Tcontacto, Ncontacto, Contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

      connection.query(query, [nombre, apellido, tdocumento, ndocumento, fecha, edad, contacto, ncontacto, contrasenaCifrada], (error) => {
        connection.release();

        if (error) {
          console.error('Error al ejecutar la consulta de registro:', error);
          res.status(500).json({ success: false, message: 'Ocurrió un error al intentar registrar el usuario' });
          return;
        }

        res.json({ success: true, message: 'Usuario registrado correctamente' });
      });
    });
  } catch (error) {
    console.error('Error al realizar el registro:', error);
    res.status(500).json({ success: false, message: 'Ocurrió un error al intentar registrar el usuario' });
  }
};

module.exports = { loginUser, registerUser };
