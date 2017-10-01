var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

var playerPoint = 0;
var computerPoint = 0;

computerScore = document.getElementById('computer');
playerScore = document.getElementById('player');

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 120;
  this.speed = 20;
  this.render = function(timeElapsed) {
    context.fillStyle = '#0099cc';
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

function Computer(x, y) {
  this.x = x;
  this.y = y;
  this.width = 20;
  this.height = 120;
  this.speed = 0.7;
  this.render = function(timeElapsed) {
    context.fillStyle = '#b30086';
    context.fillRect(this.x, this.y, this.width, this.height);
    this.y = ball.y * this.speed;
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > 480) {
      this.y = 480;
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
    this.speed = random(0.2, 0.3);
    this.direction = random(0, 2 * Math.PI);
  };

  this.render = function(timeElapsed) {
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
    this.x += this.speed * timeElapsed * Math.cos(this.direction);
    this.y += this.speed * timeElapsed * Math.sin(this.direction);

    if (this.y <= 0 || this.y >= 580) {
      this.direction = 2 * Math.PI - this.direction;
      this.speed = this.speed + random(0.01, 0.02);
    };

    if (this.x < -20) {
      this.x = 440;
      this.y = 290;
      this.speed = 0;
      playerPoint += 1;
      playerScore.innerHTML = playerPoint;
    };

    if (this.x > 900) {
      this.x = 440;
      this.y = 290;
      this.speed = 0;
      computerPoint += 1;
      computerScore.innerHTML = computerPoint;
    }

    if (this.x <= computer.x + computer.width && this.y <= computer.y + computer.height && this.y + this.height >= computer.y) {
      this.direction = Math.PI - this.direction;
      this.speed = this.speed + random(0.01, 0.02);
    };

    if (this.x + this.width >= player.x && this.y <= player.y + player.height && this.y + this.height >= player.y) {
      this.direction = Math.PI - this.direction;
      this.speed = this.speed + random(0.01, 0.02);
    };
  };
};

var player = new Player(880, 277);
var computer = new Computer(0, 240);
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

var render = function(timeElapsed) {
  computer.render(timeElapsed);
  player.render(timeElapsed);
  ball.render(timeElapsed);
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

var oldTimestamp = 0;
var step = function(timestamp) {
  clear();
  render(timestamp - oldTimestamp);
  animate(step);
  oldTimestamp = timestamp;
};

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||             window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(step) {
    window.setTimeout(step, 1000/60);
  };

var clear = function() {
  context.rect(0, 0, canvas.width, canvas.height);
  var gradient = context.createLinearGradient(0, 300, canvas.width, 300);
  gradient.addColorStop(0, '#0099cc');
  gradient.addColorStop(0.5, 'black');
  gradient.addColorStop(1, '#b30086');
  context.fillStyle = gradient;
  context.fill();
};

window.onload = function() {
  step(0);
};
