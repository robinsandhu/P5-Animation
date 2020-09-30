
let arr = [];
let i=1;
let j=0;

function setup(){
    createCanvas(800, 500);
    for(let i=0;i<60;i++){
        arr.push(Math.random()*400+1);
    }
}

function draw(){
    background(0);
    stroke(255);
    strokeWeight(6);
    let n = arr.length;
    while(i<n){
        while(1){
            if(arr[j]>arr[j+1]){
                let tmp=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=tmp;
            }
            if(j===n-i){
                i++; j=0;
            }else{
                j++;
            }
            break;
        }
        break;
    }
//    console.log(i);
//    console.log(j);
    let gap=0;
    for(let k=0;k<n;k++){
        stroke(255);
        if(k>=j&&k<j+2){
            stroke(255, 0, 0);
        }
        line(100+gap, 0, 100+gap, arr[k]);
        gap+=10;
    }
}