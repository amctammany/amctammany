'use strict';

var plexi = plexi || {};
/**
 * @class BodyType
 * @param String id - BodyType identifier
 */
var BodyType = function (id, shape, config) {
  this.id = id;
  this.shape = new plexi.Shapes[shape];
  this.shape.applyConfig.call(this, config);
  this.children = [];

  //for (var key in config) {
    //this.constants[key] = config[key];
  //}
  //this.props = [];
  //this.constants = {};
  //for (var key in config) {
    //if (key === 'shape') {
      //this.shape = plexi.Shapes[config.shape];
    //} else if (key === 'props') {
      //this.props = config.props;
    //} else if (key === 'paint') {
      //this.paint = config.paint;
    //} else {
      //this.constants[key] = config[key];
    //}
  //}
};

BodyType.prototype.create = function (config) {
  for (var i = 0, l = this.props.length; i < l; i++) {
    var prop = this.props[i];
    if (!config.hasOwnProperty(prop)) {
      return false;
    }
  }
  var body = new plexi.Body(this, config);
  this.children.push(body);
  return body;
};

BodyType.prototype.draw = function (canvas, body) {
  this.paint.call(body, canvas);
};

BodyType.prototype.drawAll = function (canvas) {
  var self = this;
  //var drawBody = this.draw.bind(this, canvas);
  this.children.forEach(function (body) {
    //drawBody(body);
    self.draw(canvas, body);
  });
};

plexi.BodyType = BodyType;
