const {Rental, validate} = require('../models/rental');
const auth = require('../middleware/auth');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// ! Fawn is a node module which is used to make 2 phase commits in the mongodb
Fawn.init(mongoose);

router.get('/', async (req,res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/',auth, async (req,res)=>{
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock == 0) return res.status(400).send('Movie is out of stock');

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try{
        /* the fawn will create a new collection in the mongobd for the processing of the transactions 
        once the transactions is complete the fawn will delete all the data in the transactions 
        */
        // * we can perform transactions in the mongodb using the fawn module
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id},{
            $inc: {numberInStock: -1}
        })
        .run();

    res.send(rental);

    }catch(ex){
        res.status(500).send('something failed in the server');
    }
         
});


module.exports = router;
