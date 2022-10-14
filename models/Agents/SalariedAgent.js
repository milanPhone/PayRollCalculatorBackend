const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalariedAgentSchema = new Schema({
    agentId:{
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    basicSalary: {
        type: String,
        required: true
    },
    attendance: {
        type: Number,
        default: 0
    },
    totalSalary: {
        type: Number
    }
})

SalariedAgentSchema.methods.setTotalSalary = function (factor){
    // salary calculation logic
}

SalariedAgentSchema.methods.changeAttendance = function (factor){
    // change attendance code
}

module.exports = mongoose.model('SalariedAgent',SalariedAgentSchema)
