const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    mobile:{
        type: String,
        require: true
    },
    address:{
        type: String
    },
    email: {
        type: String,
        require: true
    }
}, {
    timetamps: true   
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;