'use strict';

var mongoose = require('mongoose'),
    express = require('express'),
    Showdown = require('showdown'),
    converter = new Showdown.converter();

module.exports = function (app) {
  var Post = mongoose.model('Post');
  var Tag = mongoose.model('Tag');

  function cullTags () {
    Tag.find()
      .populate('posts')
      .exec(function (err, tags) {
        tags.forEach(function (tag) {
          var oldTags = tag.posts;
          var newTags = tag.posts.filter(function(t) { return t.id;});

          if (tag.posts.length === 0) {
            console.log('Tag: ' + tag + ' has no posts ');
            tag.remove(function (err, removedTag) {
              //console.log(removedTag);
            });
          }
        });
      });
  }

  var router = express.Router();

  // GET /posts => Index
  router.get('/', function (req, res) {
    Post.find()
      .populate('tags')
      .exec(function (err, posts) {
        if (err) { console.log(err); }
        res.render('posts/index', {posts: posts});
      });
  });

  // GET /posts/new => New
  router.get('/new', function (req, res) {
    res.render('posts/new', {post: 'foo'});
  });
  // GET /posts/id/edit => Edit
  router.get('/:id/edit', function (req, res) {
    Post.findOne({urlString: req.params.id})
      .populate('tags')
      .exec(function (err, post) {
        if (err) { console.log(err); }
        res.render('posts/edit', {post: post, content: converter.makeHtml(post.content)})
      });
  });

  // GET /posts/id => Show
  router.get('/:id', function (req, res) {
    Post.findOne({urlString: req.params.id})
      .populate('tags')
      .exec(function (err, post) {
        if (err) { console.log(err); }
        res.render('posts/show', {post: post, content: converter.makeHtml(post.content)})
      });
  });


  // DEL /posts/id => Remove
  router.delete('/:id',  function (req, res) {
    Post.findOneAndRemove({urlString: req.params.id})
      .populate('tags')
      .exec(function (err, post) {
        post.populate('tags');
        if (err) { console.log(err); }
        post.tags.forEach(function (tag) {
          console.log('removing tag:' + tag.name);
          tag.posts.splice(tag.posts.indexOf(post._id, 1));
          tag.save();
        });
        res.send(post);
      });
    cullTags();
  });

  // POST /posts => Create
  router.post('/', function (req, res) {
    console.log(req.body);
    var post = new Post(req.body);
    post.save(function (err) {
      if (err) { console.log(err); }
      res.redirect('/posts/' + post.urlString);
    });
  });

  // POST /posts/id => Update
  router.post('/:id', function (req, res) {
    console.log('update');
    Post.findOne({urlString: req.params.id}, function (err, post) {
      if (err) {console.log(err);}
      post.title = req.body.title;
      post.tagNames = req.body.tagNames.toLowerCase();
      post.intro = req.body.intro;
      post.content = req.body.content;

      post.save(function (err) {
        if (err) { console.log(err); }
        res.redirect('/posts/' + post.urlString);
      });
    });
    cullTags();
  });

  app.use('/posts', router);

};
