const genres = require('../routes/genres');
const home = require('../routes/home');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const logger = require('../middleware/logger');
const helmet = require('helmet');
const express = require('express');

module.exports = function(app){
    // the middlewares are executed in the sequence
    // the more the no. of middleware the more time it will take to process the req and the response
    app.use(express.json()); // returns the middleware fundtion 
    app.use(express.urlencoded({extended:true}));
    app.use(express.static('public')); 
    app.use(logger);
    app.use(helmet());
    app.use('/api/genres',genres);
    app.use('/api/customers',customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/',home);
    app.use(error);  // the middleware to handle the errors

}