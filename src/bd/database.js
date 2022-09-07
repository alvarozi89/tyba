const mongoose = require('mongoose');
const config = require('../../config')


mongoose.connection.on('open', ()=> console.log('db connected'))
async function connectDb (){
    const uri = `${config.db.host}`
    mongoose.connect(uri)
}
module.exports= connectDb