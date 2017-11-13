/*
Requisitos que deve atender
* Implementar
* RIHC 1
* Ações de cadastro, alteração, pesquisa e classificação devem disparar notificações de sucesso
  ou insucesso após sua realização.
* */

/*
 * RINF11 - Mostrar a quantidade de eventos realizados e a realizar no mês corrente.
 * */
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

const EventoSchema = mongoose.Schema({
    dataevento: { type: Date, default: Date.now },
    hora: { type: String },
    nome: { type: String },
    tipo: { type: String },
    desc: { type: String },
    consumidor: {
        type: ObjectId,
        ref: "Consumidor",
        required: true
    },
    convidados: { type: Number },
    segmento: { type: Number },
    produtos: [{
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        preco: {
            type: Number,
            required: true
        },
        quantidade: {
            type: Number,
            required: true
        },
        check: {
            type: Boolean,
            required: false
        }
    }],
    servicos: [{
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        preco: {
            type: Number,
            required: true
        },
        check: {
            type: Boolean,
            required: false
        }
    }],

});


const Evento = module.exports = mongoose.model('Evento', EventoSchema);