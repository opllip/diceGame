const dice = document.querySelector(".dice"); //주사위
//버튼들
const btnNews = document.querySelectorAll(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

const modal = document.querySelector(".modal"); //모달
//플레이어
let nowPlayer = document.querySelector(".player--active");
let nextPlayer = document.querySelector(".player:not(.player--active)");
let nowScoreEl = nowPlayer.querySelector(".score");
let nowScore = Number(nowScoreEl.innerText);
let currentScoreEl = nowPlayer.querySelector(".current-score");
let currentScore = Number(currentScoreEl.innerText);

//플레이어 고르기
const playerSelect = () => {
  nowPlayer = document.querySelector(".player--active");
  nextPlayer = document.querySelector(".player:not(.player--active)");
  nowScoreEl = nowPlayer.querySelector(".score");
  nowScore = Number(nowScoreEl.innerText);
  currentScoreEl = nowPlayer.querySelector(".current-score");
  currentScore = Number(currentScoreEl.innerText);
};

//새게임하기
const newGameHandler = () => {
  const scores = document.querySelectorAll(".score-reset");
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
  modal.classList.remove("show");
};

//모달 보여주기
const showModal = (name, resultScore) => {
  modal.classList.add("show");
  const msg = modal.querySelector(".modal-msg");
  msg.innerText = `게임 종료, \n${name}가 ${resultScore}점을 달성해 승리했습니다!`;
};

//주사위 눈 보이기
function showDots(number) {
  const dice = document.getElementById("dice");
  switch (number) {
    case 1:
      dice.querySelector(".one").style.display = "block";
      break;
    case 2:
      dice.querySelector(".two").style.display = "block";
      dice.querySelector(".five").style.display = "block";
      break;
    case 3:
      dice.querySelector(".one").style.display = "block";
      dice.querySelector(".two").style.display = "block";
      dice.querySelector(".five").style.display = "block";
      break;
    case 4:
      dice.querySelector(".two").style.display = "block";
      dice.querySelector(".three").style.display = "block";
      dice.querySelector(".four").style.display = "block";
      dice.querySelector(".five").style.display = "block";
      break;
    case 5:
      dice.querySelector(".one").style.display = "block";
      dice.querySelector(".two").style.display = "block";
      dice.querySelector(".three").style.display = "block";
      dice.querySelector(".four").style.display = "block";
      dice.querySelector(".five").style.display = "block";
      break;
    case 6:
      dice.querySelector(".two").style.display = "block";
      dice.querySelector(".three").style.display = "block";
      dice.querySelector(".four").style.display = "block";
      dice.querySelector(".five").style.display = "block";
      dice.querySelector(".six").style.display = "block";
      dice.querySelector(".seven").style.display = "block";
      break;
  }
}
//주사위 굴리기 기능
const rollDice = () => {
  const dice = document.getElementById("dice");
  const dots = dice.querySelectorAll(".dot");
  dots.forEach((dot) => (dot.style.display = "none"));

  const number = Math.floor(Math.random() * 6) + 1;
  dice.classList.add("rolling");
  setTimeout(() => {
    dice.classList.remove("rolling");
    showDots(number);
  }, 500);
  return number;
};
//주사위굴리기
const diceHandler = () => {
  const result = rollDice();
  //console.log(`주사위 결과: ${result}`);
  dice.src = `./assets/dice-${result}.png`;

  setTimeout(() => {
    if (result <= 2) {
      changePlayer();
    } else {
      playerSelect();
      const sum = currentScore + result;
      currentScoreEl.innerText = sum; //점수 합산

      //점수가 50 넘을 경우 게임종료
      if (nowScore + sum >= 50) {
        const resultScore = nowScore + sum;
        const nameEl = nowPlayer.querySelector(".name");
        const name = nameEl.innerText;

        console.log("nowScore : ", nowScore, " sum :", sum);
        nowScoreEl.innerText = resultScore;
        showModal(name, resultScore);
      }
    }
  }, 600);
};

// 턴넘기기
const changePlayer = () => {
  playerSelect();
  currentScoreEl.innerText = "0";
  nowPlayer.classList.remove("player--active");
  nextPlayer.classList.add("player--active");
};

//홀드이벤트
const holdHandler = () => {
  playerSelect();
  nowScoreEl.innerText = nowScore + currentScore;
  changePlayer();
};

//버튼 클릭 이벤트 주기
btnRoll.addEventListener("click", diceHandler);
btnHold.addEventListener("click", holdHandler);
btnNews.forEach(function (btnNew) {
  btnNew.addEventListener("click", newGameHandler);
});
