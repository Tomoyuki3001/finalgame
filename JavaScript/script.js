const cards = document.querySelectorAll(".memory_card");
cards.forEach((card) => card.addEventListener("click", flipCard));

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

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBorard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBorard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffle() {
  cards.forEach((card) => {
    let randomCards = Math.floor(Math.random() * 12);
    card.style.order = randomCards;
  });
})();
