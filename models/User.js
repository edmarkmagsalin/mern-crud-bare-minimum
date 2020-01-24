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
UserSchema.plugin(passportLocalMongoose)
UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('user', UserSchema)