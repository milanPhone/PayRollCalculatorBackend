const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sales = new Schema({
    Load_Date: {
        type: String
    },
    Load_Number: {
        type: Number
    },
    Agent_id: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    Customer: {
        type: String
    },
    Carrier_Price: {
        type: Number
    },
    Margin: {
        type: Number
    },
    Pick_Up_Date: {
        type: String
    },
    drop_Of_Date: {
        type: String
    },
    Month: {
        type: String
    },
    Pick_up_location: {
        type: String
    },
    Drop_Location: {
        type: String
    },
    Carrier_email: {
        type: String
    },
    Load_Status: {
        type: String
    },
    POD_Sent: {
        type: String
    },
    POD_Sent_Date: {
        type: String
    },
    Invoicing_Status: {
        type: String
    },
    Shipper_Conformation: {
        type: String
    },
    shipper_Uploaded: {
        type: String
    },
    Customer_Paid: {
        type: String
    },
    Carrier_Paid:{
        type: String
    },
    payment_received:{
        type: String
    },
    payment_received_date:{
        type: String
    },
    carrier_phone_number:{
        type: String
    },
    Carrier_MC:{
        type: String
    },
    driver_details:{
        type: String
    },
    driver_details: {
        type: String
    }
})