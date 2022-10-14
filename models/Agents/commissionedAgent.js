const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commissionedAgentSchema = new Schema({
    agentId:{
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    commissionPercentage: {
        type: 'number',
        required: true
    },
    totalSalary: {
        type: 'number'
    }

})
commissionedAgentSchema.methods.setTotalSalary = (factor)=>{
    //setting totalSalary logic
} 

module.exports = mongoose.model('CommissionedAgent',commissionedAgentSchema)