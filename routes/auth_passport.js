require('dotenv').config()
const express = require('express')
const passport = require('passport')
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User');

// create strategy for local authentication????
passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
    done(null, user.id)
})
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

// @route  POST
// @desc   Register user
// @access Public
router.post('/register',
[
    check('firstname', 'Please add first name').not().isEmpty(),
    check('lastname', 'Please add last name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res) => {

    const errors = validationResult(req);
    //console.log(errors)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { firstname, lastname, email, password } = req.body

    try {
        User.register(new User({firstname, lastname, username: email}), password, (err,user) => {
            if(err) {
                console.log(err)
            } else {
                passport.authenticate('local')
                
                // BEGIN get the jsonWebToken using user id after registering
                const payload = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(payload,
                process.env.JWT_SECRET,
                { expiresIn: 360000 },
                (error, token) => {
                    if(error) throw error;
                    res.json({ token });
                });
                // END
            }
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;