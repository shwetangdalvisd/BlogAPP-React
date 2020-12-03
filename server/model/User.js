const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:String,
    name:String,
    saved:Array,
})

module.exports = mongoose.model('User',userSchema);