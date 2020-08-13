// 


// Import answers
import {cards} from './cards.js';
// import {values, names} from './cards.js';


// Get DOM Elements
const cardContainer = document.querySelector('.card-container');
const answersArea = document.querySelector('.possible-answers');
const answers = answersArea.childNodes;
const infoArea = document.querySelector('.info');
const optionsArea = document.querySelector('.options');
const checkBoxes = document.querySelectorAll('.options input');
const optionsButton = document.querySelector('.info button');
const submitBtn = optionsArea.querySelector('#options-submit');

function initialize() {
    
    startGame();
    updateInfo();
}

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

function displayMessage(message) {
    let theDiv = document.createElement('div');
    theDiv.textContent = message;
    theDiv.classList.add('alert', 'disappear');
    document.body.appendChild(theDiv);
    theDiv.addEventListener('animationend', () =>  {
       theDiv.remove();
    });
}

function displayOptions() {
    optionsArea.classList.add('show');
}
function updateInfo() {
    const info = infoArea.querySelector('p');
    
    info.innerHTML = "You're learning: "
    checkBoxes.forEach( checkBox => {
        if(checkBox.checked) {
            let markup = `<span class="category">Note ${checkBox.id}</span>`
            info.insertAdjacentHTML('beforeEnd', markup);  
        }
    })
}

// Event listeners

document.addEventListener('keydown', handleKeyDown);
answers.forEach( answer => {
    console.log(answer);
    answer.addEventListener('click', e => {
        handleClick(e);
    });
})

submitBtn.addEventListener('click', () => {
    optionsArea.classList.remove('show');
    updateInfo();
    startGame();
});
optionsButton.addEventListener('click', displayOptions);



// Set up game
window.onload = initialize;


