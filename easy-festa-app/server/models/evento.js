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

const EventoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  nome: {
    type: String
  },
  tipo: {
    type: String
  }
});


const Evento = module.exports = mongoose.model('Evento', EventoSchema);
