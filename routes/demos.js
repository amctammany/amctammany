var express = require('express');

module.exports = function (app) {

  var router = express.Router();
  router.get('/', function (req, res) {
    res.render('demos/index', {demos: 'foojA'});
  });

  router.get('/particle', function (req, res) {
    res.render('demos/particle', {demo: 'Particle'});
  });

  router.get('/pendulum', function (req, res) {
    res.render('demos/pendulum', {demo: 'Pendulum'});
  });

  router.get('/d3', function (req, res) {
    res.render('demos/d3', {demo: 'D3'});
  });

  router.get('/pong', function (req, res) {
    res.render('demos/pong', {demo: 'Pong'});
  });

  app.use('/demos', router);

};
