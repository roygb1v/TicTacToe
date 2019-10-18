$(document).ready(function() {
  var x = "x";
  var o = "o";
  var count = 0;
  var o_win = 0;
  var x_win = 0;

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
    WINNING_TILES.forEach(function(row) {
      const validWin = row.every(piece => tiles.includes(piece));
      if (validWin && tileType === "x") {
        x_win += 1;
        $("#x_win").text(x_win);
        alert('X wins! Please restart to play again!');
        resetTiles();
        stopGame();
      } else if (validWin) {
        o_win += 1;
        $("#o_win").text(o_win);
        alert('O wins! Please restart to play again!');
        resetTiles();
        stopGame();
      }
    });
  }

  const stopGame = () => {
    $(".square").each(function(index) {
      $($(".square")[index]).off();
    })
  }

  const startGame = () => {
    $(".square").click(function() {
      if ($(this).hasClass("disable")) {
        alert("This is already selected!");
        return;
      }
  
      count += 1;
      if (count === 9) {
        alert("It's a tie!");
        resetTiles();
      };
  
      if (count % 2 === 0) {
        $(this).text(x);
        $(this).addClass("disable");
        X_winning_tiles.push($(this).attr('id'));
        checkWinningTiles(x);
      } else {
        $(this).text(o);
        $(this).addClass("disable");
        O_winning_tiles.push($(this).attr('id'));
        checkWinningTiles(o)
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
    startGame();
    count = 0;
  })

  startGame();
});