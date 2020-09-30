class Cell{
    constructor(i, j, w, h){
        this.i=i;
        this.j=j;
        this.w=w;
        this.h=h;
        this.l=1;
        this.r=1;
        this.t=1;
        this.b=1;
        this.visited=false;
    }

    getNeighbour(grid, rows, cols){
        let neighbours = [];

        if(this.i-1>=0&&grid[this.i-1][this.j].visited!==true){
            neighbours.push(createVector(this.j, this.i-1));
        }
        if(this.i+1<rows&&grid[this.i+1][this.j].visited!==true){
            neighbours.push(createVector(this.j, this.i+1));
        }
        if(this.j-1>=0&&grid[this.i][this.j-1].visited!==true){
            neighbours.push(createVector(this.j-1, this.i));
        }
        if(this.j+1<cols&&grid[this.i][this.j+1].visited!==true){
            neighbours.push(createVector(this.j+1, this.i));
        }

        if(neighbours.length===0){
            return;
        }
        return neighbours[Math.floor((Math.random()*neighbours.length))];
    }

    show(){
        stroke(161, 252, 255);
        strokeWeight(1.5);
        let x=this.j*this.w;
        let y=this.i*this.h;
        if(this.t===1){
            line(x, y, x+this.w, y);
        }
        if(this.l===1){
            line(x, y, x, y+this.h);
        }
        if(this.r===1){
            line(x+this.w, y, x+this.w, y+this.h);
        }
        if(this.b===1){
            line(x, y+this.h, x+this.w, y+this.h);
        }
        if(this.visited===true){
            noStroke();
            fill(15, 92, 128);
            rect(x, y, this.w, this.h);
        }
    }
}