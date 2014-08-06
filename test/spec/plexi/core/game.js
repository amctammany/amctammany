'use strict';

describe('Game', function () {
  var game;
  beforeEach(function() {
    game = plexi.createGame('id');
  });

  it('should create game', function () {
    expect(!!game).toBe(true);
    expect(game.id).toBe('id');
  });

  it('should define game body', function () {
    var boxType = game.defineBodyType('box', {
      props: ['x', 'y'],
      width: 50,
      height: 50
    });

    var box = game.addBody('box', {
      id: 'box1',
      x: 10,
      y: 10,
    });
    expect(!!box).toBe(true);
    expect(box.x).toBe(10)
    expect(box.y).toBe(10)
    expect(box.width).toBe(50)
    expect(box.height).toBe(50)

  });

});
