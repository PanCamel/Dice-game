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
score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

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
    const currentPlayerElem = document.getElementById(
      `current--${activePlayer}`
    ) as HTMLParagraphElement;
    currentPlayerElem.textContent = '0';
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El?.classList.toggle('player--active');
    player1El?.classList.toggle('player--active');
  }
});
