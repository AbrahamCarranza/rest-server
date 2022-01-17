// const { response, request } = require('express');

const usuariosGet = (req, res) => {

    const body = req.body;

    res.status(200).json({
        msg: 'get'
    });
};

const usuariosPost = (req, res) => {

    const { body } = req;

    res.status(200).json({
        msg: 'post',
        body
    });
};

const usuariosPut = (req, res) => {
    res.status(200).json({
        msg: 'put'
    });
};

const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete'
    });
};

const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: 'patch'
    });
};

module.exports = {
    usuariosGet: usuariosGet,
    usuariosPost: usuariosPost,
    usuariosPut: usuariosPut,
    usuariosDelete: usuariosDelete,
    usuariosPatch: usuariosPatch,
};