const mongoose = require('mongoose');

const url = "mongodb+srv://admin:PNLbrg1VdvOIQ8Ei@cluster0.h80nw.mongodb.net/toy?retryWrites=true&w=majority"

mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./toy.model');
require('./supplier.model');
