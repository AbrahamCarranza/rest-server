const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { validarJWT, validarCampos, esAdministrador} = require('../middlewares/index.middlewares');
const { existeCategoria } = require('../helpers/db-validators.helpers');

const router = Router();


// SE OBTIENEN TODAS LAS CATEGORIAS
router.get('/', obtenerCategorias);


// SE OBTIENE UNA CATEGORIA POR ID
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
], obtenerCategoria);


// CREAR UNA CATEGORIA
router.post('/', [
    validarJWT,
    check('strNombre', 'El nombre es necesario').not().isEmpty(),
    validarCampos
], crearCategoria);


// ACTUALIZAR UNA CATEGORÍA
router.put('/:id', [
    validarJWT,
    check('strNombre', 'El nombre es necesario').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);


// ELIMINAR UNA CATEGORÍA
router.delete('/:id', [
    validarJWT,
    esAdministrador,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;