'use strict';

var $;
/**
 * @class Game
 * @param {String} id - DOM Identifier
 */

var Game = function (id) {
  this.id = id;
  this._vars = {};
  this._actions = {};
  this._canvii = {};
  this._particles = [];
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
  var canvas = document.getElementById(name);
  var $parent = $(canvas).parent();
  console.log($parent.width());
  canvas.width = $parent.width() - 20;
  this.width = canvas.width;

  canvas.height = ($parent.width() - 20) * 0.66;
  this.height = canvas.height;

  var ctx = canvas.getContext('2d');
  this._canvii[name] = {
    $parent: $parent,
    canvas: canvas,
    ctx: ctx,
  };
  $.extend(this._canvii[name], properties);
  console.log(this._canvii);
  this.mainCanvas = name;
};

/**
 * @function bootstrap
 * @memberof Game
 * @param {Function} cb - Initialization Callback
 */
Game.prototype.bootstrap = function (cb) {
  cb.call(this);
};

/**
 * @function addParticle
 * @memberof Game
 * @param {Object} config - Particle Intrinsic Properties
 */
Game.prototype.addParticle = function (config) {
  var p = new Particle(config);
  this._particles.push(p);
  return p;
};

/**
 * @function draw
 * @memberof Game
 */
Game.prototype.draw = function (canvas) {
  var ctx = this._canvii[canvas].ctx;
  this._particles.forEach(function (p) {
    p.draw(ctx);
  });
};

/**
 * @function update
 * @memberof Game
 * @param {float} delta - Time step
 */
Game.prototype.update = function (delta) {
  this._particles.forEach(function (p) {
    p.update(delta);
  });
};


Game.prototype.clear = function (canvas) {
  var ctx = this._canvii[canvas].ctx;
  ctx.clearRect(0, 0, 10000, 10000);
};

Game.prototype.animate = function (canvas) {
  this.clear(canvas);
  this.update(0.3);
  this.draw(canvas);
  this.animationFrame = window.requestAnimationFrame(this.animate.bind(this, canvas));

};

Game.prototype.start = function () {
  if (this.animationFrame) {
    return;
  }
  console.log(this.mainCanvas);
  this.animate(this.mainCanvas);
}

Game.prototype.stop = function () {
  if (this.animationFrame) {
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }
};
