const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/hospital').then(()=>{
    console.log("Database Connection Success");
}).catch(error=>{
    console.log("Database Connection Error: " + error);
});