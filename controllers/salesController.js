const Sales = require('../models/Sales/Sales')
const Agent = require('../models/Agents/Agent');
const errors = require('../util/errors');
const messages = require('../util/messages');
const errorHandlingFunction = require('../util/errorHandlingFunction');
const salesController = {

   async AddSale(req,res,next){
        try{
            let reqAgent = await Agent.findOne({email: req.body.Agent_Email})
            if(!reqAgent){
                let error = new Error();
                error.message = errors.AgentNotFound
                throw error;
            }
            let newSales = new Sales({
                ...req.body,
                Agent_id: reqAgent._id
            
            })
            const savedSale = await newSales.save()
            console.log('savedSale----',savedSale);
            res.status(201).json({
                ...savedSale._doc,
                message: messages.saleAdded
            })
            
        }
        catch(err){
            console.log('err---',err)
            errorHandlingFunction(err,res);
        }
   }
}

module.exports = salesController