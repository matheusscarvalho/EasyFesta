// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({ 'local.email': email }, function(err, user) {

        if (err)
          return done(err);

        if (user) {
          return done(null, false, req.flash('signupMessage', 'E-mail já cadastrado. Escolher outro'));
        } else {

          var novoUsuario  = new User();
          novoUsuario.local.nome = req.body.nome;
          novoUsuario.local.email = email;
          novoUsuario.local.password = novoUsuario.generateHash(password);

          // save the user
          novoUsuario.save(function(err) {
            if (err) {
              throw err;
            } else {
              console.log('Perfil criado com sucesso');
              console.log(req.body);
            }

            return done(null, novoUsuario);
          });
        }

      });

    }));


  passport.use('local', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) {
          console.log('Erro de login!!');
          console.loog(err);
          return done(err);
        }

        if (!user)
          return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));

        if (!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Senha incorreta!'));

        return done(null, user);
      });

    }));

};
