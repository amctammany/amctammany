'use strict';

var $;
var plexi = plexi || {};
/**
 * @class Game
 * @param {String} id - DOM Identifier
 */

var Game = function (id) {
  this.id = id;
  this._vars = {};
  this._actions = {};
  this._canvii = {};
  this._bodyTypes = {};
  this._world = new plexi.World();
  if ($ !== undefined) {
    this.$div = $('#' + id);
  }
};

/**
 * Declares a key:value object as game varibles
 * @function vars
 * @memberof Game
 * @param {Object} vars
 */
Game.prototype.vars = function (vars) {
  for (var key in vars) {
    this._vars[key] = vars[key];
  }
};

/**
 * Variable getter/setter
 * @function var
 * @memberof Game
 * @param {String} name
 * @param {Anything} value - Optional
 */
Game.prototype.var = function (name, value) {
  if (value === undefined) {
    return this._vars[name];
  } else {
    this._vars[name] = value;
  }
};
/**
 * @function controls
 * @memberof Game
 * @param {Object} bindings
 */
Game.prototype.controls = function (bindings) {
  for (var key in bindings) {
    var v = bindings[key];
    var d = this.$div.find('#' + key);
    d.val(this._vars[v]);
    //console.log(d)
  }
};
/**
 * @function actions
 * @memberof Game
 * @param {Object} bindings
 */
Game.prototype.actions = function (bindings) {
  for (var key in bindings) {
    var v = bindings[key];
    this._actions[key] = v;
  }
  var self = this;
  this.$div.on('click', '.btn', function () {

    self._actions[$(this).attr('id')](self);
  });
};


/**
 * @function canvas
 * @memberof Game
 * @param {String} id - Canvas Identifier
 * @param {Object} properties - Canvas Properties
 */
Game.prototype.canvas = function (name, properties) {
  //var canvas = document.getElementById(name);
  //var $parent = $(canvas).parent();
  //canvas.width = $parent.width() - 20;
  //this.width = canvas.width;

  //canvas.height = ($parent.width() - 20) * 0.66;
  //this.height = canvas.height;

  //var ctx = canvas.getContext('2d');
  //this._canvii[name] = {
    //$parent: $parent,
    //canvas: canvas,
    //ctx: ctx,
  //};
  //$.extend(this._canvii[name], properties);
  //this.mainCanvas = name;
  //
  var canvas = new plexi.Canvas(name, properties);
  this._canvii[name] = canvas;
  this.mainCanvas = canvas;
};

/**
 * @function bootstrap
 * @memberof Game
 * @param {Function} cb - Initialization Callback
 */
Game.prototype.bootstrap = function (cb) {
  this.bootstrapFn = cb.bind(this);
  this.restart();
};

Game.prototype.restart = function () {
  this.stop();
  this.reset();
  this.bootstrapFn();
};

Game.prototype.reset = function () {
  this._world.reset();
};

/**
 * @function addParticle
 * @memberof Game
 * @param {Object} config - Particle Intrinsic Properties
 */
Game.prototype.addParticle = function (config) {
  return this._world.addParticle(config);
  //var p = new Particle(config);
  //this._particles.push(p);
  //return p;
};

/**
 * @function draw
 * @memberof Game
 */
Game.prototype.draw = function (canvas) {
  this.mainCanvas.draw(this._world.particles);
  //var ctx = this._canvii[canvas].ctx;
  //this._particles.forEach(function (p) {
    //p.draw(ctx);
  //});
};

/**
 * @function update
 * @memberof Game
 * @param {float} delta - Time step
 */
Game.prototype.update = function (delta) {
  //this._world.particles.forEach(function (p) {
    //p.update(delta);
  //});
  this._world.bodies.forEach(function (b) {
    b.update(delta);
  });
};


//Game.prototype.clear = function (canvas) {
  //var ctx = this._canvii[canvas].ctx;
  //ctx.clearRect(0, 0, 10000, 10000);
//};

Game.prototype.animate = function animate (time) {
  var self = this;
  this.update(0.1);
  var canvas = this.mainCanvas;
  canvas.clear();
  for (var type in this._bodyTypes) {
    this._bodyTypes[type].drawAll(canvas);
  }
  //this.mainCanvas.drawBodies(this._world.bodies);
  this.animationFrame = window.requestAnimationFrame(function (time) {
    self.animate.call(self, time);
  });

};
Game.prototype.step = function (delta) {
  this.update(delta);
  this.mainCanvas.draw(this._world.particles);
};

Game.prototype.start = function () {
  //animFn = animate.bind(null, this, this.mainCanvas);

  if (this.animationFrame) {
    return;
  }
  this.animate();
  //window.requestAnimationFrame(animFn);
  //animate(this, this.mainCanvas)
  //this.animate(this.mainCanvas);
};

Game.prototype.stop = function () {
  if (this.animationFrame) {
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }
};

/**
 * @function defineBodyType
 * @memberof Game
 * @param String id - Unique string identifier
 * @param Object config - Body definition object
 */
Game.prototype.defineBodyType = function (id, config) {
  this._bodyTypes[id] = new plexi.BodyType(id, config);
  return this._bodyTypes[id];

};

/**
 * @function addBody
 * @memberof Game
 * @param String type - BodyType Name
 * @param Object config - Body config object
 */
Game.prototype.addBody = function (type, config) {

  var body = this._bodyTypes[type].create(config);
  this._world.addBody(body);
  return body;
};

plexi.Game = Game;
