const {
    Request,
    Response
} = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('../../db');
const jwt = require('../helpers/jwt');

const userController = {

    // método de autenticación 
    login: async (req, res) => {
        let data = req.body;
        try {
            const query = `SELECT * FROM users WHERE email = '${data.email}';`;
            let [reg] = await connection.query(query);

            console.log(reg);

            if (reg.length <= 0) {
                res.status(401).send({
                    data: undefined,
                    message: 'Datos incorrectos',
                });
                return;
            }

            let user = reg[0];
            bcrypt.compare(data.password, user.password, async function (err, result) {
                if (!result) {
                    res.status(401).send({
                        message: 'Credenciales incorrectas',
                        data: undefined
                    });
                    return;
                }

                res.status(200).send({
                    data: {
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        created_at: user.created_at
                    },
                    token: jwt.createToken(user)
                });
            });
        } catch (err) {
            res.status(500).send({
                message: err
            });
        }
    },

    // método de registro de usuario
    register: async (req, res) => {
        let data = req.body;
        try {
            const query_email = `SELECT name FROM users WHERE email = '${data.email}';`;
            const [reg_email] = await connection.query(query_email);

            if (reg_email.length > 0) {
                res.status(401).send({
                    data: reg_email,
                    message: 'El email ya está asociado a una cuenta'
                });
                return;
            }

            if (!data.password) {
                res.status(401).send({
                    message: 'No hay una contraseña',
                    data: undefined
                });
                return;
            }

            bcrypt.hash(data.password, saltRounds, async function (err, hash) {
                if (!hash) {
                    res.status(500).send({
                        message: 'ErrorServer',
                        data: undefined
                    });
                    return;
                }

                data.password = hash;
                const query = `INSERT INTO users (id_user, name, surname, email, password) 
                        VALUES (NULL, '${data.name}', '${data.surname}','${data.email}','${data.password}');`;
                const [reg] = await connection.query(query);

                res.status(201).send({
                    data: reg,
                    status: 'success'
                });

            });
        } catch (err) {
            res.status(500).send({
                message: err
            });
        }
    },
}

module.exports = userController;