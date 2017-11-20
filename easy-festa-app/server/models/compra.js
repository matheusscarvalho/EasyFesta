const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;
const CompraSchema = mongoose.Schema({
    anuncio: {
        type: ObjectId,
        ref: 'Anuncio',
        required: true
    },

    consumidor: {
        type: ObjectId,
        ref: 'Consumidor',
        required: true
    },

    fornecedor: {
        type: ObjectId,
        ref: 'Fornecedor',
        required: true
    },

    dataEvento: {
        type: Date,
        required: true
    },

    dataCompra: {
        type: Date,
        default: new Date()
    },

    quantidade: {
        type: Number,
        required: true
    },

    informacoes: {
        type: String,
        required: true
    },

    status: {
        type: Number,
        required: true
    },

    pagamentos: [{
        valor: {
            type: Number
        },

        data: {
            type: Date,
            default: new Date()
        }
    }],

    contrato: {
        texto: {
            type: String
        },

        dataCriacao: {
            type: Date
        },

        status: {
            type: Number
        },

        valor: {
            type: Number
        }
    }

});

const Compra = module.exports = mongoose.model('Compras', CompraSchema);