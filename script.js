//resources: https://www.youtube.com/watch?v=P2TcQ3h0ipQ&t=2533s
//https://www.youtube.com/watch?v=ra2_rKV0mDE&t=1231s
//https://www.youtube.com/watch?v=zqiyKEVLGsc
//https://www.youtube.com/watch?v=fk-m2EyglaE&t=90s

$(document).ready(function() {
  $('.board').hide();
  $('.turn').hide(); 
  $('#replay').hide();
  var onePlayer;
  var letter = 'X'; //X goes first in 2-player
  var plays = []; //array to store users' moves. 
  //object of each available spot on the gameboard
  var availableSpots = {
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
      }
   
  //changes buttons from # of players to X and O.
  function replaceButtons(){
      $('#player1').html("X");
      $('#player2').html("0");
  };
  
  //replace questions with the gameBoard
  function beginGame(){
       $('#question1').hide();
       $('.board').show();
       $('.turn').show();
  };
  
  //One Player game - user's turn
  function gamePlay(id, availableSpots, me, computer){
     onePlayer === true;
     if (availableSpots[id]){             //if the spot is true, or available
        $("#"+id).text(me);               //add my letter when I click
        availableSpots[id] = false;       //and make that same spot FALSE
        plays.push(id);                   //and add that id to the plays array
        if (checkForWinner(me) === true){ //check if I won
           gameOver(me, computer);
           alert(me + " wins!");
        }else{  // If I didn't win, then it's the computer's turn
           computerTurn(availableSpots, me, computer) 
        }
     }
  };
   
  //Computer's turn
  function computerTurn(availableSpots, me, computer) {
     var keys = Object.keys(availableSpots);    //make an array of all spots in the library
     var availArr = [];                         //array of remaining spaces available to computer
     for(var i = 0; i < keys.length; i++) {     //iterate through array of all spots
        var key = keys[i];                      //key is the object? at index i of keys
        if(availableSpots[key]) {               //if that same object is TRUE AKA inside of availableSpots...
           availArr.push(key)                   //...add it to availArr
        }
     }
     if(availArr.length === 0) {   //if there are no spaces left, end the game
        var availArr = [];         //reset the availArr so you can play again
        gameOver(me, computer); 
     } //else
    //If there are spaces still available:
    var computerTurn = Math.floor(Math.random() * availArr.length); //find a spot, from the remaining spots
    var i = availArr[computerTurn];   //var i is the computer's spot -- found in remaining spots array!
    if (availArr.length === 8){       //if it's the computer's FIRST turn, choose an ODD numbered space!
       if(i % 2 === 1){ 
          $("#"+i).html(computer); 
       }else{ 
          i -=1;
          $("#"+i).html(computer); 
       }         
       availableSpots[i] = false  
    } else {  //if less than 8 spots are available, NO LONGER FIRST TURN!
       $("#"+i).html(computer);          //add computer's letter to i, the computer's spot
       availableSpots[i] = false         
       if (checkForWinner(computer) === true){ //Check if the computer won
          gameOver(me, computer);
          alert(computer + " wins!");
       }
    }
  }
   
  //Two player game
  function twoPlayer(id, availableSpots, letter){
     onePlayer === false;
     if (availableSpots[id]){
        $("#"+id).text(letter);  
        plays.push(id);             
        availableSpots[id] = false;
        if (checkForWinner(letter) === true){ //first check if current player WON. 
           gameOver(letter, 0);
           alert(letter + " wins!");
           plays = [];
        }else if (plays.length === 9){    //then, check if all 9 spots are taken
           gameOver(letter, 0);
           plays = [];
        } 
        else{  //Game on? Switch turns!
           switchTurn();
        } 
     }
  };
  
  //TWO player game only: switches between X and O
  function switchTurn(){
     if (letter === 'X'){ 
        $('#X').css( "background", "#103f07");
        $('#O').css( "background", "white");
        letter = 'O';
     } else {
        $('#O').css( "background", "#103f07");
        $('#X').css( "background", "white");
        letter = 'X';
     }
  }
  
  //check if those spaces \(below\) are in a ROW. I.E., check if there is a WINNER!
  function checkForWinner(move){
     var result = false;
     //Winning combinations, based on ID
     if(checkRow(1, 2, 3, move) ||
        checkRow(4, 5, 6, move) ||
        checkRow(7, 8, 9, move) ||
        checkRow(1, 5, 9, move) ||
        checkRow(3, 5, 7, move) ||
        checkRow(1, 4, 7, move) ||
        checkRow(2, 5, 8, move) ||
        checkRow(3, 6, 9, move)){
           result = true;
     }
     return result;
  }
  
  //check if 3 spaces have the SAME letters
  function checkRow(a, b, c, move){
     var result = false;
     if(getBox(a) == move && getBox(b) == move && getBox(c) == move){
        $("#" + a).css('background', '#257230');
        $("#" + b).css('background', '#257230');
        $("#" + c).css('background', '#257230');
        result = true;
     }
     return result;
  }
  
  //check value of spaces
  function getBox(number){
     return document.getElementById(number).innerText;
  }
  
  //alerts you that the game is over, lets you play again!
  function gameOver(me, computer){
     var over = true;
     $('.turn').hide(); 
     $('#question1').show().html("Game Over!").css("color", "white").css( "font-size", "5rem");
     $('#replay').show();
     if (over === true){
        $('.btn.play').addClass('disabled')
     }
     $("#replay").click(function(){  //to start a new game
        $('.btn.play').removeClass('disabled')
           over = false;
           $('#question1').hide();
           $(".play").html(''); //reset spaces
           $(".play").css('background', '#103f07'); //reset colors of spaces
           var plays = [];
           //console.log(plays);
           for (x in availableSpots) { //reset availableSpots library to all true
              availableSpots[x] = true;}
           //if it was a one-player game
           if (onePlayer === true){        
              $('.btn.play').on("click", function(){
                 gamePlay(id, availableSpots, me, computer);
              }); 
           //if it was a two-player game
           }else{
              $('.btn.play').on("click", function(){
                 $('.turn').show();  
                 twoPlayer(id, availableSpots, me); 
              });
           }
       });     
  }

  //choosing one player game
  $("#player1").on("click", function(){
      //change the question and answers
      $('#Q1').html("Do you want to be X or O?");
      replaceButtons();
      //if you select X, AKA #player1
      $("#player1").on("click", function(){  
         beginGame(); //show the board
         $('.btn.play').on("click", function(){
             var id = this.id; //get the id # of whatever I click
             gamePlay(id, availableSpots, 'X', 'O'); //I'm X, computer is O
         });
      });
      //if you select O, AKA #player2
      $("#player2").on("click", function(){  
         beginGame(); 
         $('.btn.play').on("click", function(){
             var id = this.id;
             gamePlay(id, availableSpots, 'O', 'X'); //I'm O, computer is X
         });
      });
    });
  
  //choosing two player game
  $("#player2").on("click", function(){
      //change the question and answers
      $('#Q1').html("Player1: Do you want to be X or O?");
      replaceButtons();
      //if you select X, AKA #player1
      $("#player1").on("click", function(){ 
         beginGame();
         $('#question1').show().html("X goes first!").css("color", "white").css( "font-size", "2rem");
         $('.btn.play').on("click", function(){
             var id = this.id; 
             twoPlayer(id, availableSpots, letter); 
         }); 
      });
      //if you select O, AKA #player2
      $("#player2").on("click", function(){
        beginGame();
        $('#question1').show().html("X goes first!").css("color", "white").css( "font-size", "2rem");
         $('.btn').on("click", function(){
             var id = this.id; //get the id # of whatever I click
             twoPlayer(id, availableSpots, letter); 
         });
      });
  });
  
});
