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
    }
});

const ControleHorario = mongoose.model('controleHorario',ControleHorarioSchema);

module.exports = ControleHorario;