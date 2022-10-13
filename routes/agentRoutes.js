const express = require('express');
const Router = express.Router();

const agentController = require('../controllers/agentController')


Router.post('/add-agent',agentController.addAgent);
Router.get('/login',agentController.loginAgent);



module.exports = Router