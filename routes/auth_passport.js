require('dotenv').config()
const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

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
async (req, res)=>{
    User.register({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, }, req.body.password, (err,user) => {
        if(err) {
            console.log(err)
        } else {
            passport.authenticate('local')
        }
    })
})

// @route  POST
// @desc   Login user
// @access Public
router.post('/login',
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    req.login(user, (err) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local',
            { failureRedirect: '/login' })
        }
    })
})

module.exports = router;