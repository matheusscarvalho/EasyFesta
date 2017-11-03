const mongoose = require('mongoose');

const ContratoSchema = mongoose.Schema({
    texto: {
        type: String,
        required: true
    },

    dataCriacao: {
        type: Date,
        default: Date.now()
    },

    status: {
        type: Number,
        required: true
    }

});

const Contrato = module.exports = mongoose.model('Contratos', ContratoSchema);