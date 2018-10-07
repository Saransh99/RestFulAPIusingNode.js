const Joi = require('joi');
const mongoose = require('mongoose');


// ! we will define the customers model in this file so that the other file may not be that big 

const Customer = mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:60
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        maxlength:60,
        minlength:5
    }
}));

function validateCustomer(customer){
    const schema = {
        name:Joi.string().min(5).max(60).required(),
        phone:Joi.string().min(5).max(60).required(),
        isGold: Joi.boolean()
    };

    return result = Joi.validate(customer, schema);
    
}

exports.Customer = Customer;
exports.validate = validateCustomer;



