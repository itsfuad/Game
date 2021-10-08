const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let directionX = 0, directionY = 0;
let size = 20;
let positions = [];
let ax = 0, ay = 0;
let highscore = parseInt(localStorage.getItem('hsc')) || 0;
function update(){
    if(positions[positions.length-1].x + size >= canvas.width && directionX == 20){
        //positions[positions.length-1].x = 0;
        //console.log("Right", positions[positions.length-1].x);
       gameover();
    }
    else if(positions[positions.length-1].y + size >= canvas.height && directionY == 20){
        //positions[positions.length-1].y = 0;
        //console.log("Down", positions[positions.length-1].y);
        gameover();
    }
    else if(positions[positions.length-1].x <= 0 && directionX == -20){
        //console.log("Left", positions[positions.length-1].x);
        //positions[positions.length-1].x = canvas.width - size;
        gameover();
    }
    else if(positions[positions.length-1].y <= 0 && directionY == -20){
        //console.log("Up", positions[positions.length-1].y);
        //positions[positions.length-1].y = canvas.height - size;
        gameover();
    }
    else{
       // console.log('Q');
       if(directionX != 0 || directionY != 0){
           positions.push({x: positions[positions.length - 1].x, y: positions[positions.length - 1].y});
           positions.shift();
         //  console.log(positions.length);
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
                //gameover();
               alert("Don't eat yourself");
                gameover();
                return;
            }
        }
    }
}

function gameover(){
 //   console.log("Game over");
   // location.reload();
   alert("Game over.")
   if(positions.length-3 > highscore) {
       highscore = positions.length-3;
       localStorage.setItem('hsc', highscore);
   }
   reset();
   gen();
}





function gen(){
    ax = Math.floor(Math.random()*canvas.width);
    ay = Math.floor(Math.random()*canvas.width);
    if (ax % 20 !== 0 || ay % 20 != 0){
        gen();
    }
    else{
        positions.forEach(element => {
            //console.log(element.x == ax);
            if (element.x == ax && element.y == ay){
                positions.unshift({x: ax, y: ay});
             //   console.log("inside snake");
                gen();
            }
        });
    }
}

function food(){
    ctx.fillStyle = 'red';
    positions.forEach(element => {
        //console.log(element.x == ax);
        if (element.x == ax && element.y == ay){
            positions.unshift({x: ax, y: ay});
          //  console.log("Eaten");
            gen();
        }
    });
    ctx.fillRect(ax, ay, 20, 20);
}

function draw(){
    for (let i = positions.length - 1; i >= 0; i--){
        ctx. fillStyle = (i == positions.length - 1) ? 'white' : 'black';
        ctx.fillRect(positions[i].x, positions[i].y, 20, 20);
    }
}

function reset(){
    directionX = 0, directionY = 0;
    size = 20;
    positions = [{x: 160, y: 180}, {x: 140, y: 180}, {x: 120, y: 180}];
    ax = 0, ay = 0;
}

ctx.font = "16px Arial";
ctx.fillStyle = 'black';
ctx.fillText(`Score: ${positions.length - 3}`, 20, 20);
ctx.fillText(`High Score: ${highscore}`, 20, 50);

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    food();
    update();
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${positions.length - 3}`, 20, 20);
    ctx.fillText(`High Score: ${highscore}`, 20, 50);
    selfCollision();
    //advanced();
}




document.addEventListener('keydown', (evt)=>{
    console.log(directionX, directionY);
    switch (evt.key) {
        case 'ArrowLeft':
            directionX = directionX == 20? 20 : -20;
            directionY = 0;
            break;
        case 'ArrowRight':
            directionX = directionX == -20? -20 : 20;
            directionY = 0;
            break;
        case 'ArrowUp':
            directionX = 0 ;
            directionY = directionY == 20? 20 : -20;
            break;
        case 'ArrowDown':
            directionX = 0 ;
            directionY = directionY == -20? -20 : 20;
            break;
        default:
            console.log('Key pressed: ', evt.key);
    }
});

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            directionX = directionX == 20? 20 : -20;
            directionY = 0;
        } else {
            directionX = directionX == -20? -20 : 20;
            directionY = 0;
        }                       
    } else {
        if ( yDiff > 0 ) {
            directionX = 0 ;
            directionY = directionY == 20? 20 : -20;
        } else { 
            directionX = 0 ;
            directionY = directionY == -20? -20 : 20;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

document.addEventListener('DOMContentLoaded',() =>{
    alert('Use finger gestures or Keyboard Arrows');
 reset();
 gen();
 setInterval(gameLoop, 100);
});