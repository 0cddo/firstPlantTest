const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const startBtn = document.querySelector("#btn-start");
const endPoint = 9;

const select = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult() {
  let result = select.indexOf(Math.max(...select));
  return result;
}
function setResult() {
  let point = calResult(); // 결과물 내용 변수
  const resultName = document.querySelector(".result-name");
  resultName.innerHTML = infoList[point].name;

  //   result img만들기
  let resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#result-img");
  let imgURL = `img/image-${point}.png`;
  resultImg.src = imgURL;
  resultImg.alt = point;
  imgDiv.appendChild(resultImg);

  //   result 설명
  const resultDesc = document.querySelector(".result-desc");
  resultDesc.innerHTML = infoList[point].desc;
}
function resultPage() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    // result 켜짐
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  setResult();
}

function answerBtns(answerTxt, qIdx, idx) {
  let answer = document.querySelector(".answer");
  let aBtn = document.createElement("button");
  aBtn.classList.add("btnList");
  answer.appendChild(aBtn);
  aBtn.innerHTML = answerTxt;

  aBtn.addEventListener("click", function () {
    let children = document.querySelectorAll(".btnList");
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      let target = qnaList[qIdx].a[idx].type;
      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
      }
      // 반복문 종료 후 다음페이지로 넘어가게 함
      nextQna(++qIdx);
    }, 450);
  });
}
function nextQna(qIdx) {
  if (qIdx === endPoint) {
    resultPage();
    return;
  }
  let qnaBox = document.querySelector(".qna-box");
  let qna = document.querySelector(".qna");
  qna.innerHTML = qnaList[qIdx].q;

  //   답변 버튼
  for (let i in qnaList[qIdx].a) {
    // 답변 버튼 출력
    answerBtns(qnaList[qIdx].a[i].answer, qIdx, i);
    //    진행 상태바 추가
    let status = document.querySelector(".status-bar");
    status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
  }
}

startBtn.addEventListener("click", () => {
  // main 꺼짐
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    // qna 켜짐
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      // main화면 다 꺼지고 qna 등장
      qna.style.display = "block";
    }, 450);
    let qIdx = 0;
    //   질문 실행
    nextQna(qIdx);
  }, 450);
});
// for (let i in qnaList) console.log(i, qnaList[i]);

// 메인 페이지
// 스타트 버튼 누르고 질문 페이지 넘어가기
// 질문 페이지
// 질문 뿌려주기
// 답변 버튼 뿌려주기
// 답변 버튼 누르고 다음 질문으로 넘어가기
// 질문 9번까지 마무리
// 질문 끝나고 결과 페이지 출력
// 결과 페이지 공유하기 버튼
