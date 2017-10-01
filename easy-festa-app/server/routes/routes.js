//Importing modules
const express = require('express');
const router = express.Router();

const Anuncio = require('../models/anuncio');
const Evento = require('../models/evento');

// Add headers
router.use(function (req, res, next) {

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
        descricao: req.body.descricao
    })

    NewAnuncio.save((err, anuncio) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o anuncio.' })
        } else {
            res.json({ msg: 'Anúncio adicionado com sucesso' });
        }
    });
})

//Delete Anuncio
router.delete('/anuncio/:id', (req, res, next) => {
    Anuncio.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    })
})

/*
  Eventos
 */
router.get('/eventos', (req, res) => {
  Evento.find( (err, eventos) => {
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

  novoEvento.save( (e,evento) => {
    if(e) {
      res.json({msg: 'Falha ao adicionar evento!'});
    } else {

      res.json({msg: 'Evento adicionado com sucesso!'});

      console.log(evento);
    }
  });
});

router.delete('/evento/:id', (req,res) => {
  Evento.remove({ _id: req.params.id }, (e,result) => {
    if(e) {
      res.json(e);
    } else {
      res.json(result);
    }
  })
});


module.exports = router;
