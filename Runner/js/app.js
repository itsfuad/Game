const canvas = document.getElementById('canvas');



canvas.style.width = 10000;
canvas.style.height = 5000;

let score = 0, highscore = parseInt(window.localStorage.getItem('itf_hgs')) || 0;

const ctx = canvas.getContext("2d");
ctx.font =  "10px Arial";

const x = document.getElementById('x');
const y = document.getElementById('y');

let upTimeId;
let downTimeId;
let lifted;
let Paused = false;

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
    objectColision(target){
        //////console.log("Hello");
        ////console.log(this.position.x);
        ////console.log(target.position.x);
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
            //////console.log("Colision");
            Paused = true;
        }
        if((this.position.y + this.height) > (canvas.height)
        || this.position.y < 0){
            this.speed.y = -this.speed.y;
            //////console.log("Colision");
            Paused = true;
        }
    }
}





class Player extends Obj{
    constructor(canvas){
        super(canvas);
        this.gravity = 2;
    }
    jump(){
        clearInterval(upTimeId);
        lifted = 0;
        this.gravity = 0;
        ////console.log("Jumped!");
        upTimeId = setInterval(() => {
            this.position.y -= 5;
            lifted += 1;
            if (lifted >= 5){
                clearInterval(upTimeId);
                this.gravity = 2;
            }
        }, 30);
    }
    colision(){
        if((this.position.x + this.width) > (canvas.width)
        || this.position.x < 0)
        {
            this.speed.x = 0;
            Paused = true;
            //////console.log("Colision");
        }
        if((this.position.y + this.height ) > (canvas.height)
        || this.position.y < 0){
            this.speed.y = 0;
            Paused = true;
            //////console.log("Colision");
        }
    }
}






class Obstacle extends Obj{
    constructor(canvas){
        super(canvas);
        this.canvas = canvas;
    }
    generate(){
        if(this.position.x <= 0 
        && this.position.x + this.width <= 0){
            this.position.x = canvas.width + this.width;
            ////console.log("Behind");
            this.height = Math.floor(Math.random() * 50) + 20;
            //console.log(this.height);
            this.position.y = Math.floor(Math.random() * this.canvas.height/2) + 0;
        }
    }
}






class input {
    constructor(obj){
        document.addEventListener("click", evt =>{
            //console.log("User Tapped!");
            obj.jump();
        });
        document.addEventListener("keydown", evt=>{
            if(evt.key === " "){ 
                obj.jump();
            }
        });
    }
}




const bar = new Obstacle(canvas);
bar.color = "black";
bar.speed = {x: -2  , y: 0};

const bar2 = new Obstacle(canvas);
bar2.color = "black";
bar2.speed = {x: -2, y: 0};
bar2.position.x = canvas.width / 2 + 20;

const player = new Player(canvas);
player.color = "slateblue";
player.height = 10;
player.width = 10;
player.position.x = canvas.width / 6;
player.speed = {x: 0, y: 0};

new input(player);



const gameloop = () => {
    if(Paused){
        alert("Game Over");
        reset();
        return;
    }
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    bar.update();
    bar.draw(ctx);
    bar.generate();
    
    bar2.update();
    bar2.draw(ctx);
    bar2.generate();
    
    
    player.position.y += player.gravity;
    player.update();
    player.draw(ctx);
    player.colision();
    player.objectColision(bar);
    player.objectColision(bar2);  
    
    score += 0.05;
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+Math.floor(score).toString(), 10, 10);
    ctx.fillText("High Score: "+highscore, 10, 20);
    requestAnimationFrame(gameloop);
}

function reset(){
    Paused = false;
    bar.color = "black";
    bar.speed = {x: -2  , y: 0};

    bar2.color = "black";
    bar2.speed = {x: -2, y: 0};
    bar2.position.x = canvas.width / 2 + 20;

    player.color = "lime";
    player.height = 10;
    player.width = 10;
    player.position = {x:canvas.width / 6, y: 0};
    player.speed = {x: 0, y: 0};
    if (score > highscore){ 
        highscore = score;
        window.localStorage.setItem("itf_hgs", Math.floor(highscore).toString());
    }
    score = 0;
   // gameloop();
}

gameloop();
