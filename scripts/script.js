const button = document.getElementById("submit-btn");
const levelSelected = document.getElementById("select-level");
const player = document.getElementById("player-name");
const gameSection = document.getElementById("game-section")
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");
const btn4 = document.getElementById("button4");
const btn5 = document.getElementById("button5");


const addPlayer = function(){
    const nameShow = document.getElementById("name");
    const playerName = nameShow.value;

     if(playerName.length <=0) {
        alert('Plaese enter a name');
        return;
     }
     levelSelection(playerName);
     levelSelected.querySelector('span').textContent = playerName;

    };
    

const levelSelection = function(playerName) {
    player.style.display = "none";
    levelSelected.style.display = "block";
    
}

button.addEventListener('click', addPlayer);
;

// to show game screen

const gameScreen = function() {
    levelSelected.style.display = "none";
    gameSection.style.display = "block";
}

btn1.addEventListener('click', gameScreen);
btn2.addEventListener('click', gameScreen);
btn3.addEventListener('click', gameScreen);

// to change levels

const switchLevels = function() {
    levelSelected.style.display = "block";
    gameSection.style.display = "none";
}

btn4.addEventListener('click', switchLevels);

// to exit the game

btn5.addEventListener('click', function (){
    const stop = confirm("Are you sure you want to exit ?");

    if(stop == true){
        player.style.display = "block";
        gameSection.style.display = "none";
        
    }
})