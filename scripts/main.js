var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 120;
  this.speed = 20;
  this.render = function() {
    context.fillStyle = 'darkred';
    context.fillRect(this.x, this.y, this.width, this.height);
  };
  this.moveUp = function() {
    if (this.y >= 10) {
      this.y -= this.speed;
    };
  };
  this.moveDown = function() {
    if (this.y <= 470) {
      this.y += this.speed;
    };
  };
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.speed = 0;
  this.direction = 0;
  this.serve = function() {
    this.speed = random(3, 5);
    this.direction = random(0, 2 * Math.PI);
  };
  this.render = function() {
    context.fillStyle = 'darkred';
    context.fillRect(this.x, this.y, this.width, this.height);
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);

    if (this.y <= 0 || this.y >= 580) {
      this.speed = random(3, 5);
      this.direction = (2 * Math.PI) - this.direction;
    };

    // player and computer scores point
    if (this.x < -20 || this.x > 900) {
      this.x = 440;
      this.y = 290;
      this.speed = 0;
    };

    // computer paddle hits ball
    if (this.x < computer.x + computer.width && this.y < computer.y + computer.height && this.height + this.y > computer.y) {
      this.speed = random(3, 5);
      this.direction = (Math.PI) - this.direction;
    };

    // player paddle hits ball
    if (this.x + this.width > player.x && this.y < player.y + player.height && this.height + this.y > player.y) {
      this.speed = random(3, 5);
      this.direction = (Math.PI) - this.direction;
    };

  };
};

var computer = new Paddle(20, 20);
var player = new Paddle(860, 460);
var ball = new Ball(440, 290);

var random = function(min, max) {
  return Math.random() * (max - min) + min;
};

var begin = function(e) {
  if (e.keyCode == 32) {
    ball.serve();
  }
};

window.addEventListener('keydown', begin, true);

var render = function() {
  computer.render();
  player.render();
  ball.render();
};

var move = function(e) {
  if (e.keyCode == 104 || e.keyCode == 38) {
    player.moveUp();
  }
  else if (e.keyCode == 98 || e.keyCode == 40) {
    player.moveDown();
  }
};

window.addEventListener('keydown', move, true);

var step = function() {
  clear();
  render();
  animate(step);
};

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||             window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
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

window.onload = function() {
  step();
};
