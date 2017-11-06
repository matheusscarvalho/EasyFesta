//Importing modules
const express = require('express');
const router = express.Router();

const Anuncio = require('../models/anuncio');
const Consumidor = require('../models/consumidor');
const Fornecedor = require('../models/fornecedor');
const Evento = require('../models/evento');
const Agendamento = require('../models/agendamento');
const Contrato = require('../models/contrato');

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
        tipo: req.body.tipo,
        fornecedor: req.body.fornecedor
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
            anuncio.avaliacoes = req.body.avaliacoes;
            anuncio.save();
            res.json({ menssage: "ok" });
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
        start: req.body.start,
        description: req.body.description,
        time: req.body.time
    })

    novoAgendamento.save((err, agendamento) => {
        if (err) {

            res.json(err);
        } else {
            res.json({ msg: 'Agendamento adicionado com sucesso' });
        }
    });
});

//Update Anuncio
router.post('/agendamento/editar', (req, res, next) => {
    let id = req.body._id;

    Agendamento.findById(id, function(err, agendamento) {
        if (err) {
            res.json(err);

        } else {
            agendamento.title = req.body.title;
            agendamento.start = req.body.start;
            agendamento.time = req.body.time;
            agendamento.description = req.body.description;
            agendamento.save();
            res.json({ menssage: "ok" });
        }
    });
});

//Delete Agendamento
router.delete('/agendamento/:id', (req, res, next) => {
    Agendamento.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

//Add Consumidor
router.post('/consumidor', (req, res, next) => {

    let novoConsumidor = new Consumidor({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        genero: req.body.genero,
        nascimento: req.body.nascimento,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        endereco: req.body.endereco
    })

    novoConsumidor.save((err, consumidor) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o consumidor.' })
        } else {
            res.json({ msg: 'Consumidor adicionado com sucesso' });
        }
    });
});


//Buscar Consumidor
router.get('/consumidor/:id', (req, res, next) => {
    let id = req.params.id;
    Consumidor.findById(id, function(err, consumidor) {
        if (err) {
            res.json(err)
        } else {
            let informacoesConsumidor;
            Evento.count({ fornecedor: id }, function(err, qtd) {
                if (err) {
                    res.json(err)
                } else {
                    informacoesConsumidor = {
                        "consumidor": consumidor,
                        "qtdEventos": qtd
                    };

                    res.json(informacoesConsumidor);

                }
            });

        }
    });
});

//Delete Consumidor
router.delete('/consumidor/:id', (req, res, next) => {
    Consumidor.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

//Add Fornecedor
router.post('/fornecedor', (req, res, next) => {
    let novoFornecedor = new Fornecedor({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        cnpj: req.body.cnpj,
        razaoSocial: req.body.razaoSocial,
        responsavel: req.body.responsavel,
        generoResponsavel: req.body.generoResponsavel,
        descricao: req.body.descricao,
        servicosProdutos: req.body.servicosProdutos,
        tipoPessoa: req.body.tipoPessoa,
        endereco: req.body.endereco


    })

    novoFornecedor.save((err, fornecedor) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o fornecedor.' })
        } else {
            res.json({ msg: 'Fornecedor adicionado com sucesso' });
        }
    });
});

//Delete Consumidor
router.delete('/consumidor/:id', (req, res, next) => {
    Consumidor.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

//Delete Fornecedor
router.delete('/fornecedor/:id', (req, res, next) => {
    Fornecedor.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

//Buscar Fornecedor
router.get('/fornecedor/:id', (req, res, next) => {
    let id = req.params.id;
    Fornecedor.findById(id, function(err, fornecedor) {
        if (err) {
            res.json(err)
        } else {
            let informacoesFornecedor;
            Anuncio.count({ fornecedor: id }, function(err, qtd) {
                if (err) {
                    res.json(err)
                } else {
                    informacoesFornecedor = {
                        "consumidor": fornecedor,
                        "qtdAnuncios": qtd
                    };

                    res.json(informacoesFornecedor);

                }
            });

        }
    });
});

//Update Consumidor
router.post('/consumidor/editar', (req, res, next) => {
    let id = req.body._id;
    Consumidor.findById(id, function(err, consumidor) {
        if (err) {
            res.json(err);

        } else {
            consumidor.nome = req.body.nome;
            consumidor.email = req.body.email;
            consumidor.senha = req.body.senha;
            consumidor.telefone = req.body.telefone;
            consumidor.cpf = req.body.cpf;
            consumidor.genero = req.body.genero;
            consumidor.endereco = req.body.endereco;

            consumidor.save();
            res.json({ "message": "ok" });
        }
    });
});

//Update Fornecedor
router.post('/fornecedor/editar', (req, res, next) => {
    let id = req.body._id;
    Fornecedor.findById(id, function(err, fornecedor) {
        if (err) {
            res.json(err);

        } else {
            fornecedor.nome = req.body.nome;
            fornecedor.email = req.body.email;
            fornecedor.senha = req.body.senha;
            fornecedor.telefone = req.body.telefone;
            fornecedor.cpf = req.body.cpf;
            fornecedor.cnpj = req.body.cnpj;
            fornecedor.razaoSocial = req.body.razaoSocial;
            fornecedor.responsavel = req.body.responsavel;
            fornecedor.generoResponsavel = req.body.generoResponsavel;
            fornecedor.descricao = req.body.descricao;
            fornecedor.servicosProdutos = req.body.servicosProdutos;
            fornecedor.tipoPessoa = req.body.tipoPessoa;
            fornecedor.endereco = req.body.endereco;

            fornecedor.save();
            res.json({ "message": "ok" });
        }
    });
});

/*

Início contrato

*/
router.post('/contrato', (req, res, next) => {
    let contrato = new Contrato({
        texto: req.body.texto,
        status: req.body.status
    })

    contrato.save((err, novoContrato) => {
        if (err) {
            res.json({ msg: 'Falha ao adicionar o contrato.' })
        } else {
            res.json({ id: novoContrato._id });
        }
    });
});

//Delete
router.delete('/contrato/:id', (req, res, next) => {
    Contrato.remove({ _id: req.params.id }, function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    });
});

//Buscar
router.get('/contrato/:id', (req, res, next) => {
    let id = req.params.id;
    Contrato.findById(id, function(err, contrato) {
        if (err) {
            res.json(err)
        } else {
            res.json(contrato);
        }
    });
});

//Update Contrato
router.post('/contrato/editar', (req, res, next) => {
    let id = req.body._id;

    Contrato.findById(id, function(err, contrato) {
        if (err) {
            res.json(err);

        } else {
            contrato.texto = req.body.texto;
            contrato.status = req.body.status;
            contrato.save();
            res.json({ menssage: "ok" });
        }
    });
});
/*

Fim contrato

*/


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
        hora: req.body.hora,
        consumidor: new Consumidor()
    };

    console.log(req.body);

    let novoEvento = new Evento(new_evt);

    novoEvento.save((e, evento) => {
        if (e) {
            res.json({ msg: 'Falha ao adicionar evento!' });
            console.log(e);
        } else {
            res.json({ msg: 'Evento adicionado com sucesso!' });
            console.log(evento);
        }
    });
});

//Buscar
router.get('/evento/:id', (req, res, next) => {
  let id = req.params.id;
  Evento.findById(id, function(err, evento) {
    if (err) {
      res.json(err)
    } else {
      res.json(evento);
    }
  });
});

router.post('/evento/editar', (req, res, next) => {
  let id = req.body._id;

  Evento.findById(id, function(err, evento) {
    if (err) {
      res.json(err);

    } else {
      evento.nome = req.body.nome;
      evento.desc = req.body.desc;
      evento.save();
      res.json({ menssage: "ok, evento editado! .. " });
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
