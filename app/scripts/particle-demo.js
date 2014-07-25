var canvas = document.getElementById('particle-canvas');
canvas.width = 350;
canvas.height = 350;
var ctx = canvas.getContext('2d');

ctx.fillRect(20, 30, 10, 10);

var game = plexi.createGame('particle-demo');
game.vars({
  'numParticles': 20,
  'velocityAvg': 10,
  'velocitySigma': 2,
  'restitution': 1.0
});
game.controls({
  'options-num-particles': 'numParticles',
  'options-velocity-avg': 'velocityAvg',
  'options-velocity-sigma': 'velocitySigma',
  'options-restitution': 'restitution'
});
game.actions({
  'options-play': function () {console.log('play btn');},
  'options-pause': function () {console.log('pause btn');},
  'options-step': function () {console.log('step btn');},
  'options-restart': function () {console.log('restart btn');}
})
