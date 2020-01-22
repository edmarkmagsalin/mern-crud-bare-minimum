require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('MongoDB Connected...')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB