const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');


const router = Router();


router.post('/login', [
    check('strCorreo', 'El correo electrónico es obligatorio').isEmail(),
    check('strContrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google-sign-in', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;