class Particle{
    constructor(){
        this.pos=createVector(width/2, height/2);
        this.rays=[];
        for(let i=0;i<360;i+=1){
            this.rays.push(new Ray(this.pos, createVector(Math.cos(radians(i)), Math.sin(radians(i)))));
        }
    }

    update(x, y){
        this.pos.x=x;
        this.pos.y=y;
    }

    cast(walls){
        for(let ray of this.rays){
            let min=100000;
            let pt;
            for(let wall of walls){
                let tmp=ray.cast(wall);
                if(tmp!=undefined){
                    if(this.pos.dist(tmp)<min){
                        min=this.pos.dist(tmp); pt=tmp;
                    }
                }
            }
            if(pt!=undefined){
                stroke(255, 120);
                line(this.pos.x, this.pos.y, pt.x, pt.y);
            }
        }
    }

    show(){
        for(let i=0;i<this.rays.length;i++){
            this.rays[i].show();
        }
    }
}