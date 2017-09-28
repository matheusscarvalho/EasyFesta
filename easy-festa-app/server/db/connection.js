'use strict';

// dependencies
const mongoose = require('mongoose');

// set the database name
const dbName = 'easyfesta';

// connect to the database
mongoose.connect(`mongodb://matheus:12345@ds137054.mlab.com:37054/${dbName}`);

// get notified if the connection
// was successful or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});