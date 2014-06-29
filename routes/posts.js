'use strict';

var mongoose = require('mongoose'),
    express = require('express');

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
        res.send(posts);
      });
  });

  // GET /posts/id => Show
  router.get('/:id', function (req, res) {
    Post.findOne({urlString: req.params.id})
      .populate('tags')
      .exec(function (err, post) {
        if (err) { console.log(err); }
        res.send(post);
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
    var post = new Post(req.body);
    post.save(function (err) {
      if (err) { console.log(err); }
      res.send(post);
    });
  });

  // PUT /posts/id => Update
  router.put('/:id', function (req, res) {
    Post.findOne({urlString: req.params.id}, function (err, post) {
      if (err) {console.log(err);}

      post.title = req.body.title;

      post.tagNames = req.body.tagNames.toLowerCase();

      post.intro = req.body.intro;
      post.content = req.body.content;

      post.save(function (err) {
        if (err) { console.log(err); }
        res.send(post);
      });
    });
    cullTags();
  });

  app.use('/posts', router);

};
