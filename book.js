const mongoose = require('mongoose');

const bookShema = new mongoose.Schema({
    name: String,
    price: String,
    author: String,
    published: String,
    userid: String,

})