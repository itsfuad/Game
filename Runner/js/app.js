const canvas = document.getElementById('canvas');

canvas.width = 3000;
canvas.height = 2000;


let score = 0, highscore = parseInt(window.localStorage.getItem('itf_hgs')) || 0;
let gravity = 20;
let maxGravity = 20;
let upforce = 40;
let speed = 20;
const ctx = canvas.getContext("2d");
ctx.font =  "90px Arial";

const x = document.getElementById('x');
const y = document.getElementById('y');

let upTimeId;
let downTimeId;
let lifted;
let Paused = false;

x.innerText = 0;
y.innerText = 0;


function media_f(){
    let media = window.matchMedia("(orientation: portrait)")
    if (media.matches){
        speed *= 2;
        gravity *= 3;
        maxGravity = gravity;
        upforce *= 1.5;
        console.log("Media");
    }
}

media_f();

class Obj{
    constructor(canvas){
        this.canvas = canvas;
        this.color = "yellow";
        this.height = 0;
        this.width = 0;
        this.position = {x: 0, y: 0};
        this.speed = {x: 0, y: 0};
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
        this.gravity = gravity;
    }
    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        x.innerText = this.position.x;
        y.innerText = this.position.y;
    }
    jump(){
        clearInterval(upTimeId);
        lifted = 0;
        gravity = maxGravity;
        this.gravity = 0;
        ////console.log("Jumped!");
        upTimeId = setInterval(() => {
            this.position.y -= upforce;
            lifted += 1;
            if (lifted >= 5){
                clearInterval(upTimeId);
                this.gravity = gravity;
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
        this.minHeight = 0;
        this.maxHeight = 0;
        this.width = 0;
    }
    generate(){
        if(this.position.x <= 0 
        && this.position.x + this.width <= 0){
            this.position.x = canvas.width + this.width;
            ////console.log("Behind");
            this.height = Math.floor(Math.random() * this.maxHeight) + this.minHeight;
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


let bar, bar2, player;

function initScene(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    bar = new Obstacle(canvas);
    bar.color = "lightgreen";
    bar.minHeight = 200;
    bar.maxHeight = 600;
    bar.width = 200;
    bar.position.x = 0;
    bar.speed = {x: -speed, y: 0};

    bar2 = new Obstacle(canvas);
    bar2.color = "lightgreen";
    bar2.minHeight = 200;
    bar2.maxHeight = 600;
    bar2.width = 200;
    bar2.position.x = canvas.width / 2 + bar2.width;
    bar2.speed = {x: -speed, y: 0};

    player = new Player(canvas);
    player.color = "orangered";
    player.height = 100;
    player.width = 100;
    player.position = {x: canvas.width / 6, y: canvas.height/2};
    player.speed = {x: 0, y: 0};

    bar.update();
    bar.draw(ctx);
    
    bar2.update();
    bar2.draw(ctx);
   
    player.position.y += player.gravity;
    player.update();
    player.draw(ctx);
    new input(player);
}

const gameloop = () => {
    if(Paused){
       //alert("Game Over");
       document.getElementById('banner').innerText = "Game Over";
       document.getElementById('sub').innerText = "Click play to play again";
        reset();
        return;
    }
    document.getElementById('banner').innerText = "Tap to Fly";
    document.getElementById('sub').innerText = "Avoid obstacles";
   

   document.getElementById('play').style.visibility = 'hidden';
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    bar.update();
    bar.draw(ctx);
    bar.generate();
    bar.speed.x -= score/10000;
    
    bar2.update();
    bar2.draw(ctx);
    bar2.generate();
    bar2.speed.x -= score/10000;
    
    player.position.y += player.gravity;

    player.update();
    player.draw(ctx);
    player.colision();
    player.objectColision(bar);
    player.objectColision(bar2);  
    
    score += 0.05;
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+Math.floor(score).toString(), 10, 100);
    ctx.fillText("High Score: "+Math.floor(highscore), 10, 200);
    requestAnimationFrame(gameloop);
}

function reset(){
    Paused = false;
    initScene();
    if (score > highscore){ 
        highscore = score;
        window.localStorage.setItem("itf_hgs", Math.floor(highscore).toString());
    }
    score = 0;
    gravity = maxGravity;
    document.getElementById('play').innerText = "Play";
    document.getElementById('play').style.visibility = 'visible';
   // gameloop();
}

document.getElementById('play').addEventListener("click",()=>{
  console.log("game started");
  gameloop();
});

initScene();
