const Role = require('../models/role.model');
const Usuario = require('../models/usuario.model');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ strNombre: rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
};

const correoExiste = async(strCorreo = '') => {
    // Verificar si existe el correo
    const existe = await Usuario.findOne({ strCorreo });
    if (existe) {
        throw new Error(`El correo '${strCorreo}' ya se encuentra asociado a una cuenta`);
    }
};

const existeUsuarioId = async(id) => {
    // Verificar si existe el usuario con el ID solicitado
    const existe = await Usuario.findById(id);
    if (!existe) {
        throw new Error(`No se encontro ningún registro con ese ID`);
    }
};

module.exports = {
    esRolValido,
    correoExiste,
    existeUsuarioId
};