const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = canvas.width = 400;
ctx.font = '16px Arial';

const gs = canvas.height/3;
const gc = canvas.height/6;
let tile = [];
const doge = new Image();
doge.src = 'src/images/takla7.png';

const drawGrid = () => {
    for( let i = gs; i < canvas.height; i+=gs){
        console.log(`Grid cordinates: ${i}`);
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        //ctx.closePath()
    }
}

const drawHoles = () => {
    for( let i = gc; i < canvas.height; i+=gc*2){
        for (let j = gc; j < canvas.height; j+=gc*2){
            //console.log(`Center cordinates: ${i}, ${j}`);
            ctx.beginPath();
            //ctx.arc(i, j, 20, 0, 2*Math.PI);
            ctx.ellipse(i, j, 20, 10, 0, 0, Math.PI*2);
            ctx.fill();
        }
    }
}

const getTileCoordinates = () => {
    for( let i = gc; i < canvas.height; i+=gc*2){
        for (let j = gc; j < canvas.height; j+=gc*2){
            //console.log(`Center cordinates: ${i}, ${j}`);
            //ctx.beginPath();
            //ctx.arc(i, j, 20, 0, 2*Math.PI);
            //ctx.fill();
            tile.push({x: i, y: j});
        }
    }
}

const drawDoge = () => {
    
    //ctx.drawImage(doge, 0, 0, 55, 55, tile[0].x, tile[0].y, canvas.width, canvas.height);
    ctx.drawImage(doge, 55, 142);
}

drawGrid();
drawHoles();
getTileCoordinates();
ctx.fillStyle = 'white';
ctx.fillText("Hello", tile[0].x, tile[0].y);
//drawDoge();
ctx.drawImage(doge, canvas.width, canvas.height);