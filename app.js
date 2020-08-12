// 


// Import answers
import {cards} from './cards.js';

// Start game 
function startGame() {
    generateCard();
    generateAnswers();
}

// Randomly choose card and display
function generateCard() {
    let randomNum = parseInt(Math.random() * cards.length);
    let randomCard = cards.find( card => card.id === randomNum);
    cardContainer.style.backgroundImage = `url(assets/${randomCard.image}.png)`;
    cardContainer.id = randomCard.pitch;
}

// Generate possible answers
function generateAnswers() {
    let possibleAnswers = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    possibleAnswers.forEach( answer => {
      
        let newSpan = document.createElement('span');
        newSpan.textContent = answer;
        newSpan.id = answer;
        newSpan.addEventListener('click', handleClick);
        newSpan.classList.add('answer');
        answersArea.appendChild(newSpan);
    });
}


// Get DOM Elements
const buttons = document.querySelectorAll('.buttons button');
const cardContainer = document.querySelector('.card-container');
const answersArea = document.querySelector('.possible-answers');
const answers = answersArea.childNodes;
const checkBoxes = document.querySelectorAll('.options input');

// Check guess
function handleKeyDown(e) {
    let pressed = e.key;
    checkAnswer(pressed);
}

function checkAnswer(guess) {
    let regex = /[a-g]/;
    
    // Early return;
    if (!guess.match(regex)) {
        return;
    }
    if (guess === cardContainer.id) {
        displayMessage("Correct!");
        generateCard();
    } else {
        displayMessage("Try again...");
    }
}

function handleClick(e) {
    let clicked = e.target.id;
    checkAnswer(clicked);
}

function handleCheck(e) {
    console.log(e);
    if(e.target.checked) {
        console.log('check');
    }
    else {
        console.log('uncheck');
    }
}

function displayMessage(message) {
    let theDiv = document.createElement('div');
    theDiv.textContent = message;
    theDiv.classList.add('alert', 'disappear');
    document.body.appendChild(theDiv);
    theDiv.addEventListener('animationend', () =>  {
       theDiv.remove();
    });
}

// Event listeners

document.addEventListener('keydown', handleKeyDown);
answers.forEach( answer => {
    console.log(answer);
    answer.addEventListener('click', e => {
        handleClick(e);
    });
})

checkBoxes.forEach( checkBox => {
    checkBox.addEventListener('click', handleCheck);
})

// Set up game
window.onload = startGame;


