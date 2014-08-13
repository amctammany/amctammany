'use strict';

var plexi = plexi || {};

//var Circle = plexi.createShape('circle', {

//})
var Circle = function (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
};

Circle.prototype.applyConfig = function (config) {
  this.props = ['x', 'y'];
  var constants = {};
  for (var key in config) {
    constants[key] = config[key];
  }
  this.paint = function (canvas) {
    canvas.drawCircle(this.x, this.y, constants.radius);
  };
  this.constants = constants;

};

plexi.Shapes.circle = Circle;
