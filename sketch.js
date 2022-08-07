 var backgroundImage;
 var ufo1Image,ufo2Image;
 var spaceshipImage;           
 var ufoSprite,ufo2Sprite;
 var spaceshipSprite;
 var backgroundSprite;
 var asteriodsimage;
var enemySprite;
var missle,missleImage;
var missle;
var EnemyGroup;
var PLAY =1;
var END =0;
var gameState= PLAY;
var score=0;
var gameoverImage,gameoverSprite;
var reloadImage,reloadSprite;
var gameoverSound,missleHitSound;
function preload(){
 
  backgroundImage = loadImage("space.jpg");
  ufo1Image = loadImage("ufo1.png");
  ufo2Image = loadImage("ufo2.png");
  spaceshipImage = loadImage("SPACESHIP.png");
  asteriodsimage = loadImage("asteriods.png");
  missleImage = loadImage("missle.png");
  gameoverImage = loadImage("gameover.jpg");
  reloadImage = loadImage("reload.jpg");
  gameoverSound = loadSound("gameoversound.mp3");
  missleHitSound =loadSound("missleh.mp3")
    
}

function setup() {
   
createCanvas(1200,800);

backgroundSprite = createSprite(200,200);
backgroundSprite.addImage(backgroundImage);
 
spaceshipSprite = createSprite(100,350); 
spaceshipSprite.addImage(spaceshipImage);
//spaceshipSprite.debug=true;

gameoverSprite =createSprite(600,400)
gameoverSprite.addImage(gameoverImage);
gameoverSprite.scale=4.5
gameoverSprite.visible =false;

reloadSprite= createSprite(600,600)
reloadSprite.addImage(reloadImage);
reloadSprite.visible =false;
  
 missleGroup =createGroup();
 EnemyGroup=createGroup();
}

function draw() {
 background("black");

 if(gameState===PLAY){
  
spaceshipSprite.visible =true;
enemy();

if(keyDown("UP_ARROW")){
spaceshipSprite.y-=7;
 
}

if(keyDown("DOWN_ARROW")){
  spaceshipSprite.y+=7;
  
}

if(keyDown("space")){
   spawnMissle();
}
 

if(missleGroup.isTouching(EnemyGroup)){
  //score+=5;
 
EnemyGroup.destroyEach();
missleGroup.destroyEach();
}
if(spaceshipSprite.isTouching(EnemyGroup))
{
  gameState=END;

}
 }
 else if(gameState===END){
  gameoverSound.play();
  gameoverSound.setVolume(0.1)
  spaceshipSprite.visible=false;
  EnemyGroup.destroyEach();
  missleGroup.destroyEach();
  missleGroup.setLifetimeEach(-1);
  missleGroup.setVelocityXEach(0);
 EnemyGroup.setLifetimeEach(-1);
 EnemyGroup.setVelocityXEach(0);
  gameoverSprite.visible= true;
  reloadSprite.visible= true;
  if(mousePressedOver(reloadSprite)){
   reset();
  }
 }
drawSprites();
textSize(30);
fill("white");
strokeWeight(4);
stroke("black")
text(" SCORE : "+score,30,50);
}


function enemy(){


if(frameCount%100===0){
  
  
enemySprite=createSprite(1200,Math.round(random(50,700)),50,50)
//enemySprite.debug= true;
enemySprite.velocityX=-5;



var rand=Math.round(random(1,3))
switch(rand){
  case 1 : enemySprite.addImage(ufo1Image); 
           enemySprite.scale= 0.5;
           break;
           
  case 2: enemySprite.addImage(ufo2Image);
          enemySprite.setCollider("rectangle",0,0,400,200)
          enemySprite.scale= 0.5;
          break;   
          
  case 3: enemySprite.addImage(asteriodsimage);
          enemySprite.scale= 0.3;
          break;
          
  default: break;       
}

EnemyGroup.add(enemySprite)
}

for(i=0;i<EnemyGroup.length;i=i+1){
      
  if(missleGroup.isTouching(EnemyGroup.get(i))){
    missleHitSound.play();
    score=score+5;
    EnemyGroup.get(i).destroy();
    missleGroup.destroyEach();

  }
}



}

function spawnMissle(){
  if(frameCount % 30 ===0){
missle=createSprite(90,100);
//missle.debug =true;
missle.addImage(missleImage)
missle.scale =0.3;
missle.y= spaceshipSprite.y;
missle.velocityX =5;
missleGroup.add(missle);
missle.lifetime=1000 
spaceshipSprite.depth =missle.depth;
spaceshipSprite.depth+=1;

  }
}

function reset(){
gameState=PLAY;
gameoverSprite.visible =false;
reloadSprite.visible=false;
spaceshipSprite.visible=true;
missleGroup.destroyEach();
EnemyGroup.destroyEach();
score=0;



}



