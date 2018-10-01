function log (req,res,next){
    console.log('logging in the api');
    next(); // passes the control to the next middleware
}

module.exports = log;

