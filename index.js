const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const winwin= document.querySelector("h1");
const conclusion_window = document.querySelector(".conclusion");
const overlay = document.querySelector(".overlay");
const names=document.querySelector(".player-form");
const nameButton=document.querySelector("#player_info");
var audio = document.createElement("audio");

let counter00;
let player1;
let player2;
let currentPlayer;
let currentPlayerStamp;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function newgame(){
    fname.value="";
    lname.value="";
    names.classList.add("active");
}


function nameFeeding(){
    player1=fname.value.toUpperCase();
    player2=lname.value.toUpperCase();
    if(player1!="" && player2!=""){
        names.classList.remove("active");
        audio.src = "./assets/starting.wav";
        audio.autoplay = true;
        document.body.appendChild(audio);
        initGame();
    }
}


nameButton.addEventListener("click",nameFeeding);


let answer;

function initGame() {
    currentPlayer = `${player1}`;
    currentPlayerStamp = `${player1}`[0];
    answer = "";
    winwin.innerHTML="";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    setTimeout(function(){document.body.removeChild(audio)},5000);
}


function swapTurn() {
    if(currentPlayerStamp === `${player1}`[0]) {
        currentPlayerStamp = `${player2}`[0];
        currentPlayer = `${player2}`;
    }
    else {
        currentPlayerStamp = `${player1}`[0];
        currentPlayer = `${player1}`;
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {

    winningPositions.forEach((position) => {

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {


                if(gameGrid[position[0]] === player1[0]) 
                    answer = `${player1}`;
                else {
                    answer = `${player2}`;
                } 
                    


                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })


                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });


    if(answer !== "" ) {
        gameInfo.innerText = "Game Over !";
        newGameBtn.classList.add("active");
        winwin.innerHTML=`${answer} Wins`;
        open_conclusion_window();
        return;
    }


    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });


    if(fillCount === 9) {
        gameInfo.innerText = "Game Over !";
        newGameBtn.classList.add("active");
        winwin.innerHTML="Game Draw";
        open_conclusion_window();
        return;
    }

}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayerStamp;
        gameGrid[index] = currentPlayerStamp;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", newgame);



const open_conclusion_window = () => {
  conclusion_window.classList.add("active");
  audio.src = "./assets/clapping.wav";
  audio.autoplay = true;
  audio.loop = true;
  document.body.appendChild(audio);
  overlay.classList.add("overlayactive");
  setTimeout(function(){document.body.removeChild(audio)},10000);
};


const close_conclusion_window = () => {
  document.body.removeChild(audio);
  conclusion_window.classList.remove("active");
  overlay.classList.remove("overlayactive");
};