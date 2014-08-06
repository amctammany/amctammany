'use strict';

/**
 * @module plexi
 * @namespace plexi
 */


var plexi = {

  /**
   * createGame
   * @memberof plexi
   * @instance
   * @param {String} id - Game DOM Identifier
   * @returns {Game}
   */
  createGame: function (id) {
    return new Game(id);

  },
  extend: function (obj, config) {
    for (var key in config) {
      obj[key] = config[key];
    }
  }
};


function partial (fn) {
  var slice = Array.prototype.slice;
  var args = slice.call(arguments, 1);

  return function () {
    return fn.apply(this, args.concat(slice.call(arguments, 0)));
  };
};
