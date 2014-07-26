var mongoose = require('mongoose');
module.exports = function (app) {
  var Post = mongoose.model('Post');
  require('./demos')(app);
  require('./posts')(app);
  require('./tags')(app);
  require('./projects')(app);
  // GET /posts => Index
  app.get('/', function (req, res) {
    Post.find()
      .populate('tags')
      .exec(function (err, posts) {
        if (err) { console.log(err); }
        res.render('posts/index', {posts: posts});
      });
  });

  //app.get('/', function (req, res) {
    //res.render('index', {posts: ['hi', 'you', 'guys']});
  //});
};
