const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){

    mongoose.connect('mongodb://localhost/boxoffice',{useNewUrlParser:true})
        .then(()=>console.log('connected to the mongodb..orignal'));  // ! later check why the winston.info is not working instead of the console.log
        
}