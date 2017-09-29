const mongoose = require('mongoose');

const EventoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String
  }
});


const Evento = module.exports = mongoose.model('Evento', EventoSchema);
