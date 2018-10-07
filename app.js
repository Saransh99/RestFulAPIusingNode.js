const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises',{useNewUrlParser:true})
    .then(()=>console.log('connected to the mongodb...4'))
    .catch(err=>console.error('Error',err));

const courseSchema = new mongoose.Schema({
    date:{type:Date, default:Date.now},
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
        },
    category:{
        type:String,
        required:true,
        enum:['web','mobile','network'],
        lowercase:true,
        trim:true  // this will remove the padding in the string
    },
    author:String,
    isPublished:Boolean,
    // * we can pass in various default authorization in this schema
    price:{
        type:Number,
        // ! arrow function has no this in them so we need to use the default function here
        required:function(){ 
            return this.isPublished;
        },
        min:10,
        max:300,
        // we can also the custom getters and the setters in a prop
        // * the setter is called when we set the value of a property and the getter is called when we need to access the value of the property
        get: v=>Math.round(v),
        set: v=>Math.round(v)
    },
    tags:{
        type:Array,
        // we can also provide custom validation with the validate property 
        // * to set the async validation we can set isAsync:true
        validate:{
            isAsync:true,
            validator:function(v,callback){
                setTimeout(()=>{
                    const result = v && v.length >0;
                    callback(result);
                },4000)
                
            },
            message:'a course should have at least one tag'
        }
    }
});

const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
    const course = new Course({
        name:"this is the new RESTful API course in the udemy",
        author:"Saransh Pal",
        category:'WEB',
        isPublished:true,
        price:30.565 ,
        tags:['frontend']
    });

    try{
        const result = await course.save();
        console.log(result);
    }catch(ex){
        // we can set the validation errors in a more formittable way 
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
    
}

async function getCourse(){
    return await Course
        .find({isPublished:true,tags:{$in:['frontend','backend']}})
        .or([
            {price:{$gte:15}},
            {name:/.*by.*/i}
        ])
        .sort({price:-1})
        .select({ name:1, author:1, price:1});

    //console.log(course[0].price);
}
async function run(){
    const courses = await getCourse();
    console.log(courses[0].price);
}

async function updateCourse(id){
    const result = await Course.update({_id:id},{
        $set:{
            author:'Mosh',
            isPublished:false
        }
    });
    
    //console.log(result);
}

//updateCourse('5a68ff090c553064a218a547');
run();
createCourse();
getCourse();

