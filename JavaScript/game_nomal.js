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
  modalIn();
}

//Memory game function

const cards = document.querySelectorAll(".memory_card");
cards.forEach((card) => card.addEventListener("click", flipCard));

//Card array

(function shuffle() {
  cards.forEach((card) => {
    let randomCards = Math.floor(Math.random() * 12);
    card.style.order = randomCards;
    console.log(randomCards);
  });
})();

//Flip function

let hasFlippedCard = false;
let lockBorard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBorard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

//Check matcing function

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }

  unflipCards();
}

//After matched

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  firstCard.style.visibility = "hidden";
  secondCard.style.visibility = "hidden";

  let count = $(".flip").length;
  if (count == 12) {
    $(".overlay_failed").remove();
    $(".modal_failed").remove();
    $(".modal_p_failed").remove();
    $(".close_btn_failed").remove();
    clearIn();
  }

  resetBoard();
}

//Not matched

function unflipCards() {
  lockBorard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

//Reset function

function resetBoard() {
  hasFlippedCard = false;
  lockBorard = false;
  firstCard = null;
  secondCard = null;
}

//Mordal function

// Clear form

function clearIn() {
  timeH.style.visibility = "hidden";
  $(".overlay, .modal").fadeIn();
  $(".close_btn").click(function () {
    history.go(-1);
  });
}

// Failed form

function modalIn() {
  timeH.style.visibility = "hidden";
  $(".overlay_failed, .modal_failed").fadeIn();
  $(".close_btn_failed").click(function () {
    history.go(-1);
  });
}
