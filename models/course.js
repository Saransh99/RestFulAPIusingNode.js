const Joi = require('joi');
const mongoose = require('mongoose');

// ! this is the model definition of the Course model in the mongoose 

const Course = mongoose.model('Course',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:60
    }
}));

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).max(30).required()
    };

    return result = Joi.validate(course, schema);
    
}

exports.Course = Course;
exports.validate = validateCourse

