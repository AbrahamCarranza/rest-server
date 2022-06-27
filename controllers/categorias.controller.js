
const { Categoria } = require('../models/index.models');


// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res) => {
    let { limite, desde } = req.query;
    const query = { blnEstatus: true };

    isNaN(limite) === true || limite === '' ? limite = 5 : limite = Number(limite);
    isNaN(desde) === true || desde === '' ? desde = 0 : desde = Number(desde);

    const [totalCategorias, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('idUsuario', 'strNombre')
        .skip(desde)
        .limit(limite),
    ]);

    res.status(200).json({
        msg: 'Lista de categorias obtenida exitosamente.',
        totalCategorias,
        categorias
    });
};


// obtenerCategoria - populate
const obtenerCategoria = async(req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findById(id).populate('idUsuario', 'strNombre');

    res.json(categoria);
};


const crearCategoria = async(req, res) => {
    const strNombre = req.body.strNombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({strNombre});

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.strNombre} ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        strNombre,
        idUsuario: req.usuario._id
    };

    const categoria = await new Categoria(data);

    // Guardar en DB
    await categoria.save();

    res.status(201).json({
        masg: 'La categoría fue registrada existosamente.',
        categoria
    });
};

// actualizarCategoria
const actualizarCategoria = async(req, res) => {
    const { id } = req.params;
    const { blnEstatus, idUsuario, ...data } = req.body;

    data.strNombre = data.strNombre.toUpperCase();
    data.idUsuario = data.idUsuario;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria);
};


// borrarCategoria - blnEstado= false
const borrarCategoria = async(req, res) => {
    const { id } = req.params;
    const categoriaEliminada = await Categoria.findByIdAndUpdate(id, {blnEstatus: false}, {new: true});

    res.json( categoriaEliminada );
};



module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
};