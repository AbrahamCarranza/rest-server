const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    strNombre: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);