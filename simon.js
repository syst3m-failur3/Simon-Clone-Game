"use strict"

const game = {
    sequence: [],
    index: 0,
    startBtn: document.getElementById("start-button"),
    buttons: document.querySelectorAll(".game-btn"),
    action: document.getElementById("action-span"),
}

function disableBtns(state, btns){ 
    btns.forEach(element => {element.disabled = state})
} 

function getNextColor(){
    const colors = ["red", "green", "blue", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function glow(btnColor){
    const glowing = document.getElementById(btnColor);
    glowing.classList.toggle(`${btnColor}-glow`);
    setTimeout(() => {
        glowing.classList.toggle(`${btnColor}-glow`);
    }, 1000);
}
    
function playRound(){
    disableBtns(true, game.buttons);
    game.sequence.push(getNextColor());
    game.action.textContent="WATCH"; 
    runSequence(game.sequence);   
}

function setCurrentScore(reset=false){
    const score = document.getElementById("current-score");
    score.textContent = (reset === true) ? 0: Number(score.textContent) + 1
}

function setHighScore(){
    const hiScore = document.getElementById("hi-score");
    hiScore.textContent = document.getElementById("current-score").textContent;
}

function runSequence(seq){
    let index = 0;

    function nextBtn(){
        glow(seq[index]);
        ++index;
    }
    nextBtn();

    let presser = window.setInterval(() => {
        if (index >= seq.length){
            clearTimeout(presser);
            game.action.textContent="GO"; 
            disableBtns(false, game.buttons);
            return;
        }
        nextBtn();
    }, 2000);

}

function cleanUp(){
    disableBtns(true, game.buttons);
    setHighScore();
    setCurrentScore(true);
    game.action.textContent=""; 
    game.startBtn.classList.toggle("hidden");
    alert("You Lose");
    game.index = 0;
    game.sequence.length = 0;
}

function startGame(e){
    game.startBtn.classList.toggle("hidden");
    playRound();
}

function initialize(){
    
    game.startBtn.addEventListener("click", startGame);

    game.buttons.forEach(btn =>{
        btn.addEventListener("click", e => {    
            glow(e.target.id);
        })
    });
    
    game.buttons.forEach(btn =>{
        btn.addEventListener("click", e => {    
            if (e.target.id == game.sequence[game.index]){
                ++game.index;
                if (game.index == game.sequence.length){
                    game.index = 0;
                    setCurrentScore();
                    setTimeout(() => {
                        playRound();
                    },2100);                
                }
            }
            else{
                cleanUp(); 
            }
        });
    });
}

window.addEventListener("DOMContentLoaded", initialize, false);

