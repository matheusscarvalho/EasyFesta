const mongoose = require('mongoose');

const AgendamentoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }

});

const Agendamento = module.exports = mongoose.model('Agendamento', AgendamentoSchema);