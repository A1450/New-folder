size(500,500)
var level = []
level[0] = loadJSON("data_(11).json")
level[1] = loadJSON("data_(6).json")
level[2] = loadJSON("data_(19).json")
var walls = []
var gold = []
var bouncers = []
var player
var end
var startx = []
var starty = []
var starGold = []
var currentLevel = 0
var penleft = loadImage('horizontal-pencil-clipart-pencil-clipart-B7YfWF-clipart.png')
var pendirection = 1;
var level
var bouncerimage = loadImage ('bouncer.png')
var penright = loadImage('rotatedpencil.png')
var endimage = loadImage('sticker_375x360.png')
var loadLevel = function(levelNum) {

  walls = level[levelNum].wall;
  gold = level[levelNum].gold;
  bouncers = level[levelNum].bouncer;
  end = level[levelNum].end[0];
  player = level[levelNum].player[0];
   player.w = 40
  player.h = 40
  startx = player.x
  starty = player.y
  console.log(bouncers);
}
  /*var walls = [{x: 0, y: 0, w: 500, h: 50},
              {x: 0, y: 0, w: 50, h: 500} ,
              {x: 0, y: 450, w: 500, h: 50},
              {x: 450, y: 50, w: 50, h: 450},
              {x: 0, y: 100, w: 200, h: 50},
              {x: 300, y: 350, w: 200, h: 50}]
var gold = [{x: 300, y: 200, w: 15, h: 15, show: 1}, 
{x: 250, y: 270, w: 15, h: 15, show: 1},
{x: 200, y: 320, w: 15, h: 15, show: 1},
{x: 290, y: 300, w: 15, h: 15, show: 1},
{x: 120, y: 220, w: 15, h: 15, show: 1},
{x: 222, y: 222, w: 15, h: 15, show: 1}]*/
var speed = 5

var up = 0
var down = 0
var left = 0
var right = 0
//var player = {x: 50, y: 50, w: 50, h: 50};

var goldPoints = 0;

/*var bouncers =
   [ {x:200, y:90, w:15, h:15, spd: 4, axis: "hor" }, 
    {x:250, y: 80, w: 40,h: 70, spd: 3, axis: "vert"},
    {x:340, y: 180, w: 35,h: 85, spd: 10, axis: "hor"}];*/
    
  var setup = function() {
    loadLevel(0)
  }
var draw = function() {

 background (0,0,0)
 
fill (225,0,0);
noStroke()  
for (var i = 0; i < walls.length; i = i + 1) {
    rect(walls[i].x,
    walls[i].y,
    walls[i].w,
    walls[i].h)
    
}
    fill (255,255,0)
    for (var goldvar = 0; goldvar < gold.length; goldvar = goldvar + 1) {
      if (gold[goldvar].show == 1){
    rect(gold[goldvar].x,
    gold[goldvar].y,
    gold[goldvar].w,
    gold[goldvar].h)
     if (collision(player,gold[goldvar])) {
       gold[goldvar].show = 0
       goldPoints = goldPoints + 1
}
}
}


drawGoldText();

drawPlayer()
 move(player, 10);
 
 moveBouncers();
 
drawEnd()
};

 

var move = function(obj, speed) {
 if (right == 1) {
  obj.x = obj.x + speed 

  for (var i = 0; i < walls.length; i++) {
    while (collision(obj,walls[i])) {
      obj.x = obj.x - 1
    }
  }
 }

  if (down == 1) {
  obj.y = obj.y + speed 
  
  for (var i = 0; i < walls.length; i++) {
    while (collision(obj,walls[i])) {
      obj.y = obj.y - 1
  }  
  }
  } 
if (left == 1) {
  obj.x = obj.x - speed 
   for (var i = 0; i < walls.length; i++) {
    while (collision(obj,walls[i])) {
      obj.x = obj.x + 1
    }
 }
} 



if (up == 1) {
  obj.y = obj.y - speed
  
 for (var i = 0; i < walls.length; i++) {
    while (collision(obj,walls[i])) {
      obj.y = obj.y + 1
    }
 }
}
}

var keyPressed = function() {
  if (keyCode == RIGHT) {
    right = 1;
    pendirection = 1;
  }
  if (keyCode == DOWN) {
    down = 1;
  }
  if (keyCode == UP) {
    up = 1;
  }
  if (keyCode == LEFT) {
    left = 1;
    pendirection = 0;
  }
  if (keyCode == 32){
    console.log(walls);
  }
};
var keyReleased = function() {
  if (keyCode == RIGHT) {
    right = 0;
  }
  if (keyCode == LEFT) {
    left = 0;
  }
  if (keyCode == DOWN) {
    down = 0;
  }
  if (keyCode == UP) {
    up = 0;
  }
};

var collision = function(obj1, obj2) {

  if ( obj1.x + obj1.w > obj2.x &&
       obj1.x < obj2.x + obj2.w &&
       obj2.y + obj2.h > obj1.y &&
       obj2.y < obj1.y + obj1.h ) {
           return true;
  } else {
      return false;
  }

}

var reset = function() {
  goldPoints = 0
  player.x = startx
  player.y = starty
  for (var goldvar = 0; goldvar < gold.length; goldvar = goldvar + 1) {
  gold[goldvar].show = 1
    
 
    text ("GAME OVER", 225, 225); 
  
}
}  
var moveBouncers = function() {
  for (var i = 0; i < bouncers.length; i++) {
  fill (255,255,255)
  image(bouncerimage,bouncers[i].x,bouncers[i].y,bouncers[i].w,bouncers[i].h);
 if (bouncers[i].axis === "hor") {
      bouncers[i].x = bouncers[i].x 
                            + bouncers[i].spd
 }  else if (bouncers[i].axis === "vert") {
      bouncers[i].y = bouncers[i].y 
                            + bouncers[i].spd
                            
 }
 for (var j = 0; j < walls.length; j++) {
if (collision(bouncers[i],walls[j])) {
  bouncers[i].spd = bouncers[i].spd * -1
}
}
if (collision(bouncers[i],player)) {
      reset();
}
}
  
}
var drawGoldText = function() {
fill(0);
textSize(14);
text("Gold: " + goldPoints, 10, 490);
};

var drawPlayer = function() {
  //fill (0, 153, 255)
  //rect(player.x, player.y, player.w, player.h);
  if (pendirection === 0) {
  image(penleft, player.x, player.y, player.w, player.h) ;
  }
  else if (pendirection === 1){
    
  image(penright, player.x, player.y, player.w, player.h) ;
  }
  
}
var drawEnd = function() {
  fill (0, 260, 255)
  image(endimage,end.x, end.y, end.w, end.h);
  if (collision(player,end)) {
    currentLevel++
    loadLevel(currentLevel)
    reset()
  }
}