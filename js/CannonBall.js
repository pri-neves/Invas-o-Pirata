class CannonBall{
    constructor(x,y){
        var options={
            restitution: 0.8,
            friction: 1, //atrito entre o corpo e o outro 
            density: 1, //peso do corpo
            isStatic: true
        };

        this.r = 40;
        this.trajectory=[];
        this.isSink = false;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("../assets/cannonball.png");
        World.add(world,this.body);
    }


    display(){
        var angle = this.body.angle;
        var pos= this.body.position;
        
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.r,this.r);
        pop();

        //console.log(pos);
        if(this.body.velocity.x > 0 && this.body.position.x > 230 &!this.isSink){
            position=[this.body.position.x,this.body.position.y];
            this.trajectory.push(position);
        }
        for(var i=0; i<this.trajectory.length;i++){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5);
        }

    }

    shoot(){
        //p5.Vector.fromAngle retorna um vetor de 2 dimensões
        var velocity = p5.Vector.fromAngle(cannon.angle);
        //mult multiplica o valor da velocidade
        velocity.mult(20);
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body,{x:velocity.x,y:velocity.y});
    }

    remove(index) {
        this.isSink = true;
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

        this.speed = 0.05;
        this.r = 150;
        setTimeout(() => {
          Matter.World.remove(world, this.body);
          balls.splice(index, 1);
        }, 1000);
      }
    
}