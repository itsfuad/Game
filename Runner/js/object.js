export default class Obj{
    constructor(canvas){
        this.canvas = canvas;
        this.color = "yellow";
        this.height = 20;
        this.width = 20;
        this.position = {x: 0, y: 0};
        this.speed = {x: 2, y: 0};
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        if(!Paused){
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;
            x.innerText = this.position.x;
            y.innerText = this.position.y;
        }
        else{
            alert("Game Over Folks!");
        }
    }
    objectColision(target){
        //console.log("Hello");
        console.log(this.position.x);
        console.log(target.position.x);
        if((this.position.x) < (target.position.x + target.width)
        && (this.position.x+this.width) > target.position.x
        && (this.position.y) < (target.position.y + target.height)
        && (this.position.y+this.height) > target.position.y){
            Paused = true;
        }
    }
    colision(){
        if((this.position.x + this.width) > (canvas.width)
        || this.position.x < 0)
        {   
            this.speed.x = -this.speed.x;
            //console.log("Colision");
            Paused = true;
        }
        if((this.position.y + this.height) > (canvas.height)
        || this.position.y < 0){
            this.speed.y = -this.speed.y;
            //console.log("Colision");
            Paused = true;
        }
    }
}