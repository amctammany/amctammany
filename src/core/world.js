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
 * @function addParticle
 * @memberof World
 * @param Object config - Config object
 */
World.prototype.addParticle = function (config) {
  var p = new Particle(config);
  this.particles.push(p);
  return p;
};

