CREATE DATABASE IF NOT EXISTS api_nodejs;

use api_nodejs;

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY  NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(200) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
