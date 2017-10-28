const totalSlots = 81;

const boardController = (() => {

    const getEmptyBoard = () => {
        let board = [];

        for (var i = 0; i < totalSlots; i++)
            board.push(' ');

        return board;
    };

    let data = {
        playerTurn: 'X',
        board: getEmptyBoard(),
        hasWon: false,
    };

    return {
        setWon: () => {
            data.hasWon = true;
        },
        getTeamSwitched: () => {
            var playerTurn = data.playerTurn;
            playerTurn === 'O' ? data.playerTurn = 'X' : data.playerTurn = 'O';
            return data.playerTurn;
        },
        getTurn: () => {
            return data.playerTurn;
        },
        getBoard: () => {
            return data.board;
        },
        getHasWon: () => {
            return data.hasWon;
        },
        addSlot: (slot) => {
            data.board[slot] = data.playerTurn;
        },
        resetGameData: () => {
            data.playerTurn = 'X';
            data.board = getEmptyBoard();
            data.hasWon = false;
        }
    };

})();

const winningController = (() => {

    //May not be the best approach for this.
    const winningConditions = [
        [
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
        ],
        [
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
        ],
        [
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
        ],
        [
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ],
    ];

    return {
        hasWon: (board, turn) => {
            for (const winningCondition of winningConditions) {
                let amount = 0;

                for (let y = 0; y < totalSlots; y++) {
                    let conditionSlot = winningCondition[y];
                    let boardSlot = board[y];

                    if (conditionSlot === 'G' && boardSlot === turn)
                        amount++;

                    if (amount === 9) return true;
                }
            }

            return false;
        },
        hasTied: (board) => {
            let amount = 0;
            for (let i = 0; i < totalSlots; i++) {
                let boardSlot = board[i];

                if (boardSlot === 'X' || boardSlot === 'O')
                    amount++;

                if (amount === totalSlots) return true;
            }

            return false;
        }
    };

})();

const UIController = (() => {
    const DOMstrings = {
        turn: '.turn',
        button: '.button',
        hiddenButton: '.hidden--button',
    };

    return {
        setSlot: (playerTurn, slot) => {
            const color = playerTurn === 'X' ? 'red' : 'blue';
            document.getElementById(slot).innerHTML = '<h1 style="color:' + color + ';font-size: 30px;">' + playerTurn + '</h1>';
        },
        setTurnText: (playerTurn) => {
            document.querySelector(DOMstrings.turn).textContent = `Player ${playerTurn} turn`;
        },
        setWonText: (playerTurn) => {
            document.querySelector(DOMstrings.turn).textContent = `Player ${playerTurn} won! Wohoo!`;
        },
        setTieText: () => {
            document.querySelector(DOMstrings.turn).textContent = 'Tied!';
        },
        getDOMstrings: () => {
            return DOMstrings;
        },
        showButton: () => {
            //I'm removing the . (Not removing it from DOM strings for visability when editing it.
            document.querySelector(DOMstrings.button).classList.remove(DOMstrings.hiddenButton.replace(/\./g, ''));
        },
        resetGameUI: () => {
            //I'm removing the . (Not removing it from DOM strings for visability when editing it.
            document.querySelector(DOMstrings.button).classList.add(DOMstrings.hiddenButton.replace(/\./g, ''));
            for (let i = 0; i < totalSlots; i++) {
                document.getElementById(i).innerHTML = '';
            }
        }
    };

})();

const controller = ((playerCtrl, UICtrl, winningCtrl) => {

    const containsString = (string, containingString) => {
        return string.indexOf(containingString) !== -1;
    };

    const setupEventListeners = () => {
        document.querySelector('table').addEventListener('click', (item) => {
            const id = item.target.id;
            const clickedItem = document.getElementById(id);

            if ((id === undefined || id === null) || (clickedItem === undefined || clickedItem === null)) return;
            if (playerCtrl.getHasWon()) return;

            const playerTurn = playerCtrl.getTurn();

            if (clickedItem.textContent === '') {
                playerCtrl.addSlot(id);
                UICtrl.setSlot(playerTurn, id);
                UICtrl.setTurnText(playerCtrl.getTeamSwitched());
            }

            if (winningCtrl.hasWon(playerCtrl.getBoard(), playerTurn))
                UICtrl.setWonText(playerTurn);
            else if (winningCtrl.hasTied(playerCtrl.getBoard()))
                UICtrl.setTieText();

            const turnText = document.querySelector(UICtrl.getDOMstrings().turn).textContent;
            if (containsString(turnText, 'won') || containsString(turnText, 'Tied')) {
                playerCtrl.setWon();
                UICtrl.showButton();
            }
        });

        document.querySelector('button').addEventListener('click', () => {
            playerCtrl.resetGameData();
            UICtrl.resetGameUI();
            UICtrl.setTurnText(playerCtrl.getTurn());
        });
    };

    return {
        init: () => {
            console.log('Game has started');
            setupEventListeners();
        }
    };

})(boardController, UIController, winningController);

controller.init();
