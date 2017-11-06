//Importing modules
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

//Database connection
require('./db/connection');

var app = express();

//Port number
const port = 3000;

//Body-parser
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(cookieParser());
app.use(bodyParser());

require('./config/passport')(passport);

app.use(session({ secret: 'pass_local_fest' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// Statics
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');

const route = require('./routes/routes.ts');

//Routes
app.use('/api', route);

app.get('/', (req, res) => {
    res.send('Easy Festa\'s running!');
});

app.listen(port, () => {
    console.log('Server started at port: ' + port);
});


app.get('/perfil', userEstaLogado, function(req, res) {
  res.render('perfil.ejs', {
    user: req.user // passa usuario para o template
  });
});

app.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.get('/registrar', (req, res) => {
  res.render('registrar', { message: req.flash('signupMessage') });
});

app.post('/registrar', passport.authenticate('local-signup', {
  successRedirect : '/perfil',
  failureRedirect : '/',
  failureFlash : true
}));

app.post('/login', passport.authenticate('local', {
  successRedirect : '/perfil',
  failureRedirect : '/login',
  failureFlash : true
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function userEstaLogado(req, res, next) {

  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
