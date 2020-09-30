
let walls=[];
let particle;

function setup(){
    createCanvas(400, 400);
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(0, height, width, height));
    walls.push(new Boundary(0, 0, 0, height));
    walls.push(new Boundary(width, 0, width, height));
    for(let i=0;i<6;i++){
        walls.push(new Boundary(Math.random()*width, Math.random()*height, Math.random()*width, Math.random()*height));
    }
    particle = new Particle();
}

function draw(){
    background(0);
    for(let wall of walls){
        wall.show();
    } 
    particle.update(mouseX, mouseY);
    particle.show();
    particle.cast(walls);
}