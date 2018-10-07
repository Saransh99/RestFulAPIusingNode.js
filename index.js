const express = require('express');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const debug = require('debug')('app:startup');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL error: jwtPrivateKey is not present');
    process.exit(1); // 0 when the process is success any other then it failed 

}

mongoose.connect('mongodb://localhost/boxoffice',{useNewUrlParser:true})
    .then(()=>console.log('connected to the mongodb..orignal'))
    .catch(err=>console.error('cant connect to the mongodb',err)); 

app.set('view engine','pug');
app.set('views','./views');


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

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

//debug(`Application name: ${config.get('name')}`);
//debug(`Mail Server: ${config.get('mail.host')}`);
//debug(`Mail password:${config.get('mail.password')}`);

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled..');
}

//const port = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`listening on the port 3000..`));
