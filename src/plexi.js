'use strict';

/**
 * @module plexi
 * @namespace plexi
 */


var plexi = {
  /**
   * @createShape
   * @memberof plexi
   * @param {String} id - Identifier
   * @param {Object} config - Configuration Object
   */

  createShape: function (id, config) {
    plexi.Shapes[id] = new Shape(id, config);

  },

  Shapes: {},

  /**
   * createGame
   * @memberof plexi
   * @instance
   * @param {String} id - Game DOM Identifier
   * @returns {Game}
   */
  createGame: function (id) {
    return new plexi.Game(id);

  },
  extend: function (obj, config) {
    for (var key in config) {
      if (config.hasOwnProperty(key)) {
        obj[key] = config[key];
      }
    }
  },
  partial: function (fn) {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);

    return function () {
      return fn.apply(this, args.concat(slice.call(arguments, 0)));
    };
  }
};
