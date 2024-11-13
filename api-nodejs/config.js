
// Configuración de credenciales de la base de datos
var Config = {
    PORT: process.env.PORT || 3900,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'api_nodejs',
    DB_PORT: process.env.DB_PORT || 3306,
}

module.exports = Config;