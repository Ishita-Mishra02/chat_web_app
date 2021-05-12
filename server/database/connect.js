const mongoose =require('mongoose')

//const validator= require('validator');
const url ='';//change this to your MongoDB URI which should include password

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).then(
    console.log('database connected')
);
