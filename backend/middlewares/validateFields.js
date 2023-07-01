const {response} = require('express');
const {validationResult} = require('express-validator');

const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {                 //If there are any error in validations, return
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();                                 //If not, continue
}

module.exports = {validateFields};