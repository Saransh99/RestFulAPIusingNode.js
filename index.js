const winston = require('winston');
const express = require('express');
const app = express();
const morgan = require('morgan');
const debug = require('debug')('app:startup');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

app.set('view engine','pug');
app.set('views','./views');


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);


//debug(`Application name: ${config.get('name')}`);
//debug(`Mail Server: ${config.get('mail.host')}`);
//debug(`Mail password:${config.get('mail.password')}`);

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled..');
}

//const port = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`listening on the port 3000..`)); // * check for the winston.info
