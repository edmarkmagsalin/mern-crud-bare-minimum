require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const connectDB = require('./config/db')

const app = express()

// Initialize Middleware
app.use(express.json())

// Initialize session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Initialize passport and session
app.use(passport.initialize())
app.use(passport.session())

// Connect to database
connectDB()

// Define Routes
app.use('/auth', require('./routes/auth_passport'))
//app.use('/api/auth', require('./routes/auth'))
//app.use('/api/users', require('./routes/users'))
app.use('/api/items', require('./routes/items'))

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

// PORT assignment
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))