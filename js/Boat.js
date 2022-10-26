class Boat{
    constructor(x,y,w,h,boatPos,bAnimation){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boatPos = boatPos;
        this.bAnimation = bAnimation;
        this.speed = 0.05;
        var options = {
            restitution:0.8,
            friction:1,
            density: 1
        };
        this.isBroken = false;
        this.body = Bodies.rectangle(this.x,this.y,this.w,this.h,options);
        this.image = loadImage("./assets/boat.png");
        World.add(world,this.body);
    }

    display(){
        var angle = this.body.angle;
        var pos = this.body.position;
        var index = floor(this.speed % this.bAnimation.length);
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.bAnimation[index],0,this.boatPos,this.w,this.h);
        noTint();
        pop();
    }

    

    animate(){
        this.speed+=0.05 % 1.1;
    }

    remove(index){
        this.bAnimation = brokenBoatAnimation;
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;
        this.isBroken = true;
        setTimeout(()=>{
            Matter.World.remove(world,boats[index].body);
            boats.splice(index,1);
        },2000);
    }
}