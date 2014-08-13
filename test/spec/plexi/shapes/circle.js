'use strict';

describe('Plexi::Shapes::Circle', function () {
  var circle, game;
  var name = 'ball';
  var config = {
    radius: 5,
  };
  beforeEach(function () {
    game = plexi.createGame('id');
    circle = game.defineBodyType(name, 'circle', config);
  });

  it('should create props and constants', function () {
    expect(circle.props).toEqual(['x', 'y']);

  });
});
