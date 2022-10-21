const errorHandlingFunction = require('../util/errorHandlingFunction')
const User = require('../models/Agents/Agent');
const jwt = require('jsonwebtoken');

const userAuth = (req,res,next)=>{
    let decodedToken = null;
    const token = req.get('Authorization').split(' ')[1];
    console.log('token-----',token);
    try {
        if(req.get('Authorization')){
            decodedToken = jwt.verify(token,'meraSecret')
        }
        else{
            const error = new Error();
            error.message = 'no authorization token send'
            error.statusCode = 401;
            throw error;
        }
        if(!decodedToken){
            console.log('invalid token')
            const error = new Error();
            error.message = 'invalid Token'
            error.statusCode = 401;
            throw error;
        }
        req.user_id = decodedToken.user_id;
        req.uer_email = decodedToken.user_email;
        next();
        
    }
    catch(err){
        //err.statusCode(500);
        errorHandlingFunction(err,res);
    }
    
}

module.exports = userAuth;