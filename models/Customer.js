const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema( {
    name:{
        type: String,
        required: true,
        unique: true  
    },
    email:{
        type: String,
        required: true,
        unique: true  
    },
    shipping_address:{
        type: String,
        required: true,  
    },
},
{timestamps: true})
module.exports = mongoose.model("customer", CustomerSchema);
