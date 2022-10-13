const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const getDb = require('../conection').getDb;

const agentSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {                 //Saleried || Commision 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Agent',agentSchema);
// after user fills up this form a mail will be sent to admin where he can aproove the details
// after admin aprooves the details depending on the details furthe steps will open 
