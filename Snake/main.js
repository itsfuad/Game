const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let directionX = 0, directionY = 0;
let size = 30;
let positions = [{x: 90, y: 30}, {x: 60, y: 30}, {x: 30, y: 30}];

function update(){
    if(positions[positions.length-1].x + size >= canvas.width && directionX == 30){
        //positions[positions.length-1].x = 0;
        //console.log("Right", positions[positions.length-1].x);
       gameover();
    }
    else if(positions[positions.length-1].y + size >= canvas.height && directionY == 30){
        //positions[positions.length-1].y = 0;
        //console.log("Down", positions[positions.length-1].y);
        gameover();
    }
    else if(positions[positions.length-1].x <= 0 && directionX == -30){
        //console.log("Left", positions[positions.length-1].x);
        //positions[positions.length-1].x = canvas.width - size;
        gameover();
    }
    else if(positions[positions.length-1].y <= 0 && directionY == -30){
        //console.log("Up", positions[positions.length-1].y);
        //positions[positions.length-1].y = canvas.height - size;
        gameover();
    }
    else{
       // console.log('Q');
       if(directionX != 0 || directionY != 0){
           positions.push({x: positions[positions.length - 1].x, y: positions[positions.length - 1].y});
           positions.shift();
           console.log(positions.length);
        }
        positions[positions.length - 1].x += directionX;
        positions[positions.length - 1].y += directionY;
       // positions.pop();
    }
}

function selfCollision(){
    for (let i = 0; i < positions.length; i++){
        for (let j = 0; j < i; j++){
            if (positions[i].x == positions[j].x 
            && positions[i].y == positions[j].y ){
                gameover();
            }
        }
    }
}

function gameover(){
    console.log("Game over");
    location.reload();
}


let ax = 90, ay = 270;



function gen(){
    ax = Math.floor(Math.random()*canvas.width);
    ay = Math.floor(Math.random()*canvas.width);
    if (ax % 30 !== 0 || ay % 30 != 0){
        gen();
    }
    else{
        positions.forEach(element => {
            //console.log(element.x == ax);
            if (element.x == ax && element.y == ay){
                positions.unshift({x: ax, y: ay});
                console.log("inside snake");
                gen();
            }
        });
    }
}

function food(){
    ctx.fillStyle = 'lightgreen';
    positions.forEach(element => {
        //console.log(element.x == ax);
        if (element.x == ax && element.y == ay){
            positions.unshift({x: ax, y: ay});
            console.log("Eaten");
            gen();
        }
    });
    ctx.fillRect(ax, ay, 30, 30);
}

function draw(){
    for (let i = positions.length - 1; i >= 0; i--){
        ctx. fillStyle = (i == positions.length - 1) ? 'red' : 'black';
        ctx.fillRect(positions[i].x, positions[i].y, 30, 30);
    }
}

ctx.font = "16px Arial";
update();
ctx.fillStyle = 'black';
ctx.fillText("Score: "+toString(positions.length - 3), 20, 20);
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    food();
    update();
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${positions.length - 3}`, 20, 20);
    selfCollision();
    //advanced();
}

setInterval(gameLoop, 200);


document.addEventListener('keydown', (evt)=>{
    console.log(directionX, directionY);
    switch (evt.key) {
        case 'ArrowLeft':
            directionX = directionX == 30? 30 : -30;
            directionY = 0;
            break;
        case 'ArrowRight':
            directionX = directionX == -30? -30 : 30;
            directionY = 0;
            break;
        case 'ArrowUp':
            directionX = 0 ;
            directionY = directionY == 30? 30 : -30;
            break;
        case 'ArrowDown':
            directionX = 0 ;
            directionY = directionY == -30? -30 : 30;
            break;
        default:
            console.log('Key pressed: ', evt.key);
    }
});