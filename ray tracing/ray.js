class Ray{
    constructor(pos, dir){
        this.pos = pos;
        this.dir = dir;
    }

    lookAt(x, y){
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    show(){
        stroke(255);
        line(this.pos.x, this.pos.y, this.pos.x+this.dir.x*10, this.pos.y+this.dir.y*10);
    }

    cast(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x+this.dir.x;
        const y4 = this.pos.y+this.dir.y;

        const den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);

        if(den==0){
            return;
        }
        const t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den;
        const u=-((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3))/den;

        if(t<=1&&t>=0&&u>=0){
            let pt=createVector(x1+t*(x2-x1), y1+t*(y2-y1));
            return pt;
        }else{
            return;
        }
    }
}