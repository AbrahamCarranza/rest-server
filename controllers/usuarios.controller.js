// const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { correoExiste } = require('../helpers/db-validators.helpers');
const Usuario = require('../models/usuario.model');


const usuariosGet = async(req, res) => {

    let { limite, desde } = req.query;
    const query = { blnEstatus: true };

    isNaN(limite) === true || limite === '' ? limite = 5 : limite = Number(limite);
    isNaN(desde) === true || desde === '' ? desde = 0 : desde = Number(desde);

    const [totalUsuarios, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite),
    ]);

    res.status(200).json({
        msg: 'Lista de usuarios obtenida exitosamente.',
        totalUsuarios,
        usuarios
    });
};


const usuariosPost = async(req, res) => {

    const { strNombre, strCorreo, strContrasena, strRol } = req.body;
    const usuario = new Usuario({ strNombre, strCorreo, strContrasena, strRol });
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.strContrasena = bcryptjs.hashSync(strContrasena, salt);
    // Registrar al usuaio
    await usuario.save();

    res.status(200).json({
        msg: 'El usuario ha sido registrado exitosamente',
        usuario
    });
};


const usuariosPut = async(req, res) => {

    const { id } = req.params;
    const { _id, strContrasena, blnGoogle, strCorreo, ...resto } = req.body;

    // VALIDAR CON BASE DE DATOS
    if (strContrasena) {
        const salt = bcryptjs.genSaltSync();
        resto.strContrasena = bcryptjs.hashSync(strContrasena, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Se han actualizado los datos exitisamente.',
        usuario
    });
};


const usuariosDelete = async(req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { blnEstatus: false });


    res.status(200).json({
        msg: 'El usuario ha sido desactivado exitasamente.'
    });
};


module.exports = {
    usuariosGet: usuariosGet,
    usuariosPost: usuariosPost,
    usuariosPut: usuariosPut,
    usuariosDelete: usuariosDelete,
};