var mongoose = require('mongoose');
module.exports = function (app) {
  var Post = mongoose.model('Post');
  var Tag = mongoose.model('Tag');
  require('./demos')(app);
  require('./posts')(app);
  require('./tags')(app);
  require('./projects')(app);
  var postsQuery = Post.find({}).populate('tags');
  var tagsQuery = Tag.find({});
  var resources = {
    posts: postsQuery.exec.bind(postsQuery),
    tags: tagsQuery.exec.bind(tagsQuery),
  };

  // GET /posts => Index
  app.get('/', function (req, res) {
    res.redirect('/posts');
  });

  //app.get('/', function (req, res) {
    //res.render('index', {posts: ['hi', 'you', 'guys']});
  //});
};
