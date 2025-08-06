const sliderContainer = document.querySelector('.slider-container');
const overlay = document.querySelector('.overlay');
const handle = document.querySelector('.handle');

let isDragging = false;

handle.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const rect = sliderContainer.getBoundingClientRect();
  let x = e.clientX - rect.left;

  // Clamp to container boundaries
  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  overlay.style.width = `${x}px`;
  handle.style.left = `${x}px`;
});
