'use strict';

var game = plexi.createGame('pong-demo');

game.canvas('pong-canvas', {
  fullHeight: 350,
  fullWidth: 800,
  //aspect: 0.5,
});

var ball = game.defineBodyType('ball', 'circle', {
  radius: 15,
});
var paddle = game.defineBodyType('paddle', 'rect', {
  width: 20,
  height: 80,
});

var keyboard = game.keyboard({
  '38': function (game) {
    game.findBody('player').shift(0, -0.1);
  },
  '40': function (game) {
    game.findBody('player').shift(0, 0.1);
  },
});

var p1 = game.addBody('paddle', {
  id: 'player',
  x: -0.9,
  y: 0,
});

var p2 = game.addBody('paddle', {
  id: 'opponent',
  x: 0.9,
  y: 0.0,
});

var b = game.addBody('ball', {
  x: 0.0,
  y: 0.0,
  vx: 0.1,
  vy: 0.2
});

game.bootstrap(function () {
  this.start('pong-canvas');
});
