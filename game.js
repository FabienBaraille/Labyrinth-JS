const game = {
    currentPos : {
        'row': 7,
        'column': 2
    },
    nextPos: {
        'row': null,
        'column': null
    },
    currentBoard: [],
    landElt: document.querySelector('.terrain_de_jeu'),
    cellWidth: 50,
    types: {
        'x': 'classic',
        '*': 'wall',
        'o': 'burger',
        '-': 'goal'
    },
    newGameButton: document.querySelector('button'),
    winElt: document.querySelector('.win'),
    init: function(){
        for (const rows of models.n1) {
            game.currentBoard.push(rows.split(''));
        }
        game.drawBoard();
        document.addEventListener('keydown', game.handleKeyBoard);
    },
    drawBoard: function() {
        game.landElt.textContent = '';
        for (const rows of game.currentBoard) {
            const row = document.createElement('div');
            row.classList.add('rows');
            for (const col of rows) {
                const cell = document.createElement('div');
                cell.classList.add('square');
                if (col == '-o') {
                    cell.classList.add(game.types['o']);
                    cell.classList.add(game.types['-']);
                } else {
                    cell.classList.add(game.types[col]);
                }
                row.append(cell);
            }
            game.landElt.append(row);
        }
    },
    handleKeyBoard: function(event) {
        let outMessage = '';
        switch (event.key) {
            case 'ArrowUp':
                game.currentPos.row > 0 ? game.nextPos.row =  game.currentPos.row - 1 : outMessage = 'Vous sortez du plateau !' ;
                game.nextPos.column = game.currentPos.column;
                break;
            case 'ArrowDown':
                game.currentPos.row < 9 ? game.nextPos.row = game.currentPos.row + 1 : outMessage = 'Vous sortez du plateau !' ;
                game.nextPos.column = game.currentPos.column;
                break;
            case 'ArrowRight':
                game.currentPos.column < 12 ? game.nextPos.column = game.currentPos.column + 1 : outMessage = 'Vous sortez du plateau !' ;
                game.nextPos.row = game.currentPos.row;
                break;
            case 'ArrowLeft':
                game.currentPos.column > 0 ? game.nextPos.column = game.currentPos.column - 1 : outMessage = 'Vous sortez du plateau !' ;
                game.nextPos.row = game.currentPos.row;
                break;
            default:
                outMessage = 'Tap on arrows !'
                break;
        }
        outMessage != '' ? console.log(outMessage) : game.moveBurger() ;
    },
    moveBurger: function() {
        const answer = game.checkWalls();
        if (answer == 'move') {
            game.currentBoard[game.currentPos.row][game.currentPos.column] = 'x';
            game.currentBoard[game.nextPos.row][game.nextPos.column] = 'o';
            game.currentPos.row = game.nextPos.row;
            game.currentPos.column = game.nextPos.column;
            game.drawBoard();
        } else if (answer == 'You win !') {
            game.currentBoard[game.currentPos.row][game.currentPos.column] = 'x';
            game.currentBoard[game.nextPos.row][game.nextPos.column] = '-o';
            game.drawBoard();
            game.ending();
        } else {
            console.log(answer);
        }
    },
    checkWalls: function() {
        const nextCell = game.currentBoard[game.nextPos.row][game.nextPos.column];
        let message = '';
        switch (nextCell) {
            case '*':
                message = 'There is a wall !'
                break;
            case 'x':
                message = 'move'
                break;
            case '-':
                message = 'You win !'
                break;
        }
        return message;
    },
    ending: function() {
        document.removeEventListener('keydown', game.handleKeyBoard);
        game.newGameButton.addEventListener('click', game.handleNewGame);
        game.winElt.textContent = 'You win !';
        game.newGameButton.hidden = false;
    },
    handleNewGame: function() {
        document.querySelector('.terrain_de_jeu').innerHTML = '';
        game.currentBoard = [];
        game.winElt.textContent = '';
        game.newGameButton.hidden = true;
        game.init();
    }
};
document.addEventListener('DOMContentLoaded', game.init);