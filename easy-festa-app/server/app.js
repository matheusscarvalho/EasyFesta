//Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
const route = require('./routes/routes.js');

//Database connection
require('./db/connection');

var app = express();

//Port number
const port = 3000;

//Body-parser
app.use(bodyparser.json());

//Statics
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api', route);

//Testing
app.get('/', (req, res) => {
    res.send('certo');
})


app.listen(port, () => {
    console.log('Server started at port: ' + port);
});