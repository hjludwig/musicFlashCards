// 


// Import answers
import {cards} from './cards.js';
// import {values, names} from './cards.js';


// Get DOM Elements
const cardContainer = document.querySelector('.card-container');
const answersArea = document.querySelector('.possible-answers');
const answers = answersArea.childNodes;
const checkBoxes = document.querySelectorAll('.options input');
const optionsButton = document.querySelector('.options button');

// Start game 
function startGame() { 
    // Find out which set(s) to choose from
    let cardsInPlay = handleOptions(cards);

    generateCard(cardsInPlay);
    generateAnswers();
}

function handleOptions(cards) {
    let cardsInPlay = [];
    checkBoxes.forEach (checkBox => {
        let option = checkBox.name;
        if(checkBox.checked) {
            cardsInPlay.push(...cards[option]);
        }
    });

    // Remove answer options objects from the conslidated array
    cardsInPlay.forEach((card, index) => {
        if (card.hasOwnProperty('options')) {
            cardsInPlay.splice(index, 1);
        }
    })
    return cardsInPlay;
}

// Randomly choose card and display
function generateCard(cards) {

    let randomNum = parseInt(Math.random() * cards.length);
    let randomCard = cards[randomNum];
    cardContainer.style.backgroundImage = `url(assets/${randomCard.image}.png)`;
    cardContainer.id = randomCard.answer;
    cardContainer.setAttribute('data-category', randomCard.category);
}

// Generate possible answers
function generateAnswers() {
    
    let category = cardContainer.getAttribute('data-category');    
    let possibleAnswers = [];

    // Get the options from the options object from the correct array
    cards[category].forEach( card => {
        if(card.hasOwnProperty('options')) {
            possibleAnswers.push(...card.options);
        }
    });

    // Clear answersArea
    answersArea.innerHTML = '';

    // Generate the answers
    possibleAnswers.forEach( answer => {
        let newSpan = document.createElement('span');
        newSpan.textContent = answer;
        newSpan.id = answer;
        newSpan.addEventListener('click', handleClick);
        newSpan.classList.add('answer');
        answersArea.appendChild(newSpan);
    });
}


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
        // Generate new card and answer options
        startGame();
    } else {
        displayMessage("Try again...");
    }
}

function handleClick(e) {
    let clicked = e.target.id;
    checkAnswer(clicked);
}

function handleCheck(e) {

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
});

optionsButton.addEventListener('click', startGame);

// Set up game
window.onload = startGame;


