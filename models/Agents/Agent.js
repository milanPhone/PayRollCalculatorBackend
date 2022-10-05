const mongoose = require('mongoose');
const schema = mongoose.Schema;

// const getDb = require('../conection').getDb;

const Agent = new Schema({

    name: {
        type: 'string',
        required: true
    },
    role: {                 //Saleried || Commision || admin
        type: 'string',
        required: true
    }
})
