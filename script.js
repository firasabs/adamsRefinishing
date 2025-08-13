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

// Before/after handle drag functionality with polish
document.querySelectorAll('.slider-wrapper').forEach((wrapper, idx) => {
  const overlay = wrapper.querySelector('.overlay');
  const handle = wrapper.querySelector('.handle');

  let isDragging = false;

  // one-time hint on the first slider only
  if (idx === 0) {
    wrapper.classList.add('hint');
    setTimeout(() => wrapper.classList.remove('hint'), 2000);
  }

  const setX = (clientX) => {
    const rect = wrapper.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    overlay.style.width = `${x}px`;
    handle.style.left = `${x}px`;
  };

  // mouse
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    wrapper.classList.add('dragging');
    e.preventDefault();
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');

    // snap to neat positions (40%, 50%, 60%) on release
    const rect = wrapper.getBoundingClientRect();
    const x = parseFloat(handle.style.left || '50%') / 100 * rect.width || parseFloat(handle.style.left);
    const pct = x / rect.width;
    const targets = [0.4, 0.5, 0.6];
    const nearest = targets.reduce((a,b)=> Math.abs(b-pct) < Math.abs(a-pct) ? b : a, targets[0]);
    overlay.style.width = `${nearest*rect.width}px`;
    handle.style.left = `${nearest*rect.width}px`;
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setX(e.clientX);
  });

  // touch
  handle.addEventListener('touchstart', (e) => {
    isDragging = true;
    wrapper.classList.add('dragging');
  }, {passive:true});
  window.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');
  }, {passive:true});
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setX(e.touches[0].clientX);
  }, {passive:true});

  // keyboard support when focused (accessibility)
  handle.setAttribute('tabindex', '0');
  handle.addEventListener('keydown', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const cur = parseFloat(overlay.style.width) || rect.width/2;
    const step = rect.width * 0.08; // 8%
    if (e.key === 'ArrowRight') {
      overlay.style.width = `${Math.min(rect.width, cur + step)}px`;
      handle.style.left = overlay.style.width;
    } else if (e.key === 'ArrowLeft') {
      overlay.style.width = `${Math.max(0, cur - step)}px`;
      handle.style.left = overlay.style.width;
    }
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
// ---------- PROJECT MODAL ----------
(() => {
  const modal = document.getElementById('workModal');
  const titleEl = modal.querySelector('.work-modal__title');
  const descEl  = modal.querySelector('.work-modal__desc');
  const imgEl   = modal.querySelector('.work-modal__image');
  const thumbs  = modal.querySelector('.work-modal__thumbs');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  const closeEls = modal.querySelectorAll('[data-close]');

  let current = { images: [], index: 0 };

  function openModal({ title, desc, images }) {
    current.images = images;
    current.index = 0;

    titleEl.textContent = title || '';
    descEl.textContent  = desc  || '';

    buildThumbs();
    renderImage();

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderImage() {
    const src = current.images[current.index];
    imgEl.src = src;
    imgEl.alt = titleEl.textContent || 'תמונה';

    // update thumbs active state
    [...thumbs.children].forEach((t, i) => {
      t.classList.toggle('active', i === current.index);
    });
  }

  function buildThumbs() {
    thumbs.innerHTML = '';
    current.images.forEach((src, i) => {
      const t = document.createElement('img');
      t.src = src;
      t.alt = 'תצוגה מקדימה';
      if (i === current.index) t.classList.add('active');
      t.addEventListener('click', () => {
        current.index = i;
        renderImage();
      });
      thumbs.appendChild(t);
    });
  }

  function next() {
    current.index = (current.index + 1) % current.images.length;
    renderImage();
  }
  function prev() {
    current.index = (current.index - 1 + current.images.length) % current.images.length;
    renderImage();
  }

  // Attach to cards
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      // read data from the card
      const title  = card.getAttribute('data-title') || card.querySelector('p')?.textContent || '';
      const desc   = card.getAttribute('data-desc')  || '';
      const imgs   = (card.getAttribute('data-images') || '')
                      .split(',')
                      .map(s => s.trim())
                      .filter(Boolean);

      // Fallback: if no data-images, use the main image only
      if (imgs.length === 0) {
        const mainImg = card.querySelector('img')?.getAttribute('src');
        if (mainImg) imgs.push(mainImg);
      }

      openModal({ title, desc, images: imgs });
    });
  });

  // Controls
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // Close (X / backdrop)
  closeEls.forEach(el => el.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });
})();
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

