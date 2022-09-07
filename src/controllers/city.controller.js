const cityCtrl = {};
const cityModel = require('../models/city.models')

cityCtrl.crearCity = async(req,res)=>{
    const {name,restaurant}= req.body 
    const newRol = new cityModel({
        name,
        restaurant
    })
        await newRol.save()
        res.json({
            mensaje: 'Ciudad  creada',
        })

}

module.exports= cityCtrl