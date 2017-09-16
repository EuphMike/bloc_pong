var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

context.rect(0, 0, canvas.width, canvas.height);

var gradient = context.createLinearGradient(0, 300, canvas.width, 300);
gradient.addColorStop(0, 'lightgrey');
gradient.addColorStop(0.5, 'white');
gradient.addColorStop(1, 'lightgrey');
context.fillStyle = gradient;
context.fill();

function Computer(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.render = function() {
    var canvas = document.getElementById('pong');
    var context = canvas.getContext('2d');
    context.fillStyle = 'green';
    context.fillRect(x, y, width, height);
  }
};

function Player(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.render = function() {
    var canvas = document.getElementById('pong');
    var context = canvas.getContext('2d');
    context.fillStyle = 'purple';
    context.fillRect(x, y, width, height);
  }
};

function Ball(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.render = function() {
    var canvas = document.getElementById('pong');
    var context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(x, y, width, height);
  }
};

var computer = new Computer(0, 0, 10, 100);
var player = new Player(890, 500, 10, 100);
var ball = new Ball(440, 290, 20, 20);

var render = function() {
  computer.render();
  player.render();
  ball.render();
};

window.onload = function() {
  render();
};