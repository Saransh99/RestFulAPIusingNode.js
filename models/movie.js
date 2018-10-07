const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

// this is the shopping cart model 

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:255
    },
    genre:{
        type:genreSchema,
        require:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
}));

function validateMovie(movie){
    // this is the joi schema and not a mongoose schema
    const schema = {
        title:Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
} 

exports.Movie = Movie;
exports.validate = validateMovie;