'use strict';

var plexi = plexi || {};


var Rectangle = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

Rectangle.prototype.applyConfig = function (config) {

  this.props = ['x', 'y'];
  var constants = {};
  for (var key in config) {
    constants[key] = config[key];
  }

  this.paint = function (canvas) {
    canvas.drawRect(this.x, this.y, constants.width, constants.height);
  };
  this.constants = constants;
};

plexi.Shapes.rect = Rectangle;
