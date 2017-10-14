const mongoose = require('mongoose');

const ConsumidorSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: Boolean,
        required: true
    }

});

const Consumidor = module.exports = mongoose.model('Consumidores', ConsumidorSchema);