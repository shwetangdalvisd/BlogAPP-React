const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name:String,
    title:String,
    content:String,
    like:Number,
    time:Date,
    user_id:String
})

module.exports = mongoose.model('Blog',blogSchema);