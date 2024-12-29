var board = ['', '', '', '', '', '', '', '', '', ''], letter = 'X', computerLetter = 'O', gameRunning = true;

function drawBoard(b){
  b.forEach(function(e, i, a){
    $('#'+i).html(e);
  });
}


function isWinner(bo, le){
  return ((bo[7] == le && bo[8] == le && bo[9] == le) || // across the top
         (bo[4] == le && bo[5] == le && bo[6] == le) || // across the middle
         (bo[1] == le && bo[2] == le && bo[3] == le) || // across the bottom
         (bo[7] == le && bo[4] == le && bo[1] == le) || // down the left side
         (bo[8] == le && bo[5] == le && bo[2] == le) || // down the middle
         (bo[9] == le && bo[6] == le && bo[3] == le) || // down the right side
         (bo[7] == le && bo[5] == le && bo[3] == le) || // diagonal
         (bo[9] == le && bo[5] == le && bo[1] == le)) // diagonal
}

function chooseRandomMoveFromList(bo, movesList){
      var possibleMoves = []
      movesList.forEach(function(e, i, a){
          if(bo[e] == '')
              possibleMoves.push(e);
      });
      if(possibleMoves.length != 0)
          return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      else
          return -1;
}

function getComputerMove(bo){
  for(var i = 1; i < 10; i++){
    if(bo[i] == '')
      bo[i] = computerLetter;
    if(isWinner(bo, computerLetter))
      return i;
    bo = board.slice();
  }
  
  
  for(var i = 1; i < 10; i++){
    if(bo[i] == '')
      bo[i] = letter;
    if(isWinner(bo, letter))
      return i;
    bo = board.slice();
  }
  
  bo = board.slice();
  move = chooseRandomMoveFromList(bo, [1, 3, 7, 9]);
  if(move != -1)
    return move;
  
  bo = board.slice();
  if(bo[5] == '')
    return 5;
  
  return chooseRandomMoveFromList(bo, [2, 4, 6, 8]);
}

function isBoardFull(){
 
  for(var i = 1; i < 10; i++)
    if(board[i] == '')
      return false;
  return true;
}

$('.btn').click(function(){
  switch($(this).text()){
    case 'Start':
      startGame();
      break;
      
    case '|Play as X|':
      gameRunning = true;
      letter = 'X';
      computerLetter = 'O';
      break;
      
    case '|Play as O|':
      gameRunning = true;
      letter = 'O';
      computerLetter = 'X';
      break;
      
    case '':
      $(this).text(letter);
      $('#result').html('');
      board[parseInt($(this).attr('id'))] = letter; // update with player move
      if(gameRunning == true){
        mv = getComputerMove(board.slice());
        board[mv] = computerLetter; // update with computer move
        $('#'+mv).text(computerLetter);
        if(isWinner(board.slice(), letter)){
          $('#result').html(letter + " Won");
          gameOver();
        }
        else if(isWinner(board.slice(), computerLetter)){
          $('#result').html(computerLetter + " Won");
          gameOver();
        }
        else if(isBoardFull()){
          $('#result').html("It's a tie");
          gameOver();
        }
      }
      // console.log(board.join(","), 'letter', letter);
      break;
  }
});

function gameOver(){
  $('#start').show();
  for(var i = 1; i < 10; i++){
   $("#"+i).prop("disabled",true);
  }
  gameRunning = false;
}

function startGame(){
  gameRunning = true;
  $('#start').hide();
  $('#result').html('');
  board = ['', '', '', '', '', '', '', '', '', '']
  drawBoard(board);
  for(var i = 1; i < 10; i++){
   $("#"+i).prop("disabled",false);
  }
}

$(document).ready(function(){
  $('#start').hide();
  $('#myModal').modal('show');
});