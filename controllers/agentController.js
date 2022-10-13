const Agent = require('../models/Agents/Agent');
const SalariedAgent = require('../models/Agents/SalariedAgent')
const errors = require('../util/errors');
const errorHanlingFunction = require('../util/errorHandlingFunction');
const bcrypt = require("bcrypt");

const agentController = {

    async addAgent(req,res,next){
        try{

            let agentExist = Agent.findOne({email: req.body.email})
            if(agentExist){
                let error = new Error();
                error.message = errors.sameMailError;
            }
            const agentData = {
                email: req.body.email,
                name: req.body.name,
                role: req.body.role,
                password: bcrypt.hashSync(req.body.password, 12)         
            }
            const newAgent = new Agent(agentData);
            let  savedAgent = await newAgent.save()
            savedAgent = savedAgent._doc
            savedAgent.agentId = savedAgent._id
            delete savedAgent._id;
            delete savedAgent.password;
            delete savedAgent.__v;
    
            if(req.body.role=='salaried'){
                const SalariedAgentData = {
                    agentId: savedAgent.agentId,
                    basicSalary: req.body.basicSalary
                }
                var newSalariedAgent = new SalariedAgent(SalariedAgentData)
                var savedSalariedAgent = await newSalariedAgent.save();
                savedSalariedAgent = savedSalariedAgent._doc;
                delete savedSalariedAgent._id;
                delete savedSalariedAgent.__v;
                var result = {
                    message: 'agent Added sucsessfully...!!',
                    agentData: {
                        ...savedAgent,
                        ...savedSalariedAgent                                       
                    }
                }
            }
            else if(req.body.role=='commisioned'){
    
            }
            res.status(201).json(result);
        }
        catch(err){
            errorHanlingFunction(err,res);
        }
        
    },


    async loginAgent(req,res,next) {

      console.log('req----',req)  
      let agent = await Agent.findOne({email: req.body.email})
      console.log('agent----',agent) 
    }
}

module.exports = agentController