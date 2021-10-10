const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let directionX = 0, directionY = 0;
let size = 20;
let positions = [];
let ax = 0, ay = 0;
let upTimeId;
let isGameOver = paused = false;
let highscore = parseInt(localStorage.getItem('hsc')) || 0;
function update(){
    if(!paused){
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
}

function selfCollision(){
    for (let i = 0; i < positions.length; i++){
        for (let j = 1; j < i; j++){
            if (positions[i].x == positions[j].x 
            && positions[i].y == positions[j].y ){
                //gameover();
               console.log(positions[i].x, ' = ', positions[j].x, '\n', positions[i].y, ' = ', positions[j].y);
               //alert("Don't eat yourself");

                gameover();
                return;
            }
        }
    }
}

function gameover(){
 //   console.log("Game over");
   // location.reload();
   //alert("Game over.")
    isGameOver = true;
    clearInterval(upTimeId);
    document.getElementById('gameovermsg').classList.add('on');

   if(positions.length-3 > highscore) {
       highscore = positions.length-3;
       localStorage.setItem('hsc', highscore);
   }
 //  reset();
 //  gen();
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
               // positions.unshift({x: ax, y: ay});
             //   console.log("inside snake");
                gen();
            }
        });
    }
}

function food(){
    ctx.fillStyle = '#fcd200';
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
        ctx. fillStyle = (i == positions.length - 1) ? '#54ffa4' : '#b7f7d5';
        ctx.fillRect(positions[i].x, positions[i].y, 20, 20);
    }
}

function reset(){
    isGameOver = false;
    directionX = 0, directionY = 0;
    size = 20;
    positions = [{x: 160, y: 180}, {x: 140, y: 180}, {x: 120, y: 180}];
    ax = 0, ay = 0;
}

ctx.font = "16px Arial";
ctx.fillStyle = 'black';

const gameLoop = () => {
    if(isGameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food();
    selfCollision();
    update();
    draw();
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${positions.length - 3}`, 20, 20);
    ctx.fillText(`High Score: ${highscore}`, 20, 50);
    //advanced();
}

document.addEventListener("keydown", (e) => {
    //console.log("Jumped");
   
    if (isGameOver == true && e.key == 'Enter') {
        play();
    }
    else if (e.key == 'p' || e.key == 'P') {
        paused = !paused;
        pausebtn.innerText = pausebtn.innerText == '⏸️' ? '▶️' : '⏸️';
    }
    //console.log("Normal");
    // jumpSound.play();
});


document.addEventListener('keydown', (evt)=>{
   // console.log(directionX, directionY);
   if(!paused){
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
    
    if(!paused){                                              
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
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};



const pausebtn = document.getElementsByClassName('pause')[0];

pausebtn.addEventListener('click', () => {
    paused = !paused;
    pausebtn.innerText = pausebtn.innerText == '⏸️' ? '▶️' : '⏸️';
});
//bgsound.play();


const play = () => {
    //console.log("Play");
    reset();
    gen();
    upTimeId = setInterval(gameLoop, 100);
    document.getElementById('gameovermsg').classList.remove('on');
}


document.addEventListener('DOMContentLoaded',() =>{
    // index.js
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("sw.js")
            .then(() => console.log("registered service worker!"));
    }
// the rest of your page's code...
   // alert('Use finger gestures or Keyboard Arrows');
   
    play();
});
