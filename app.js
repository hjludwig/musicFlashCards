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
        createWindow(correct);
    } else {
        createError();
    }
}

function handleClick(e) {
    let clicked = e.target.id;
    checkAnswer(clicked);
}

function createError() {
    let errorDiv = document.createElement('div');
    errorDiv.textContent = 'Whoops! Try again';
    errorDiv.classList.add('error', 'disappear');
    document.body.appendChild(errorDiv);
    errorDiv.addEventListener('animationend', () =>  {
        errorDiv.remove();
    });
}

// Create Modal Window objects
class ModalWindow {
    constructor(name, text) {
        this.name = name;
        this.text = text;
    }
}

const correct = new ModalWindow('correct', 'You are correct!');

function createWindow(obj) {
    let markup = `<div class="modal-wrapper">
                    <div class="${obj.name} modal">
                        ${obj.text}
                        <button class="close">Okay</button>
                    </div>
                </div>`;

    document.body.insertAdjacentHTML('beforeend', markup);
    
    // Remove Modal Window
    const closeBtn = document.querySelector('button.close');
    const modalWrapper = document.querySelector('.modal-wrapper');
    
    closeBtn.addEventListener('click', () => {
        modalWrapper.remove();
        generateCard();
    });
    
    modalWrapper.addEventListener('click', e => {
        if (e.target.classList.contains('modal-wrapper')) {
            modalWrapper.remove();
            generateCard();
        }
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

// Set up game
window.onload = startGame;


