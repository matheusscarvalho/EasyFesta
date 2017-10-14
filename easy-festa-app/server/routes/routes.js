//Importing modules
const express = require('express');
const router = express.Router();

const Anuncio = require('../models/anuncio');
const Consumidor = require('../models/consumidor');
const Fornecedor = require('../models/fornecedor');
const Evento = require('../models/evento');
const Agendamento = require('../models/agendamento');

// Add headers
router.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Get Anuncios
router.get('/anuncios', (req, res, next) => {

    Anuncio.find(function(err, anuncios) {
        res.json(anuncios);
    })
})

//Add Anuncio
router.post('/anuncio', (req, res, next) => {
    let NewAnuncio = new Anuncio({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado,
        tipo: req.body.tipo
    })

    NewAnuncio.save((err, anuncio) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o anuncio.' })
        } else {
            res.json({ msg: 'Anúncio adicionado com sucesso' });
        }
    });
});

//Delete Anuncio
router.delete('/anuncio/:id', (req, res, next) => {
    Anuncio.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

//Buscar Anuncio
router.get('/anuncio/:id', (req, res, next) => {
    let id = req.params.id;
    Anuncio.findById(id, function(err, anuncio) {
        if (err) {
            res.json(err)
        } else {
            res.json(anuncio);
        }
    });
});

//Update Anuncio
router.post('/anuncio/editar', (req, res, next) => {
    let id = req.body._id;

    Anuncio.findById(id, function(err, anuncio) {
        if (err) {
            res.json(err);


        } else {
            anuncio.titulo = req.body.titulo;
            anuncio.descricao = req.body.descricao;
            anuncio.publicado = req.body.publicado;
            anuncio.tipo = req.body.tipo;
            anuncio.save();
            res.sendStatus(200);
        }
    });
});

//Get Agendamentos
router.get('/agendamentos', (req, res, next) => {

    Agendamento.find(function(err, agendamentos) {
        res.json(agendamentos);
    })
})

//Add Agendamento
router.post('/agendamento', (req, res, next) => {
    let novoAgendamento = new Agendamento({
        title: req.body.title,
        date: req.body.date
    })

    novoAgendamento.save((err, agendamento) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o agendamento.' })
        } else {
            res.json({ msg: 'Agendamento adicionado com sucesso' });
        }
    });
});

//Add Consumidor
router.post('/consumidor', (req, res, next) => {
    let novoConsumidor = new Consumidor({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })

    novoConsumidor.save((err, consumidor) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o consumidor.' })
        } else {
            res.json({ msg: 'Consumidor adicionado com sucesso' });
        }
    });
});

//Add Fornecedor
router.post('/fornecedor', (req, res, next) => {
    let novoFornecedor = new Fornecedor({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    })

    novoFornecedor.save((err, fornecedor) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o fornecedor.' })
        } else {
            res.json({ msg: 'Fornecedor adicionado com sucesso' });
        }
    });
});

/*
  Eventos
 */
router.get('/eventos', (req, res) => {
    Evento.find((err, eventos) => {
        res.json(eventos);
    })
});

router.post('/evento', (req, res) => {
    let new_evt = {
        convidados: req.body.convidados,
        desc: req.body.desc,
        nome: req.body.nome,
        tipo: "EVENTO",
        dataevento: req.body.dataevento,
        hora: req.body.hora
    };

    console.log(req.body);

    let novoEvento = new Evento(new_evt);

    novoEvento.save((e, evento) => {
        if (e) {
            res.json({ msg: 'Falha ao adicionar evento!' });
        } else {

            res.json({ msg: 'Evento adicionado com sucesso!' });

            console.log(evento);
        }
    });
});

router.delete('/evento/:id', (req, res) => {
    Evento.remove({ _id: req.params.id }, (e, result) => {
        if (e) {
            res.json(e);
        } else {
            res.json(result);
        }
    })
});


module.exports = router;