module.exports = function (app) {
  require('./demos')(app);
  require('./posts')(app);
  require('./tags')(app);
  app.get('/', function (req, res) {
    res.render('index', {posts: ['hi', 'you', 'guys']});
  });
};
