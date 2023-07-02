const {response} = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateJWT = (req, res = response, next) => {
    //Request on x-tokens headers
    const token = req.header('x-token');
    if(!token) {                            //If there arent any token provided, return
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        })
    }

    //If not, continue validating
    try {
        const {uid, name, photoURL} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );
        req.uid = uid;
        req.name = name;
        req.photoURL = photoURL;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }
    next();
}

module.exports = {validateJWT};