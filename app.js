const http = require('http');
const path = require('path');
const express = require('express');

// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const myConnect = require('./connection').myConnect;
const getDb = require('./connection').getDb;
const app = express();
const server = http.createServer(app);

const agentRoutes = require('./routes/agentRoutes')
const salesRoutes = require('./routes/salesRoutes')
const cors = require('cors');

myConnect(()=>{
    server.listen(5000,()=>{
                    console.log('server connected on port 5000')
                })
    
})


app.set('view engine','ejs');
app.use(cors());
app.use(bodyParser.json());


app.use('/api/agent',agentRoutes)
app.use('/api/sales',salesRoutes)
