import Obj from "./object.js";

export default class Obstacle extends Obj{
    constructor(canvas){
        super(canvas);
        this.canvas = canvas;
    }
    generate(){
        if(this.position.x <= 0 
        && this.position.x + this.width <= 0){
            this.position.x = canvas.width + this.width;
            console.log("Behind");
            this.height = Math.floor(Math.random() * 50) + 20;
            console.log(this.height);
            this.position.y = Math.floor(Math.random() * this.canvas.height/2) + 0;
        }
    }
}