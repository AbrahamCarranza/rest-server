const { Schema, model, isValidObjectId } = require('mongoose');

const usuarioSchema = Schema({
    strNombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    strCorreo: {
        type: String,
        required: [true, 'El correo electónico es obligatorio'],
        unique: true
    },
    strContrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    strImg: {
        type: String
    },
    strRol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        default: 'ROL_USUARIO'
            // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    blnEstatus: {
        type: Boolean,
        default: true
    },
    blnGoogle: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    const { __v, strContrasena, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', usuarioSchema);