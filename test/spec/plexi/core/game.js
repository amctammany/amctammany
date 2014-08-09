'use strict';

describe('Game', function () {
  var game;
  var id = 'id';
  beforeEach(function() {
    game = plexi.createGame(id);
  });

  it('should create game', function () {
    expect(!!game).toBe(true);
    expect(game.id).toBe(id);
  });

  it('should create game variables', function () {
    game.vars({
      v1: 'foo',
      v2: 'bar'
    });
    expect(game.var('v1')).toBe('foo');
    expect(game.var('v2')).toBe('bar');
  });
  it('should create var when given name and value', function () {
    game.var('foo', 'bar');
    expect(game.var('foo')).toBe('bar');
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

  //it('should create canvas with given name and properties', function () {
    //var name = 'name';
    //var props = {
      //aspect: 0.5,
    //};
    //var canvas = game.canvas(name, props);
    //expect(canvas instanceof Canvas).toBe(true);
    //expect(game.mainCanvas).toBe(canvas);
    //expect(game._canvii[name]).toBe(canvas);
  //});

});
