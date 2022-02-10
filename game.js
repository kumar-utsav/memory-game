const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const target = event.target;
    const parent = target['parentElement'];

    handleCardClick(parent);
  });
});

function handleCardClick(card) {
  card.style.transform = 'rotateY(180deg)';
}
