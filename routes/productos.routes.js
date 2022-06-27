const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, actualizarProducto, borrarProducto, obtenerProducto, crearProducto } = require('../controllers/productos.controller');
const { validarJWT, validarCampos, esAdministrador} = require('../middlewares/index.middlewares');
const { existeCategoria, existeProducto } = require('../helpers/db-validators.helpers');

const router = Router();


// SE OBTIENEN TODAS LOS PRODUCTOS
router.get('/', obtenerProductos);


// SE OBTIENE UN PRODUCTO POR ID
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,
], obtenerProducto);


// CREAR UN PRODUCTO
router.post('/', [
    validarJWT,
    check('strNombre', 'El nombre es necesario').not().isEmpty(),
    check('idCategoria', 'No es un ID de categoria valido').isMongoId(),
    check('idCategoria').custom(existeCategoria),
    validarCampos
], crearProducto);


// ACTUALIZAR UN PRODUCTO
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);


// ELIMINAR UN PRODUCTO
router.delete('/:id', [
    validarJWT,
    esAdministrador,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

module.exports = router;