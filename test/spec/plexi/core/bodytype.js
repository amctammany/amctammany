'use strict';

describe('Plexi::BodyType', function () {
  var bodyType, game;
  var name = 'ball';
  var config = {
    radius: 5,
    width: 20,
    height: 20
  };
  beforeEach(function () {
    game = plexi.createGame('id');
    bodyType = game.defineBodyType(name, 'circle', config);
  });

  it('should create props and constants', function () {
    expect(bodyType.props).toEqual(['x', 'y']);
    expect(bodyType.constants.radius).toBe(5);
    expect(bodyType.constants.width).toBe(20);
    expect(bodyType.constants.height).toBe(20);

  });

  it('should require all props upon creation', function () {
    var ball = game.addBody(name, {
      x: 0.1,
      y: 0.2,
    });
    expect(!!ball).toBe(true);
    expect(ball.x).toBe(0.1);
    expect(ball.y).toBe(0.2);

  });
  it('should fail to create body if undefined required properties', function () {
    var ball = game.addBody(name, {
      x: 0.5,
    });
    expect(!!ball).toBe(false);
  });

});
