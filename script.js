document.getElementById('play-sound').addEventListener('click', () => {
  const sound = new Audio('./sounds/sound.mp3');
  sound.play().catch(err => console.error('SOUND FAILURE> BAD:', err));
});

const card = document.getElementById('card');

card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});