// Remove this section as it is for the old, custom slider.
// document.querySelectorAll('.slider-wrapper').forEach((wrapper, idx) => { ... });


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
// init comparison sliders (jQuery)
$(function () {
  const $sliders = $(".comparison-slider");
  if (!$sliders.length) return;

  // init each slider
  $sliders.each(function () {
    const $slider = $(this);
    const $resize = $slider.find(".resize");
    const $divider = $slider.find(".divider");

    // set the top image width to match container width
    const setWidths = () => {
      const w = $slider.width() + "px";
      $resize.find("img").css({ width: w });
    };
    setWidths();

    // center on first paint
    requestAnimationFrame(() => {
      $resize.css("width", "50%");
      $divider.css("left", "50%");
    });

    // drag behavior
    drags($divider, $resize, $slider);
  });

  // update on resize/orientation
  $(window).on("resize", function () {
    $(".comparison-slider").each(function () {
      const $slider = $(this);
      const $resize = $slider.find(".resize");
      const w = $slider.width() + "px";
      $resize.find("img").css({ width: w });
      // keep divider centered after resize
      $resize.css("width", "50%");
      $slider.find(".divider").css("left", "50%");
    });
  });
});

// unchanged helper from your example
function drags(dragElement, resizeElement, container) {
  let touched = false;
  window.addEventListener('touchstart', () => touched = true);
  window.addEventListener('touchend',   () => touched = false);

  dragElement.on("mousedown touchstart", function (e) {
    dragElement.addClass("draggable");
    resizeElement.addClass("resizable");

    const pageX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
    const dragWidth = dragElement.outerWidth();
    const posX = dragElement.offset().left + dragWidth - pageX;
    const containerOffset = container.offset().left;
    const containerWidth = container.outerWidth();
    const minLeft = containerOffset + 10;
    const maxLeft = containerOffset + containerWidth - dragWidth - 10;

    dragElement.parents().on("mousemove touchmove", function (e) {
      if (!touched) e.preventDefault();

      const moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
      let leftValue = moveX + posX - dragWidth;

      if (leftValue < minLeft) leftValue = minLeft;
      else if (leftValue > maxLeft) leftValue = maxLeft;

      const widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";

      $(".draggable")
        .css("left", widthValue)
        .on("mouseup touchend touchcancel", function () {
          $(this).removeClass("draggable");
          resizeElement.removeClass("resizable");
        });

      $(".resizable").css("width", widthValue);
    }).on("mouseup touchend touchcancel", function () {
      dragElement.removeClass("draggable");
      resizeElement.removeClass("resizable");
    });
  }).on("mouseup touchend touchcancel", function () {
    dragElement.removeClass("draggable");
    resizeElement.removeClass("resizable");
  });
}
// ----- Carousel around comparison sliders -----
(function() {
  const slides = Array.from(document.querySelectorAll('.carousel-container .slide'));
  const dots   = Array.from(document.querySelectorAll('.pagination .page-dot'));
  const prev   = document.querySelector('.carousel-controls .prev');
  const next   = document.querySelector('.carousel-controls .next');

  if (!slides.length) return;

  let current = 0;

  function recenterSlide(slideEl) {
    const slider = slideEl.querySelector('.comparison-slider');
    if (!slider) return;
    const resize = slider.querySelector('.resize');
    const divider = slider.querySelector('.divider');

    // match top image width to container (same logic as init)
    const w = slider.clientWidth + 'px';
    const imgTop = resize.querySelector('img');
    if (imgTop) imgTop.style.width = w;

    // center the split
    resize.style.width = '50%';
    divider.style.left = '50%';
  }

  function show(index) {
    // clamp/loop
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    const active = slides[current];
    active.classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    // give the browser a tick to layout, then recenter
    requestAnimationFrame(() => recenterSlide(active));
  }

  // dot clicks
  dots.forEach(d => {
    d.addEventListener('click', () => show(parseInt(d.dataset.index, 10)));
  });

  // arrows
  if (prev) prev.addEventListener('click', () => show(current - 1));
  if (next) next.addEventListener('click', () => show(current + 1));

  // keyboard (when gallery is in view)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // keep centered on resize/orientation
  window.addEventListener('resize', () => recenterSlide(slides[current]));

  // initial
  show(current);
})();
