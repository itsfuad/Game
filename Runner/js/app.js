const canvas = document.getElementById('canvas');

const ctx = canvas.getContext("2d");

const x = document.getElementById('x');
const y = document.getElementById('y');

x.innerText = 0;
y.innerText = 0;


class Obj{
    constructor(canvas){
        this.canvas = canvas;
        this.color = "yellow";
        this.height = 20;
        this.width = 20;
        this.position = {x: 0, y: 0};
        this.speed = {x: 2, y: 0};
        this.hasColided = false;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        x.innerText = this.position.x;
        y.innerText = this.position.y;
    }
    colision(target){
        if((this.position.x) < (target.position.x + target.width)
        && (this.position.x+this.width) > target.position.x
        && (this.position.y) < (target.position.y + target.height)
        && (this.position.y+this.height) > target.position.y){
            console.log("Colision");
        }
        if((this.position.x + this.width) > (canvas.width)
        || this.position.x < 0)
        {
            this.speed.x = -this.speed.x;
            //console.log("Colision");
        }
        if((this.position.y + this.height) > (canvas.height)
        || this.position.y < 0){
            this.speed.y = -this.speed.y;
            //console.log("Colision");
        }
    }
}

class Player extends Obj{
    constructor(canvas){
        super(canvas);
    }
}

class Obstacle extends Obj{
    constructor(canvas){
        super(canvas);
    }
    generate(){
        if(this.position.x <= 0 
        && this.position.x + this.width <= 0){
            this.position.x = canvas.width + this.width;
            console.log("Behind");
        }
    }
}


const bar = new Obstacle(canvas);
bar.width = 30;
bar.height = 50;
bar.color = "hotpink";
bar.position.x = (canvas.width + bar.width);
bar.position.y = canvas.height - bar.height;
bar.speed = {x: -8, y: 0};

const player = new Player(canvas);
player.color = "lime";
player.height = 20;
player.width = 20;
player.speed = {x: 2, y: 2};

const gameloop = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    bar.update();
    bar.draw(ctx);
    bar.generate();

    player.update();
    player.draw(ctx);
    player.colision(bar);

    requestAnimationFrame(gameloop);
}
requestAnimationFrame(gameloop);