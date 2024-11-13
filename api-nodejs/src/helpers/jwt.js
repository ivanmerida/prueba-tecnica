'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'pruebatecnicadenodejs2024';

exports.createToken = function (user) {
    const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }

    return jwt.encode(payload, secret);
}