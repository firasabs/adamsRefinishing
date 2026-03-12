/**
 * מצבעת אדם — script.js
 * Single clean version. No duplicates.
 * Sections:
 *   1. I18N dictionary + engine
 *   2. DOMContentLoaded bootstrap
 *      a. Mobile nav / hamburger
 *      b. Scroll header
 *      c. Video autoplay fix
 *      d. Work card filter
 *      e. Service-link quick-filter
 *      f. Project modal
 *      g. Comparison sliders (jQuery)
 *      h. Before/After carousel
 *      i. Language toggle
 *   3. drags() — jQuery comparison slider helper (global scope)
 */

/* ============================================================
   1. I18N DICTIONARY & ENGINE
   ============================================================ */
const LANG_KEY = 'adam-painting-lang';
let currentLang = 'he';

const I18N = {
  'nav.services':   { he: 'שירותים',    en: 'Services'   },
  'nav.portfolio':  { he: 'עבודות',     en: 'works'  },
  'nav.about':      { he: 'מי אנחנו',  en: 'About Us'      },
  'nav.quote':      { he: 'הצעת מחיר', en: 'Get a Quote' },
  'hero.badge':     { he: 'מאז 1986',  en: 'Since 1986' },
  'hero.p':         { he: 'צביעה וחידוש מקצועי לכל בית - מטבחים, דלתות ורהיטי עץ בגימור מושלם',
                      en: 'Professional painting & restoration - kitchens, doors & wood furniture with a perfect finish' },
  'hero.cta1':      { he: 'צפו בעבודות',         en: 'View Our Work'    },
  'hero.cta2':      { he: 'קבלו הצעת מחיר חינם', en: 'Get a Free Quote' },
  'trust.years':    { he: 'שנות ניסיון',  en: 'Years Experience'  },
  'trust.visits':   { he: 'הגעה עד הבית', en: 'Home Visits'       },
  'trust.consult':  { he: 'ייעוץ חינם',   en: 'Free Consultation' },
  'trust.finish':   { he: 'גימור מושלם',  en: 'Perfect Finish'    },
  'gallery.title':  { he: 'לפני ואחרי', en: 'Before & After' },
  'gallery.sub':    { he: 'גררו את המחוון לגילוי השינוי המדהים', en: 'Drag the slider to reveal the transformation' },
  'label.after':    { he: 'אחרי', en: 'After'  },
  'label.before':   { he: 'לפני', en: 'Before' },
  'services.title': { he: 'השירותים שלנו', en: 'Our Services' },
  'services.sub':   { he: 'כל עבודה מבוצעת עם אהבה למקצוע וחומרים מהמובחרים',
                      en: 'Every project completed with craftsmanship and premium materials' },
  'svc1.title': { he: 'חידוש מטבחים', en: 'Kitchen Restoration' },
  'svc1.desc':  { he: 'מטבח ישן מקבל חיים חדשים. צביעה בתנור, חידוש דלתות וחזית שלמה',
                  en: 'Old kitchens get new life. Oven painting, door & full facade restoration' },
  'svc2.title': { he: 'צביעת דלתות', en: 'Door Painting' },
  'svc2.desc':  { he: 'דלתות כניסה, פנים ורהיטים - חידוש מלא עם גימור חלק ועמיד',
                  en: 'Entry & interior doors: full restoration with a smooth, durable finish' },
  'svc3.title': { he: 'רהיטי עץ', en: 'Wood Furniture' },
  'svc3.desc':  { he: 'שולחנות, מדפים, מדרגות ורהיטי עץ מלא - כמו חדשים לגמרי',
                  en: 'Tables, shelves, staircases & solid wood furniture — looking brand new' },
  'svc4.title': { he: 'חלונות ודיקטים', en: 'Windows & Panels' },
  'svc4.desc':  { he: 'צביעה וחידוש מקצועי לחלונות עץ ולוחות דיקט בכל גודל',
                  en: 'Professional painting & restoration of wood windows and panels of all sizes' },
  'svc.see':    { he: 'ראה עבודות', en: 'See Projects' },
  'portfolio.title': { he: 'כל העבודות', en: 'Portfolio' },
  'portfolio.sub':   { he: 'לחצו על כל תמונה לצפייה מלאה', en: 'Click any image for full view' },
  'filter.all':       { he: 'הצג הכל', en: 'All'       },
  'filter.kitchen':   { he: 'מטבחים',  en: 'Kitchens'  },
  'filter.doors':     { he: 'דלתות',   en: 'Doors'     },
  'filter.furniture': { he: 'רהיטים',  en: 'Furniture' },
  'filter.dects':     { he: 'דיקטים',  en: 'Panels'    },
  'filter.windows':   { he: 'חלונות',  en: 'Windows'   },
  'badge.kitchen':   { he: 'מטבח', en: 'Kitchen'   },
  'badge.door':      { he: 'דלת',  en: 'Door'      },
  'badge.furniture': { he: 'רהיט', en: 'Furniture' },
  'badge.window':    { he: 'חלון', en: 'Window'    },
  'badge.panel':     { he: 'דיקט', en: 'Panel'     },
  'card.kitchen1.title': { he: 'שיפוץ מטבח',        en: 'Kitchen Renovation'     },
  'card.kitchen1.desc':  { he: 'חידוש דלתות, צביעה בתנור', en: 'Door restoration, oven painting' },
  'card.kitchen1.label': { he: 'שיפוץ מטבח',        en: 'Kitchen Renovation'     },
  'card.kitchen2.title': { he: 'שיפוץ מטבח עם איי', en: 'Kitchen with Island'    },
  'card.kitchen2.desc':  { he: 'חידוש דלתות, איי, צביעה בתנור', en: 'Doors, island & oven painting' },
  'card.kitchen2.label': { he: 'שיפוץ מטבח',        en: 'Kitchen Renovation'     },
  'card.door1.title':    { he: 'צביעת דלת כניסה',   en: 'Entry Door Painting'    },
  'card.door1.desc':     { he: 'חידוש דלת כניסה',   en: 'Entry door restoration' },
  'card.door1.label':    { he: 'צביעת דלת כניסה',   en: 'Entry Door Painting'    },
  'card.door2.title':    { he: 'צביעת דלת כניסה',   en: 'Entry Door Painting'    },
  'card.door2.desc':     { he: 'חידוש דלת: לפני ואחרי', en: 'Door restoration: before & after' },
  'card.door2.label':    { he: 'צביעת דלת כניסה',   en: 'Entry Door Painting'    },
  'card.table.title':    { he: 'צביעת שולחן אוכל',  en: 'Dining Table Painting'  },
  'card.table.desc':     { he: 'צביעת שולחן אוכל וסלון', en: 'Dining & living room table' },
  'card.table.label':    { he: 'שיפוץ שולחן עץ',    en: 'Wood Table Restoration' },
  'card.window.title':   { he: 'צביעת חלונות',      en: 'Window Painting'        },
  'card.window.desc':    { he: 'חידוש חלונות עץ',   en: 'Wood window restoration'},
  'card.window.label':   { he: 'צביעת חלונות',      en: 'Window Painting'        },
  'card.panel.title':    { he: 'צביעת דיקטים',      en: 'Panel Painting'         },
  'card.panel.desc':     { he: 'חידוש לוחות דיקט',  en: 'Wood panel restoration' },
  'card.panel.label':    { he: 'צביעת דיקט',        en: 'Panel Painting'         },
  'card.kitchen3.title': { he: 'חידוש מטבח',        en: 'Kitchen Restoration'    },
  'card.kitchen3.desc':  { he: 'צביעה בתנור:  לפני ואחרי', en: 'Oven painting: before & after' },
  'card.kitchen3.label': { he: 'חידוש מטבח',        en: 'Kitchen Restoration'    },
  'card.shelf.title':    { he: 'צביעת מדף',         en: 'Shelf Painting'         },
  'card.shelf.desc':     { he: 'חידוש מדף עץ',      en: 'Wood shelf restoration' },
  'card.shelf.label':    { he: 'צביעת מדף',         en: 'Shelf Painting'         },
  'card.stairs.title':   { he: 'חידוש מדרגות',      en: 'Staircase Restoration'  },
  'card.stairs.desc':    { he: 'שיפוץ מדרגות עץ',   en: 'Wood staircase restoration' },
  'card.stairs.label':   { he: 'חידוש מדרגות',      en: 'Staircase Restoration'  },
  'about.eyebrow': { he: 'הסיפור שלנו',                en: 'Our Story'                       },
  'about.title':   { he: 'מעל 35 שנה של אהבה למקצוע', en: '35+ Years of Passion for the Craft' },
  'about.p1':      { he: 'מנסור אבו סעדה, בעל ניסיון של מעל 35 שנה בתחום צביעת העץ, חידוש ושיפוץ מטבחים, דלתות ורהיטים. עם שילוב של אמנות, דיוק ומקצועיות, הוא הפך עשרות בתים לחללים מחודשים ומרשימים.',
                    en: "Mansour Abu Sada brings over 35 years of expertise in wood painting and restoration of kitchens, doors, and furniture. With artistry, precision, and professionalism, he has transformed hundreds of homes." },
  'about.p2':      { he: 'עבודתו מתבצעת באהבה גדולה למקצוע, תוך הקפדה על שימוש בחומרים איכותיים ושירות אישי לכל לקוח - כי כל בית מיוחד.',
                     en: 'Every project is carried out with a deep love for the craft, using only premium materials and delivering personal service — because every home is unique.' },
  'about.stat1':   { he: 'שנות ניסיון', en: 'Years Exp.'  },
  'about.stat2':   { he: 'פרויקטים',    en: 'Projects'    },
  'about.stat3':   { he: 'מחויבות',     en: 'Commitment'  },
  'about.badge':   { he: 'מומחה מוסמך', en: 'Certified Expert' },
  'test.title':    { he: 'מה הלקוחות אומרים', en: 'What Clients Say' },
  'test1.text':    { he: 'העבודה יצאה מדהימה! המטבח נראה כמו חדש לגמרי. מנסור מקצועי, אדיב ועובד בניקיון מלא.',
                    en: 'The work came out amazing! The kitchen looks brand new. Mansour is professional, kind, and very clean.' },
  'test1.city':    { he: 'חיפה',   en: 'Haifa'       },
  'test2.text':    { he: 'הזמנו חידוש דלת כניסה ויצא פנטסטי. המחיר הוגן והתוצאה מעל הציפיות. ממליצים בחום!',
                    en: 'We had our front door restored and it came out fantastic. Fair price, results beyond expectations. Highly recommended!' },
  'test2.city':    { he: 'טבריה', en: "Tiberias"  },
  'test3.text':    { he: 'מנסור הגיע לבית, נתן הצעת מחיר הוגנת ועבד מהר ומסודר. השולחן נראה כמו שנקנה היום.',
                    en: 'Mansour came to our home, gave a fair quote, and worked quickly and neatly. The table looks like it was just bought.' },
  'test3.city':    { he: 'קריית אתא',     en: 'Kiryat Ata'        },
  'faq.title':     { he: 'שאלות נפוצות', en: 'Frequently Asked Questions' },
  'faq1.q': { he: 'כמה עולה חידוש מטבח?',      en: 'How much does kitchen restoration cost?' },
  'faq1.a': { he: 'המחיר תלוי בגודל המטבח, מספר הדלתות וסוג הגימור הרצוי. אנחנו מציעים הצעת מחיר חינם ולא מחייבת לאחר ביקור קצר בבית.',
              en: 'The price depends on kitchen size, number of doors, and finish type. We offer a free, no-obligation quote after a brief home visit.' },
  'faq2.q': { he: 'כמה זמן לוקחת העבודה?',     en: 'How long does the work take?' },
  'faq2.a': { he: 'חידוש מטבח לוקח בדרך כלל שבוע עד שבועיים. עבודות קטנות יותר מסתיימות בדרך כלל ביום אחד.',
              en: 'A medium kitchen typically takes one to two days. Smaller jobs (a door, a table) are usually done in one day.' },
  'faq3.q': { he: 'האם ניתן לצבוע בתוך הבית?', en: 'Can painting be done inside the home?' },
  'faq3.a': { he: 'כן! עובדים עם ציוד מקצועי שמאפשר עבודה נקייה ומינימום הפרעה לשגרת הבית.',
              en: 'Yes! We use professional equipment that allows clean work with minimal disruption to your daily routine.' },
  'faq4.q': { he: 'אילו חומרים משתמשים?',       en: 'What materials do you use?' },
  'faq4.a': { he: 'משתמשים בצבעים איכותיים ועמידים מהמובחרים בשוק, עם אפשרות לצביעה בתנור לגימור מקצועי במיוחד.',
              en: 'We use top-quality, durable paints, with the option of oven painting for an especially professional finish.' },
  'faq5.q': { he: 'לאיזה אזורים מגיעים?',       en: 'Which areas do you serve?' },
  'faq5.a': { he: 'מגיעים לכל הצפון/מרכז - חיפה והסביבה, תל אביב',
              en: "We serve the North - Haifa and surroundings, Tel Aviv and surrounding areas." },
  'contact.eyebrow':     { he: 'בואו נדבר',    en: "Let's Talk"   },
  'contact.title':       { he: 'קבלו הצעת מחיר חינם', en: 'Get a Free Quote' },
  'contact.sub':         { he: 'ללא התחייבות - נשמח לייעץ ולהגיע עד הבית',
                           en: "No obligation - we'll advise and come to your home" },
  'contact.area.label':  { he: 'אזור עבודה:',  en: 'Service Area:'  },
  'contact.area.val':    { he: ' תל אביב והסביבה, חיפה והסביבה', en: "Center District , Haifa & surroundings" },
  'contact.hours.label': { he: 'זמינות:',       en: 'Hours:'         },
  'contact.hours.val':   { he: 'ראשון - שישי, 08:00 - 18:00', en: 'Sun - Fri, 08:00 - 18:00' },
  'chip1': { he: 'חידוש מטבחים',   en: 'Kitchen Restoration' },
  'chip2': { he: 'צביעת דלתות',    en: 'Door Painting'       },
  'chip3': { he: 'רהיטי עץ',       en: 'Wood Furniture'      },
  'chip4': { he: 'צביעה בתנור',    en: 'Oven Painting'       },
  'chip5': { he: 'חלונות ודיקטים', en: 'Windows & Panels'    },
  'footer.rights': { he: '© 2026 מצבעת אדם. כל הזכויות שמורות.', en: '© 2026 Adam Painting. All rights reserved.' },
  'footer.credit': { he: 'נבנה ועוצב ע״י', en: 'Built & designed by' },
};

function t(key) {
  const entry = I18N[key];
  return entry ? (entry[currentLang] ?? entry['he'] ?? null) : null;
}

function applyLang(lang) {
  currentLang = lang;
  const isHe = lang === 'he';
  const html  = document.documentElement;

  html.setAttribute('lang', lang);
  html.setAttribute('dir',  isHe ? 'rtl' : 'ltr');

  document.title = isHe
    ? 'מצבעת אדם | חידוש מטבחים וצביעת רהיטים — חיפה והסביבה'
    : 'Adam Painting | Kitchen & Furniture Restoration — Haifa Region';

  // Swap all [data-i18n] leaf text nodes safely
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t(el.getAttribute('data-i18n'));
    if (val !== null) el.textContent = val;
  });

  // Hero h1 needs innerHTML (contains <br> and <em>, no child listeners)
  const heroH1 = document.querySelector('.hero-inner h1');
  if (heroH1) {
    heroH1.innerHTML = isHe
      ? 'מטבח ישן? רהיט שנשכח?<br><em>אנחנו מחיים אותו מחדש.</em>'
      : 'Old kitchen? Forgotten furniture?<br><em>We bring it back to life.</em>';
  }

  // Update work card data-title / data-desc (used by modal) and visible label
  document.querySelectorAll('.work-card[data-i18n-title]').forEach(card => {
    const titleKey = card.getAttribute('data-i18n-title');
    const descKey  = card.getAttribute('data-i18n-desc');
    const labelKey = card.getAttribute('data-i18n-label');
    if (titleKey) card.setAttribute('data-title', t(titleKey) || '');
    if (descKey)  card.setAttribute('data-desc',  t(descKey)  || '');
    if (labelKey) {
      const p = card.querySelector('p');
      if (p) p.textContent = t(labelKey) || '';
    }
  });

  // WhatsApp href swap
  document.querySelectorAll('[data-wa-he]').forEach(el => {
    el.setAttribute('href', isHe
      ? el.getAttribute('data-wa-he')
      : el.getAttribute('data-wa-en'));
  });

  // Language toggle active pill
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
  });

  try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
}

/* ============================================================
   2. MAIN — DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* a. MOBILE NAV — hamburger -------------------------------- */
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
    navToggle.addEventListener('click', () =>
      mainNav.classList.contains('open') ? closeNav() : openNav()
    );
    navOverlay && navOverlay.addEventListener('click', closeNav);
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) closeNav();
    });
  }

  /* b. SCROLL HEADER ---------------------------------------- */
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* c. VIDEO AUTOPLAY (iOS / Safari fix) -------------------- */
  document.querySelectorAll('video').forEach(v => {
    v.muted       = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    const tryPlay = () => {
      const p = v.play();
      if (p) p.catch(() => {
        const resume = () => v.play().catch(() => {});
        window.addEventListener('touchstart', resume, { once: true, passive: true });
        window.addEventListener('click',      resume, { once: true });
      });
    };
    tryPlay();
    setTimeout(tryPlay, 1200);
  });

  /* d. WORK CARD FILTER ------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-buttons button');
  const workCards  = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      workCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          requestAnimationFrame(() => { card.style.animation = 'fadeUp .3s ease both'; });
        }
      });
    });
  });

  /* e. SERVICE-LINK quick-filter ---------------------------- */
  document.querySelectorAll('.service-link[data-filter-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target  = link.getAttribute('data-filter-target');
      const section = document.getElementById('all-works');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const btn = document.querySelector(`.filter-buttons button[data-filter="${target}"]`);
          if (btn) btn.click();
        }, 600);
      }
    });
  });

  /* f. PROJECT MODAL ---------------------------------------- */
  const modal = document.getElementById('workModal');
  if (modal) {
    const titleEl  = modal.querySelector('.work-modal__title');
    const descEl   = modal.querySelector('.work-modal__desc');
    const imgEl    = modal.querySelector('.work-modal__image');
    const thumbs   = modal.querySelector('.work-modal__thumbs');
    const prevBtn  = modal.querySelector('.nav.prev');
    const nextBtn  = modal.querySelector('.nav.next');
    const closeEls = modal.querySelectorAll('[data-close]');
    let cur = { images: [], index: 0 };

    const renderImage = () => {
      imgEl.src = cur.images[cur.index];
      imgEl.alt = titleEl.textContent || '';
      [...thumbs.children].forEach((th, i) =>
        th.classList.toggle('active', i === cur.index)
      );
    };
    const buildThumbs = () => {
      thumbs.innerHTML = '';
      cur.images.forEach((src, i) => {
        const th = document.createElement('img');
        th.src   = src.trim();
        th.alt   = 'preview';
        if (i === 0) th.classList.add('active');
        th.addEventListener('click', () => { cur.index = i; renderImage(); });
        thumbs.appendChild(th);
      });
    };
    const openModal = ({ title, desc, images }) => {
      cur = { images, index: 0 };
      titleEl.textContent = title || '';
      descEl.textContent  = desc  || '';
      buildThumbs();
      renderImage();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
    const nextImg = () => { cur.index = (cur.index + 1) % cur.images.length; renderImage(); };
    const prevImg = () => { cur.index = (cur.index - 1 + cur.images.length) % cur.images.length; renderImage(); };

    workCards.forEach(card => {
      const open = () => {
        const title  = card.getAttribute('data-title') || card.querySelector('p')?.textContent || '';
        const desc   = card.getAttribute('data-desc')  || '';
        const images = (card.getAttribute('data-images') || '')
          .split(',').map(s => s.trim()).filter(Boolean);
        if (!images.length) {
          const src = card.querySelector('img')?.src;
          if (src) images.push(src);
        }
        if (images.length) openModal({ title, desc, images });
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });

    nextBtn  && nextBtn.addEventListener('click', nextImg);
    prevBtn  && prevBtn.addEventListener('click', prevImg);
    closeEls.forEach(el => el.addEventListener('click', closeModal));
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape')     closeModal();
      if (e.key === 'ArrowRight') prevImg();
      if (e.key === 'ArrowLeft')  nextImg();
    });
  }

  /* g. COMPARISON SLIDERS (jQuery) -------------------------- */
  if (typeof $ !== 'undefined') {
    $(function () {
      const $sliders = $('.comparison-slider');
      if (!$sliders.length) return;

      $sliders.each(function () {
        const $s = $(this);
        const $r = $s.find('.resize');
        const $d = $s.find('.divider');
        $r.find('img').css({ width: $s.width() + 'px' });
        requestAnimationFrame(() => {
          $r.css('width', '50%');
          $d.css('left',  '50%');
        });
        drags($d, $r, $s);
      });

      $(window).on('resize orientationchange', function () {
        $('.comparison-slider').each(function () {
          const $s = $(this);
          $s.find('.resize img').css({ width: $s.width() + 'px' });
          $s.find('.resize').css('width', '50%');
          $s.find('.divider').css('left',  '50%');
        });
      });
    });
  }

  /* h. BEFORE/AFTER CAROUSEL -------------------------------- */
  const slides  = Array.from(document.querySelectorAll('.carousel-container .slide'));
  const dots    = Array.from(document.querySelectorAll('.pagination .page-dot'));
  const carPrev = document.querySelector('.carousel-controls .prev');
  const carNext = document.querySelector('.carousel-controls .next');

  if (slides.length) {
    let carIdx = 0;

    const recenter = sl => {
      const s   = sl.querySelector('.comparison-slider'); if (!s) return;
      const r   = s.querySelector('.resize');
      const d   = s.querySelector('.divider');
      const img = r && r.querySelector('img');
      if (img) img.style.width = s.clientWidth + 'px';
      if (r)   r.style.width   = '50%';
      if (d)   d.style.left    = '50%';
    };

    const showSlide = idx => {
      if (idx < 0) idx = slides.length - 1;
      if (idx >= slides.length) idx = 0;
      carIdx = idx;
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[carIdx].classList.add('active');
      if (dots[carIdx]) dots[carIdx].classList.add('active');
      requestAnimationFrame(() => recenter(slides[carIdx]));
    };

    dots.forEach(d =>
      d.addEventListener('click', () => showSlide(+d.dataset.index))
    );
    carPrev && carPrev.addEventListener('click', () => showSlide(carIdx - 1));
    carNext && carNext.addEventListener('click', () => showSlide(carIdx + 1));
    window.addEventListener('resize', () => recenter(slides[carIdx]));

    let swipeX = 0;
    const carWrap = document.querySelector('.carousel-container');
    if (carWrap) {
      carWrap.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, { passive: true });
      carWrap.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - swipeX;
        if (Math.abs(dx) > 40) showSlide(dx > 0 ? carIdx - 1 : carIdx + 1);
      }, { passive: true });
    }

    showSlide(0);
  }

  /* i. LANGUAGE TOGGLE -------------------------------------- */
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const next = currentLang === 'he' ? 'en' : 'he';
      document.body.classList.add('lang-switching');
      setTimeout(() => {
        applyLang(next);
        document.body.classList.remove('lang-switching');
      }, 120);
    });
  }

  // Restore saved language — runs last so all listeners are attached
  let savedLang = 'he';
  try { savedLang = localStorage.getItem(LANG_KEY) || 'he'; } catch (_) {}
  applyLang(savedLang);

}); // end DOMContentLoaded


/* ============================================================
   3. drags() — jQuery comparison slider drag helper
   Global scope so it's accessible from jQuery $(function(){})
   ============================================================ */
function drags(dragEl, resizeEl, container) {
  let touched = false;
  window.addEventListener('touchstart', () => { touched = true;  }, { passive: true });
  window.addEventListener('touchend',   () => { touched = false; }, { passive: true });

  dragEl.on('mousedown touchstart', function (e) {
    dragEl.addClass('draggable');
    resizeEl.addClass('resizable');

    const pageX  = e.pageX || e.originalEvent.touches[0].pageX;
    const dw     = dragEl.outerWidth();
    const posX   = dragEl.offset().left + dw - pageX;
    const cLeft  = container.offset().left;
    const cWidth = container.outerWidth();
    const minL   = cLeft + 10;
    const maxL   = cLeft + cWidth - dw - 10;

    dragEl.parents().on('mousemove touchmove', function (e) {
      if (!touched) e.preventDefault();
      const mx  = e.pageX || e.originalEvent.touches[0].pageX;
      let left  = mx + posX - dw;
      if (left < minL) left = minL;
      else if (left > maxL) left = maxL;
      const pct = ((left + dw / 2 - cLeft) / cWidth * 100) + '%';

      $('.draggable')
        .css('left', pct)
        .on('mouseup touchend touchcancel', function () {
          $(this).removeClass('draggable');
          resizeEl.removeClass('resizable');
        });
      $('.resizable').css('width', pct);

    }).on('mouseup touchend touchcancel', function () {
      dragEl.removeClass('draggable');
      resizeEl.removeClass('resizable');
    });

  }).on('mouseup touchend touchcancel', function () {
    dragEl.removeClass('draggable');
    resizeEl.removeClass('resizable');
  });
}