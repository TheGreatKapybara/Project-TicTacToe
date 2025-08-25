function gameboard(rows, columns, players) {
    let board = new Array(rows);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(columns);
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            board[i][j] = 0; // token: 0, class: 0 / cross / circle
        }
    }
    console.log(board);
    let row = 0;
    let col = 0;

    const field = document.querySelector('.gameField');
    field.style.flexDirection = 'row';
    field.style.gap = '0px';

    const divBoard = document.createElement('div');
    divBoard.className = 'board';
    field.append(divBoard);

    const activePlayerScreen = document.createElement('div');
    activePlayerScreen.className = 'playerScreen'
    activePlayerScreen.textContent = `${players[0].name}`
    field.append(activePlayerScreen)


    for (let i = 0; i < 9; i++) {
        
        const div = document.createElement('div');
        div.className = 'point';
        
        if (col === 3) {
            row++
            col = 0;
        }
        div.dataset.row = row;
        div.dataset.col = col;
        col++
        divBoard.append(div);
    }
    
    function changePoint(switchPlayerTurn, getActivePlayer, event) {
        const eventRow =  event.target.dataset.row;
        const eventCol =  event.target.dataset.col;
        const token = getActivePlayer().token;
        if (board[eventRow][eventCol] !== 0) {
            console.log('Ошибка');
            return
        }
        event.target.className = 'point ' + getActivePlayer().class;
        board[eventRow][eventCol] = token
        //console.log(board);
        //console.log(getActivePlayer());
        
        const isVictory = checkTheVictory(eventRow, eventCol, token, board)
        if (isVictory === false) {
            return
        }
        switchPlayerTurn();
    }
    return {changePoint, board}
}



function gameController(player1, player2) {

    

    const players = [
        {
            name: player1,
            token: 1,
            class: 'circle'
        },
        {
            name: player2,
            token: 2,
            class: 'cross'
        }
    ]

    const board = gameboard(3,3, players)

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
        const activePlayerScreen = document.querySelector('.playerScreen')
        activePlayerScreen.textContent = activePlayer.name
    };
    const getActivePlayer = () => activePlayer;

    const stepMaker = document.querySelectorAll('.point');
    
    stepMaker.forEach(step => {
    step.addEventListener('click', function (event) {
        board.changePoint(switchPlayerTurn, getActivePlayer, event)
    });
    })
}

function checkTheVictory(pointRow, pointCol, token, board) {
    neighbors = [{checkNeighbour: [0, -1],
                winNeighbour: [[0, -2], [0, 1]]
                }, 
                {checkNeighbour: [-1, -1],
                winNeighbour: [[1, 1], [-2, -2]]
                }, 
                {checkNeighbour: [-1, 0],
                winNeighbour: [[-2, 0], [1, 0]]
                }, 
                {checkNeighbour: [-1, 1],
                winNeighbour: [[1, -1], [-2, 2]]
                }, 
                {checkNeighbour: [0, 1],
                winNeighbour: [[0, 2]]
                }, 
                {checkNeighbour: [1, 1],
                winNeighbour: [[2, 2]]
                }, 
                {checkNeighbour: [1, 0],
                winNeighbour: [[2, 0]]
                }, 
                {checkNeighbour: [1, -1],
                winNeighbour: [[2, -2]]}];

    for (let i = 0; i < 8; i++) {
        let row = neighbors[i].checkNeighbour[0]+Number(pointRow);
        let col = neighbors[i].checkNeighbour[1]+Number(pointCol);

        if (row >= 3 || col >= 3) {
            continue
        }
        else if (row == -1 || col == -1) {
            continue
        }
        else {
            if (board[row][col] == token) {

                for (let j = 0; j < neighbors[i].winNeighbour.length; j++) {
                    row = neighbors[i].winNeighbour[j][0]+Number(pointRow);
                    col = neighbors[i].winNeighbour[j][1]+Number(pointCol);
                    
                    if (row >= 3 || col >= 3) {
                        continue                      
                    }
                    else if (row == -1 || col == -1) {
                        continue
                    }
                    else if (board[row][col] == token) {
                        console.log('POBEDA');
                        theVictory();
                        return false
                    }
                    else {
                        continue
                        console.log(1);
                    }
                }
            }
        }
    }
    
    function theVictory() {
        const field = document.querySelector('.gameField');
        field.innerHTML = '';
        field.style.flexDirection = 'column';
        startGame();
    }
    
}


function startGame() {
    const field = document.querySelector('.gameField');

    const startButton = document.createElement('button');
    startButton.className = 'buttonStart';
    startButton.textContent = 'Начать игру';

    const player1Input = document.createElement('input');
    player1Input.className = 'player1Name';
    player1Input.placeholder = 'Введите имя первого игрока';
    const player2Input = document.createElement('input');
    player2Input.className = 'player2Name';
    player2Input.placeholder = 'Введите имя второго игрока';

    field.append(player1Input, player2Input, startButton);

    startButton.addEventListener('click', function () {
        gameController(player1Input.value, player2Input.value);
        startButton.remove();
        player1Input.remove();
        player2Input.remove();
    })
    
}

startGame();



// Горизонтально[x,-1] or [x,1] - [x,-2] or [x,1]
// Вертикально[-1,x] or [1,x] - [-2,x] or [1,x]
// Искось[0,2] or [2,0] or [0,0] or [2,2] 




