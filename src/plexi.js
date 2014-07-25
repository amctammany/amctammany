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
};

