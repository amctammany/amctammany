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
  if ($ !== undefined) {
    this.$div = $('#' + id);
  }
};

/**
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

    self._actions[$(this).attr('id')]();
  });
};
