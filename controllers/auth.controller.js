const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {
    try {

        const { strCorreo, strContrasena } = req.body;

        // VERIFICA SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({ strCorreo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos - correo'
            });
        }

        // VERIFICA SI EL USUARIO ESTÁ ACTIVO
        if (!usuario.blnEstatus) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos - estatus: false'
            });
        }

        // VERIFICA LA CONTRASEÑA
        const contrasenaValida = bcryptjs.compareSync(strContrasena, usuario.strContrasena);

        if (!contrasenaValida) {
            return res.status(400).json({
                msg: 'Correo o contraseña incorrectos - contraseña'
            });
        }

        // GENERAR EL TOKEN
        const token = await generarJWT(usuario.id);


        res.json({
            msg: 'Se ha iniciado sesión exitosamente.',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Lo sentimos, hubo un error con el servidor. Cmuniquese con el administrador.'
        });
    }
};


module.exports = {
    login
};