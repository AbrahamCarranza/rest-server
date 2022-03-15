const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify.helper');
const { json } = require('express/lib/response');

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
        return res.status(500).json({
            msg: 'Lo sentimos, hubo un error con el servidor. Cmuniquese con el administrador.'
        });
    }
};



const googleSignIn = async(req, res) => {
    const { id_token } = req.body;

    try {

        const { strNombre, strImg, strCorreo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ strCorreo });

        if (!usuario) {
            const data = {
                strNombre,
                strCorreo,
                strContrasena: ':P',
                strImg,
                blnGoogle: true
            };

            usuario = await new Usuario(data);

            await usuario.save(usuario);
        }

        if (!usuario.blnEstatus) {
            return res.status(401).json({
                msg: 'Usuario inhabilitado, por favor hable con el administrador.'
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Has iniciado sesión correctamente',
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'No fué posible verificar el token'
        });
    }

};


module.exports = {
    login,
    googleSignIn
};