var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    mongoose = require('mongoose');

module.exports = function (app, passport) {
  var env = process.env.NODE_ENV || 'development';
  if ('development' === env) {

    app.use(function staticsPlaceholder(req, res, next) {
        return next();
    });

    console.log('dev');
    app.set('port', process.env.PORT || 9000);
    app.set('views', path.join(app.directory, '/app/views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use('/', express.static(path.join(app.directory, 'app')));
    app.use('/src', express.static(path.join(app.directory, 'src')));
    app.use('/doc', express.static(path.join(app.directory, 'doc')));
    app.use(cookieParser());
    app.use(bodyParser());

    app.use(session({secret: 'mysupersecretpassword'}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function middlewarePlaceholder(req, res, next) {
      return next();
    });

  }
};
