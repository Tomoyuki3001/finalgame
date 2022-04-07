//Timer function

const timeH = document.querySelector("h1");
let timesecond = 30;

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
  timeH.innerHTML = `Time : ${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
}

// To show up time up modal function
function endtime() {
  //This function is to call the time up modal.
  timeH.innerHTML = "Time out";
  modalIn();
}

//Memory game function

//This function adds some functions to each cards.
const cards = document.querySelectorAll(".memory_card");
cards.forEach((card) => card.addEventListener("click", flipCard));

//Card array

(function shuffle() {
  cards.forEach((card) => {
    let randomCards = Math.floor(Math.random() * 6);
    card.style.order = randomCards;
    console.log(randomCards);
  });
})();

//Flip function

let hasFlippedCard = false;
let lockBorard = false;
let firstCard, secondCard;

function flipCard() {
  //This function adds "flip" tags to each cards.
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
  //This function recognigeds each cards with the "flip" tags.
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

  // To show up clear modal function.
  //Here counts "flip"tags and check whole tags amounts.
  let count = $(".flip").length;
  if (count == 6) {
    //Then, if the "flip" tags and caeds array were same, the clear modal will show up.
    clearIn();
  }
  resetBoard();
}

//Not matched

function unflipCards() {
  lockBorard = true;

  //This function removes each "flip" tags from each cards.
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 800);
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
  $(".modal_failed, .overlay_failed").remove();
  $(".overlay, .modal").fadeIn();
}

// Time up form

function modalIn() {
  timeH.style.visibility = "hidden";
  $(".overlay_failed, .modal_failed").fadeIn();
}
