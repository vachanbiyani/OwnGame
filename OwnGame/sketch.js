const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var gameState="STORY";
var score = 0;
var hero,ground,ground2,invisibleGround,invisibleGround2;
var obstacle1,obstacle2,obstacle3,obstacle4;
var enemy1,enemy2,enemyHead;
var hero1_img,hero2_img,enemy1_img,enemy2_img,enemyHead_img;
var obstaclesGroup,enemyGroup;
var bullets,bulletsGroup,gamerOver_img;
var ground_img;


function preload(){

    obstacle1=loadImage("images/ob1.png");
    obstacle2=loadImage("images/ob2.png");
    obstacle3=loadImage("images/ob3.png");
    obstacle4=loadImage("images/ob4.png");

    enemy1_img=loadImage("images/enemy1.png");
    enemy2_img=loadImage("images/enemy2.png");
    enemyHead_img=loadImage("images/enemyHead.png");

    hero1_img=loadImage("images/hero1.png");
    hero2_img=loadImage("images/hero2.png");

    gameOver_img=loadImage("images/gameover.jpg");

    ground_img=loadImage("images/ground.png");



}

function setup(){

    createCanvas(displayWidth,windowHeight);

    ground = createSprite(displayWidth/2,windowHeight/2,400,20);
    ground.x = ground.width/2;
    ground.addImage("ground",ground_img)
  
    
    
    invisibleGround = createSprite(ground.x,windowHeight/2-5,ground.width,10);
    invisibleGround.visible = false;
  
    

    hero = createSprite(100,ground.y-50,40,80);
    hero.addImage("hero",hero1_img);
    hero.scale=0.4

    
    bullets=createSprite(hero.x,hero.y,10,10);


    obstaclesGroup=new Group();
    enemyGroup=new Group();

    score=0

}

function draw(){
    background(180);

    console.log(displayWidth,windowHeight);

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);  

    if(gameState==="STORY"){

        textSize(30)
        text("YOU ARE THE HERO OF YOUR CITY",200,20);
        text("BUT YOUR CITY IS IN DANGER" ,200,50);
        text("ALIENS HAVE INVADED YOUR CITY ",200,80);
        text("YOUR ARE THE LAST HOPE OF YOUR CITY",200,110);
        text("SAVE YOUR CITY BY KILLING ALL ALIENS" ,200,140);
        text("YOUR ABILITY INCREASES AS YOU KILL YOUR ENEMIES",200,170);

        text("GOOD LUCK",displayWidth/2,windowHeight-70); 
        text("PRESS SPACE TO START THE GAME",displayWidth-540,windowHeight-20);

        //ground.visible=false;
        //hero.visible=false;
        if(keyDown("a")){
            gameState="PLAY";
        }
    }else
     if(gameState==="PLAY"){

        

        if(keyDown("space") && hero.y>=344.5) {
            hero.velocityY = -14;
          }
          
          hero.velocityY = hero.velocityY + 0.5

          hero.collide(invisibleGround);
          hero.collide(invisibleGround2);

          if(hero.isTouching(obstaclesGroup)){
              gameState="END";
         }

         spawnObstacles();
         spawnEnemy();
       
     }else 
     if(gameState==="END"){

        hero.velocityX=0;
        hero.velocityY=0;

      hero.addImage("gameOver_img");

     }

     


    drawSprites();
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      //note obstacle.x
      var obstacle = createSprite(hero.x+displayWidth-100,165,10,40);
      //obstacle.velocityX = -4;
      //generate random obstacles
      var rand = Math.round(random(1,4));
      /*switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
        default: break;
      }*/
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.5;
      //note obstacle.lifetime
      obstacle.lifetime = displayWidth/hero.velocityX+30;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  function spawnEnemy() {
    if(frameCount % 60 === 0) {
      //note obstacle.x
      var enemy = createSprite(hero.x+displayWidth-100,random(ground.y-50,ground.y-150),10,40);
      //obstacle.velocityX = -4;
      //generate random obstacles
      var rand = Math.round(random(1,2));
      /*switch(rand) {
        case 1: enemy.addImage(enemy1);
                break;
        case 2: enemy.addImage(enemy2);
                break;
        default: break;
      }*/
           
      enemy.scale = 0.5;
      enemy.velocityX=-5;
      enemy.lifetime = displayWidth/ground2.velocityX+30;
      enemyGroup.add(enemy);

      if(frameCount % 500 === 0){
          var enemyHead =createSprite(displayWidth,165,10,40);
          enemyHead.addImage(enemyHead_img);
          enemyHead.scale=0.5
          enemyHead.velocityx=-10;
          enemyHead.lifetime = displayWidth/ground2.velocityX+30;
          enemyGroup.add(enemyHead);  

      }
    }
  }

