/**
 * מצבעת אדם — script.js
 * Refactored: vanilla JS, mobile hamburger, video autoplay fix,
 * comparison sliders, carousel, portfolio modal, work filter,
 * scroll header, service card quick-filter links.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. MOBILE NAV — Hamburger
     ============================================================ */
  const navToggle  = document.getElementById('nav-toggle');
  const mainNav    = document.getElementById('main-nav');
  const navOverlay = document.getElementById('nav-overlay');

  if (navToggle && mainNav) {
    const openNav = () => {
      mainNav.classList.add('open');
      navOverlay && navOverlay.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
      mainNav.classList.remove('open');
      navOverlay && navOverlay.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', () => {
      mainNav.classList.contains('open') ? closeNav() : openNav();
    });

    navOverlay && navOverlay.addEventListener('click', closeNav);

    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) closeNav();
    });
  }


  /* ============================================================
     2. SCROLL HEADER — add .scrolled class
     ============================================================ */
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const onScroll = () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }


  /* ============================================================
     3. VIDEO AUTOPLAY — iOS / Safari fix
     ============================================================ */
  document.querySelectorAll('video').forEach(v => {
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {
          // Retry on first user interaction
          const resume = () => {
            v.play().catch(() => {});
            window.removeEventListener('touchstart', resume);
            window.removeEventListener('click', resume);
          };
          window.addEventListener('touchstart', resume, { once: true, passive: true });
          window.addEventListener('click', resume, { once: true });
        });
      }
    };

    tryPlay();
    setTimeout(tryPlay, 1200);
  });


  /* ============================================================
     4. WORK CARD FILTER
     ============================================================ */
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const workCards     = document.querySelectorAll('.work-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      workCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        // Subtle fade-in animation
        if (show) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeUp .3s ease both';
          });
        }
      });
    });
  });

  // Service card "ראה עבודות" links — scroll to gallery and apply filter
  document.querySelectorAll('.service-link[data-filter-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('data-filter-target');
      const gallerySection = document.getElementById('all-works');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
        // Apply filter after scroll
        setTimeout(() => {
          const btn = document.querySelector(`.filter-buttons button[data-filter="${target}"]`);
          if (btn) btn.click();
        }, 600);
      }
    });
  });


  /* ============================================================
     5. PROJECT MODAL
     ============================================================ */
  (() => {
    const modal   = document.getElementById('workModal');
    if (!modal) return;

    const titleEl = modal.querySelector('.work-modal__title');
    const descEl  = modal.querySelector('.work-modal__desc');
    const imgEl   = modal.querySelector('.work-modal__image');
    const thumbs  = modal.querySelector('.work-modal__thumbs');
    const prevBtn = modal.querySelector('.nav.prev');
    const nextBtn = modal.querySelector('.nav.next');
    const closeEls = modal.querySelectorAll('[data-close]');

    let current = { images: [], index: 0 };

    function openModal({ title, desc, images }) {
      current.images = images;
      current.index  = 0;
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
      imgEl.src = current.images[current.index];
      imgEl.alt = titleEl.textContent || 'תמונה';
      [...thumbs.children].forEach((t, i) => {
        t.classList.toggle('active', i === current.index);
      });
    }

    function buildThumbs() {
      thumbs.innerHTML = '';
      current.images.forEach((src, i) => {
        const t = document.createElement('img');
        t.src = src.trim();
        t.alt = 'תצוגה מקדימה';
        if (i === 0) t.classList.add('active');
        t.addEventListener('click', () => { current.index = i; renderImage(); });
        thumbs.appendChild(t);
      });
    }

    const next = () => { current.index = (current.index + 1) % current.images.length; renderImage(); };
    const prev = () => { current.index = (current.index - 1 + current.images.length) % current.images.length; renderImage(); };

    // Open on card click or keyboard Enter/Space
    document.querySelectorAll('.work-card').forEach(card => {
      const handleOpen = () => {
        const title  = card.getAttribute('data-title') || card.querySelector('p')?.textContent || '';
        const desc   = card.getAttribute('data-desc')  || '';
        const imgs   = (card.getAttribute('data-images') || '')
                         .split(',').map(s => s.trim()).filter(Boolean);
        if (!imgs.length) {
          const fallback = card.querySelector('img')?.src;
          if (fallback) imgs.push(fallback);
        }
        if (imgs.length) openModal({ title, desc, images: imgs });
      };
      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); }
      });
    });

    nextBtn && nextBtn.addEventListener('click', next);
    prevBtn && prevBtn.addEventListener('click', prev);
    closeEls.forEach(el => el.addEventListener('click', closeModal));
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    window.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape')     closeModal();
      if (e.key === 'ArrowRight') prev(); // RTL: right = prev
      if (e.key === 'ArrowLeft')  next();
    });
  })();


  /* ============================================================
     6. COMPARISON SLIDERS (jQuery-based)
     ============================================================ */
  if (typeof $ !== 'undefined') {
    $(function () {
      const $sliders = $('.comparison-slider');
      if (!$sliders.length) return;

      $sliders.each(function () {
        const $slider  = $(this);
        const $resize  = $slider.find('.resize');
        const $divider = $slider.find('.divider');

        const setImgWidth = () => {
          const w = $slider.width() + 'px';
          $resize.find('img').css({ width: w });
        };
        setImgWidth();

        requestAnimationFrame(() => {
          $resize.css('width', '50%');
          $divider.css('left', '50%');
        });

        drags($divider, $resize, $slider);
      });

      $(window).on('resize orientationchange', function () {
        $('.comparison-slider').each(function () {
          const $s = $(this);
          $s.find('.resize img').css({ width: $s.width() + 'px' });
          $s.find('.resize').css('width', '50%');
          $s.find('.divider').css('left', '50%');
        });
      });
    });
  }


  /* ============================================================
     7. BEFORE/AFTER CAROUSEL
     ============================================================ */
  (() => {
    const slides  = Array.from(document.querySelectorAll('.carousel-container .slide'));
    const dots    = Array.from(document.querySelectorAll('.pagination .page-dot'));
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');

    if (!slides.length) return;

    let current = 0;

    function recenterSlide(slideEl) {
      const slider  = slideEl.querySelector('.comparison-slider');
      if (!slider) return;
      const resize  = slider.querySelector('.resize');
      const divider = slider.querySelector('.divider');
      const img     = resize && resize.querySelector('img');
      if (img) img.style.width = slider.clientWidth + 'px';
      if (resize)  resize.style.width  = '50%';
      if (divider) divider.style.left  = '50%';
    }

    function show(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;

      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => { d.classList.remove('active'); d.setAttribute('aria-selected', 'false'); });

      slides[current].classList.add('active');
      if (dots[current]) {
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-selected', 'true');
      }

      requestAnimationFrame(() => recenterSlide(slides[current]));
    }

    dots.forEach(d => {
      d.addEventListener('click', () => show(parseInt(d.dataset.index, 10)));
    });

    prevBtn && prevBtn.addEventListener('click', () => show(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => show(current + 1));

    window.addEventListener('resize', () => recenterSlide(slides[current]));

    // Swipe support for carousel
    let touchStartX = 0;
    const container = document.querySelector('.carousel-container');
    if (container) {
      container.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      container.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) show(dx > 0 ? current - 1 : current + 1);
      }, { passive: true });
    }

    show(0);
  })();

}); // end DOMContentLoaded


/* ============================================================
   8. COMPARISON SLIDER DRAG HELPER (jQuery)
   ============================================================ */
function drags(dragElement, resizeElement, container) {
  let touched = false;
  window.addEventListener('touchstart', () => touched = true,  { passive: true });
  window.addEventListener('touchend',   () => touched = false, { passive: true });

  dragElement.on('mousedown touchstart', function (e) {
    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');

    const pageX       = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
    const dragWidth   = dragElement.outerWidth();
    const posX        = dragElement.offset().left + dragWidth - pageX;
    const containerOffset = container.offset().left;
    const containerWidth  = container.outerWidth();
    const minLeft     = containerOffset + 10;
    const maxLeft     = containerOffset + containerWidth - dragWidth - 10;

    dragElement.parents().on('mousemove touchmove', function (e) {
      if (!touched) e.preventDefault();

      const moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
      let leftValue = moveX + posX - dragWidth;

      if (leftValue < minLeft) leftValue = minLeft;
      else if (leftValue > maxLeft) leftValue = maxLeft;

      const widthValue = ((leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth) + '%';

      $('.draggable')
        .css('left', widthValue)
        .on('mouseup touchend touchcancel', function () {
          $(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });

      $('.resizable').css('width', widthValue);

    }).on('mouseup touchend touchcancel', function () {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });

  }).on('mouseup touchend touchcancel', function () {
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}