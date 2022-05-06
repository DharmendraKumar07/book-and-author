const mongoose = require('mongoose');


const authorSchema= new mongoose.Schema({
    name:String,
    age:String,
    book:String,
    dateOfBirth:String,
})