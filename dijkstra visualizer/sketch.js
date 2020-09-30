
const MAX=10000;
let div;
let bs;
let grid = [];
let w=600;
let startN;
let endN;
let startF=0;
let endF=0;
let dist = [];
let par = [];
let queue = [];
let flag;
let finish=0;
let count=0;

function setup(){
    let canvas = createCanvas(w, w);
    canvas.parent('sketch-div');
    initialize();
    slider = createSlider(10, 40, 30, 10);
    flag=0;
    button = createButton('I/O');
    button.mousePressed(changeFlag);
}

function changeFlag(){
    finish=0;
    if(flag===0){
        flag=1;
    }else if(flag===1){
        flag=0;
    }
}

function initialize(){
    for(let i=0;i<40;i++){
        let tmp = [];
        let tmp1 = [];
        let tmp2 = [];
        for(let j=0;j<40;j++){
            tmp.push(0);
            tmp1.push(MAX);
            tmp2.push(createVector(-1, -1));
        }
        par.push(tmp2);
        dist.push(tmp1);
        grid.push(tmp);
    }
}

function reset(){
    for(let i=0;i<40;i++){
        for(let j=0;j<40;j++){
            grid[i][j]=0;
            dist[i][j]=MAX;
            par[i][j]=createVector(-1, -1);
        }
    }
    flag=0;
    startF=0;
    endF=0;
    finish=0;
}

function draw(){
    background(50);
    div = slider.value();
    bs = w/div;
    if(mouseIsPressed&&mouseButton===LEFT){
        if(key==='s'||key==='S'){
            if(startF!==1){
                startN=createVector(Math.floor(mouseX/bs), Math.floor(mouseY/bs));
                grid[Math.floor(mouseX/bs)][Math.floor(mouseY/bs)]=2;
                startF=1;
            }
        }else if(key==='e'||key==='E'){
            if(endF!==1){
                endN=createVector(Math.floor(mouseX/bs), Math.floor(mouseY/bs));
                grid[Math.floor(mouseX/bs)][Math.floor(mouseY/bs)]=3;
                endF=1;
            }
        }else if(key==='d'||key==='D'){
            if(grid[Math.floor(mouseX/bs)][Math.floor(mouseY/bs)]===2){
                startF=0;
            }else if(grid[Math.floor(mouseX/bs)][Math.floor(mouseY/bs)]===3){
                endF=0;
            }
            grid[Math.floor(mouseX/bs)][Math.floor(mouseY/bs)]=0;
        }else if(key==='w'||key==='W'){
            grid[Math.floor(mouseX/bs)][Math.floor(mouseY/bs)]=1;
        }
    }
    if(keyIsDown(ESCAPE)){
        reset();
    }

    if(flag){
        if(startN===undefined||endN===undefined){
            flag=0;
            alert("One of the end point is not defined!");
        }else{
//            console.log("I'm IN");
            dist[startN.x][startN.y]=0;
            par[startN.x][startN.y]=createVector(startN.x, startN.y);
            queue.push(startN);
            while(queue.length!==0){
                let tmp = queue[0];
                queue.shift();
                if(tmp.y-1>=0&&dist[tmp.x][tmp.y-1]===MAX){
                    if(grid[tmp.x][tmp.y-1]===0){
                        par[tmp.x][tmp.y-1]=createVector(tmp.x, tmp.y);
                        dist[tmp.x][tmp.y-1]=dist[tmp.x][tmp.y]+1;
                        queue.push(createVector(tmp.x, tmp.y-1));
                    }else if(grid[tmp.x][tmp.y-1]===3){
                        par[tmp.x][tmp.y-1]=createVector(tmp.x, tmp.y);
                        flag=0; finish=1;
                        break;
                    }
                }
                if(tmp.x+1<div&&dist[tmp.x+1][tmp.y]===MAX){
                    if(grid[tmp.x+1][tmp.y]===0){
                        par[tmp.x+1][tmp.y]=createVector(tmp.x, tmp.y);
                        dist[tmp.x+1][tmp.y]=dist[tmp.x][tmp.y]+1;
                        queue.push(createVector(tmp.x+1, tmp.y));
                    }else if(grid[tmp.x+1][tmp.y]===3){
                        par[tmp.x+1][tmp.y]=createVector(tmp.x, tmp.y);
                        flag=0; finish=1;
                        break;
                    }
                }
                if(tmp.y+1<div&&dist[tmp.x][tmp.y+1]===MAX){
                    if(grid[tmp.x][tmp.y+1]===0){
                        par[tmp.x][tmp.y+1]=createVector(tmp.x, tmp.y);
                        dist[tmp.x][tmp.y+1]=dist[tmp.x][tmp.y]+1;
                        queue.push(createVector(tmp.x, tmp.y+1));
                    }else if(grid[tmp.x][tmp.y+1]===3){
                        par[tmp.x][tmp.y+1]=createVector(tmp.x, tmp.y);
                        flag=0; finish=1;
                        break;
                    }
                }
                if(tmp.x-1>=0&&dist[tmp.x-1][tmp.y]===MAX){
                    if(grid[tmp.x-1][tmp.y]===0){
                        par[tmp.x-1][tmp.y]=createVector(tmp.x, tmp.y);
                        dist[tmp.x-1][tmp.y]=dist[tmp.x][tmp.y]+1;
                        queue.push(createVector(tmp.x-1, tmp.y));
                    }else if(grid[tmp.x-1][tmp.y]===3){
                        par[tmp.x-1][tmp.y]=createVector(tmp.x, tmp.y);
                        flag=0; finish=1;
                        break;
                    }
                }
                if(count>2){
                    count=0;
                    break;
                }else{
                    count++;
                }
            }
            if(finish===1){
                console.log('Done');
            }
        }
    }
    stroke(94, 234, 255);
    strokeWeight(1.5);
    for(let x=0;x<width;x+=bs){
        for(let y=0;y<height;y+=bs){
            let r=Math.floor(x/bs);
            let t=Math.floor(y/bs);
            if(dist[r][t]!==MAX){
/*                let inter = map(1, 0, , 0, 1);
                let cg = lerpColor(from, to, inter);
                fill(cg);*/
                fill(252, 3, 152);
                rect(x, y, bs, bs);
            }else{
                if(grid[r][t]===0){
                    fill(255);
                    rect(x, y, bs, bs);
                }else if(grid[r][t]===1){
                    fill(0);
                    rect(x, y, bs, bs);
                }else if(grid[r][t]===2){
                    fill(124, 255, 94);
                    rect(x, y, bs, bs);
                }else if(grid[r][t]===3){
                    fill(255, 0, 0);
                    rect(x, y, bs, bs);
                }
            }
        }
    }
    
    if(finish===1){
        console.log("I'm here");
        let it = par[endN.x][endN.y];
        while(!it.equals(startN)){
            fill(246, 255, 0);
            rect(it.x, it.y, bs, bs);
            it=par[it.x][it.y];
        }
        noLoop();
    }
}
