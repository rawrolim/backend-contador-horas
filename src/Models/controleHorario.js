const mongoose = require('../Database');

const ControleHorarioSchema = new mongoose.Schema({
    usuario_id: {
        type: String,
        required: true,
    },
    descricao:{
        type: String,
        required: true,
    },
    tempo: {
        type: Number,
        default: 0,
    },
    data_hora_inicial: {
        type: Date,
        default: Date.now,
    },
    data_hora_fim: {
        type: Date,
        required: false,
    },
    status: {
        type: Boolean,
        default: false,
    },
    apontando: {
        type: Boolean,
        default: false,
    }
});

const ControleHorario = mongoose.model('controleHorario',ControleHorarioSchema);

module.exports = ControleHorario;