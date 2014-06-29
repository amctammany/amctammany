'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  tagNames: String,
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
  intro: String,
  content: String,
  urlString: String,
  createdAt: {type: Date, default: Date.now()}
});

PostSchema.pre('save', function (next) {
  if (this.title) {
    this.urlString = this.title.toLocaleLowerCase().replace(/\s+/g, '-');
  }
  this.tagNames = this.tagNames.toLocaleLowerCase();
  this.parseTags(next);
});

PostSchema.methods.parseTags = function (cb) {
  if (!this.tagNames) {return cb();}

  var tagArray = this.tagNames.split(' ');
  this.tags = [];
  var self = this;
  var findOrCreateTag = function (name) {
    mongoose.model('Tag').findOneAndUpdate({name: name}, {name: name}, {upsert: true}, function (err, tag) {
      if (err) {console.log(err);}
      //console.log(tag.posts);
      //console.log(self._id);
      //console.log(tag.posts.indexOf(self._id));
      if (tag.posts.indexOf(self._id) < 0) {
        console.log('Pushing post to tag');
        tag.posts.push(self);
        tag.save();
      }
      self.tags.push(tag);
      if (self.tags.length === tagArray.length) {
        cb();
      }
    });
  };
  tagArray.map(findOrCreateTag);
};

mongoose.model('Post', PostSchema);
