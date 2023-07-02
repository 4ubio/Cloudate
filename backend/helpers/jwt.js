const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (uid, name, photoURL) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name, photoURL};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Cant create token');
            }
            resolve(token);
        });
    })
}

module.exports = {generateJWT};