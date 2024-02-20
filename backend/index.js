const express = require('express');
const pool = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Rutas de autenticación
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
