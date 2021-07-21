'use strict';

// Elements
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
let diceEl = document.querySelector('.dice');

// Buttons
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let btnRoll = document.querySelector('.btn--roll');

// Initialisation
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const initialise = () => {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialise();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a number between 1 and 6
    let diceValue = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${diceValue}.png`;
    diceEl.classList.remove('hidden');

    // Add the value to current score
    if (diceValue != 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // Switch player
    else {
      switchPlayer();
    }
  }
});

// Hold the value
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add the current score to player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', initialise);
