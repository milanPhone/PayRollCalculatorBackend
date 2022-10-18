const express = require('express');
const salesController = require('../controllers/salesController');
const Router = express.Router();

Router.post('/add-sale',salesController.AddSale)

module.exports = Router