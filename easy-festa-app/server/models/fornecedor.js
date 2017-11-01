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
        type: String,
        required: true
    },
    tipoPessoa: {
        type: String,
        required: true
    },
    cpf: {
        type: String
    },
    cnpj: {
        type: String
    },

    telefone: {
        type: String,
        required: true
    },

    responsavel: {
        type: String,
        required: true
    },

    generoResponsavel: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    servicosProdutos: {
        type: String,
        required: true
    },

    razaoSocial: {
        type: String,
        required: false
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

const Fornecedor = module.exports = mongoose.model('Fornecedores', FornecedorSchema);