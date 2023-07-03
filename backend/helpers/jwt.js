const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (uid, name, photoURL) => {
    return new Promise((resolve, reject) => {
        const payload = {uid, name, photoURL};              //Data stored in JWT
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {    //Create JWT
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Can´t create token');
            }
            resolve(token);
        });
    })
}

module.exports = {generateJWT};