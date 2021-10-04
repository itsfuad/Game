const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.style.background = "black";
ctx.font =  "16px Arial";

let score = 0, highscore = parseInt(window.localStorage.getItem('itf_hgs')) || 0;
const Bird = new Image();  
Bird.src = "src/red.png";

let isGameOver = false;

let jump = false;
let deltatime, currentTime, lastTime = Date.now();
let gravity = 3;
let levels = 1;

class object {
    constructor(canvas){
        this.canvas = canvas;
        this.w = 30;
        this.h = 30;
        this.color = 'yellow'; 
        this.position = {x: 0, y: 0, x2: 0, y2: 0};
        this.speed = {x: 0, y: 0, x2: 0, y2: 0};
    }
    update(deltatime){
        deltatime = deltatime/10;
        if(jump == false){//console.log(deltatime);
            this.speed.y = gravity;
        }
        else{
            this.speed.y = -gravity*1.7;    
        }
        this.position.y += this.speed.y * deltatime;
        this.position.x += this.speed.x * deltatime;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.w, this.h);
    }
    colision(){
        if(this.position.y + this.h >= canvas.height
            || this.position.y <= 0){
            //console.log("colision");
            this.position.y = canvas.height - this.h;
            gameOver();
        }
    }
    objectColision(target){
        //console.log("Hello");
        ////console.log(this.position.x);
        ////console.log(target.position.x);
        if((this.position.x) < (target.position.x + target.w)
        && (this.position.x+this.w) > target.position.x
        && (this.position.y) < (target.position.y + target.h)
        && (this.position.y+this.h) > target.position.y){
            gameOver();
        }
        if((this.position.x) < (target.position.x2 + target.w2)
        && (this.position.x+this.w) > target.position.x2
        && (this.position.y) < (target.position.y2 + target.h2)
        && (this.position.y+this.h) > target.position.y2){
            gameOver();
        }
    }
}

class Bar extends object{
    constructor(canvas){
        super(canvas);
        this.w2 = 30;
        this.h2 = 30;
        this.color2 = 'yellow'; 
    }
    update(){
        this.position.x -= this.speed.x + levels/100;
        this.position.x2 -= this.speed.x2 + levels/100;
    }
    generate(){
        //console.log(pos);
        if(this.position.x+this.w <= 0){
            score += 1;
            levels = score + 1;
            this.h = Math.floor(Math.random()* canvas.width) + 50;
            this.position.x = this.canvas.width;
            this.position.y = 0;
            this.h2 = canvas.height - (this.h + 150);
            this.position.y2 = this.h + 150;
            this.position.x2 = this.canvas.width;
        }
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.w, this.h);
        ctx.fillStyle = this.color2;
        ctx.fillRect(this.position.x2, this.position.y2, this.w2, this.h2);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const gameOver = () => {
    if (score > highscore){ 
        highscore = score;
        window.localStorage.setItem("itf_hgs", Math.floor(highscore).toString());
    }
    score = 0;
    alert("Game Over");
    isGameOver = true;
    location.reload();
}

document.addEventListener("keydown", async () => {
    //console.log("Jumped");
    jump = true;
    await sleep(120);
    jump = false;
    //console.log("Normal");
});
document.addEventListener("click", async () => {
    //console.log("Jumped");
    jump = true;
    await sleep(120);
    jump = false;
    //console.log("Normal");
});

let bird = new object(canvas);
bird.color = "white";
bird.position.x = 40;
bird.h = 20;
bird.w = 20;
let bar = new Bar(canvas);
bar.h = 200;
bar.position.x = canvas.width;
bar.speed.x = 3;
bar.color = "white";

bar.h2 = 200;
bar.position.x2 = canvas.width;
bar.speed.x2 = 3;
bar.color2 = "white";

bar.h2 = canvas.height - (bar.h + 150);
bar.position.y2 = bar.position.y + bar.h + 150;
bar.position.x2 = canvas.width;


const gameLoop = () => {
    if (isGameOver) return;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    currentTime = Date.now();
    deltatime = currentTime - lastTime;
    lastTime = currentTime;
    bird.update(deltatime);
    bird.draw(ctx);
    bird.colision();
    bird.objectColision(bar);
    bar.generate();
    bar.update(deltatime);
    bar.draw(ctx);

    ctx.fillStyle = "white";
    ctx.fillText("Score: "+Math.floor(score).toString(), 10, 20);
    ctx.fillText("High Score: "+Math.floor(highscore), 10, 40);

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);