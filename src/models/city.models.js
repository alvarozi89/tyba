const mongoose = require('mongoose');
const {Schema} = mongoose

const citySchema = new Schema({
    name: String,
    restaurant: String
})

module.exports = mongoose.model('city',citySchema)