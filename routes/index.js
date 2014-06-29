module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {posts: ['hi', 'you', 'guys']});
  });
  app.get('/posts', function (req, res) {
    res.render('posts/index', {posts: ['hi', 'you', 'guys']});
  });
};
