'use strict';

var Canvas = function (name, config) {
  this.name = name;
  this.canvas = document.getElementById(name);
  this.ctx = this.canvas.getContext('2d');
  this.$parent = $(this.canvas).parent();
  this.aspect = config.aspect || 0.66;
  //$.extend(this, config, true);
  this.reset();

};

Canvas.prototype.reset = function () {
  this.width = this.$parent.width() - 20;
  this.canvas.width = this.width;

  this.height = this.width * this.aspect;
  this.canvas.height = this.height;
};

Canvas.prototype.draw = function (particles) {
  var ctx = this.ctx;
  var width = this.width, height = this.height;
  ctx.clearRect(0, 0, width, height);
  particles.forEach(function (p) {
    ctx.fillRect((p.x + 1) / 2 * width, (p.y + 1) / 2 * height, 10, 10 );

  });
};
