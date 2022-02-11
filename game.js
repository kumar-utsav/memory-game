let cards = [...document.querySelectorAll('.card')];

cards = shuffle(cards);

let firstCard, secondCard;

const wrapper = document.querySelector('.wrapper');

wrapper.innerHTML = null;

cards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const target = event.target;
    const parent = target['parentElement'];

    handleCardClick(parent);
  });

  wrapper.appendChild(card);
});

function handleCardClick(card) {
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

  toggleClickClasses(secondCard);

  const firstCardValue = firstCard.dataset.value;
  const secondCardValue = secondCard.dataset.value;

  if (firstCardValue === secondCardValue) {
    handleMatch();
  } else {
    handleNoMatch();
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
