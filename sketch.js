var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var Ba=0;
var gayab
var cs,go
var restart,RT,gameover,gameO;

function preload(){
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  go = loadImage("jungle-background.jpg")
  restart=loadImage("restart.png");
  gameover=loadImage("gameover.png");
}                 



function setup() {
    createCanvas(750, 500);
  
cs = createSprite (100,300,100,100);
cs.addImage(go); 
cs.velocityX=-6;
  
monkey = createSprite(50,480,20,50);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.15


gayab = createSprite (325,500,100000,1);

  
score = 0;
  
BGroup=createGroup();
OGroup=createGroup();
  
}

function draw() {
  background(255);
 //console.log(monkey.y)    
  text("Score: "+ score, 100,100);
 if (cs.x <2){
        cs.x = cs.width/3  ;
}
  
  if (gameState===PLAY) {
    cs.velocityX=-6;
    OGroup.setVelocityEachX = -(4 + 3* score/50)
    BGroup.velocityX = -(4 + 3* score/50)
    score=score + Math.round(getFrameRate()/60)
           
     obs();
     bnana();
    
    
    if (keyDown("space")&& monkey.y >=453) {
        monkey.velocityY=-17;
        }
    
     if (monkey.isTouching(OGroup)) {
       gameState=END;
      }
    
     if (BGroup.isTouching(monkey)) {
       BGroup.destroyEach();
       Ba =Ba+1
      }
    
gameO=createSprite(350,240);
gameO.addImage(gameover);
gameO.scale=0.3;
    
RT=createSprite(360,350);
RT.addImage(restart);
RT.scale=0.5;
gameO.visible = false;
RT.visible = false;

  }

 else if (gameState===END) {
gameO.visible = true;
RT.visible = true;
cs.velocityX = 0;
OGroup.setVelocityXEach(0);
BGroup.setVelocityXEach(0);
monkey.velocityY = 0 
 if(mousePressedOver(RT)) {  
   reset();
    }
 }
  
  monkey.velocityY = monkey.velocityY + 0.8  
  monkey.collide(gayab);
  drawSprites();
  
         textSize(30);
                    fill("white");
                    textFont("algerian");
                    text("survival time:"+score,50,30);

                     textSize(30);
                    fill("white");
                    textFont("algerian");
                    text("banana:"+Ba,50,60);
}

function obs () {
   if (frameCount % 200 === 0) {
  obstacle= createSprite(650,480,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.1;
  obstacle.velocityX=-7;
  OGroup.add(obstacle);
}
}

function bnana () {
   if (frameCount % 300 === 0) {
  banana = createSprite (650,320,20,20);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-7;
  BGroup.add(banana);
}
}

function reset () {
  gameState=PLAY;
  gameO.visible=false;
  RT.visible=false;
  OGroup.destroyEach();
  BGroup.destroyEach();
  Ba=0;
  score=0;
  
}