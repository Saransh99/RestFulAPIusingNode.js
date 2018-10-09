const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function(){

    const db = config.get('db');
    mongoose.connect(db,{useNewUrlParser:true})
        .then(()=>console.log(`connected to the ${db}`));  // ! later check why the winston.info is not working instead of the console.log
        
}