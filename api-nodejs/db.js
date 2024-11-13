const mysql = require('mysql2/promise');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('./config');
// se setea las credenciales de la bd
const db = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
}

// se crea la conexion
const connection = mysql.createPool(db);

module.exports = connection;
