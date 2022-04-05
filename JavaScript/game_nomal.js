//Timer function

const timeH = document.querySelector("h1");
let timesecond = 60;

displayTime(timesecond);

const countdown = setInterval(() => {
  timesecond--;
  displayTime(timesecond);
  if (timesecond <= 0 || timesecond < 1) {
    endtime();
    clearInterval(countdown);
  }
}, 1000);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function endtime() {
  timeH.innerHTML = "Time out";
}
