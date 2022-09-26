require('./style.css');

const welcomeContainer = document.querySelector("#welcomeContainer");
const startBtn = document.querySelector("#welcomeContainer button");
const numberCreated = document.querySelector("#numberCreated");
const answerInput = document.querySelector("#answerInput");
const inputNum = document.querySelector("#answerInput input");
const btn = document.querySelector("#answerInput button");
const pastTryContainer = document.querySelector("#pastTryContainer");
const newTryBtn = document.querySelector("#newTryBtnContainer button");
const message = document.querySelector("#message");

const HIDDEN = 'hidden';

let count = 10; // count가 0이 되면 사용자의 패배임
let strike = 0; // 표시할 스트라이크;
let ball = 0; // 표시할 볼;
let number = []; // 난수를 저장할 배열;
/** 버튼을 클릭했을 때, 난수를 생성하는 함수 */
function answerMaker() {
  /*난수 생성 함수
  난수를 생성해서 number에 요소 하나하나로 넣어줌
  넣어준 요소를 하나하나 answer에도 더해줌 <-- 사실 난수를 보여줄 필요는 없으므로 이 부분을 수정. answer 삭제*/

  number[0] = Math.floor(Math.random() * 10);
  do {
    number[1] = Math.floor(Math.random() * 10);
  } while (number[1] === number[0]);
  do {
    number[2] = Math.floor(Math.random() * 10);
  } while (number[2] === number[0] || number[2] === number[1]);
  console.log(number);
  answerInput.classList.remove(HIDDEN);
  numberCreated.classList.remove(HIDDEN);
  welcomeContainer.classList.add(HIDDEN);
}

startBtn.addEventListener("click", answerMaker); // 난수 생성

/** input에 숫자를 입력하고 제출하는 함수 */
function handleSubmit(event) {
  /* 정답 입력 버튼 함수
  input에 적은 숫자를 밑에 쭉 나열
  숫자를 입력받아 문자열로 변환해줌 */
  event.preventDefault(); // 버튼 클릭하면 초기화되는거 방지
  const stringNum = String(inputNum.value); // input에 입력한 값을 문자열로 전환해줌
  let inputArr = []; // number와 입력 숫자를 비교하기 위한 배열
  inputNum.value = ""; // 입력칸 다시 초기화
  count--; // 남은 횟수를 감소시킴
  strike = 0;
  ball = 0; // 스트라이크가 한꺼번에 나오지 않는 이상 게임을 이긴 것이 아니므로 볼과 스트라이크를 초기화.
  for (let i = 0; i < number.length; i++) {
    inputArr[i] = Number(stringNum[i]); // number와 inputArr를 비교하기 위해서 inputArr에 입력값들을 요소로 하나하나 넣어줌
  }
  for (let n = 0; n < 3; n++) {
    for (let i = 0; i < 3; i++) {
      if (number[n] === inputArr[i]) {
        if (n === i) {
          strike++;
        } else {
          ball++;
        }
        break;
      }
    }
  }
  const tries = document.createElement("div");
  tries.classList.add('triesContainer')
  const pastTry = document.createElement('div');
  pastTry.classList.add("pastTry");
  pastTry.textContent = `${inputArr[0]}, ${inputArr[1]}, ${inputArr[2]} `; //div 의 컨텐츠로 과거 시도를 넣어줌
  const report = document.createElement("div");
  report.classList.add("report");
  report.innerText = `${strike} 스트라이크, ${ball} 볼, 남은횟수: ${count}`;
  tries.appendChild(pastTry);
  tries.appendChild(report);
  pastTryContainer.appendChild(tries);
  if (strike === 3) {
    message.innerText = `축하합니다! ${Math.abs(
      count - 10
    )}번 만에 성공했습니다!😀`;
    btn.disabled = true;
    inputNum.disabled = true;
    newTryBtn.classList.remove(HIDDEN);
  }
  if (count === 0 && strike !== 3) {
    message.innerText = `다음에 다시 도전하세요! 답 = ${number.join(
      ""
    )}`;
    btn.disabled = true;
    inputNum.disabled = true;
    newTryBtn.classList.remove(HIDDEN);
    newTryBtn.innerText = '재도전 ㄱ?'
  }
}

answerInput.addEventListener("submit", handleSubmit); // 답 입력


function handleNewTryBtn() {
    location.reload();
}

newTryBtn.addEventListener('click', handleNewTryBtn)