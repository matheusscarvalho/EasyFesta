const mongoose = require('mongoose');

const AgendamentoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    start: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    }

});

const Agendamento = module.exports = mongoose.model('Agendamento', AgendamentoSchema);