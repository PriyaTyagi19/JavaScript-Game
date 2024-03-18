const button = document.getElementById("submit-btn");
const levelSelected = document.getElementById("select-level");
const player = document.getElementById("player-name");
const gameSection = document.getElementById("game-section");
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");
const btn4 = document.getElementById("button4");
const btn5 = document.getElementById("button5");
const btn6 = document.getElementById("button6");
const moveCounter = document.querySelector(".moves");
const cardContainer = document.getElementById("cards");

const emojis = ["😊", "😂", "😍", "👌", "🙌", "😎", "😜", "❤️"];
const emojisGroup = [...emojis, ...emojis];
const emojiCount = emojisGroup.length;

// for enter user name
const addPlayer = function () {
    const nameShow = document.getElementById("name");
    const playerName = nameShow.value;
    nameShow.value = "";
  
    if (playerName.length <= 0) {
      alert("Plaese enter a name");
      return;
    }
    levelSelection(playerName);
    levelSelected.querySelector("span").textContent = playerName;
  };
  
  const levelSelection = function () {
    player.style.display = "none";
    levelSelected.style.display = "block";
  };
  
  button.addEventListener("click", addPlayer);
  
  
  // to change levels
  const switchLevels = function () {
    levelSelected.style.display = "block";
    gameSection.style.display = "none";
  
  };
  
  btn5.addEventListener("click", switchLevels);

  const gameScreen = function () {
    levelSelected.style.display = "none";
    gameSection.style.display = "block";
      cardContainer.innerHTML = '';
      shuffle(emojisGroup);
      moves= 0; //reset moves counter
      moveCounter.textContent = `Number of moves: ${moves}`; // update move counter display
  };
  
  btn1.addEventListener("click", gameScreen);
  
  btn2.addEventListener("click", gameScreen);
  
  btn3.addEventListener("click", gameScreen);

  // game state
let revealCount = 0;
let activeTile = null;
let awaitingendOfMove = false;
let moves = 0;

// to shuffle the emojis
function shuffle(array) {
  let currentIndex = emojiCount, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
    
    // add card div with random emojis value in main cards div

   
    let emoji = emojisGroup[currentIndex];
    let tile = addCards(emoji);
    cardContainer.appendChild(tile);
    tile.style.backgroundImage = "url('images/smiley1.jpg')";
  }
  
  
  return array;

}

shuffle(emojisGroup);
// console.log(emojisGroup);



// add emojis as cards in the game window
function addCards(emoji) {
  const element = document.createElement("div");
  element.classList.add("card");
  element.setAttribute("data-value", emoji);
  element.setAttribute("data-revealed", "false");
  
  
  // to turn the tiles on click
  element.addEventListener('click', function(){
    
    const revealed = element.getAttribute("data-revealed");
    
    if(awaitingendOfMove || revealed === "true" || element === activeTile) {
      return;
    }
    
    element.textContent = emoji;
    element.style.backgroundImage = null;
    
    if (!activeTile) {
      activeTile = element;
      return;
    }
    
    
    // to match the emojis
    const cardMatch = activeTile.getAttribute("data-value");

    

    if (cardMatch === emoji) {

      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      awaitingendOfMove = false;
      activeTile = null;
      revealCount += 2;

      if(revealCount === emojiCount) {
        alert("you won!");
      }

      return;
    }

    awaitingendOfMove = true;
    moves++;  //increment move counter
    moveCounter.textContent = `Number of moves: ${moves}`; //update move counter display

    setTimeout(() => {
      element.textContent = null;
      activeTile.textContent = null;
      element.style.backgroundImage = "url('images/smiley1.jpg')";
      activeTile.style.backgroundImage = "url('images/smiley1.jpg')";

      awaitingendOfMove = false;
      activeTile = null;
    }, 1000);


    // console.log(activeTile);
  })

  return element;
}

// to restart the game

function restartGame (){
 
  cardContainer.innerHTML = '';
  shuffle(emojisGroup);
  moves= 0; //reset moves counter
  moveCounter.textContent = `Number of moves: ${moves}`; // update move counter display
}
btn4.addEventListener('click', function(){
  restartGame();
})


// to exit the game
btn6.addEventListener("click", function () {
  const stop = confirm("Are you sure you want to exit ?");

  if (stop == true) {
    player.style.display = "block";
    gameSection.style.display = "none";
  }
});

  