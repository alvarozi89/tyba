const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    city: {type: Schema.ObjectId, ref:'city'},
    active: {type: Boolean, default:true},
    date:{type:Date,default:Date.now}
})

module.exports = mongoose.model('user',userSchema)