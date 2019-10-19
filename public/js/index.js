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

  const checkWinningTiles = (typeOfWinningTile) => typeOfWinningTile === "x" ? winner(X_winning_tiles, x) : winner(O_winning_tiles, o);

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
    $(".square").removeClass("disable");
  }

  const winner = (tiles, tileType="x") => {
    let validWin;
    WINNING_TILES.forEach(function(row) {
      validWin = row.every(piece => tiles.includes(piece));
      if (validWin && tileType === "x") {
        $("#x_win").text(x_win += 1);
        currentWinner = "x";
        alert('X wins! Please restart to play again!');
        stopGame();
      } else if (validWin) {
        $("#o_win").text(o_win += 1);
        currentWinner = "o";
        alert('O wins! Please restart to play again!');
        stopGame();
      }
    });
    return currentWinner;
  }

  const stopGame = () => {
    $(".square").each(function(index) {
      $($(".square")[index]).off();
    })
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
        if (checkWinningTiles(x) === "x") return;
      } else {
        $(this).text(o);
        $(this).addClass("disable");
        O_winning_tiles.push($(this).attr('id'));
        if (checkWinningTiles(o) === "o") return;
      }

      // Check if board is full then check the current winner
      if (count === 9) {
        if (currentWinner === "+") {
          return alert("It is a tie!");
        }
      }
    })
  }

  $("#clear-board").click(function(e) {
    e.preventDefault();
    resetBoard();
    resetTiles();
    startGame();
    count = 0;
  });

  $("#reset-score").click(function(e) {
    e.preventDefault();
    resetScore();
    resetBoard();
    resetTiles();
    startGame();
    count = 0;
  })
  
  startGame();
});