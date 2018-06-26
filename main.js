var origBoard;
var count = 0;
const player2 = 'O';
const player1 = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
    }
    document.getElementById('player2').style.color = 'black';
    document.getElementById('player1').style.color = 'black';
}


function turnClick(square) {
	turn(square.target.id, player2);
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    count++;
    if((count % 2) == 0){
        document.getElementById(squareId).innerText = player2;
        document.getElementById('player1').style.color = 'black';
        document.getElementById('player2').style.color = 'green';
    }else{
        document.getElementById(squareId).innerText = player1;
        document.getElementById('player2').style.color = 'black';
        document.getElementById('player1').style.color = 'green';
    }
    let gameWon = checkWin(origBoard, player);
	if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == Player2 ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
}