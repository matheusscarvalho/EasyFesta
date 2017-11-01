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
    fornecedor: {
        type: ObjectId,
        ref: 'Fornecedor',
        required: true
    }

});

const Anuncio = module.exports = mongoose.model('Anuncio', AnuncioSchema);