/* copy paste the below into JS console */

// Initialize the board
const board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
];

// Initialize the players
const players = ["X", "O"];

// Initialize the current player index
let currentPlayerIndex = Math.round(Math.random());

// Function to display the board
function displayBoard() {
    console.log(board[0][0] + " | " + board[0][1] + " | " + board[0][2]);
    console.log(board[1][0] + " | " + board[1][1] + " | " + board[1][2]);
    console.log(board[2][0] + " | " + board[2][1] + " | " + board[2][2]);
}

// Function to check if the game is over
function isGameOver() {
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (board[row][0] !== "-" && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return true;
        }
    }
    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== "-" && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return true;
        }
    }
    // Check diagonals
    if (board[0][0] !== "-" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
    }
    if (board[0][2] !== "-" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
    }
    // Check if the board is full
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "-") {
                return false;
            }
        }
    }
    return true;
}

// Function to get the current player
function currentPlayer() {
    return players[currentPlayerIndex];
}

// Function to get input from the user
async function getInput() {
    const row = await prompt("Enter row: ");
    const col = await prompt("Enter col: ");
    return [Number(row), Number(col)];
}

// Function to check if a move is valid
function isValidMove(row, col) {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
        return false;
    }
    if (board[row][col] !== "-") {
        return false;
    }
    return true;
}

// Function to get the AI's move
function getAIMove() {
    // Look for any spots where the AI could win and take them
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "-") {
                board[row][col] = currentPlayer();
                if (isGameOver()) {
                    return [row, col];
                }
                board[row][col] = "-";
            }
        }
    }

    // Look for any spots where the player could win and
    // block them
    const otherPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    const otherPlayer = players[otherPlayerIndex];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === "-") {
                board[row][col] = otherPlayer;
                if (isGameOver()) {
                    board[row][col] = currentPlayer();
                    return [row, col];
                }
                board[row][col] = "-";
            }
        }
    }

    // If there are no winning moves or blocking moves, take a random spot
    while (true) {
        const row = Math.floor(Math.random() * 3);
        const col = Math.floor(Math.random() * 3);
        if (isValidMove(row, col)) {
            return [row, col];
        }
    }
}

// Function to make a move
async function makeMove() {
    let row, col;
    if (currentPlayer() === "X") {
        [row, col] = await getInput();
        while (!isValidMove(row, col)) {
            console.log("Invalid move. Try again.");
            [row, col] = await getInput();
        }
    } else {
        [row, col] = getAIMove();
    }
    board[row][col] = currentPlayer();
    displayBoard();
}

// Main game loop
async function playGame() {
    displayBoard();
    while (!isGameOver()) {
        await makeMove();
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }
    console.log(currentPlayer() + " wins!");
}

// Start the game
playGame();

