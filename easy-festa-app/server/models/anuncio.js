const mongoose = require('mongoose');

ObjectId = mongoose.Schema.ObjectId;

const AnuncioSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    publicado: {
        type: Boolean,
        required: true
    },

    tipo: {
        type: Number,
        required: true
    },

    segmento: {
        type: Number,
        required: true
    },

    fornecedor: {
        type: ObjectId,
        ref: 'Fornecedor',
        required: true
    },
    avaliacoes: [{
        nota: {
            type: Number,
            required: true
        },
        comentario: {
            type: String,
            required: true
        },
        novaCompra: {
            type: Boolean,
            required: true
        },
        compra: {
            type: ObjectId,
            //ref: 'Fornecedor',           
            required: false
        },
        data: {
            type: Date,
            default: new Date()
        }
    }]

});

const Anuncio = module.exports = mongoose.model('Anuncio', AnuncioSchema);