const Joi = require('joi');
const express = require('express');
const router = express.Router();

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
    {id:5, name:'course5'}
];


router.get('/', (req,res)=>{
    res.send(courses);
});

router.get('/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('the course with the given id was not found!!!');
    }
    res.send(course);
});

router.post('/', (req,res)=>{

    const {error} = validateCourse(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req,res)=>{
    // check the course 
    // if nothing return 404
    // if invalid then 400 bad req

    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('course with the given id is not found');
    }
    
    const {error} = validateCourse(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    course.name = req.body.name;
    res.send(course);

});

router.delete('/:id',(req,res)=>{
    // check for the course
    // if not exist then 404
    // delete
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('course with the given id is not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);

});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).max(30).required()
    };

    return result = Joi.validate(course, schema);
    
}

module.exports = router;