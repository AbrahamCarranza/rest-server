
const { Producto } = require('../models/index.models');


const obtenerProductos = async(req, res) => {
    let { limite, desde } = req.query;
    const query = { blnEstatus: true };

    isNaN(limite) === true || limite === '' ? limite = 5 : limite = Number(limite);
    isNaN(desde) === true || desde === '' ? desde = 0 : desde = Number(desde);

    const [totalProducto, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('idUsuario', 'strNombre')
        .populate('idCategoria', 'strNombre')
        .skip(desde)
        .limit(limite),
    ]);

    res.status(200).json({
        msg: 'Lista de productos obtenida exitosamente.',
        totalProducto,
        productos
    });
};


const obtenerProducto = async(req, res) => {
    const { id } = req.params;

    const producto = await Producto.findById(id)
    .populate('idUsuario', 'strNombre')
    .populate('idCategoria', 'strNombre');

    res.json(producto);
};


const crearProducto = async(req, res) => {
    const { blnEstatus, idUsuario, ...body }= req.body;

    const productoDB = await Producto.findOne({strNombre: body.strNombre});

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${productoDB.strNombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        strNombre: body.strNombre.toUpperCase(),
        idUsuario: req.usuario._id
    };

    const producto = await new Producto(data);

    // Guardar en DB
    await producto.save();

    res.status(201).json({
        masg: 'El producto fue registrado existosamente.',
        producto
    });
};

// actualizarCategoria
const actualizarProducto = async(req, res) => {
    const { id } = req.params;
    const { blnEstatus, idUsuario, ...data } = req.body;

    data.strNombre && data.strNombre.toUpperCase();

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);
};


// borrarCategoria - blnEstado= false
const borrarProducto = async(req, res) => {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndUpdate(id, {blnEstatus: false}, {new: true});

    res.json( productoEliminado );
};



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
};