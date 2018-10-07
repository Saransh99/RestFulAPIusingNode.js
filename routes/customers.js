const {Customer, validate} = require('../models/customer')
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res)=>{

    const customer = await Customer.findById(req.params.id);

    if(!customer) {
        return res.status(404).send('the customer with the given id was not found!!!');
    }
    res.send(customer);
});


router.post('/', async (req,res)=>{

    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
    }

    let customer = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id',async (req,res)=>{
    // check the customer 
    // if nothing return 404
    // if invalid then 400 bad req
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    const customer  = await Customer.findByIdAndUpdate(req.params.id, {name:req.body.name},{
        new:true
    });
    
    if(!customer) {
        return res.status(404).send('customer with the given id is not found');
    }
    
    res.send(customer);

});

router.delete('/:id',async(req,res)=>{
    // check for the customer
    // if not exist then 404
    // delete
    const customer = await Customer.findByIdAndRemove(req.params.id);
    
    if(!customer) {
        return res.status(404).send('Customer with the given id is not found');
    }

    res.send(customer);

});

module.exports = router;