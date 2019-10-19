$(document).ready(function() {
  let currentWinner = "+"
  let x = "x";
  let o = "o";
  let count = 0;
  let o_win = 0;
  let x_win = 0;

  let WINNING_TILES = [
    ["one", "two", "three"],
    ["four", "five", "six"],
    ["seven", "eight", "nine"],
    ["one", "four", "seven"],
    ["two", "five", "eight"],
    ["three", "six", "nine"],
    ["one", "five", "nine"],
    ["three", "five", "seven"]
  ];

  let O_winning_tiles = [];
  let X_winning_tiles = [];

  const resetTiles = () => {
    O_winning_tiles = [];
    X_winning_tiles = [];
  }

  const resetScore = () => {
    o_win = 0;
    x_win = 0;
    $("#x_win").text(x_win);
    $("#o_win").text(o_win);
  }

  const resetBoard = () => {
    $(".square").text("+");
    $.each($(".square"), function(index, value) {
      if ($(value).hasClass("disable")) {
        $(value).removeClass("disable");
      }
    });
    currentWinner = "+";
  }

  const stopGame = () => {
    $(".square").each(function(index) {
      $($(".square")[index]).off();
    })
  }

  $("#clear-board").click(function(e) {
    e.preventDefault();
    resetBoard();
    resetTiles();
    count = 0;
    startGame();
  });

  $("#reset-score").click(function(e) {
    e.preventDefault();
    resetScore();
    resetBoard();
    resetTiles();
    count = 0;
    startGame();
  });

  const checkWinner = () => {
    for (let i = 0; i < WINNING_TILES.length; i += 1) {
      let row = WINNING_TILES[i];
      if (row.every(piece => X_winning_tiles.includes(piece))) {
        stopGame();
        return currentWinner = "x";
      }
      if (row.every(piece => O_winning_tiles.includes(piece))) {
        stopGame();
        return currentWinner = "o";
      }
    }
    return "+";
  }

  const startGame = () => {
    $(".square").click(function() {
      if ($(this).hasClass("disable")) {
        return alert("This is already selected!");
      }
      count += 1;
  
      if (count % 2 === 0) {
        $(this).text(x);
        $(this).addClass("disable");
        X_winning_tiles.push($(this).attr('id'));
        if (checkWinner() === "x") {
          $("#x_win").text(x_win += 1);
          return alert("X wins! Please restart to play again!");
        }
      } else {
        $(this).text(o);
        $(this).addClass("disable");
        O_winning_tiles.push($(this).attr('id'));
        if (checkWinner() === "o") {
          $("#o_win").text(o_win += 1);
          return alert("O wins! Please restart to play again!");
        }
      }
  
      if (count === 9) {
        if (checkWinner() === "+") {
          alert("It's a tie! Please restart to play again!");
          return; 
        } else if (checkWinner() === "x") {
          return alert("X wins! Please restart to play again!");
        } else if (checkWinner() === "o") {
          return alert("O wins! Please restart to play again!");
        }
      }
    })
  }
  startGame();
})