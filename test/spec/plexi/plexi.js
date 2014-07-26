'use strict';

describe('plexi', function () {

  it('should create game', function () {
    var id = 'id';
    var game = plexi.createGame(id);
    expect(!!game).toBe(true);
    expect(game.id).toBe(id);
  });

});
