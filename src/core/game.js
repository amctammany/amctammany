'use strict';

var $;
var plexi = plexi || {};
/**
 * @class
 * Game ultimate parent class
 * @constructor
 * @param {String} id - DOM Identifier
 * @returns {Game}
 */

var Game = function (id) {
  this.id = id;
  this._vars = {};
  this._actions = {};
  this._canvii = {};
  this._bodyTypes = {};
  this._keyListeners = {};
  this._namedBodies = {};
  this._world = new plexi.World();
  if ($ !== undefined) {
    this.$div = $('#' + id);
  }
};

/**
 * Declares a key:value object as game varibles
 * @function vars
 * @instance
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
 * @instance
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
 * @instance
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
 * @instance
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
 * @function keyboard
 * @instance
 * @memberof Game
 * @param {Object} bindings - Key bindings
 */
Game.prototype.keyboard = function (bindings) {
  for (var key in bindings) {
    this._keyListeners[key] = bindings[key];
  }
  var self = this;
  window.onkeypress = function (e) {
    self.findKeyListener(e);
  };
  window.onkeydown = function (e) {
    self.findKeyListener(e);
  };
};
Game.prototype.findKeyListener = function (e) {
  var listener = this._keyListeners[e.keyCode];
  if (listener) {
    listener(this);
    e.preventDefault();
  }
};
/**
 * @function findBody
 * @instance
 * @memberof Game
 * @param String name - Identifier
 * @returns {Body}
 */

Game.prototype.findBody = function (name) {
  var body = this._namedBodies[name];
  if (body) {
    return body;
  } else {
    return null;
  }
};
/**
 * @function canvas
 * @instance
 * @memberof Game
 * @param {String} id - Canvas Identifier
 * @param {Object} properties - Canvas Properties
 */
Game.prototype.canvas = function (name, properties) {
  var canvas = new plexi.Canvas(name, properties);
  this._canvii[name] = canvas;
  this.mainCanvas = canvas;
};

/**
 * @function bootstrap
 * @instance
 * @memberof Game
 * @param {Function} cb - Initialization Callback
 */
Game.prototype.bootstrap = function (cb) {
  this.bootstrapFn = cb.bind(this);
  this.restart();
};

/**
 * @function restart - Stops and resets game to defaults.
 * @instance
 * @memberof Game
 */
Game.prototype.restart = function () {
  this.stop();
  this.reset();
  this.bootstrapFn();
};

/**
 * @function reset - Resets game world
 * @instance
 * @memberof Game
 */
Game.prototype.reset = function () {
  this._world.reset();
};

/**
 * @function draw
 * @instance
 * @memberof Game
 * @param {Canvas} canvas - Rendering Canvas
 */
//Game.prototype.draw = function (canvas) {
  //this.mainCanvas.draw(this._world.particles);
  ////var ctx = this._canvii[canvas].ctx;
  ////this._particles.forEach(function (p) {
    ////p.draw(ctx);
  ////});
//};

/**
 * @function update
 * @instance
 * @memberof Game
 * @param {float} delta - Time step
 */
Game.prototype.update = function (delta) {
  this._world.bodies.forEach(function (b) {
    b.update(delta);
  });
};

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

Game.prototype.start = function () {
  this.reset();
  //animFn = animate.bind(null, this, this.mainCanvas);

  //if (this.animationFrame) {
    //return;
  //}
  this.animate();
};

Game.prototype.stop = function () {
  if (this.animationFrame) {
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }
};

/**
 * @function defineBodyType
 * @instance
 * @memberof Game
 * @param String id - Unique string identifier
 * @param Object config - Body definition object
 */
Game.prototype.defineBodyType = function (id, shape, config) {
  this._bodyTypes[id] = new plexi.BodyType(id, shape, config);
  return this._bodyTypes[id];

};

/**
 * @function addBody
 * @instance
 * @memberof Game
 * @param String type - BodyType Name
 * @param Object config - Body config object
 */
Game.prototype.addBody = function (type, config) {

  var body = this._bodyTypes[type].create(config);
  if (body.id) {
    console.log('named body');
    console.log(body.id);
    this._namedBodies[body.id] = body;
  }
  this._world.addBody(body);
  return body;
};

plexi.Game = Game;
