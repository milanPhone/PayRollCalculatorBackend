const express = require('express');
const salesController = require('../controllers/salesController');
const userAuth = require('../middlewares/userAuth');
const Router = express.Router();

Router.post('/add-sale',userAuth,salesController.AddSale)
Router.get('/get-sales',salesController.getSales);
Router.get('/get-sale-by-id/:_id',salesController.getSaleById);
Router.post('/edit-sale',userAuth,salesController.editSale);
Router.post('/search-sales',salesController.searchSales)
module.exports = Router