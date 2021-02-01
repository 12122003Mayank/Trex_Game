
var trex 
var trex_running;
var trex_collide;
var ground
var ground_image;      
var cloud;
var cloud_image;
var obstacle_1;
var obstacle_2;
var obstacle_3;
var obstacle_4;
var obstacle_5;
var obstacle_6;
var obstacles;
var gamestate="play";
var obstaclesgroup;
var cloudsgroup;
var Mr_X;
var Game_over;
var Restart;
var Game_over_S;
var Restart_S;
var Score=50;
var jumpsound;
var checkpointsound;
var diesound;
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
trex_collide=loadAnimation("trex_collided.png");
ground_image =loadImage("ground2.png");
cloud_image=loadImage("cloud.png");
obstacle_1=loadImage("obstacle1.png");
obstacle_2=loadImage("obstacle2.png");
obstacle_3=loadImage("obstacle3.png");
obstacle_4=loadImage("obstacle4.png");
obstacle_5=loadImage("obstacle5.png");
obstacle_6=loadImage("obstacle6.png");
Game_over=loadImage("gameOver.png");
Restart=loadImage("restart.png");
jumpsound=loadSound("jump.mp3");
checkpointsound=loadSound("checkPoint.mp3");
diesound=loadSound("die.mp3");
}
function setup(){
  createCanvas(600,200)
  trex = createSprite(40,160)
  trex.addAnimation("mayank_1",trex_running)
  trex.addAnimation("mayank_2",trex_collide)
  trex.scale = 0.5
  ground =createSprite(300,190,600,10)
  ground.addImage("mayank",ground_image)
  console.log("mayank")
  obstaclesgroup=createGroup();
  cloudsgroup=createGroup();
  Mr_X=createSprite(300,195,600,5);
  Mr_X.visible=false;
  trex.setCollider("circle",0,0,60);
  trex.debug=false;
  Game_over_S=createSprite(300,110,10,10);
  Game_over_S.addImage("gameOver.png",Game_over);
  Game_over_S.scale=0.5;
  Restart_S=createSprite(300,130,10,10);
  Restart_S.addImage("restart.png",Restart);
  Restart_S.scale=0.5;
}

function draw(){
  background("white")
  text("Score:"+Score,530,50)
  if(gamestate=="play")
    {
      trex.changeAnimation("mayank_1",trex_running)
      Score+=1;
      Game_over_S.visible=false;
      Restart_S.visible=false;
      if(Score%500==0)
        {
          checkpointsound.play();
        }
      
      ground.velocityX=-(3*Score/100);
      if (keyDown("space")&&trex.y>120)
      { 
      trex.velocityY=-15;
      jumpsound.play();  
      }
       trex.velocityY+=1.5;
       if(ground.x<0)
      { 
       ground.x=300;
      }
      populate_clouds();
      populate_obstacles();
      if(trex.isTouching(obstaclesgroup))
        {
          gamestate="end";
          diesound.play();
        }
    }
  
  if(gamestate=="end")
   {
     trex.changeAnimation("mayank_2",trex_collide)
     Game_over_S.visible=true;
      Restart_S.visible=true;
    ground.velocityX=0;
   obstaclesgroup.setVelocityXEach(0);
   cloudsgroup.setVelocityXEach(0);
    if( mousePressedOver(Restart_S))
       {
         reset();
      }
   cloudsgroup.setLifetimeEach(-5);
    obstaclesgroup.setLifetimeEach(-5);
   }
   trex.collide(Mr_X)
  drawSprites();
}
function populate_clouds()
{
   if(frameCount%60==0)
   {
  cloud =createSprite(530,30,10,5);
  cloud.addImage("mayank",cloud_image)  
  cloud.velocityX=-5 ;
  cloud.y=Math.round(random(10,50));
  cloud.lifetime =120; 
  cloudsgroup.add(cloud)  
   }
  
}
function populate_obstacles()
{
  if(frameCount%60==0)
  {
  var a;
  obstacles=createSprite(590,170,10,10);
    obstacles.scale=0.4;
    var a=Math.round(random(1,6))
  obstacles.velocityX=-(3*Score/100);
  obstacles.lifetime =120;
  switch(a)
  {
    case 1: obstacles.addImage("obstacle1.png",obstacle_1);
            break;
    case 2:obstacles.addImage("obstacle2.png",obstacle_2);
            break;
     case 3:obstacles.addImage("obstacle3.png",obstacle_3);
            break;
    case 4:obstacles.addImage("obstacle4.png",obstacle_4);
            break;
    case 5:obstacles.addImage("obstacle5.png",obstacle_5);
            break;
    case 6:obstacles.addImage("obstacle6.png",obstacle_6);
            break;
   }
    obstaclesgroup.add(obstacles);
}
}
function reset() 
{
  gamestate="play";
  Score=0;
  cloudsgroup.destroyEach();
  obstaclesgroup .destroyEach();
}