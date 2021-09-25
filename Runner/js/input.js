export default class input {
    constructor(obj){
        document.addEventListener("click", evt =>{
            console.log("User Tapped!");
            obj.jump();
        });
        document.addEventListener("keydown", evt=>{
            if(evt.key === " "){ 
                obj.jump();
            }
        });
    }
}

