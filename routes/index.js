module.exports = function (app) {
  require('./posts')(app);
  app.get('/', function (req, res) {
    res.render('index', {posts: ['hi', 'you', 'guys']});
  });
};
