var width = 80;
pixelSize = Math.floor(document.documentElement.clientWidth / width) - 1;
var height = Math.floor(document.documentElement.clientHeight / pixelSize) - 1;

function generateBoard(y, x) {
    var board = new Array(y);
    for (var i = 0; i < y; i++) {
        var line = new Array(x);
        for (var j = 0; j < x; j++) {
            line[j] = generateCellValue();
        }
        board[i] = line;
    }
    return board
}

function generateCellValue() {
    return ((Math.floor((Math.random() * 1000) + 1)) % 2) === 0;
}

function drawBoard(board) {
    document.body.innerHTML = '';
    var verticalWrapper = document.createElement("div");
    verticalWrapper.classList.add("vertical-wrapper");
    for (var i = 0; i < board.length; i++) {
        var horizontalWrapper = document.createElement("div");
        horizontalWrapper.classList.add("horizontal-wrapper");
        horizontalWrapper.style.gridTemplateColumns = 'repeat(' + width + ', 1fr)';
        for (var j = 0; j < board[0].length; j++) {
            var element = document.createElement("div");
            element.classList.add("element", board[i][j] ? "live" : "dead");
            element.style.width = pixelSize + "px";
            element.style.height = pixelSize + "px";
            horizontalWrapper.appendChild(element);
        }
        verticalWrapper.appendChild(horizontalWrapper);
    }
    document.body.appendChild(verticalWrapper);
}

function getLiveNeighboursCount(i, j, board) {
    var liveNeighboursCount = 0;
    for (var a = i - 1; a <= i + 1; a++) {
        for (var b = j - 1; b <= j + 1; b++) {
            if (!(a === i && b === j)) {
                if (board[(board.length + a) % board.length][(board[0].length + b) % board[0].length]) {
                    liveNeighboursCount++;
                }
            }
        }
    }
    return liveNeighboursCount;
}

function processBoard(board) {
    var newBoard = new Array(board.length);
    for (var i = 0; i < board.length; i++) {
        newBoard[i] = new Array(board[i].length);
        for (var j = 0; j < board[0].length; j++) {
            var liveNeighboursCount = getLiveNeighboursCount(i, j, board);
            if (liveNeighboursCount < 2) {
                newBoard[i][j] = false;
            } else if (liveNeighboursCount > 3) {
                newBoard[i][j] = false;
            } else if (liveNeighboursCount === 2) {
                newBoard[i][j] = board[i][j]
            } else if (liveNeighboursCount === 3) {
                newBoard[i][j] = true;
            }
        }
    }
    return newBoard;
}

document.addEventListener("DOMContentLoaded", function () {
    var board = generateBoard(height, width);
    drawBoard(board);

    setInterval(function () {
        board = processBoard(board);
        drawBoard(board)
    }, 20);

});