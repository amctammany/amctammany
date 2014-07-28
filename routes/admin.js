'use strict';
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
module.exports = function (app) {

  var User = mongoose.model('User');

  var router = express.Router();
  router.get('/', app.isLoggedIn, function (req, res) {
    res.render('admin/index', {demos: 'foojA'});
  });

  router.get('/login', function (req, res) {
    res.render('admin/login', {demo: 'Particle'});
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.post('/authenticate', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.session.messages = [info.message];
        res.redirect('/admin/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/admin');
      });
    })(req, res, next)
  });

  router.get('/comments', app.isLoggedIn, function (req, res) {
    res.render('admin/comments', {demo: 'Pendulum'});
  });

  app.use('/admin', router);

};
