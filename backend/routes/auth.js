const {Router} = require('express');
const router = Router();

const {check} = require('express-validator');

const {createUser, loginUser, revalidateToken} = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

//Create user
router.post(
    '/new',                                                                                     //Route
    [                                                                                           //Validations
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('photoURL', 'Photo is required').not().isEmpty(),
        //check('password', 'Password is required').not().isEmpty(),
        validateFields                                                                          //Check if all validations passed
    ], 
    createUser                                                                                  //Execute
);

//Login user
router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('email', 'Email is required').isEmail(),
        //check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    loginUser
);

//Revalidate user JWT
router.get('/renew', validateJWT, revalidateToken);

module.exports = router;