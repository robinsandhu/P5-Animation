class Wall{
    constructor(x, h){
        this.x=x;
        this.h=height-h;
    }

    collide(oth){
        return !(this.x<oth.x);
    }

    bounce(oth){
        return -1*(oth.v);
    }

    show(){
        push();
        strokeWeight(4);
        stroke(255);
        line(this.x, height, this.x, this.h);
        pop();
    }
}