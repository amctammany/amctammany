'use strict';

var Particle = function (config) {
  config = config || {};
  this.x = config.x || 0;
  this.y = config.y || 0;
  this.mass = config.mass || 1;
  this.velocity = config.velocity || new Vec2(0, 0);
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
 * @param {float} delta - Time step
 */
Particle.prototype.update = function (delta) {
  this.x += this.velocity.x * delta;
  this.y += this.velocity.y * delta;

  if (this.x < 0) {
    this.velocity.x *= -1;
  }
  if (this.y < 0) {
    this.velocity.y *= -1;
  }
};

/**
 * @function draw
 * @memberof Particle
 * @param {CanvasRenderingContext2D} ctx - Canvas context to draw to
 */

Particle.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 15, 0, 6.28, 0);
  ctx.closePath();
  ctx.fill();
};

