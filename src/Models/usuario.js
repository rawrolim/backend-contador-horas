const mongoose = require('../Database');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    status: {
        type: Boolean,
        required: false,
        default: true,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Usuario = mongoose.model('usuario',UsuarioSchema);

module.exports = Usuario;