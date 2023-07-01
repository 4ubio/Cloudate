const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt')

const createUser = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        //Verify if email already exists
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                ok:false,
                msg: 'Email already exists'
            })
        }

        //Continue creating
        user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Create user
        await user.save();
        
        //Create JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true, 
            uid: user.id,
            name: user.name,
            photoURL: user.photoURL,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Please contact the admin'
        })
    }
}

const loginUser = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        //Verify if email exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                ok:false,
                msg: 'Email doesnt exists'
            })
        }

        //Check passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Invalid password'
            })
        }

        //Create JWT
        const token = await generateJWT(user.id, user.name);

        //Continue login
        res.status(201).json({
            ok: true, 
            uid: user.id,
            name: user.name,
            photoURL: user.photoURL,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Please contact the admin'
        })
    }
}

const revalidateToken = async(req, res = response) => {
    const {uid, name, photoURL} = req;

    //Create JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        photoURL,
        token
    })
}

module.exports = {
    createUser,
    loginUser, 
    revalidateToken,
};