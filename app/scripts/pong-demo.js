'use strict';

var game = plexi.createGame('pong-demo');

game.canvas('pong-canvas', {
  aspect: 0.5,
});

var ball = game.defineBodyType('ball', {
  shape: 'circle',
  props: ['x', 'y', 'vx', 'vy'],
  radius: 5,
  width: 10,
  height: 10
});
var paddle = game.defineBodyType('paddle', {
  shape: 'rect',
  props: ['x', 'y'],
  width: 10,
  height: 50
});

var p1 = game.addBody('paddle', {
  x: -0.9,
  y: 0,
});

var p2 = game.addBody('paddle', {
  x: 0.9,
  y: 0.5,
});

var b = game.addBody('ball', {
  x: 0.0,
  y: 0.0,
  vx: 0.1,
  vy: 0.2
});

game.bootstrap(function () {
  this.animate('pong-canvas');
});
