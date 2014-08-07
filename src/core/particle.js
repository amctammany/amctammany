'use strict';
var plexi = plexi || {};
/**
 * @class Particle
 * @param {Object} config - Config object
 */

var Particle = function (config) {
  config = config || {};
  this.x = config.x || 0;
  this.y = config.y || 0;
  this.mass = config.mass || 1;
  this.velocity = config.velocity || new plexi.Vec2(0, 0);
  //this.current = {
    //x: 0,
    //y: 0
  //};
  //this.previous = {
    //x: 0,
    //y: 0
  //};
};

/**
 * @function update
 * @memberof Particle
 * @param {float} delta - Time step
 */
Particle.prototype.update = function (delta) {
  this.x += this.velocity.x * delta;
  this.y += this.velocity.y * delta;

  if (this.x < -1 || this.x > 1) {
    this.velocity.x *= -1;
  }
  if (this.y < -1 || this.y > 1) {
    this.velocity.y *= -1;
  }
};

/**
 * @function draw
 * @memberof Particle
 * @param {CanvasRenderingContext2D} ctx - Canvas context to draw to
 */

Particle.prototype.draw = function (transFn, ctx) {
  var pos = transFn(this.x, this.y);

  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 15, 0, 6.28, 0);
  ctx.closePath();
  ctx.fill();
};

plexi.Particle = Particle;
