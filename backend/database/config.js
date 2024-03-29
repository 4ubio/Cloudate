const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cloudate.6v9kxrl.mongodb.net/cloudate`);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error loading database');
    }
}

module.exports = {dbConnection};