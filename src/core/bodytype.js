'use strict';

var plexi = plexi || {};
/**
 * @class BodyType
 * @param String id - BodyType identifier
 */
var BodyType = function (id, config) {
  this.id = id;
  this.props = [];
  this.constants = {};
  this.children = [];
  for (var key in config) {
    if (key === 'props') {
      this.props = config.props;
    } else if (key === 'paint') {
      this.paint = config.paint;
    } else {
      this.constants[key] = config[key];
    }
  }
  this.constants.minX = this.constants.minX || -1;
  this.constants.maxX = this.constants.maxX || 1;
  this.constants.minY = this.constants.minY || -1;
  this.constants.maxY = this.constants.maxY || 1;
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
  this.children.forEach(function (body) {
    self.draw(canvas, body);
  });
};

plexi.BodyType = BodyType;
