const {Router} = require('express');
const router = Router();

const {check} = require('express-validator');

const {createUser, loginUser, createUserWithGoogle, loginUserWithGoogle, revalidateToken} = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

//Create user
router.post(
    '/new',                                                                                     //Route
    [                                                                                           //Validations
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to have at least 8 characters').isLength({min: 8}),
        check('photoURL', 'Photo is required').not().isEmpty(),
        validateFields                                                                          //Check if all validations passed
    ], 
    createUser                                                                                  //Execute
);

//Create user with Google
router.post(
    '/new-google',                                                                                     
    [                                                                                           
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('photoURL', 'Photo is required').not().isEmpty(),
        validateFields                                                                          
    ], 
    createUserWithGoogle                                                                                  
);

//Login user
router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password need to have at least 8 characters').isLength({min: 8}),
        validateFields
    ],
    loginUser
);

//Login user with Google
router.post(
    '/google', 
    [
        check('email', 'Email is required').isEmail(),
        validateFields
    ],
    loginUserWithGoogle
);

//Revalidate user JWT
router.get('/renew', validateJWT, revalidateToken);

module.exports = router;