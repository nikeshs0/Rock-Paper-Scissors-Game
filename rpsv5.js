let score = JSON.parse(localStorage.getItem("score")) || {
  lose: 0,
  win: 0,
  tie: 0,
};
let disp = document.querySelector(".dispscr");
let res = document.querySelector(".resultp");
let cmov = document.querySelector(".cmove");
let umov = document.querySelector(".umove");

updateScore();

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "r") playGame("Rock");
  if (e.key.toLowerCase() === "p") playGame("Paper");
  if (e.key.toLowerCase() === "s") playGame("Scissors");
});

function playGame(playerMov) {
  const compMov = pickComputerMove();
  let result = "";
  if (compMov === playerMov) {
    result = "Tie";
  } else if (
    (compMov == "Rock" && playerMov == "Paper") ||
    (compMov == "Paper" && playerMov == "Scissors") ||
    (compMov == "Scissors" && playerMov == "Rock")
  ) {
    result = "You win";
  } else {
    result = "You Lose";
  }
  if (result == "You Lose") {
    score.lose += 1;
  } else if (result == "You win") {
    score.win += 1;
  } else {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateResult(result);
  // res.innerHTML = result;

  if (compMov == "Scissors") {
    cmov.innerHTML = `<img src="./img/scissor.gif"/>`;
  } else if (compMov == "Rock") {
    cmov.innerHTML = `<img src="./img/stone.gif"/>`;
  } else {
    cmov.innerHTML = `<img src="./img/paper.gif"/>`;
  }

  if (playerMov == "Scissors") {
    umov.innerHTML = `<img src="./img/scissor.gif"/>`;
  } else if (playerMov == "Rock") {
    umov.innerHTML = `<img src="./img/stone.gif"/>`;
  } else {
    umov.innerHTML = `<img src="./img/paper.gif"/>`;
  }
  updateScore();
}
function updateResult(result) {
  if (result == "You win") {
    res.innerHTML = `<img src="./img/Win.gif" alt="">`;
  } else if (result == "You Lose") {
    res.innerHTML = `<img src="./img/lose.gif" alt="">`;
  } else {
    res.innerHTML = `<img src="./img/Drawn.gif" alt="">`;
  }
}

function pickComputerMove() {
  const randnum = Math.random();
  let compMov = "";
  if (randnum > 0 && randnum <= 1 / 3) {
    compMov = "Rock";
  } else if (randnum > 1 / 3 && randnum <= 2 / 3) {
    compMov = "Paper";
  } else {
    compMov = "Scissors";
  }
  return compMov;
}

function updateScore() {
  disp.innerHTML = `Total wins:${score.win} Total Losses:${score.lose} Total ties:${score.tie}`;
}

function resetScore() {
  score.lose = 0;
  score.win = 0;
  score.tie = 0;
  localStorage.removeItem("score");
  res.innerHTML = `Play game to see result`;
  cmov.innerHTML = `<img src="./img/rpsbacground.gif" alt="" />`;
  umov.innerHTML = `<img src="./img/rpsbacground.gif" alt="" />`;
  updateScore();
}
