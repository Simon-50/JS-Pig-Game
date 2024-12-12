// Player definitions
const player1 = {
    text: 'Player 1',
    section: document.querySelector('#player-1'),
    total: document.querySelector('#score-1'),
    current: document.querySelector('#current-1')
};

const player2 = {
    text: 'Player 2',
    section: document.querySelector('#player-2'),
    total: document.querySelector('#score-2'),
    current: document.querySelector('#current-2')
};

// Game buttons
const roll = document.querySelector('#roll-dice');
const hold = document.querySelector('#hold');
const reset = document.querySelector('#reset');
const dice = document.querySelector('#dice-img');

// Other elements
const diceSection = document.querySelector('#dice');
const winScreen = document.querySelector('#win-screen');

let activePlayer = player1;
activePlayer.section.classList.add('active-player');

// Get number for given element
function getNumber(element) {
    return Number(element.textContent);
}

// Increase score displayed in element
function incrementScore(element, num) {
    element.textContent = getNumber(element) + num;
}

// Switch active player
function switchActivePlayer() {
    activePlayer.section.classList.remove('active-player');

    activePlayer === player1 ? (activePlayer = player2) : (activePlayer = player1);

    activePlayer.section.classList.add('active-player');
}

// Delay code execution by ms
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Hold current score
async function holdScore() {
    let score = getNumber(activePlayer.current);
    incrementScore(activePlayer.total, score);
    activePlayer.current.textContent = 0;

    await delay(1);

    // Check if that is enough to win
    if (getNumber(activePlayer.total) >= 50) {
        // Hide game
        player1.section.style.display = 'none';
        player2.section.style.display = 'none';
        diceSection.style.display = 'none';
        roll.style.display = 'none';
        hold.style.display = 'none';

        // Show win text
        winScreen.textContent = `${activePlayer.text} has won the game!`;
        winScreen.style.display = 'block';
    } else {
        switchActivePlayer();
    }
}

// Reset scores for new game
function newGame() {
    // Reset game displays
    winScreen.style.display = 'none';
    player1.section.style.display = 'flex';
    diceSection.style.display = 'flex';
    player2.section.style.display = 'flex';
    roll.style.display = 'inline';
    hold.style.display = 'inline';

    // Reset scores
    player1.total.textContent = 0;
    player1.current.textContent = 0;

    player2.total.textContent = 0;
    player2.current.textContent = 0;

    // Set up for player 1 to start
    player1.section.classList.remove('active-player');
    player2.section.classList.remove('active-player');

    activePlayer = player1;
    activePlayer.section.classList.add('active-player');
}

// Roll dice
function rollDice() {
    let roll = Math.floor(Math.random() * 6 + 1);

    dice.src = `images/dice ${roll}.png`;

    if (roll === 1) {
        activePlayer.current.textContent = 0;
        switchActivePlayer();
    } else {
        incrementScore(activePlayer.current, roll);
    }
}

// Bind buttons
roll.addEventListener('click', rollDice);
reset.addEventListener('click', newGame);
hold.addEventListener('click', holdScore);
