var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

var computer = new Rectangle(20, 20);
var player = new Rectangle(860, 470);
var ball = new Rectangle(440, 290);

function Rectangle(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 20;
  this.render = function() {
    context.fillStyle = 'darkred';
    context.fillRect(x, y, 20, 110);
  };
  this.moveUp = function() {
    if (y >= 10) {
      y -= this.speed;
      step();
      context.fillRect(x, y, 20, 110);
    };
  };
  this.moveDown = function() {
    if (y <= 470) {
      y += this.speed;
      step();
      context.fillRect(x, y, 20, 110);
    };
  };
};

ball.render = function() {
  context.fillRect(this.x, this.y, 20, 20);
};

var render = function() {
  computer.render();
  player.render();
  ball.render();
};

var step = function() {
  clear();
  render();
  animate;
};

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(step) {
    window.setTimeout(step, 1000/60);
  };

var clear = function() {
  context.rect(0, 0, canvas.width, canvas.height);
  var gradient = context.createLinearGradient(0, 300, canvas.width, 300);
  gradient.addColorStop(0, 'lightgrey');
  gradient.addColorStop(0.5, 'white');
  gradient.addColorStop(1, 'lightgrey');
  context.fillStyle = gradient;
  context.fill();
};

var move = function(e) {
  if (e.keyCode == 104) {
    player.moveUp();
  }
  else if (e.keyCode == 98) {
    player.moveDown();
  }
};

window.addEventListener('keydown', move, true);

window.onload = function() {
  step();
};