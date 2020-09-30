let h=600;
let w=600;
let bs=20;
let rows;
let cols;
let grid=[];
let current;
let stk = [];
let flag=0;

function setup(){
    let canvas = createCanvas(w+6, h+6);
    cols=Math.floor(w/bs);
    rows=Math.floor(h/bs);
    for(let i=0;i<rows;i++){
        let tmp=[];
        for(let j=0;j<cols;j++){
            tmp.push(new Cell(i, j, bs, bs));
        }
        grid.push(tmp);
    }
    let button = document.querySelector("#start");
    document.addEventListener("click", function(){
        if(flag===0){
            flag=1;
            current=createVector(0, 0);
            grid[current.y][current.x].visited=true;
            stk.push(current);
        }
    });
    // frameRate(20);
}

function draw(){
    background(255);
    translate(2, 2);
    while(stk.length!==0){
        current = stk.pop();
        let neighbour = grid[current.y][current.x].getNeighbour(grid, rows, cols);
        // console.log(neighbour);
        if(neighbour!==undefined){
            stk.push(current);
            grid[neighbour.y][neighbour.x].visited=true;
            removeWall(grid, current, neighbour);
            stk.push(neighbour);
        }
        break;
    }

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j].show();
        }
    }

    for(let ele of stk){
        noStroke();
        fill(0, 168, 219);
        let cell=grid[ele.y][ele.x];
        rect(cell.j*cell.w, cell.i*cell.h, cell.w, cell.h);
    }
}

function removeWall(grid, current, neighbour){
    let o1 = grid[current.y][current.x];
    let o2 = grid[neighbour.y][neighbour.x];
    if(o1.j===o2.j){
        if(o1.i>o2.i){
            grid[current.y][current.x].t=0;
            grid[neighbour.y][neighbour.x].b=0;
        }else{
            grid[current.y][current.x].b=0;
            grid[neighbour.y][neighbour.x].t=0;
        }
    }else if(o1.i===o2.i){
        if(o1.j>o2.j){
            grid[current.y][current.x].l=0;
            grid[neighbour.y][neighbour.x].r=0;
        }else{
            grid[current.y][current.x].r=0;
            grid[neighbour.y][neighbour.x].l=0;
        }
    }
}