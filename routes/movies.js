const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
})

router.get('/:id', async (req,res)=>{

    const movie = await Genre.findById(req.params.id);

    if(!movie) {
        return res.status(404).send('the Movie with the given id was not  found !!!');
    }
    res.send(movie);
});


router.post('/', async(req,res)=>{
    const{error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid Movie');

    const movie = new Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();
    res.send(movie);
});

router.put('/:id',async (req,res)=>{
    // check the customer 
    // if nothing return 404
    // if invalid then 400 bad req
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    const movie  = await Movie.findByIdAndUpdate(req.params.id, 
        {
            title:req.body.title,
            genre:{
                _id : genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },{new:true});
    
    if(!movie) {
        return res.status(404).send('movie with the given id is not found');
    }
    
    res.send(movie);

});


module.exports = router;