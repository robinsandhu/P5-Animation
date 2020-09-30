class Block{
    constructor(x, w, m, v){
        this.x = x;
        this.y = height - w;
        this.w = w;
        this.m = m;
        this.v = v;
    }

    isOverlap(other){
        return !(this.x+this.w<other.x||this.x>other.x+other.w);
    }

    bounce(oth){
        const m1=this.m; const m2=oth.m;
        const sumM=m1+m2;
        const v1 = (m1-m2)*this.v/sumM + 2*m2*oth.v/sumM;
        return v1;
    }

    update(v){
        this.v=v;
    }

    traverse(){
        this.x+=this.v;
    }

    breakCheck(other){
        return (this.v<0&&other.v<this.v)
    }

    show(){
        stroke(255);
        fill(0, 0, 255);
        rect(this.x, this.y, this.w, this.w);
    }
}