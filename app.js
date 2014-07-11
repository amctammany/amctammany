var express = require('express'),
    routes = require('./routes'),
    mongoose = require('mongoose'),
    path = require('path');

var app = express();
app.directory = __dirname;

var mongoUrl = 'mongodb://localhost/test';


if (mongoUrl) {
  mongoose.connect(mongoUrl);
  var db = mongoose.connection;
  db.once('open', function () {
    console.log('DB Connection Successful');
  });
}

require('./db');
require('./config/environments')(app);
require('./routes')(app);

module.exports = app;
