const validaCampos = require('../middlewares/validar-campos.middleware');
const validaJWT = require('../middlewares/validar-jwt.middleware');
const validaRoles = require('../middlewares/validar-rol.midelware');


module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
};