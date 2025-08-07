const dots = document.querySelectorAll('.page-dot');
const slides = document.querySelectorAll('.slide');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dot.classList.add('active');
  });
});

// Before/after handle drag functionality
document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
  const overlay = wrapper.querySelector('.overlay');
  const handle = wrapper.querySelector('.handle');

  let isDragging = false;

  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const rect = wrapper.getBoundingClientRect();
    let x = e.clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    overlay.style.width = `${x}px`;
    handle.style.left = `${x}px`;
  });
});
const filterButtons = document.querySelectorAll('.filter-buttons button');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Update button states
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter cards
    workCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

