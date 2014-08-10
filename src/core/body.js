'use strict';
var plexi = plexi || {};

/**
 * @class Body
 * Main game body
 * @constructor
 * @param {String} type - BodyType Identifier
 * @param {Object} config - Body configuration object
 */

var Body = function (type, config) {
  plexi.extend(this, type.constants);
  plexi.extend(this, config);

};

Body.prototype.update = function (delta) {
  if (this.vx && this.vy) {
    this.x = this.x + this.vx * delta;
    this.y = this.y + this.vy * delta;

    if (this.x > 1 || this.x < -1) {
      this.vx *= -1;
    }
    if (this.y > 1 || this.y < -1) {
      this.vy *= -1;
    }
  }
};

/**
 * @function shift
 * @memberof Body
 * @instance
 * @param {float} dx - Horizontal Shift
 * @param {float} dy - Vertical Shift
 * @returns {Body}
 */
Body.prototype.shift = function (dx, dy) {
  if (this.x + dx > this.maxX || this.x + dx < this.minX || this.y + dy > this.maxY || this.y + dy < this.minY) {
    console.log('out of bounds');
    return this;
  }
  this.x += dx;
  this.y += dy;
  return this;
};

plexi.Body = Body;
