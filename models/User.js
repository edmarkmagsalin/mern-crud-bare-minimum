const  mongoose = require('mongoose')
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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        unique: true
    },
    facebookId: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Plugins
// use passport-local-mongoose
userSchema.plugin(passportLocalMongoose)
// implement findOrCreate
userSchema.plugin(findOrCreate)

module.exports = mongoose.model('user', UserSchema)