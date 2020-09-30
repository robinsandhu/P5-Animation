const fact=0.67;
let len = 100;

function branch(l, theta, x, y, angle, c){
    if(l<1){
        return;
    }
    let x1=l*Math.cos(theta);
    let y1=l*Math.sin(theta);
    push();
    stroke(148, 255, 173);
    strokeWeight(c);
    translate(x, y);
    line(0, 0, x1, y1);
    pop();
    branch(fact*l, theta-angle+PI/8, x+x1, y+y1, angle, fact*c);
    branch(fact*l, theta+angle, x+x1, y+y1, angle, fact*c);
}

function setup(){
    createCanvas(500, 500);
    slider = createSlider(0, PI, PI/6, 0.1);
}

function draw(){
    background(0);
    let angle=slider.value();
    branch(100, 3*PI/2, 250, 400, angle, 5);
}