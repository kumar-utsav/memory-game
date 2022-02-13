let cards = [...document.querySelectorAll('.card')];
let timer = -1;

let firstCard,
  secondCard,
  moves = 0;

const deck = document.querySelector('.deck');

const mins = document.querySelector('.mins');

const secs = document.querySelector('.secs');

const resetButton = document.querySelector('.fa-redo');

resetButton.addEventListener('click', reset);

function setupDeck() {
  deck.innerHTML = null;

  cards = shuffle(cards);

  cards.forEach((card) => {
    card.className = 'card';

    card.querySelector('.front').className = 'front';

    const backEle = card.querySelector('.back');

    backEle.classList.remove('pulse');
    backEle.classList.remove('rubberBand');
    backEle.classList.remove('background--red');
    backEle.classList.remove('background--green');

    card.addEventListener('click', (event) => {
      const target = event.target;
      const parent = target['parentElement'];

      handleCardClick(parent);
    });

    deck.appendChild(card);
  });
}

function handleCardClick(card) {
  if (timer === -1) {
    startTimer();
  }

  if (card.classList.contains('clicked')) {
    return;
  }

  if (!firstCard) {
    firstCard = card;

    toggleClickClasses(firstCard);

    return;
  }

  if (secondCard) {
    return;
  }

  secondCard = card;

  setMoveCount();

  toggleClickClasses(secondCard);

  const firstCardValue = firstCard.dataset.value;
  const secondCardValue = secondCard.dataset.value;

  if (firstCardValue === secondCardValue) {
    handleMatch();
  } else {
    handleNoMatch();
  }

  if (document.querySelectorAll('.clicked').length === 16) {
    stopTimer();
  }
}

function handleMatch() {
  toggleBackgroundColor(firstCard, 'background--green');
  toggleBackgroundColor(secondCard, 'background--green');

  togglePulseEffect(firstCard);
  togglePulseEffect(secondCard);

  firstCard = null;
  secondCard = null;
}

function handleNoMatch() {
  toggleBackgroundColor(firstCard, 'background--red');
  toggleBackgroundColor(secondCard, 'background--red');

  toggleRubberBandEffect(firstCard);
  toggleRubberBandEffect(secondCard);

  setTimeout(() => {
    resetCardsOnNoMatch();
  }, 1000);
}

function toggleClickClasses(card) {
  card.classList.toggle('flip');
  card.classList.toggle('clicked');
}

function toggleRubberBandEffect(card) {
  card.classList.toggle('rubberBand');
  card.querySelector('.back').classList.toggle('rubberBand');
  card.querySelector('.front').classList.toggle('rubberBand');
}

function togglePulseEffect(card) {
  card.classList.toggle('pulse');
  card.querySelector('.back').classList.toggle('pulse');
  card.querySelector('.front').classList.toggle('pulse');
}

function toggleBackgroundColor(card, color) {
  card.querySelector('.back').classList.toggle(color);
}

function resetCardsOnNoMatch() {
  toggleClickClasses(firstCard);
  toggleClickClasses(secondCard);

  toggleRubberBandEffect(firstCard);
  toggleRubberBandEffect(secondCard);

  toggleBackgroundColor(firstCard, 'background--red');
  toggleBackgroundColor(secondCard, 'background--red');

  firstCard = null;
  secondCard = null;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function setMoveCount(reset) {
  moves = reset ? 0 : moves + 1;
  document.querySelector('.moves').innerHTML = `${moves} Move(s)`;
}

function startTimer() {
  let minsCounter = 0;
  let secsCounter = 0;

  timer = setInterval(() => {
    if (secsCounter === 60) {
      secsCounter = 0;
      mins.innerHTML = `${++minsCounter} Mins`;
    }

    secs.innerHTML = `${++secsCounter} Secs`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function reset() {
  firstCard = null;
  secondCard = null;

  setupDeck();

  setMoveCount(true);

  clearInterval(timer);
  timer = -1;
  mins.innerHTML = `0 Mins`;
  secs.innerHTML = `0 Secs`;
}

setupDeck();
