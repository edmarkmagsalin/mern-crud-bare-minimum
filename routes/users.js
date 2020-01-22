require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route  POST api/users
// @desc   Register user
// @access Public
router
.post('/',
[
    check('firstname', 'Please add first name').not().isEmpty(),
    check('lastname', 'Please add last name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res)=>{
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { firstname, lastname, email, password } = req.body;

    try {

        // Check if the email already exist in the database
        let user = await User.findOne({ email });

        if(user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({
            firstname,
            lastname,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save to database
        await user.save();

        // BEGIN get the jsonWebToken using user id after registering
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt
        .sign(payload, process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (error, token) => {
            if(error) throw error;
            res.json({ token });
        });
        // END

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

// @route  DELETE api/users
// @desc   Delete user 
// @access Private 
router.delete('/:id', auth, async (req, res) => {
    try {
        // create user object using the id params
        const user = await User.findById(req.params.id);

        // return error if id not found in the database
        if(!user) return res.status(404).json({ msg: 'User does not exist' });

        // check if the id matches the logged in user's id
        if(req.user.id !== req.params.id) return res.status(401).json({ msg: 'Not authorized' });
        
        // delete user in the database
        await User.findByIdAndRemove(req.params.id);
 
        res.status(400).json({ msg: 'You deleted your account' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;