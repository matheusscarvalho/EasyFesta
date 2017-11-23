//Importing modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const Anuncio = require('../models/anuncio');
const Consumidor = require('../models/consumidor');
const Fornecedor = require('../models/fornecedor');
const Evento = require('../models/evento');
const Agendamento = require('../models/agendamento');
const Compra = require('../models/compra');

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

//Fluxo de caixa
router.get('/fluxo/de/caixa/:id', (req, res, next) => {
    let idFornecedor = req.params['id'];

    Compra.aggregate(
        {$match: {fornecedor: ObjectId(idFornecedor)}},
        { $unwind : "$pagamentos"},
        {$group : {_id : { mes: { $month: "$pagamentos.data" }, ano: { $year: "$pagamentos.data" }}, faturamento:{$sum: "$pagamentos.valor"}}}
    ).exec().then(
        callback=>{
            res.json(callback);
        }
    );    
})


//Get Anuncios (Fornecedor)
router.get('/:id/anuncios', (req, res, next) => {
    let idFornecedor = req.params['id'];
    Anuncio.find({fornecedor: idFornecedor},function(err, anuncios) {
        res.json(anuncios);
    })
})

//Get Anuncios (Fornecedor)
router.get('/anuncios', (req, res, next) => {

    Anuncio.find({publicado: "true"},function(err, anuncios) {
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
        segmento: req.body.segmento,
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
            anuncio.segmento = req.body.segmento;
            anuncio.avaliacoes = req.body.avaliacoes;
            anuncio.save();
            res.json({ menssage: "ok" });
        }
    });
});

//Get Agendamentos
router.get('/:id/agendamentos', (req, res, next) => {
    let idUsuario = req.params['id'];
    Agendamento.find({usuario: idUsuario},function(err, agendamentos) {
        Evento.find({consumidor: idUsuario},function(err, eventos){
            let agendamento;
            for(let evento of eventos) {
                agendamento = new Agendamento();
                agendamento._id = idUsuario+evento._id+"";
                agendamento.title = evento.nome;
                agendamento.description = evento.desc;
                agendamento.start = evento.dataevento;
                agendamento.time = evento.hora;
                agendamento.kind = 2;

                agendamentos.push(agendamento);
            }

            res.json(agendamentos);

        })
    })
})

//Add Agendamento
router.post('/agendamento', (req, res, next) => {
    let novoAgendamento = new Agendamento({
        title: req.body.title,
        start: req.body.start,
        description: req.body.description,
        usuario: req.body.usuario,
        time: req.body.time,
        kind: req.body.kind
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
            agendamento.kind = req.body.kind;
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
            Evento.count({ consumidor: id }, function(err, qtd) {
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
                        "fornecedor": fornecedor,
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

Início Compras

*/

//Get Compras por Consumidor
router.get('/consumidor/:id/compras', (req, res, next) => {
    
        Compra.find({ consumidor: req.params.id }, function(err, compras) {
            res.json(compras);
        })
})

router.get('/fornecedor/:id/compras', (req, res, next) => {
    
    Compra.find({ fornecedor: req.params.id },function(err, compras) {
        
        res.json(compras);
    })
})

//add
router.post('/compra', (req, res, next) => {
    let compra = new Compra({
        anuncio: req.body.anuncio,
        consumidor: req.body.consumidor,
        fornecedor: req.body.fornecedor,
        dataEvento: req.body.dataEvento,
        informacoes: req.body.informacoes,
        informacoesEvento: req.body.informacoesEvento,
        quantidade: req.body.quantidade,        
        status: 1
    })

    compra.save((err, novaCompra) => {
        if (err) {
            res.json(err)
        } else {
            res.json({ msg: 'Compra salva com sucesso.' });
        }
    });
});

//Buscar
router.get('/compra/:id', (req, res, next) => {
    let id = req.params.id;
    Compra.findById(id, function(err, compra) {
        if (err) {
            res.json(err)
        } else {
            res.json(compra);
        }
    });
});

//Update
router.post('/compra/editar', (req, res, next) => {
    let id = req.body._id;

    Compra.findById(id, function(err, compra) {
        if (err) {
            res.json(err);

        } else {
            compra.status = req.body.status;
            compra.contrato = req.body.contrato;
            compra.pagamentos =  req.body.pagamentos;
            compra.save();
            res.json({ menssage: "ok" });
        }
    });
});
/*

Fim Compras

*/


/*
  Eventos
 */
router.get('/:id/eventos', (req, res) => {

    let id = req.params['id'];
    Evento.find({consumidor: id},(err, eventos) => {
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
        produtos: req.body.produtos,
        servicos: req.body.servicos,
        segmento: req.body.segmento,
        consumidor: req.body.consumidor
    };

    let novoEvento = new Evento(new_evt);

    novoEvento.save((e, evento) => {
        if (e) {
            res.json({ msg: 'Falha ao adicionar evento!' });
            console.log(e);
        } else {
            res.json({ msg: 'Evento adicionado com sucesso!' });
            
        }
    });
});

//Buscar
router.get('/evento/:id', (req, res, next) => {
  let id = req.params.id;
  Evento.findById(id, function(err, evento) {
    if (err) {
      res.json(err);
      console.log(err);
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
      evento.segmento = req.body.segmento;
      evento.dataevento = req.body.dataevento;
      evento.hora = req.body.hora;
      evento.desc = req.body.desc;
      evento.produtos = req.body.produtos;
      evento.servicos = req.body.servicos;
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

/*
login provisório
*/

router.post('/login/provisorio', (req, res) => {
    let perfil = req.body.perfil;
      
    if(perfil == 'Consumidor') {
        Consumidor.findOne({email: req.body.email, senha: req.body.senha}, function(err, consumidor) {
            let login;
            if(err) {
                res.json(err);
            } else {
                login = consumidor ? consumidor : false;
            }

            res.json({msg: login});
        });
    }
    
    else if (perfil == 'Fornecedor') {
        Fornecedor.findOne({email: req.body.email, senha: req.body.senha}, function(err, fornecedor) {
            let login;
            if(err) {
                res.json(err);
            } else {
                login = fornecedor ? fornecedor: false;
            }

            res.json({msg: login});
        });
    }
});

module.exports = router;
