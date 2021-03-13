const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird1, bird2, bird3, bird4, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var birdArray = [];

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird1 = new Bird(200,50);
    bird2 = new Bird(150,50);
    bird3 = new Bird(100,50);
    bird4 = new Bird(50,50);

    //birdArray.length = 5
    //birdArray.length -1; birdArray[0], bA[1],bA[2],bA[3],bA[4]
    //birdArray[birdArray.length-1]
    birdArray.push(bird4);
    birdArray.push(bird3);
    birdArray.push(bird2);
    birdArray.push(bird1);
    //birdArray.pop();
    //birdArray =[]
    

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird1.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird1.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birdArray[birdArray.length-1].body, {x: mouseX , y: mouseY});
        Matter.body.applyForce(birdArray[birdArray.length-1].body, birdArray.body.position, {x: 5, y:-5});

        //birdArray[0]
        //birdArray[birdArray.length-1];
        //index => 
    }
}


function mouseReleased(){
    slingshot.fly();
    birdArray.pop();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        if(birdArray.length > 0){
            Matter.Body.setPosition(birdArray[birdArray.length-1].body, {x: 200 , y: 50});  
            slingshot.attach(birdArray[birdArray.length - 1].body);
            gameState = "onSling";
            }     
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
