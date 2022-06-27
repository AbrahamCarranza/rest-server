const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, blnEstatus, ...data } = this.toObject();
    return data;
};

module.exports = model('Categoria', CategoriaSchema);