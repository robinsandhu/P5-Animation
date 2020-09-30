
let g = 1.6;

let m1=13; let m2=13;
let l1=140; let l2=120;
let a1=Math.PI/2; let a2=Math.PI; 

let a1_v=0; let a2_v=0;
let a1_a; let a2_a;

let points = [];

function setup(){
    createCanvas(600, 600);
}

function draw(){

    let den = 2*m1 + m2 - m2*Math.cos(2*(a1-a2));

    let num1 = -g*(2*m1 + m2)*Math.sin(a1) - m2*g*Math.sin(a1 - 2*a2) - 2*Math.sin(a1 - a2)*m2*(a2_v*a2_v*l2 + a1_v*a1_v*l1*Math.cos(a1 - a2));
    let num2 = 2*Math.sin(a1 - a2)*(a1_v*a1_v*l1*(m1 + m2) + g*(m1 + m2)*Math.cos(a1) + a2_v*a2_v*l2*m2*Math.cos(a1 - a2));

    a1_a = num1/(l1*den);
    a2_a = num2/(l2*den);

    background(0);
    translate(300, 200);
    let x1 = l1*Math.sin(a1);
    let y1 = l1*Math.cos(a1);

    let x2 = x1 + l2*Math.sin(a2);
    let y2 = y1 + l2*Math.cos(a2);

    if((a1>Math.PI/2&&a2>0)||(a1<(-1)*Math.PI/2&&a2<0)){
        push();
        stroke(0, 0, 255);
        strokeWeight(2.5);
        line(0, 0, x1, y1);
        line(x1, y1, x2, y2);
        pop();
    }else{
        push();
        stroke(255, 0, 0);
        strokeWeight(2.5);
        line(0, 0, x1, y1);
        line(x1, y1, x2, y2);
        pop();
    }
    ellipse(0, 0, 13, 13);
    ellipse(x1, y1, m1, m1);
    ellipse(x2, y2, m2, m2);

    if(points.length>1500){
        points.shift();
    }
    points.push(createVector(x2, y2));
    let test=0;
    for(let i=0;i<points.length-1;i++){
        stroke([225-test, 255, 255]);
        strokeWeight(1);
        line(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
        if((i+1)%15===0){
            test++;
        }
    }
    a1_v+=a1_a;
    a2_v+=a2_a;
    a1+=a1_v;
    a2+=a2_v;
}