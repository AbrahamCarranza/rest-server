const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');


const router = Router();


router.post('/login', [
    check('strCorreo', 'El correo electrónico es obligatorio').isEmail(),
    check('strContrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


module.exports = router;