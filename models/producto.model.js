const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    strNombre: {
        type: String,
        require: [true, 'El nombre de la categoría es obligatorio'],
        unique: true
    },
    blnEstatus: {
        type: Boolean,
        default: true,
        required: true
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nmbPrecio: {
        type: Number,
        default: 0
    },
    idCategoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    strDescripcion: {
        type: String,
    },
    blnDisponible: {
        type: Boolean,
        default: true
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, blnEstatus, ...data } = this.toObject();
    return data;
};

module.exports = model('Producto', ProductoSchema);