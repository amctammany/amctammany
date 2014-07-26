//var canvas = document.getElementById('particle-canvas');
//canvas.width = 350;
//canvas.height = 350;
//var ctx = canvas.getContext('2d');

//ctx.fillRect(20, 30, 10, 10);

var game = plexi.createGame('particle-demo');
game.canvas('particle-canvas', {
  aspect: 0.66,
});
game.vars({
  'numParticles': 20,
  'velocityAvg': 0.03,
  'velocitySigma': 0.002,
  'restitution': 1.0
});
game.controls({
  'options-num-particles': 'numParticles',
  'options-velocity-avg': 'velocityAvg',
  'options-velocity-sigma': 'velocitySigma',
  'options-restitution': 'restitution'
});
game.actions({
  'options-play': function (game) {game.start();},
  'options-pause': function (game) {game.stop();},
  'options-step': function (game) {game.step(0.3);},
  'options-restart': function (game) {game.restart();},
});
game.bootstrap(function () {
  var l = this.var('numParticles');
  for (var i = 0, l = this.var('numParticles'); i < l; i++) {
    var vx = this.var('velocityAvg') * (Math.random() * 2 - 1);
    var vy = this.var('velocityAvg') * (Math.random() * 2 - 1);
    this.addParticle({
      x: 2 * Math.random() - 1,
      y: 2 * Math.random() - 1,
      velocity: new Vec2(vx, vy),
      mass: 1,
    });
  }

  this.animate('particle-canvas');

});
