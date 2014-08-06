'use strict';

var game = plexi.createGame('pong-demo');

game.canvas('pong-canvas', {
  aspect: 0.5,
});

var paddle = game.defineBodyType('paddle', {
  shape: 'rect',
  props: ['x', 'y'],
  width: 10,
  height: 50
});
console.log(paddle);

var p1 = game.addBody('paddle', {
  x: -0.9,
  y: 0,
});

console.log(p1);
var p2 = game.addBody('paddle', {
  x: 0.9,
  y: 0.5,
});
console.log(p2);

game.bootstrap(function () {
  this.animate('pong-canvas');
});
