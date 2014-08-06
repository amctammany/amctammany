'use strict';

/**
 * @class World
 * @property Array particles - Particle array
 * @property Array forces - Global force array
 * @property Array behaviors - Global behavior array
 * @property float damping - Global damping coefficient
 */

var World = function () {
  this.particles = [];
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
  this.particles = [];
};

/**
 * @function addBody
 * @memberof World
 * @param Body body - Game Body => created from game.addBody()
 */
World.prototype.addBody = function (body) {
  this.bodies.push(body);
  return body;
}

/**
 * @function addParticle
 * @memberof World
 * @param Object config - Config object
 */
World.prototype.addParticle = function (config) {
  var p = new Particle(config);
  this.particles.push(p);
  return p;
};

