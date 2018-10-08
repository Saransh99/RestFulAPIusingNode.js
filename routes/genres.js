const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();



router.get('/', async (req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id',async (req,res)=>{

    const genre = await Genre.findById(req.params.id);

    if(!genre) {
        return res.status(404).send('the genre with the given id was not found!!!');
    }
    res.send(genre);
});

// * applyng the auth middleware to the post req only
router.post('/', auth, async (req,res)=>{

    
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
    }

    let genre = new Genre({
        name:req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});


router.put('/:id',async (req,res)=>{
    // check the genre 
    // if nothing return 404
    // if invalid then 400 bad req
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    const genre  = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name},{
        new:true
    });
    
    if(!genre) {
        return res.status(404).send('genre with the given id is not found');
    }
    
    res.send(genre);

});
// * these middleware will act in the seq
router.delete('/:id',[auth, admin], async(req,res)=>{
    // check for the course
    // if not exist then 404
    // delete
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if(!genre) {
        return res.status(404).send('genre with the given id is not found');
    }

    res.send(genre);

});


module.exports = router;