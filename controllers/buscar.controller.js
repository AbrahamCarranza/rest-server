const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto, Role } = require('../models/index.models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];


const buscarUsuario = async(termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            res: usuario ? [usuario] : []
        });
    }

    const regexp = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{strNombre: regexp}, {strCorreo: regexp}],
        $and: [{blnEstatus: true}]
    });

    res.json({
        totalRegistros: usuarios.length,
        res: usuarios
    })
};


const buscarCategoria = async(termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            res: categoria ? [categoria] : []
        });
    }

    const regexp = new RegExp(termino, 'i');
    
    const categorias = await Categoria.find({strNombre: regexp, blnEstatus: true});

    res.json({
        totalRegistros: categorias.length,
        res: categorias
    })
};


const buscarProductos = async(termino = '', res) => {
    const esMongoId = await ObjectId.isValid(termino);

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('idCategoria', 'strNombre');

        return res.json({
            res: producto ? [producto] : []
        });
    }

    const regexp = new RegExp(termino, 'i');
    
    const productos = await Producto.find({strNombre: regexp, blnEstatus: true}).populate('idCategoria', 'strNombre');

    
    res.json({
        totalRegistros: productos.length,
        res: productos
    })
}


const buscar = (req, res) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `No se encontro ninguna coleccion con el nombre ${coleccion}`
        });
    }

    switch (coleccion) {
        case     'usuarios':
            buscarUsuario(termino, res);
        break;
        
        case 'categorias':
            buscarCategoria(termino, res)
        break;
            
        case     'productos':
            buscarProductos(termino, res);
        break;

        default:
            return res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            });
    }
};


module.exports = {
    buscar
};