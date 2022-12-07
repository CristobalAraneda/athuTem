const{ Router} = require('express');
const{ check } = require('express-validator');
const{ validarCampos} = require('../middlewares/validar-campos')
const{ getUsuarios,crearUsuarios } = require('../controllers/usuarios');

const router = Router();


router.get('/', getUsuarios );
router.post('/',[
     check('nombre','El nombre es requerido').not().isEmpty(),
     check('password','El password es requerido').not().isEmpty(),
     check('email','El email es requerido').isEmail(),
     validarCampos
], crearUsuarios );
  


module.exports = router;

