const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios.controller');
const { esRolValido, correoExiste, existeUsuarioId } = require('../helpers/db-validators.helpers');
const { validarCampos, validarJWT, esAdministrador, tieneRol } = require('../middlewares/index.middlewares');

const router = Router();


router.get('/', usuariosGet);

router.post('/', [
    check('strNombre', 'El nombre es obligatorio').not().isEmpty(),
    check('strContrasena', 'La contraseña debe contener al menos 6 caractéres').isLength({ min: 6 }),
    check('strCorreo', 'El correo no es valido').isEmail(),
    check('strCorreo').custom(correoExiste),
    // check('strRol', 'No es un rol válido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('strRol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('strRol').custom(esRolValido),
    validarCampos,
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    // esAdministrador,
    tieneRol('ROL_ADMINISTRADOR', 'ROL_USUARIO', 'ROL_VENTAS'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

module.exports = router;