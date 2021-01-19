

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var f1, f2, f3, f4;
var a1;
var sword, swordImage;

function preload(){
  f1Image = loadImage("fruit1.png");
  f2Image = loadImage("fruit2.png");
  f3Image = loadImage("fruit3.png");
  f4Image = loadImage("fruit4.png");
  
  a1 = loadAnimation("alien1.png");
  a2 = loadAnimation("alien2.png");
  
  swordImage = loadImage("sword.png");
  
  gameOverImage = loadImage("gameover.png");
  
  gameOverSound = loadSound("gameover.mp3")
  cutSound = loadSound("knifeSwooshSound.mp3");
}
function setup(){
  createCanvas(400, 400);
  
  sword = createSprite(200,200,200,200);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  
  gameOver = createSprite(200,200,20,50);
  gameOver.addImage(gameOverImage);
  
  fruitGroup = createGroup();
  alienGroup = createGroup();
  
  score = 0;
}

function draw(){
  
  background("lightblue")
 
  text("Score: "+ score,300,30)
  
  if(keyDown("space")){
    gameState = PLAY; 
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+1;
    cutSound.play(); 
    
  }
    
  
 if(gameState === PLAY){
    gameOver.visible = false;
   spawnFruits();
   spawnAlien();
   sword.x = mouseX;
   sword.y = mouseY;
 }
  if (sword.isTouching(alienGroup)){
    alienGroup.destroyEach();
    gameState = END;
    gameOverSound.play();
  }
   
  
  if (gameState === END){
    gameOver.visible = true
    alienGroup.velocityX = 0;
    fruitGroup.velocityX = 0;
    alienGroup.destroyEach();
    fruitGroup.destroyEach();
    score = 0;
  }
  
  
  
drawSprites();
}

  function spawnFruits(){
 if (frameCount % 60 === 0){
      var fruit= createSprite(600,Math.round(random(20, 370)), 10, 10);
  
   fruit.velocityX = -(6 + score/4);
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    var side = Math.round(random(1,2));
    if (side===1){
    fruit.x=0;
    fruit.velocityX=(10+score/4);
    }
    else {
    fruit.x=600;
    fruit.velocityX=-(10+score/4);
    }
    
    switch(rand) {
      case 1: fruit.addImage(f1Image);
              break;
      case 2: fruit.addImage(f2Image);
              break;
      case 3: fruit.addImage(f3Image);
              break;
      case 4: fruit.addImage(f4Image);
              break;
      default: break;
      
    }
             
    fruit.scale = 0.2;
    fruit.lifetime = 300;
   
    fruitGroup.add(fruit);
 }
    
  }
function spawnAlien(){
  if(frameCount % 90 == 0){
    alien= createSprite(600,200,20,20);
    alien.addAnimation("moving",a1)
    alien.y = Math.round(random(100,300));
    alien.velocityX = -(6 + (score/10));
    alien.setLifetime = 50;
    
    alienGroup.add(alien);
  }
}