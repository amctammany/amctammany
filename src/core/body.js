'use strict';

var Body = function (type, config) {
  plexi.extend(this, type.constants);
  plexi.extend(this, config);

};
Body.prototype.draw = function (transFn, ctx) {
  var pos = transFn(this.x, this.y);
  ctx.beginPath();
  ctx.fillRect(pos.x, pos.y, this.width, this.height);
  ctx.closePath();
};
