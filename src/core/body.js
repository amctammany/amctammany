'use strict';
var plexi = plexi || {};

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

plexi.Body = Body;
