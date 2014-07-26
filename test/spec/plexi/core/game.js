'use strict';

describe('Game', function () {
  var game;
  beforeEach(function() {
    console.log(plexi);
    game = plexi.createGame('id');
  });

  it('should create game', function () {
    expect(!!game).toBe(true);
    expect(game.id).toBe('id');
  });

});
