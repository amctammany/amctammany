'use strict';
var plexi = plexi || {};
var translate = function (width, height, x, y) {
  return {
    x: (x + 1) / 2 * width,
    y: (y + 1) / 2 * height,
  };
};

var Canvas = function (name, config) {
  this.name = name;
  this.canvas = document.getElementById(name);
  this.ctx = this.canvas.getContext('2d');
  this.$parent = $(this.canvas).parent();
  this.fullHeight = config.fullHeight;
  this.fullWidth = config.fullWidth;
  this.aspect = this.fullWidth / this.fullHeight || config.aspect || 0.66;
  //$.extend(this, config, true);
  this.reset();
};

Canvas.prototype.reset = function () {
  this.width = this.fullWidth || this.$parent.width() - 20;
  this.canvas.width = this.width;

  this.height = this.fullHeight || this.width * this.aspect;
  this.canvas.height = this.height;
  //this.ctx.scale(0.4, 0.4);
  this.transFn = plexi.partial(translate, this.width, this.height);
};


Canvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
};
Canvas.prototype.drawRect = function (x, y, width, height) {
  var pos = this.transFn(x, y);
  this.ctx.beginPath();
  this.ctx.rect(pos.x, pos.y, width, height);
  this.ctx.closePath();
  this.ctx.fill();
};

Canvas.prototype.drawCircle = function (x, y, radius) {
  var pos = this.transFn(x, y);
  this.ctx.beginPath();
  this.ctx.arc(pos.x, pos.y, radius, 0, 6.28, 0);
  this.ctx.fillStyle = 'black';
  this.ctx.closePath();
  this.ctx.fill();
};

plexi.Canvas = Canvas;
