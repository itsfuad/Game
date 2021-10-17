const canvas = document.getElementById('canvas');
const cells = [].slice.call(document.getElementsByClassName('cell'));
const message = document.getElementsByClassName('message')[0];
const text = document.getElementsByClassName('text')[0];
const close = document.getElementsByClassName('close')[0];
const hint = document.getElementsByClassName('hint')[0];
let button = Math.round(Math.random());
let turn = button ? '×' : '○';
let pc_turn = button ? '○' : '×';
let played_tiles = 0;
//alert(`${turn} is your symbol`);


console.log(`${turn} is your symbol`);
hint.innerText += turn;

if (!button){
    computer();
}

function who(state){
    if(state == 1){
        if(turn == '○'){
            text.innerText = "You won";
        }else{
            text.innerText = "Computer won";
        }
        message.classList.add('active');
        return;
    }else if(state == 2){
        if (turn == '×') {
            text.innerText = "You won";
        } else {
            text.innerText = "Computer won";
        }
        message.classList.add('active');
        return;
    }
    else if(state == 3){
        text.innerText = "Tie";
        message.classList.add('active');
        return;
    }
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

cells.forEach(cell => {
    cell.addEventListener('click', async () =>{
        if(cell.innerText != '○' && cell.innerText != '×'){
            cell.style.color = button ? '#ff6969' : 'skyblue';
            cell.innerText = turn;
            played_tiles++;
            await win();
            await sleep(100);
            await computer();
          //  console.log('Already Occupied!');
        }
        //button = Math.round(Math.random());
        //turn = button ? '×' : '○';

    });
});


function computer(){
    let pc_pos = Math.floor(Math.random()*8);
   // console.log(pc_pos);
   if (played_tiles >= 9) {
       who(3);
       return;
   };
   console.log(played_tiles);
    if(cells[pc_pos].innerText != '○' && cells[pc_pos].innerText != '×'){
      //  console.log('^');
        cells[pc_pos].innerText = pc_turn;
        cells[pc_pos].style.color = !button ? '#ff6969':'skyblue';
        played_tiles++;
        win();
    }
    
    else{
        computer();
    }
}

function win(){
    if (
        (cells[0].innerText == '○' && cells[1].innerText == '○' && cells[2].innerText == '○') 
        || (cells[3].innerText == '○' && cells[4].innerText == '○' && cells[5].innerText == '○')
        || (cells[6].innerText == '○' && cells[7].innerText == '○' && cells[8].innerText == '○')
        || (cells[0].innerText == '○' && cells[3].innerText == '○' && cells[6].innerText == '○')
        || (cells[1].innerText == '○' && cells[4].innerText == '○' && cells[7].innerText == '○')
        || (cells[2].innerText == '○' && cells[5].innerText == '○' && cells[8].innerText == '○')
        || (cells[0].innerText == '○' && cells[4].innerText == '○' && cells[8].innerText == '○')
        || (cells[2].innerText == '○' && cells[4].innerText == '○' && cells[6].innerText == '○')
    ){
        who(1);
        return;
    }
    else if (
        (cells[0].innerText == '×' && cells[1].innerText == '×' && cells[2].innerText == '×') 
        || (cells[3].innerText == '×' && cells[4].innerText == '×' && cells[5].innerText == '×')
        || (cells[6].innerText == '×' && cells[7].innerText == '×' && cells[8].innerText == '×')
        || (cells[0].innerText == '×' && cells[3].innerText == '×' && cells[6].innerText == '×')
        || (cells[1].innerText == '×' && cells[4].innerText == '×' && cells[7].innerText == '×')
        || (cells[2].innerText == '×' && cells[5].innerText == '×' && cells[8].innerText == '×')
        || (cells[0].innerText == '×' && cells[4].innerText == '×' && cells[8].innerText == '×')
        || (cells[2].innerText == '×' && cells[4].innerText == '×' && cells[6].innerText == '×')
    ){
        who(2);
        return;
    }
    return;
}

function reset(){
    cells.forEach(cell => {
        cell.innerText = '';
    });
    played_tiles = 0;
    button = Math.round(Math.random());
    turn = button ? '×' : '○';
    pc_turn = button ? '○' : '×';
    hint.innerText = `Your Symbol is ${turn}`;
    message.classList.remove('active');
}
close.addEventListener('click', ()=>{
    reset();
})