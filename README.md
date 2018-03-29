# Tic-Tac-Toe

Tic-Tac-Toe made with jQuery

STARTING the GAME

-User can choose one or two player. User also chooses between 'X' and 'O.'

-An object, availableSpots, stores the availability of each square on the gameboard as True or False.

-An array, plays, stores the user's moves.

GAME PLAY

-On its first turn, the computer randomly chooses one of the corner spaces, or the center space. This is done using Math.random and only allowing an odd number (which corresponds to the space's id) to be chosen.

-After each move, a helper function checks to see if there is a winner (more on this below). If the current player did not win, the next player can make their move. In a two-player game, this is simply done with a helper function that switches between 'X' abd 'O.'

ENDING the GAME

-The game ends when someone wins, or there are no more available spots. The game alerts the user of who won, and displays a message saying that the game is over. A button appears that allows the user to play again. All other buttons are disabled.

-After each move, checkForWinner is called to see if there are three of the same letters in a row. checkForWinner contains an if/else statement containing all possible winning combinations.  checkForWinner relies on two helper functions: getBox and checkRow. getBox checks the innerText of the spaces, to see if they are 'X's or 'O's. checkRow checks to see if those values are all the same. If so, it highlights the corresponding box by changing the background color in CSS.

RESTARTING the GAME

-When the user clicks "Play Again," plays, availableSpots, and background colors are reset. All buttons on the gameboard are enabled.

