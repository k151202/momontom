const today = document.querySelector(".js-date");

function getDate() {
  const date = new Date();
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const whatDay = dayOfWeek[date.getDay()];
  today.innerText = `${month}월 ${day}일 ${whatDay}요일`;
}

function init() {
  getDate();
}

init();
