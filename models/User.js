const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Plugins
// use passport-local-mongoose
UserSchema.plugin(passportLocalMongoose)
// implement findOrCreate
UserSchema.plugin(findOrCreate)

module.exports = new mongoose.model('user', UserSchema)