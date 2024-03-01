const gameContainer = document.getElementById("game");
const cardImg = document.querySelector('img');
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let clicks = 0;
let points = 0;
const match = [];
const dataCheck = [];
const idCheck = [];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let cardNum = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const newImg = document.createElement('img');
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color, 'card');
    newDiv.setAttribute('id', 'noMatch');
    newDiv.style.backgroundColor = color;
    newDiv.setAttribute('data-num', cardNum);
    cardNum++
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const cardData = event.target.attributes[2];
  const classCheck = event.target.classList; 
  const allCards = document.querySelectorAll('#game div');
  const id = event.target.attributes[1];
  onClick();
  //storing values in arrays for check purposes
  idCheck.push(id.value);
  dataCheck.push(cardData.value);
  match.push(classCheck);
  //storing values in arrays for check purposes
  console.log("you just clicked", event.target);
  event.target.classList.remove('card');
  multiFlipPrevention();
  sameCardCheck();
  //checking if cards are different
  if (match.length === 2 && match[0].value !== match[1].value) {
    // if so flip over after one second and erase check arrays
    setTimeout(function () {
      for ( let i = 0; i < allCards.length; i++) {
        if (allCards[i].classList[1] !== 'card' && allCards[i].getAttribute('id') === 'noMatch') {
          allCards[i].classList.toggle('card');
          match.length = 0;
          dataCheck.length = 0;
          idCheck.length = 0;
        } 
      }
    }, 1000);
    // checking if cards are the same
  } else if (match.length === 2 && match[0].value === match[1].value) {
    //if so add an id of match to keep flipped over then erase check arrays and add points
    for ( let i = 0; i < allCards.length; i++) {
      if (allCards[i].classList[1] !== 'card') {
        allCards[i].setAttribute('id', 'match')
        allCards[i].classList.add('card');
        match.length = 0;
        dataCheck.length = 0;
        idCheck.length = 0;
      }  
    }
    points++;
    document.getElementById("points").innerText = 'Points:';
     document.getElementById("points").innerHTML += points;
  }
}
//click counter
function onClick() {
  clicks ++;
  document.getElementById("clicks").innerText = 'Clicks:';
  document.getElementById("clicks").innerHTML += clicks;
   
}
//prevention for flipping over more than two cards at once
function multiFlipPrevention () {
  const allCards = document.querySelectorAll('#game div')
  if (match.length >= 3 || dataCheck.length >= 3) {
    for (let i = 0; i < allCards.length; i++){
      if (allCards[i].classList[1] !== 'card') {
        allCards[i].classList.toggle('card');
        match.length = 0;
        dataCheck.length = 0;
        idCheck.length = 0;
      }
    }
  }
}
//checking if the same card is being used and preventing it
function sameCardCheck() {
  const allCards = document.querySelectorAll('#game div')
  if (dataCheck[0] === dataCheck[1]) {
    for (let i = 0; i < allCards.length; i++){
      if (allCards[i].classList[1] !== 'card' || allCards[i].getAttribute('id') === 'match') {
        allCards[i].classList.toggle('card');
        match.length = 0;
        dataCheck.length = 0;
        idCheck.length = 0;
      }
    }
    match.length = 0;
    dataCheck.length = 0;
    idCheck.length = 0;
  } else if (idCheck[0] === 'match' && idCheck[1] === 'match' ) {
    match.length = 0;
    dataCheck.length = 0;
    idCheck.length = 0;
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

//I will probably do the further study part seperatly on my own time just to beef this up and make it look pretty for when I add it to my CV but otherwise I'm pretty sure I hit all the required parts