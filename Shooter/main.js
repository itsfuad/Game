





const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

ctx.fillStyle = 'darkgreen';

ctx.fillRect(0, 0, 500, 300);

ctx.fillStyle = 'red';

ctx.beginPath();
ctx.arc(225, 150, 100, 0, 2*Math.PI);
ctx.fill();