const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleriedAgent = new Schema({
    basicSalary: {
        type: String,
        required: true
    },
    attendance: {
        type: Number
    },
    totalSalary: {
        type: Number
    }
})

SaleriedAgent.methods.setTotalSalary = function (factor){
    // salary calculation logic
}

SaleriedAgent.methods.changeAttendance = function (factor){
    // change attendance code
}
