const express = require('express');
const Router = express.Router();

const agentController = require('../controllers/agentController');
const userAuth = require('../middlewares/userAuth');


Router.post('/add-agent',userAuth,agentController.addAgent);
Router.post('/login',agentController.loginAgent);



module.exports = Router