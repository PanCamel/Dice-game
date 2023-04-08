// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0') as HTMLParagraphElement;
const score1El = document.getElementById('score--1') as HTMLParagraphElement;
const diceEl = document.querySelector('.dice') as HTMLImageElement;

const btnNew = document.querySelector('.btn--new') as HTMLButtonElement;
const btnRoll = document.querySelector('.btn--roll') as HTMLButtonElement;
const btnHold = document.querySelector('.btn--hold') as HTMLButtonElement;
const curScore0El = document.getElementById(
  'current--0'
) as HTMLParagraphElement;
const curScore1El = document.getElementById(
  'current--1'
) as HTMLParagraphElement;
let playing: boolean;
let scores: number[];
let currentScore: number;
let activePlayer: number;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = '0';
  score1El.textContent = '0';
  curScore0El.textContent = '0';
  curScore1El.textContent = '0';
  player0El?.classList.remove('player--winner');
  player1El?.classList.remove('player--winner');
  player0El?.classList.add('player--active');
  player1El?.classList.remove('player--active');
}

init();

function switchPlayer() {
  const currentPlayerElem = document.getElementById(
    `current--${activePlayer}`
  ) as HTMLParagraphElement;
  currentPlayerElem.textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El?.classList.toggle('player--active');
  player1El?.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `/assets/dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice != 1) {
      currentScore += dice;
      const currentPlayerElem = document.getElementById(
        `current--${activePlayer}`
      ) as HTMLParagraphElement;
      currentPlayerElem.textContent = String(currentScore);
      //Add dice to current score
    } else {
      //  switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    const playerScore = document.getElementById(
      `score--${activePlayer}`
    ) as HTMLParagraphElement;
    playerScore.textContent = String(scores[activePlayer]);
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      const currentPlayerElem = document.querySelector(
        `.player--${activePlayer}`
      ) as HTMLDivElement;

      currentPlayerElem.classList.add('player--winner');
      currentPlayerElem.classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
