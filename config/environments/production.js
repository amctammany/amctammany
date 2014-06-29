var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

module.exports = function (app) {
  var env = process.env.NODE_ENV;
  if ('production' === env) {
    app.set('port', process.env.PORT || 9000);
    console.log('foobar')
    app.set('views', path.join(app.directory, '/dist/views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.static(path.join(app.directory, 'dist')));
    app.use(bodyParser.urlencoded());
  }
};
