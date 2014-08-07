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
  this.transFn = partial(translate, this.width, this.height);
};

var translate = function (width, height, x, y) {
  return {
    x: (x + 1) / 2 * width,
    y: (y + 1) / 2 * height,
  };
};

Canvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.width, this.height);
};
Canvas.prototype.draw = function (particles) {
  this.clear();
  var ctx = this.ctx;
  var transFn = partial(translate, this.width, this.height);
  particles.forEach(function (p) {
    p.draw(transFn, ctx);
    //ctx.fillRect((p.x + 1) / 2 * width, (p.y + 1) / 2 * height, 10, 10 );

  });
}
Canvas.prototype.drawBodies = function (bodies) {
  this.clear();
  var ctx = this.ctx;
  var transFn = this.transFn;
  bodies.forEach(function (b) {
    b.draw(transFn, ctx);
    //ctx.fillRect((p.x + 1) / 2 * width, (p.y + 1) / 2 * height, 10, 10 );

  });
};;
