const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine;
var world;
//guardar as posições da bola no eixo x e y
var position = [];
var tower, backgroundImg, cannon, angle, cannonBall;
//criamos uma matriz para armazenar as bolas de canhão
var balls = [];
var boat;
//criamos uma matriz para armazenar os barcos
var boats = [];
var ground;
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet, brokenBoatSpriteData;
var brokenBoatSpriteSheet;
var brokenBoatAnimation = [];
var boatFrames,brokenBoatFrames;
var isGameOver = false;
var score = 0;
function preload() {
  backgroundImg = loadImage("assets/background.gif");
  boatSpriteData = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png");
  brokenBoatSpriteData = loadJSON("assets/boat/broken_boat.json");
  brokenBoatSpriteSheet = loadImage("assets/boat/broken_boat.png");
}


function setup() {
  createCanvas(1200, 600);
  //var valores =[1,2,3];
  //valores.pop();
  //console.log(valores);
  engine = Engine.create();
  world = engine.world;
  //PI = 180 entao 180/4 = 45
  angle = -PI / 4;
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  ground = new Ground(0, height, width * 2, 1);

  boatFrames = boatSpriteData.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
    //console.log(boatAnimation);
  }

  brokenBoatFrames = brokenBoatSpriteData.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].position;
    var img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
    //console.log(boatAnimation);
  }

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  //background(backgroundImg);
  image(backgroundImg, 0, 0, width, height);
  tower.display();

  cannon.display();
  //cannonBall.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for( var j=0; j<boats.length;j++){
      if(balls[i]!= undefined && boats[j]!=undefined){
        var collision = Matter.SAT.collides(balls[i].body,boats[j].body);
        if(collision.collided){
          if(!boats[j].isBroken && !balls[i].isSink){
            score+=1;
          boats[j].remove(j);
          j--;
          }
          Matter.World.remove(world,balls[i].body);
          balls.splice(i,1);
          i--;
        }
        
      }
    }
  }
  showBoats();
  //Body.setVelocity(boat.body,{x:-0.9,y:0});

  
  fill("#6d4c41");
  textSize(40);
  text("Pontuação: " + score, width - 450,50);
  Engine.update(engine);
}

function keyReleased() {
  if (keyCode == DOWN_ARROW) {

    //cannonBall.shoot();
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  //console.log(balls);
  if (ball.body.position.x > width
    || ball.body.position.y > height) {
      if(!ball.isSink){
        ball.remove(index);
        World.remove(world, ball.body);
        balls.splice(index, 1);
      }
    //console.log(balls);
  }
}

function showBoats(){
  if (boats.length > 0) {
    if (boats.length < 4
      &&
      boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);

      var boat = new Boat(width, height - 100, 170, 170, position,boatAnimation);
      boats.push(boat);
    }//fechei if boats.lenght < 4
    for (var i = 0; i < boats.length; i++) {
      
      boats[i].display();
      boats[i].animate();

      Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });

      var collision = Matter.SAT.collides(tower.body,boats[i].body);

      if(collision.collided && !boats[i].isBroken){
        isGameOver = true;
        gameOver();
      }

    }//fechei for
  }//fechei if(boats.length > 0)
  else {
    var boat = new Boat(width, height - 100, 170, 170, -60,boatAnimation);
    boats.push(boat);
  }
}

function gameOver(){
  swal({
    title: `Fim de Jogo`,
    text: "Obrigada por Jogar",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150", 
    confirmButtonText:"Jogar Novamente"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  }
  );
}