const Joi = require('joi');
const mongoose = require('mongoose');

// ! this is the model definition of the Course model in the mongoose 

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
    const schema = {
        name:Joi.string().min(5).max(50).required()
    };

    return result = Joi.validate(genre, schema);
    
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;

