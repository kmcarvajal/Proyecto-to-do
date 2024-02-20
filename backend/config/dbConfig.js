const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'usbw',
  database: 'pagina',
  connectionLimit: 10,
});

module.exports = pool;
