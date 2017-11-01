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
        type: String,
        required: true
    },

    nascimento: {
        type: Date,
        required: false
    },

    genero: {
        type: String,
        required: true
    },

    cpf: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },

    endereco: {
        cep: {
            type: String,
            required: true
        },

        logradouro: {
            type: String,
            required: true
        },

        bairro: {
            type: String,
            required: true
        },

        cidade: {
            type: String,
            required: true
        },

        uf: {
            type: String,
            required: true
        },

        complemento: {
            type: String,
            required: false
        },

        numero: {
            type: Number,
            required: false
        },

        quadra: {
            type: Number,
            required: true
        },

        lote: {
            type: Number,
            required: true
        }
    }


});

const Consumidor = module.exports = mongoose.model('Consumidores', ConsumidorSchema);