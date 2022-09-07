const {Router} = require('express');
const router = Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../helpers/auth');

router.post('/crearUsuario',userCtrl.crearUsuario);
router.post('/login',userCtrl.login);

router.get('/listar',userCtrl.listar);
router.get('/listarNombre/:name',userCtrl.listarNombre);
router.get('/listarUsuario/:id',userCtrl.listarId)

router.post('/recuperarContrasena',userCtrl.recuperarContrasena)

router.put('/actualizarUsuario/:id' ,userCtrl.actualizarUsuario)
router.put('/nuevaContrasena/:pass' ,userCtrl.nuevaContraseña)

router.delete('/eliminarUsuario/:id',userCtrl.elimarUsuario)


module.exports= router