const{ Router} = require('express');
const{ check } = require('express-validator');
const{ validarCampos} = require('../middlewares/validar-campos')
const{ getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuarios } = require('../controllers/usuarios.controller');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/',validarJwt, getUsuarios );
router.post('/',[
     check('nombre','El nombre es requerido').not().isEmpty(),
     check('password','El password es requerido').not().isEmpty(),
     check('email','El email es requerido').isEmail(),
     validarCampos
], crearUsuarios );

 router.put( '/:id', validarJwt, [
     check('nombre','El nombre es requerido').not().isEmpty(),
     check('role','El role es requerido').not().isEmpty(),
     check('email','El email es requerido').isEmail(),
     validarCampos
     
 ], actualizarUsuario);

 router.delete( '/:id', validarJwt, eliminarUsuarios );
  


module.exports = router;

