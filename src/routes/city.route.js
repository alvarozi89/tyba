const {Router} = require('express');
const router = Router();
const cityCtrl = require('../controllers/city.controller');


router.post('/crearCiudad',cityCtrl.crearCity);



module.exports= router