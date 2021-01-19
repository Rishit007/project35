var dog, happyDog;
var database;
var foodS = 20;
var foodStock;
var dogImg, happyDogImg;

function preload()
{
  dogImg = loadImage("images/dogImg1.png");
  happyDogImg = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87)
  
  textSize(20);
  fill(255);
  text("food remaining : "+ foodS, 160,150);


  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDogImg);
    writeStock();
  }
  
  
  drawSprites();
  
  text("note: Press UP Arrow to feed Drago food",75,20)

}

function readStock(data){
  foodS = data.val();
}

function writeStock(){

  if(foodS<=0){
    foodS=0
  }
  else{
    foodS=foodS-1;
  }
  
  database.ref('/').update({
    food:foodS
  })

}

