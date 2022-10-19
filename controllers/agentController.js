const Agent = require('../models/Agents/Agent');
const SalariedAgent = require('../models/Agents/SalariedAgent')
const CommisionedAgent = require('../models/Agents/commissionedAgent');
const errors = require('../util/errors');
const errorHanlingFunction = require('../util/errorHandlingFunction');
const bcrypt = require("bcrypt");
const messages = require('../util/messages');
const jwt = require('jsonwebtoken');

const agentController = {

    async loginAgent(req,res,next) {
        try{
            let agent = await Agent.findOne({email: req.body.email})
            console.log('agent----',agent)
            if(!agent){
                let newError = new Error();
                newError.message = errors.AgentNotFound;
                throw newError;
            }
            let passwordCheck = await bcrypt.compare(req.body.password,agent.password)
            if(!passwordCheck){
                let newError = new Error();
                newError.message = errors.passwordNotMatched
                throw newError;
            }
            const token = jwt.sign(
                {
                  user_id: agent._id.toString(),
                  user_email: agent.email,
                },
                "meraSecret",
                { expiresIn: "10h" }
            );
            res.status(201).json({
                messages: messages.loggedIn,
                agent_id: agent._id.toString(),
                authToken: token
            })


        }
        catch(err){
            console.log(err);
            errorHanlingFunction(err,res);
        }
         
      },
    async addAgent(req,res,next){
        try{

            let agentExist = await Agent.findOne({email: req.body.email})
            console.log('ae----',agentExist)
            if(agentExist){
                let error = new Error();
                error.message = errors.sameMailError;
                throw error;
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
                const commisionedAgentData = {
                    agentId: savedAgent.agentId,
                    commissionPercentage: req.body.commissionPercentage
                }
                var newCommissionedAgent = new CommisionedAgent(commisionedAgentData)
                var savedCommissionedAgent = await newCommissionedAgent.save()
                savedCommissionedAgent = savedCommissionedAgent._doc;
                delete savedCommissionedAgent._id;
                delete savedCommissionedAgent.__v;
                var result = {
                    message: 'agent added successfully',
                    agentData: {
                        ...savedAgent,
                        ...savedCommissionedAgent
                    }
                }
    
            }
            res.status(201).json(result);
        }
        catch(err){
            console.log('err---',err)
            errorHanlingFunction(err,res);
        }
        
    }


  
}

module.exports = agentController