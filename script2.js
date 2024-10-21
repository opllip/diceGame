const dice = document.querySelector(".dice"); //주사위
//버튼들
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

//주사위 굴리기 기능
function rollDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  return diceValue;
}

//새게임하기
const newGameHandler = () => {
  //console.log("새게임시작");
  const scores = document.querySelectorAll(".score");
  const currentScores = document.querySelectorAll(".current-score");
  const players = document.querySelectorAll(".player");

  players.forEach(function (player, index) {
    player.classList.remove("player--active");
    if (index === 0) {
      player.classList.add("player--active");
    }
  });
  scores.forEach(function (scoreEl) {
    scoreEl.innerText = "0";
  });
  currentScores.forEach(function (scoreEl) {
    scoreEl.innerText = "0";
  });
};

//주사위굴리기
const diceHandler = () => {
  const nowPlayer = document.querySelector(".player--active");
  const nextPlayer = document.querySelector(".player:not(.player--active)");
  const nowScoreEl = nowPlayer.querySelector(".score");
  const nowScore = Number(nowScoreEl.innerText);
  const currentScoreEl = nowPlayer.querySelector(".current-score");
  const currentScore = Number(currentScoreEl.innerText);

  const result = rollDice();
  console.log(`주사위 결과: ${result}`);
  dice.src = `./assets/dice-${result}.png`;

  if (result <= 2) {
    //현재점수 초기화, 순서변경
    currentScoreEl.innerText = "0";
    nowPlayer.classList.remove("player--active");
    nextPlayer.classList.add("player--active");
  } else {
    const sum = currentScore + result;
    currentScoreEl.innerText = sum; //점수 합산
    //점수가 50 넘을 경우 게임종료
    if (nowScore + sum >= 50) {
      const nameEl = nowPlayer.querySelector(".name");
      const name = nameEl.innerText;
      alert(`게임 종료, ${name}의 승리입니다.`);
      newGameHandler();
    }
  }
};

//홀드, 턴넘기기
const holdHandler = () => {
  const nowPlayer = document.querySelector(".player--active");
  const nextPlayer = document.querySelector(".player:not(.player--active)");
  const nowScoreEl = nowPlayer.querySelector(".score");
  const nowScore = Number(nowScoreEl.innerText);
  const currentScoreEl = nowPlayer.querySelector(".current-score");
  const currentScore = Number(currentScoreEl.innerText);

  nowScoreEl.innerText = nowScore + currentScore;
  currentScoreEl.innerText = "0";

  nowPlayer.classList.remove("player--active");
  nextPlayer.classList.add("player--active");
};

//버튼 클릭 이벤트 주기
btnNew.addEventListener("click", newGameHandler);
btnRoll.addEventListener("click", diceHandler);
btnHold.addEventListener("click", holdHandler);
