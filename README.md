this is the initial Readme 
we will add more alter 
this RESTful api is made using the express 
tested with mocha 
deployed with herokou
also used the postman to test the api

// all the dependencies of a node module is directly stored in the node_modules folder 
// earlier the node modules dependencies used to be stored in the specific module folder 
// routing with the http gets a little more hectic thus we use the express 
 

--HOW to update the npm packages
1. if you want to update the minor or the patch updates use the npm update
2. if you want to update the major update then we need the npm-check-updates  or ncu
3. install the npm install --global npm-check-updates 
4. then run the ncu to check the outdated packages
5. then run the npm install to install all the new updates for the node packages 


JOI:- for the validation of the http req
---> joi allows us to create a schemas for the js objects to ensure the validation of the key information

--example of using the joi:-
const Joi = require('joi');

    const schema  = {
        name: Joi.string().alphanum().min(3).max(30),

        email:Joi.string().email({minDomainAtoms:2})   
    }

    const result = Joi.validate(req.body, schema);

// here we defined the schema with the joi built in constraints 
--name should be a string or alphanumeric and should have a lenght btw 3and30
-- email should have 2 domain parts ex:- saransh.com

--->express.urlencoded() ===> this is a build in middleware function in the express. it parses the incoming req with the urlencoded payloads and is based on the body-parser

--> express.static() is used to server the static files 


---> morgan
HTTP req logger middleware for node.js
morgan(format,options)
--> read more about morgan on the npmjs.com/package/morgan


---> Helmet
helps to secure the Express apps by setting various HTTP headers 

---> How to set the environment 
process.env.NODE_ENV = development or production or any other environment
OR directly in the windows cmd type set NODE_ENV=development


---> Config 
this organizes the hierarchial configurations for your apps deployments 
-> it let's u definet the default params and extend them for the diff deploayment 
-->configurations are stored in the configurations file with in the application 


---> Debug  (made the debugging in the node easy)
-- const debugger = require('debug')('app:startup');
->now istead of writing the console.log write the debugger('message here');
--> we can also set the debugger env variable in the windows cmd using (set DEBUG=app:startup)
-> if we have multiple debugging functions then simply use the set DEBUG=app:*  
--> now we can easily enable and disable debugging in the cmd only without commenting or deleting the debugging statements 
--> if we want to set the env variable and then run the app at the same time we use the shorthand as (DEBUG=app:startup nodemon index.js)



---> Template engine (Pug)


