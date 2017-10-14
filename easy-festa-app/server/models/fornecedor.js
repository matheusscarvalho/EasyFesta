const mongoose = require('mongoose');

const FornecedorSchema = mongoose.Schema({
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

const Fornecedor = module.exports = mongoose.model('Fornecedores', FornecedorSchema);