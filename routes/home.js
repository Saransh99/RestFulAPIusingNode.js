const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index',{title:'this is the default title', message:'this ist the message'});
});

module.exports = router;