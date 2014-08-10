'use strict';
var plexi = plexi || {};
/**
 * @class World
 * @property Array bodies - Particle array
 * @property Array forces - Global force array
 * @property Array behaviors - Global behavior array
 * @property float damping - Global damping coefficient
 */

var World = function () {
  this.bodies = [];
  this.forces = [];
  this.behaviors = [];
  this.damping = 0.00;
};

/**
 * @function reset
 * @memberof World
 */
World.prototype.reset = function () {
  //this.particles = [];
};

/**
 * @function addBody
 * @memberof World
 * @param Body body - Game Body => created from game.addBody()
 */
World.prototype.addBody = function (body) {
  this.bodies.push(body);
  return body;
};

plexi.World = World;
