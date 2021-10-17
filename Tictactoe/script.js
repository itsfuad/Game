const canvas = document.getElementById('canvas');
const cells = [].slice.call(document.getElementsByClassName('cell'));
const message = document.getElementsByClassName('message')[0];
const text = document.getElementsByClassName('text')[0];
const close = document.getElementsByClassName('close')[0];
let button = Math.round(Math.random());
let turn = button ? '×' : '○';
let pc_turn = button ? '○' : '×';
let played_tiles = 0;
//alert(`${turn} is your symbol`);

function init(){
    console.log(`${turn} is your symbol`);

if (!button){
    computer();
}

function who(){
    if(win() == 1){
        text.innerText = "Player '○' won";
        message.classList.add('active');
        return;
    }else if(win() == 2){
        text.innerText = "Player '×' won";
        message.classList.add('active');
        return;
    }
    else{return}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

cells.forEach(cell => {
    cell.addEventListener('click', async () =>{
        if(cell.innerText == '○' || cell.innerText == '×'){

            console.log('Already Occupied!');
        }
        else{
            cell.style.color = button ? '#ff6969':'skyblue';
            cell.innerText = turn;
            played_tiles++;
            who(win());
           // await sleep(1500);
            computer();
        }
        //button = Math.round(Math.random());
        //turn = button ? '×' : '○';

    });
});


function computer(){
    let pc_pos = Math.floor(Math.random()*8);
    console.log(pc_pos);
    if(cells[pc_pos].innerText != '○' && cells[pc_pos].innerText != '×'){
        console.log('^');
        cells[pc_pos].innerText = pc_turn;
        cells[pc_pos].style.color = !button ? '#ff6969':'skyblue';
        played_tiles++;
        who(win());
    }
    else{
        if (played_tiles >= 9) {
            return
        };
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
        return 1;
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
        return 2;
    }
    else{
        return '';
    }
}

}

function reset(){
    cells.forEach(cell => {
        cell.innerText = '';
    });
    message.classList.remove('active');
    init();
}
close.addEventListener('click', ()=>{
    reset();
})

init();