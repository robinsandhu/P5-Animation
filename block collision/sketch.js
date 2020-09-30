
let b1;
let b2;
let wall;
let total;
let s;
const timeSteps=100000;
let digits=7;

function setup(){
    createCanvas(800, 250);
    wall = new Wall(2, 120);
    b1 = new Block(100, 40, 1, 0);
    const power = pow(100, digits-1);
    b2 = new Block(250, 70, power, -3/timeSteps);
 //   s = loadSound('glitch.wav');
    total=0;
}

function draw(){
    background(150);
    wall.show();
    for(let i=0;i<timeSteps;i++){
        if(wall.collide(b1)){
            const v1 = wall.bounce(b1);
            b1.update(v1);
            total++;
        }
        if(b1.isOverlap(b2)){
            const v1 = b1.bounce(b2);
            const v2 = b2.bounce(b1);
            b1.update(v1); b2.update(v2);
            total++;
        }
        b1.traverse();
        b2.traverse();
    }
    b1.show();
    b2.show();
    console.log(total);
    if(b1.breakCheck(b2)){
        noLoop();
    }
}