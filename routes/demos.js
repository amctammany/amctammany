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

  app.use('/demos', router);

};
