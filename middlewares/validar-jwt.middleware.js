const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.model');


const validarJWT = async(req, res, next) => {

    const token = await req.header('token');

    if (!token) {
        return res.status(401).json({
            msg: 'No cuentas con los permisos para realizar esta accion.'
        });
    }

    try {

        const { uid } = await jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }

        if (!usuario.blnEstatus) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }


        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
};

module.exports = {
    validarJWT
};