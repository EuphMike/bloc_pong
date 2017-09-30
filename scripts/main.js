var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');

var computer = new Rectangle(20, 20);
var player = new Rectangle(860, 470);
var ball = new Rectangle(440, 290);

function Rectangle(x, y) {
  console.log("in Rectangle");
  this.x = x;
  this.y = y;
  this.speed = 20;
  this.render = function() {
    console.log("rectangle render");
    context.fillStyle = 'darkred';
    context.fillRect(x, y, 20, 110);
  };
  this.moveUp = function() {
    console.log("movin on up");
    if (y >= 10) {
      y -= this.speed;
      step();
      context.fillRect(x, y, 20, 110);
    };
  };
  this.moveDown = function() {
    console.log("moveDown");
    if (y <= 470) {
      y += this.speed;
      step();
      context.fillRect(x, y, 20, 110);
    };
  };
};

ball.render = function() {
  console.log("rendering ball");
  context.fillRect(this.x, this.y, 20, 20);
};

var render = function() {
  console.log("rendering");
  computer.render();
  player.render();
  ball.render();
};

var step = function() {
  console.log("in step");
  clear();
  render();
  animate;
};

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(step) {
    console.log("didn't find the other animation frames so just setting a timeout");
    window.setTimeout(step, 1000/60);
  };

var clear = function() {
  console.log("Clearing");
  context.rect(0, 0, canvas.width, canvas.height);
  var gradient = context.createLinearGradient(0, 300, canvas.width, 300);
  gradient.addColorStop(0, 'lightgrey');
  gradient.addColorStop(0.5, 'white');
  gradient.addColorStop(1, 'lightgrey');
  context.fillStyle = gradient;
  context.fill();
};

var move = function(e) {
  console.log("moving");
  if (e.keyCode == 38) {
    console.log("up key pressed");
    player.moveUp();
  }
  else if (e.keyCode == 40 || e.keyCode = 104) {
    console.log("down key pressed");
    player.moveDown();
  }
  else {
    console.log("your key mappings are no bueno!");
    console.log("key code: " + e.keyCode);
    player.moveUp();
  }
};

window.addEventListener('keydown', move, true);

window.onload = function() {
  console.log("Loading");
  step();
};
