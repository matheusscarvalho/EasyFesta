const mongoose = require('mongoose');

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
    }

});

const Anuncio = module.exports = mongoose.model('Anuncio', AnuncioSchema);