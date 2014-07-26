'use strict';
var game = plexi.createGame('pendulum-demo');
game.canvas('pendulum-canvas', {
  aspect: 0.66,
});
game.vars({

  'gravity': 0.1,
  'damping': 0.75,
});
game.controls({
  'options-gravity': 'gravity',
  'options-damping': 'damping'
});
game.actions({
  'options-play': function (game) {game.start();},
  'options-pause': function (game) {game.stop();},
  'options-step': function (game) {game.step();},
  'options-restart': function (game) {game.restart();},
});
game.bootstrap(function () {
  var anchor = this.addParticle({
    x: 0.0,
    y: -0.9,
  });

  var p1 = this.addParticle({
    x: 0.1,
    y: -0.8,
  });

  var p2 = this.addParticle({
    x: 0.2,
    y: -0.6,
  });


  this.animate('pendulum-canvas');

});
