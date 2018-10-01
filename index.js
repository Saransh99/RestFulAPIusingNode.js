const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
    {id:4, name:'course4'},
    {id:5, name:'course5'}
];


app.get('/', (req, res)=>{
    res.send('hello there this is the new world ');
});

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('the course with the given id was not found!!!');
    }
    res.send(course);
});

app.post('/api/courses', (req,res)=>{
    const course = {
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
});

//const port = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`listening on the port 3000..`));



// all the dependencies of a node module is directly stored in the node_modules folder 
// earlier the node modules dependencies used to be stored in the specific module folder 

// routing with the http gets a little more hectic thus we use the express 
 