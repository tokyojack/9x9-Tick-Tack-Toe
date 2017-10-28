var totalSlots = 81;

var boardController = (function() {

    var getEmptyBoard = function getEmptyBoard() {
        var board = [];

        for (var i = 0; i < totalSlots; i++)
            board.push(' ');

        return board;
    };

    var data = {
        playerTurn: 'X',
        board: getEmptyBoard(),
        hasWon: false
    };

    return {
        setWon: function() {
            data.hasWon = true;
        },
        getTeamSwitched: function() {
            var playerTurn = data.playerTurn;
            playerTurn === 'O' ? data.playerTurn = 'X' : data.playerTurn = 'O';
            return data.playerTurn;
        },
        getTurn: function() {
            return data.playerTurn;
        },
        getBoard: function() {
            return data.board;
        },
        getHasWon: function() {
            return data.hasWon;
        },
        addSlot: function(slot) {
            data.board[slot] = data.playerTurn;
        },
        resetGameData: function() {
            data.playerTurn = 'X';
            data.board = getEmptyBoard();
            data.hasWon = false;
        }
    };

})();

var winningController = (function() {

    //May not be the best approach for this.
    var winningConditions = [
        [
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'
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
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' ', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', ' '
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G'
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
            ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G'
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
            'G', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '
        ]
    ];

    return {
        hasWon: function(board, turn) {
            for (var x = 0; x < winningConditions.length; x++) {
                var condition = winningConditions[x];
                var amount = 0;

                for (var y = 0; y < totalSlots; y++) {
                    var conditionSlot = condition[y];
                    var boardSlot = board[y];

                    if (conditionSlot === 'G' && boardSlot === turn)
                        amount++;

                    if (amount === 9) return true;
                }
            }
            
            return false;
        },
        hasTied: function(board) {
            var amount = 0;
            for (var i = 0; i < totalSlots; i++) {
                var boardSlot = board[i];

                if (boardSlot === 'X' || boardSlot === 'O')
                    amount++;

                if (amount === totalSlots) return true;
            }
            
            return false;
        }
    };

})();

var UIController = (function() {
    var DOMstrings = {
        turn: '.turn',
        button: '.button',
        hiddenButton: '.hidden--button'
    };

    return {
        setSlot: function(playerTurn, slot) {
            var color = playerTurn === 'X' ? 'red' : 'blue';
            document.getElementById(slot).innerHTML = '<h1 style="color:' + color + ';font-size: 30px;">' + playerTurn + '</h1>';
        },
        setTurnText: function(playerTurn) {
            document.querySelector(DOMstrings.turn).textContent = 'Player ' + playerTurn + ' turn';
        },
        setWonText: function(playerTurn) {
            document.querySelector(DOMstrings.turn).textContent = 'Player ' + playerTurn + ' won! Wohoo!';
        },
        setTieText: function() {
            document.querySelector(DOMstrings.turn).textContent = 'Tied!';
        },
        getDOMstrings: function() {
            return DOMstrings;
        },
        showButton: function() {
            //I'm removing the . (Not removing it from DOM strings for visability when editing it.
            document.querySelector(DOMstrings.button).classList.remove(DOMstrings.hiddenButton.replace(/\./g, ''));
        },
        resetGameUI: function() {
            //I'm removing the . (Not removing it from DOM strings for visability when editing it.
            document.querySelector(DOMstrings.button).classList.add(DOMstrings.hiddenButton.replace(/\./g, ''));
            for (var i = 0; i < totalSlots; i++) {
                document.getElementById(i).innerHTML = '';
            }
        }
    };

})();

var controller = (function(playerCtrl, UICtrl, winningCtrl) {

    var containsString = function containsString(string, containingString) {
        return string.indexOf(containingString) !== -1;
    };

    var setupEventListeners = function setupEventListeners() {
        document.querySelector('table').addEventListener('click', function(item) {
            var id = item.target.id;
            var clickedItem = document.getElementById(id);

            if (!(id || clickedItem)) return;
            if (playerCtrl.getHasWon()) return;

            var playerTurn = playerCtrl.getTurn();

            if (clickedItem.textContent === '') {
                playerCtrl.addSlot(id);
                UICtrl.setSlot(playerTurn, id);
                UICtrl.setTurnText(playerCtrl.getTeamSwitched());
            }

            if (winningCtrl.hasWon(playerCtrl.getBoard(), playerTurn))
                UICtrl.setWonText(playerTurn);
            else if (winningCtrl.hasTied(playerCtrl.getBoard()))
                UICtrl.setTieText();

            var turnText = document.querySelector(UICtrl.getDOMstrings().turn).textContent;
            if (containsString(turnText, 'won') || containsString(turnText, 'Tied')) {
                playerCtrl.setWon();
                UICtrl.showButton();
            }
        });

        document.querySelector('button').addEventListener('click', function() {
            playerCtrl.resetGameData();
            UICtrl.resetGameUI();
            UICtrl.setTurnText(playerCtrl.getTurn());
        });
    };

    return {
        init: function() {
            console.log('Game has started');
            setupEventListeners();
        }
    };

})(boardController, UIController, winningController);

controller.init();
