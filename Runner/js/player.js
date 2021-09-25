import Obj from "./object.js";
let upTimeId;
let downTimeId;
let lifted;

export default class Player extends Obj{
    constructor(canvas){
        super(canvas);
        this.gravity = 2;
    }
    jump(){
        clearInterval(upTimeId);
        lifted = 0;
        this.gravity = 0;
        console.log("Jumped!");
        upTimeId = setInterval(() => {
            this.position.y -= 5;
            lifted += 1;
            if (lifted >= 8){
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
            //console.log("Colision");
        }
        if((this.position.y + this.height ) > (canvas.height)
        || this.position.y < 0){
            this.speed.y = 0;
            this.position.y = this.canvas.height - 20;
            //console.log("Colision");
        }
    }
}