var express = require('express');

module.exports = function (app) {

  var router = express.Router();
  router.get('/', function (req, res) {
    res.render('projects/index', {projects: ['Scrabble', 'Plexi']});
  });

  router.get('/scrabble', function (req, res) {
    res.render('projects/scrabble', {project: 'Scrabble'});
  });

  router.get('/plexi', function (req, res) {
    res.render('projects/plexi', {project: 'Plexi'});
  });

  app.use('/projects', router);

};
