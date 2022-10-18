const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    Load_Date: {
        type: String,
        default: "-"
    },
    Load_Number: {
        type: Number,
        default: -1
    },
    Agent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    Agent_Email: {
        type: String,
        default: "-"
    },
    Customer: {
        type: String,
        default: "-"
    },
    Carrier_Price: {
        type: Number,
        default: -1
    },
    Margin: {
        type: Number,
        default: -1
    },
    Pick_Up_Date: {
        type: String,
        default: "-"
    },
    drop_Of_Date: {
        type: String,
        default: "-"
    },
    Month: {
        type: String,
        default: "-"
    },
    Pick_up_location: {
        type: String,
        default: "-"
    },
    Drop_Location: {
        type: String,
        default: "-"
    },
    Carrier_email: {
        type: String,
        default: "-"
    },
    Load_Status: {
        type: String,
        default: "-"
    },
    POD_Sent: {
        type: String,
        default: "-"
    },
    POD_Sent_Date: {
        type: String,
        default: "-"
    },
    Invoicing_Status: {
        type: String,
        default: "-"
    },
    Shipper_Conformation: {
        type: String,
        default: "-"
    },
    shipper_Uploaded: {
        type: String,
        default: "-"
    },
    Customer_Paid: {
        type: String,
        default: "-"
    },
    Carrier_Paid:{
        type: String,
        default: "-"
    },
    payment_received:{
        type: String,
        default: "-"
    },
    payment_received_date:{
        type: String,
        default: "-"
    },
    carrier_phone_number:{
        type: String,
        default: "-"
    },
    Carrier_MC:{
        type: String,
        default: "-"
    },
    driver_details:{
        type: String,
        default: "-"
    },
    driver_details: {
        type: String,
        default: "-"
    }
})

module.exports = mongoose.model('Sales',salesSchema)