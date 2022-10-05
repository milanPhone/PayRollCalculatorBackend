const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commisionedAgent = new Schema({
    commissionPercentage: {
        type: 'number'
    },
    totalSalary: {
        type: 'number'
    }

})
commisionedAgent.methods.setTotalSalary = (factor)=>{
    //setting totalSalary logic
} 