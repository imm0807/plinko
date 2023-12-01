// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var cols = 9;
var rows = 11;

function preload() {
  ding = loadSound('ding.mp3');
}

var paused = false;

function setup() {
  createCanvas(800, 500);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  //world.gravity.y = 2;

  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if (labelA == 'particle' && labelB == 'plinko') {
        //ding.play();
      }
      if (labelA == 'plinko' && labelB == 'particle') {
        //ding.play();
      }
    }
  }

  Events.on(engine, 'collisionStart', collision);

  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }

  var b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
}

function draw() {
  if (paused) {
    // Draw paused stuff
    push();
    colorMode(RGB);
    textSize(75);
    textAlign(CENTER, CENTER);
    const middleX = width / 2;
    const middleY = height / 2; 
    fill(255, 0, 0);
    text('PAUSED', middleX, middleY);
    console.log('PAUSED');
    pop();
  } else {
    // do the normal stuff 
    background(0, 0, 0);

    Engine.update(engine, 1000 / 30);
    for (var i = 0; i < particles.length; i++) {
      particles[i].show();
      if (particles[i].isOffScreen()) {
        World.remove(world, particles[i].body);
        particles.splice(i, 1);
        i--;
      }
    }
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].show();
    }
    for (var i = 0; i < bounds.length; i++) {
      bounds[i].show();
    }
  }
}

function keyPressed() {
  if (key === 'p') {
    if (paused) {
      paused = false;
    } else {
      paused = true;
    }
  }
}

function mouseClicked() {
  var p = new Particle(mouseX, mouseY, 10);
  particles.push(p);
  
  // prevent default
  return false;
}





