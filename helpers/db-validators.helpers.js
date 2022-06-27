const Role = require('../models/role.model');
const { Usuario, Categoria, Producto } = require('../models/index.models');

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
        throw new Error(`No se encontro ningún registro de usuario con ese ID`);
    }
};

const existeCategoria = async(id) => {
    // Verificar si existe la categoría con el ID solicitado
    const existe = await Categoria.findById(id);
    if (!existe) {
        throw new Error(`No se encontro ningún registro de categoria con ese ID`);
    }
};

const existeProducto = async(id) => {
    // Verificar si existe el producto con el ID solicitado
    const existe = await Producto.findById(id);
    if (!existe) {
        throw new Error(`No se encontro ningún registro de categoria con ese ID`);
    }
};

module.exports = {
    esRolValido,
    correoExiste,
    existeUsuarioId,
    existeCategoria,
    existeProducto
};