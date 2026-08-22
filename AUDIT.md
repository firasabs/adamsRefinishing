# Adam Painting — UX, Brand & Frontend Audit

**Client:** Adam Painting / מצבעת אדם
**Scope:** UX · Brand · Frontend
**Stage:** Audit + proposal
**Date:** 2026-08-19
**Code changed:** none

> The work is good. The site doesn't say so.

A full audit of `index.html`, `script.js`, `front/style.css` and 40 media assets — and a proposed direction that moves the brand from "local contractor with a website" to "restoration specialist you'd trust with a ₪40,000 kitchen."

---

## A. Executive assessment

Eight things that matter most, ranked by effect on the business objective, not by effort.

### 1. The photography is the product, and the layout is destroying it — CRITICAL

Three of the four before/after pairs are portrait photos (768×1024) forced into an `aspect-ratio: 16/9` box with `object-fit: cover`. Roughly half of each kitchen is cropped away. Slide 1 pairs a 6838×3900 "before" with a 1024×768 "after" — different lens, different position, different framing — so the comparison doesn't actually compare anything.

### 2. Two referenced files do not exist, and one is 43 MB — CRITICAL

`front/images/kitchens/IMG_1930.jpeg` (the hero video poster) is missing entirely. `TAtta2.jpg` is referenced but the file on disk is `Tatta2.jpg` — this works on your Mac and 404s on GitHub Pages, which is case-sensitive. And the panels project loads `IMG_8875.png` at **43 MB** into the modal; a 1.9 MB JPEG of the same photo sits unused beside it.

### 3. The phone number in the contact card is invisible on desktop — CRITICAL

`.header-phone` is `display:none` by default and only revealed under 768px. The contact section reuses that same class (`index.html:511`), so on every desktop visit your primary conversion section shows a WhatsApp button and no phone number.

### 4. The gold is doing the opposite of what you want — HIGH

`#CDA255` at that chroma, used as large fills — gradient icon circles, a full gold badge card, solid gold buttons and pills — reads discount rather than atelier. It also fails accessibility: 2.36:1 on white, 2.15:1 on beige, where 4.5:1 is required. Premium brands use metal as a hairline, not as a fill.

### 5. The homepage makes claims before it shows proof — HIGH

Order is currently Hero → trust bar of adjectives ("Perfect Finish", "Free Consultation") → gallery. A stranger deciding whether to trust you with an expensive kitchen wants evidence first. Every claim placed before the first transformation is spent on a reader who has no reason to believe it yet.

### 6. A visible beige band sits above the hero video — HIGH

`body` has `padding-top:64px`, the header is `position:fixed` and transparent until scroll. So the first 64px of the page is bare beige background with the gold logo floating on it, and the video starts below. The first impression is a layout gap.

### 7. ~120 KB of blocking JavaScript does nothing — HIGH

`jquery.event.move` and `jquery.twentytwenty` are both loaded from CDN and never referenced — the comparison slider is hand-written. jQuery itself is used for exactly one component. Meanwhile `drags()` leaks handlers: it binds `mousemove` to every ancestor on each mousedown without ever unbinding, and binds a fresh `mouseup` handler *inside* the mousemove loop.

### 8. Hebrew and English visitors are told different facts — HIGH

FAQ 2 in the HTML says a kitchen takes a day or two. The Hebrew dictionary entry that overwrites it on load says שבוע עד שבועיים (one to two weeks). The English entry says one to two days. Separately, the hero badge says "Since 1986" and the schema says `foundingDate: 1986` — that is 40 years, not the "35+" repeated in four places.

---

## B. Current strengths — keep these

- **The before/after concept is the right strategic bet.** For restoration work it is the single most persuasive format that exists. The execution needs work; the decision does not.
- **The bilingual system is well-built for a hand-rolled one.** A single dictionary, `data-i18n` attributes, `localStorage` persistence, `dir`/`lang` swapping, WhatsApp deep-links localised per language, and a mobile drawer that flips sides. That is more care than most agency sites give Hebrew.
- **HTML semantics are above average.** Real `<section>`, `<article>`, `<blockquote>`, `<details>` for the FAQ, one `<h1>`, a clean heading ladder, `aria-expanded` on the hamburger, `role="dialog"` on the modal.
- **Vanilla stack, no build step.** Correct call for this project. Nothing here justifies a framework.
- **Touch targets were considered.** `min-height:44px` appears on buttons, dots and modal controls — deliberately, with a comment.
- **Real content exists.** Ten projects across five categories, four before/after pairs, and four *more* unused door pairs sitting in the repo. There is enough material for a genuinely strong portfolio.
- **A `prefers-reduced-motion` block exists.** Incomplete, but present — which puts you ahead of most.

---

## C. Brand perception — what the site currently signals

Asked bluntly: it reads as a **competent local tradesman who bought a good template**. Not cheap, not premium — capable. The gap between the quality of the work in the photos and the quality of the frame around them is the whole problem.

| Axis | Current position | Target |
|---|---|---|
| Premium ↔ budget | Mid. Gold-on-black and pill buttons signal "value" more than "specialist" | Clearly premium, quietly |
| Craftsman ↔ contractor | Contractor. No hands, no workshop, no process, no material talk | Craftsman with evidence |
| Traditional ↔ contemporary | Neither — it reads generic-web rather than either | Contemporary, restrained, timeless |
| Trustworthiness | Undermined by unverifiable round numbers next to real photos | Built on specifics |
| Visual hierarchy | Flat. Every section is a centered header over a grid of equal cards | Strong primary / secondary contrast |
| Differentiation | Low. Interchangeable with any Israeli kitchen-refinishing site | Recognisable in one screenshot |

### Specifically, what makes it feel template-like

- **Card monoculture.** Services, portfolio, testimonials, contact, FAQ, stat cards — six consecutive sections are all "white box, 12px radius, 1px border, soft shadow, centered text." Nothing is allowed to be more important than anything else.
- **Everything is centered.** Every section header, the hero, the about text, the contact card. Centered layout with no asymmetry is the most common signal of a template.
- **Pill buttons everywhere.** `border-radius:999px` on CTAs, filters, chips, badges, the language toggle, the nav CTA. Pills read app-store, not atelier.
- **Weight 900 Hebrew.** The `<h1>` is `font-weight:900` Heebo. Heavy Hebrew at display size reads as advertising, not editorial.
- **Font Awesome icons as decoration.** `fa-utensils` for kitchens, `fa-couch` for furniture, `fa-gift` for a free consultation. Generic pictograms in gold gradient circles are the single most template-like element on the page.
- **The 3D tilt badge.** A gold "Certified Expert" card that tilts to the mouse — and auto-tilts in an infinite 2.5s loop on every phone. It is the most eye-catching object on the page and it is decorating an unverified claim.
- **Emoji-grade star strings.** `★★★★★` as literal text with no source, no date, no platform.
- **Pulsing WhatsApp button.** An infinite scale-and-fade ring. Standard growth-hack furniture; the opposite of confidence.

---

## D. Problems holding the brand back

Everything verified against the code. Line references are to files as they stand today.

### Critical — blocking, fix before anything else

| Issue | Detail |
|---|---|
| `TAtta2.jpg` vs `Tatta2.jpg` | Case mismatch at `index.html:319`. Broken image in the table project modal on any case-sensitive host, including GitHub Pages where this repo points. |
| 43 MB PNG in the portfolio modal | `front/images/dect/IMG_8875.png`, referenced from the panels card. Unusable on mobile data. `IMG_8875.jpg` (1.9 MB) already exists. |
| Missing hero poster | `IMG_1930.jpeg` does not exist. Until the video decodes, the hero is a black rectangle — your Largest Contentful Paint is nothing. |
| Desktop phone CTA hidden | `.header-phone` is `display:none` above 768px; the contact card reuses the class. |
| 3.7 MB, 6838px-wide image loads eagerly above the fold | `before1.jpeg` carries `loading="eager"`. Combined with the 770 KB hero video, first paint costs roughly 6 MB. |

### High

| Issue | Detail |
|---|---|
| Comparison slider crops the work in half | 16:9 container, 3:4 source photos, `object-fit:cover`. |
| Slider is completely keyboard-inaccessible | The divider is a bare `<div>` — no `tabindex`, no `role="slider"`, no `aria-valuenow`, no arrow-key handling. Its handle is 40px, under the 44px minimum. |
| `drags()` leaks event handlers | Binds to `dragEl.parents()` on every mousedown and never unbinds; nests a `mouseup` binding inside the mousemove handler; uses global `$('.draggable')`, so with several sliders mounted they can move together. |
| Unused libraries block rendering | `jquery.event.move` and `jquery.twentytwenty` load and are never called. Font Awesome pulls a full CSS bundle from CDN for ~14 icons. |
| A missing element would kill the entire site | `script.js:215` calls `badge.addEventListener` at top level with no null check, *before* the `DOMContentLoaded` listener is registered. Delete `.about-badge` from the HTML and nav, filters, modal, carousel and language switching all stop working. The same block is then duplicated at line 229. |
| Contrast failures | Gold on white 2.36:1 (`.service-link`, `.section-eyebrow`, `.stat strong`). `--text-light #888` on white 3.54:1, on beige 3.23:1. AA requires 4.5:1. |
| Language switching is invisible to Google | One URL, JS-only translation, no `hreflang`, no `/en/` path. The English site effectively does not exist in search. |
| Contradictory FAQ duration + 35 vs 40 years | Described in section A. Both are facts a customer can catch. |

### Medium

| Issue | Detail |
|---|---|
| Modal has no focus management | No focus trap, no focus restore on close, arrow keys hardcoded to RTL so they run backwards in English. |
| Carousel arrows point the wrong way in English | "Prev" renders `›`, correct for RTL only. `aria-live="polite"` sits on a container whose slides are `display:none`, so nothing useful is announced. |
| Autoplaying hero video has no pause control | WCAG 2.2.2 requires a mechanism to pause motion lasting over five seconds. |
| No dimensions on gallery images | Only the logo sets `width`/`height`. Everything else contributes to layout shift. |
| Alt text is English on a Hebrew page and never translated | "Kitchen after restoration" for a Hebrew screen-reader user. `aria-label`s are hardcoded Hebrew and never swap to English. |
| Thin structured data | `LocalBusiness` has five properties. No `address`, `url`, `image`, `geo`, `openingHoursSpecification`, `priceRange`, `@id`. Five FAQs on the page and no `FAQPage` schema. No canonical, no `og:image`, no favicon, no sitemap. |
| Testimonial cities contradict the service area | A Tiberias review, while both the FAQ and contact block name Haifa and Tel Aviv. |
| Filters lack state semantics | No `aria-pressed`; `role="group"` with no accessible name; filtering by inline `display` with no announcement of how many results remain. |

### Low

| Issue | Detail |
|---|---|
| ~150 lines of dead CSS | Styles for `about.html`, a page deleted from the repo: `.about-hero`, `.about-story`, `.stat-card`, `.value-card`, `.about-cta`. Plus unused `.tel-btn`, unstyled `.phone-number`, and two separate `@media (max-width:767px)` blocks. |
| 7.5 MB of unreferenced assets | Three unused videos (3.6 MB), `IMG_8875.jpg`, `Tatta2.jpg`, `k1.jpg`, the `adam's painting.png` logo — and two complete unused door before/after pairs that should be *in* the portfolio. |
| Filenames with spaces and apostrophes | `nseer's door.jpeg`, `the duke.jpg`. They work today; they are one deploy pipeline away from not working. |
| `text-transform:uppercase` on Hebrew | A no-op on `.section-eyebrow` in Hebrew, active in English — so the two languages get different typographic treatment by accident. |
| Reduced-motion block is incomplete | It kills durations but leaves `html{scroll-behavior:smooth}` and the infinite badge/pulse keyframes technically running. |
| Dead `meta keywords` | Ignored by every search engine since roughly 2009. |

---

## E. Proposed brand direction: the prepared surface

One idea holds the whole identity together. Everything Mansour sells is a **surface** — flat, evenly built up, precisely edged, no dust, no orange peel, no runs. So the site should behave like one: flat planes, exact edges, no gloss where gloss isn't earned, and metal used the way hardware is used on a cabinet — small, deliberate, load-bearing.

> **The core move.** Stop decorating and start framing. Remove shadows, radii, gradients and icon circles almost entirely, and spend that visual budget on **photograph size** and **whitespace**. A 1400px-wide photograph on a quiet ground says "expensive" more convincingly than any amount of gold.

### Palette

Keep the family, drop the chroma. The current beige is slightly yellow and fights the warm wood tones in your own photos; the black is pure `#111`, which reads as screen rather than as material; the gold is too saturated to survive being used at scale.

| Name | Hex | Role |
|---|---|---|
| Stone | `#F3F1ED` | page ground |
| Chalk | `#FFFFFF` | alternating sections |
| Charcoal | `#1C1C1A` | type, dark bands |
| Graphite | `#57534A` | secondary text |
| Brass | `#8C6B3F` | accent, hairlines |
| Linen | `#D9D2C6` | rules, dividers |

**Reasoning.** Brass `#8C6B3F` is the same hue family as the current gold at roughly half the chroma — it reaches 4.6:1 on stone, so it passes AA *and* stops shouting. Charcoal `#1C1C1A` instead of `#111` reads as a photographed material rather than a UI colour, and it sits far better next to warm wood. The stone ground is one step warmer and one step less yellow than the current `#F8F4EC`, which makes oak and walnut photographs look correct instead of jaundiced.

**Usage rule, and it matters more than the values:** brass appears only as 1–2px rules, small caps labels, and the active state of a control. Never as a fill larger than a button. Large gold fills are the single biggest thing making the current site feel inexpensive.

### Typography

Keep Heebo — it is a genuinely good Hebrew face and it is already loaded. Change how it is used, and add one display face.

| Role | Face | Treatment |
|---|---|---|
| Display — `h1`, section titles | **Frank Ruhl Libre** 400/500 | Hebrew-first serif, real Latin companion. Large, light, tight leading |
| Body, UI, buttons | **Heebo** 400/500 | 16–18px, 1.6 line-height |
| Labels, eyebrows, project metadata | **Heebo** 500 | 12px, +0.12em tracking, brass |

**Reasoning.** Frank Ruhl Libre is the strongest available answer to "editorial luxury that treats Hebrew as first-class" — it was drawn for Hebrew, not adapted to it, and it carries a matching Latin set, so one family covers both languages with a single typographic voice. That is rare and worth using.

Critically: **drop weights 700, 800 and 900 entirely.** You currently load five Heebo weights and set the headline at 900. Heavy Hebrew at display size is the loudest "advertising" signal on the page. Lighter, larger and more generously spaced reads as more expensive at every size.

### Imagery direction

- **Consistent ratios per context.** Portrait 4:5 for detail and door shots, landscape 3:2 for kitchens and rooms. Never crop a portrait photo into a 16:9 box.
- **Before/after must be shot from the same position.** This is the highest-value thing to change about how photos are captured going forward, and it costs nothing — mark the spot, same phone, same height.
- **Add texture close-ups.** A macro of a cured lacquer edge, a hinge line, a grain transition. Nothing communicates finish quality like a photograph of the finish.
- **Uniform grade.** Slight warm bias, controlled highlights, consistent white point. Ten photographs that look like one photographer's work read as a portfolio; ten that don't read as a phone gallery.

### Layout language

- Radius **0–2px**, not 12/20px. Shadows removed almost everywhere — separate surfaces with contrast and space, not elevation.
- Hairline rules (1px linen) instead of bordered boxes.
- Asymmetry as a default: image 7 columns, text 4, with a real gutter — instead of the current centered-everything.
- Section padding up from 72px to 112–140px on desktop. Whitespace is the cheapest luxury signal available.
- Full-bleed photography for featured work; the grid is for the archive, not the highlights.

### Motion language

- Reveal on scroll: opacity 0→1 plus 12px rise, 500ms, `cubic-bezier(.16,1,.3,1)`, once, staggered 60ms.
- Image hover: scale 1→1.02 over 600ms inside a fixed frame. Nothing else moves.
- Before/after: on first entry into view, sweep the divider once from 65%→45% over 900ms, then hand control to the user. Tasteful, teaches the interaction, does not repeat.
- **Remove:** the 3D tilt badge, the infinite mobile auto-tilt, the WhatsApp pulse ring, and every `translateY(-4px)` card hover.
- Extend the reduced-motion block to disable `scroll-behavior` and all reveals, not just durations.

---

## F. Recommended homepage structure

The governing principle: **proof before claims, always.** Every assertion should arrive after the reader has already seen something that makes it believable.

| # | Section | Purpose |
|---|---|---|
| 01 | Hero | Video, one headline line, one primary CTA. Nothing else. |
| 02 | The transformation | One before/after, full-bleed, near full-viewport. Your single strongest pair. This is the thesis of the business, so it goes first and it goes big. |
| 03 | Selected work | Three featured projects in alternating editorial layout, each with real context: what it was, what was done, what finish. Not cards. |
| 04 | How the work is done | The process. *Only once you confirm the real steps* — see section J. This is where you justify the price difference against a cheap painter. |
| 05 | Services | A compact typographic index, not four icon cards. Each line links into the filtered archive. |
| 06 | The archive | The full filterable grid — now the second tier of the portfolio rather than the whole of it. |
| 07 | Mansour | The story, with a real photograph of him working. Four decades is your strongest differentiator and it currently has no face attached. |
| 08 | Reviews & FAQ | Attributed reviews only. FAQ is genuinely useful here and answers real price/duration anxiety. |
| 09 | Contact | Send photos, get an estimate. One clear ask. |

**What moved and why.** The trust bar of adjectives is dissolved — "Perfect Finish" and "Free Consultation" placed before any evidence spend credibility the reader hasn't extended yet. Home visits and free quotes reappear at step 09 where they answer a real question. Services drop below the work because nobody chooses a restorer from a service list; they choose from photographs.

---

## G. Component recommendations

| Component | Call | Why |
|---|---|---|
| Hero video | **Refine** | Concept is right. Fix the 64px beige band, add a real poster, cut the copy to one line and one CTA, drop the pill badge into a small brass label, shift the block off-centre with the video's own composition, and add a pause control. |
| Trust bar | **Remove** | Four adjectives with icons, above any proof. Its useful content moves into the contact section. |
| Before/after slider | **Redesign** | Keep the interaction, rebuild the implementation: drop jQuery, fix the aspect ratio to the source photos, add `role="slider"` with keyboard support, give it far more screen, add project context beside it. |
| Featured transformation | **Add** | One hero-scale before/after at position 02. Currently the strongest asset you own is presented at 960px in a carousel. |
| Carousel of four sliders | **Refine** | Demote to a secondary strip below the featured one. Fix the LTR arrow direction and the `aria-live` region. |
| Service cards | **Redesign** | Replace four Font Awesome circles with a typographic index — number, service name, one line, a thumbnail. Removes the most template-like element on the page. |
| Portfolio grid | **Refine** | Keep it as the archive. Remove card chrome — no white box, no border, no shadow, no radius. Image, then a small brass caption line. Vary tile sizes. Fold in the four unused door pairs. |
| Featured project layouts | **Add** | Three projects at 60/40 split, alternating sides, each with type, finish, and duration. This is what turns a gallery into a body of work. |
| Filters | **Refine** | Text with an underline for active state instead of black pills. Add `aria-pressed` and a result count. |
| Project modal | **Refine** | Solid logic already. Add focus trap and restore, direction-aware arrow keys, swipe, preload of the next image, and a caption per image. |
| About section | **Redesign** | Needs a photograph of Mansour. Right now the visual half of a two-column section is occupied by a gold gradient box. |
| 3D "Certified Expert" badge | **Remove** | Unverified claim, gold fill, mouse-tracking tilt, infinite loop on mobile, and a null-reference that can take down the whole script. Nothing about it survives review. |
| Stat block (35+/500+/100%) | **Redesign** | "100% commitment" is not a statistic. Replace with verified figures only — and fix 35 vs 1986. |
| Testimonials | **Refine** | Keep only if real. Attribute to a source (Google, Facebook), add the project type, drop the star glyphs, and link out. Unsourced five-star quotes read as invented even when they aren't. |
| Process section | **Add** | The highest-value missing section. It is the argument for your price. Blocked on real information from you. |
| Materials / finishes | **Add** | Named brands and finish options are the most credible luxury signal available and cost nothing to state. Blocked on your input. |
| FAQ | **Keep** | Well-chosen questions. Fix the duration contradiction and add `FAQPage` schema. |
| Contact section | **Redesign** | Fix the hidden desktop phone number. Lead with "send us photos of the piece" — that is the actual first step of your sales process. |
| Floating WhatsApp | **Refine** | Keep on mobile, remove the pulse ring, make it a square-cornered charcoal button with the WhatsApp mark. On desktop, replace with a quiet header action. |
| jQuery + 2 plugins | **Remove** | Two are dead weight; the third is replaceable with ~30 lines of pointer events. |
| Font Awesome | **Remove** | A CDN CSS bundle and a webfont for roughly 14 icons. Inline SVG instead — and most of the decorative ones disappear in the redesign anyway. |

---

## H. Mobile recommendations

A homeowner searching חידוש מטבחים is on a phone. Several current decisions are desktop layouts shrunk rather than mobile layouts designed.

- **Hero height.** `88vh` plus `body` padding overflows the viewport on iOS and hides the CTAs below the fold. Use `100svh` minus the header, and guarantee the primary CTA is visible without scrolling.
- **Two-column portfolio on a phone shows your work at ~170px wide.** That is a thumbnail of a kitchen. Go single-column full-bleed with a tight caption — one project per screen, at the size the work deserves.
- **The before/after divider is the single most important touch target on the site.** Currently a 40px handle inside a container that crops the photo in half. Enlarge to 56px, expand the touch area beyond the visual handle, honour a portrait ratio, and add the one-time auto-sweep so people discover it.
- **Drag conflicts with page scroll.** `touch-action:none` is set on the divider only; the current handler calls `preventDefault` conditionally through a global `touched` flag. Rebuild with pointer events and `setPointerCapture`.
- **Sticky contact bar instead of the floating bubble.** A full-width two-action bar (WhatsApp · Call) that appears after the first transformation. Higher conversion, no pulsing decoration, and it stops covering content.
- **Filters overflow into three ragged rows.** Make them a single horizontally-scrollable row with edge fade — a familiar mobile pattern that fixes the ragged wrap.
- **Modal on mobile should be full-screen.** Currently a 96vh centred sheet with 44px side buttons over the image. Go edge-to-edge, swipe-driven, caption below.
- **Section spacing.** 72px between sections is too tight for a phone at this content density. 88–96px, and let the photography breathe.
- **Both directions need testing, not just Hebrew.** The LTR overrides are a patch list at the end of the stylesheet — three rules hardcode `direction:rtl` on components (`.work-modal__content`, `.about-section`, `.contact-meta`) and are then individually undone under `html[lang="en"]`. Replace with logical properties throughout so LTR is correct by construction.

---

## I. Conversion UX

There is no shortage of CTAs. There is a shortage of CTAs positioned at the moment someone is actually convinced.

### Keep three placements, not seven

1. **Hero** — one primary action.
2. **Immediately after the featured work** — the highest-intent moment on the page and currently the only one with no CTA at all. This is the single biggest conversion gain available.
3. **Contact section** — the full ask.

Plus a persistent mobile bar and a quiet header phone/WhatsApp pair on desktop. Remove the pulsing bubble.

### On a multi-step quote wizard

**Recommendation: don't build one.** A four-step form is friction dressed as service, and it needs infrastructure this project doesn't have and doesn't need.

Build the *WhatsApp-first* version instead: a prominent "שלחו לנו תמונות של המטבח — send us photos" action that deep-links with a pre-filled structured message the customer completes in their own keyboard:

```
?text=שלום, אשמח להצעת מחיר.%0Aסוג עבודה: %0Aעיר: %0Aמצרף תמונות 📷
```

Photos are what an estimate actually requires, WhatsApp already handles uploads natively, it is where the conversation ends up anyway, and it costs zero backend. Add one four-field static form (name, phone, city, message) via Formspree or Netlify Forms as a fallback for people who won't use WhatsApp — no server, no CRM.

Per-project enquiry is worth adding cheaply: an "ask about this project" action inside the modal that pre-fills the project name into the WhatsApp message. High intent, near-zero effort.

---

## J. Technical frontend recommendations

> **Verdict: stay vanilla. No framework.** This is nine sections of largely static content with four interactive components. React or Next would add a build step, a toolchain and a deployment story in exchange for nothing this site needs. The problems here are not architectural — they are asset hygiene, a leaking drag handler, and 120 KB of libraries that do nothing.

### Architecture

- **Drop jQuery and both plugins.** Rewrite `drags()` with pointer events and `setPointerCapture`. Roughly 30 lines, no leaks, no globals, works identically on touch and mouse, and keyboard-accessible.
- **Split `script.js` into ES modules** — `i18n.js`, `nav.js`, `compare.js`, `gallery.js`, `modal.js` — loaded with `<script type="module" defer>`. No bundler required; browsers handle it natively.
- **Move the i18n dictionary to `i18n.json`, fetched once.** 130 keys inline in a script file is the main reason that file is hard to edit. Add the missing keys for `alt` and `aria-label`.
- **Guard every DOM lookup.** The top-level `.about-badge` code is a single-point failure for the entire site.
- **Adopt CSS logical properties throughout** — `margin-inline`, `inset-inline-start`, `text-align:start` — and delete the LTR patch block. The stylesheet already uses them in places; make it consistent and RTL/LTR becomes structural rather than patched.
- **Layer the CSS.** `@layer reset, tokens, base, layout, components, utilities`. It will end the `!important` escalation already visible on `.nav-cta`.
- **Delete the dead `about.html` styles** and merge the duplicate media query blocks.

### Performance

- Convert every photo to **AVIF with WebP fallback**, cap the long edge at 2000px, and ship `srcset` at 640/1024/1600. Realistically 71 MB → under 6 MB.
- Delete the 43 MB PNG and the three unused videos immediately — that is 46 MB of the repo gone with no visual change.
- Generate a real hero poster from frame one of the video and `preload` it. That poster becomes your LCP element and it should be small and instant.
- Set `width` and `height` on every image to eliminate layout shift.
- Self-host the two font families, `woff2`, Hebrew + Latin subsets, `font-display:swap`, `preload` the display face only. Removes two DNS lookups from the critical path.
- Drop Font Awesome for inline SVG — removes a third CDN and a webfont.
- Load the hero video only above 768px; serve mobile a still image. Video on cellular for a background loop is a poor trade.

### SEO and local search

- Expand `LocalBusiness` to include `address`, `url`, `image`, `geo`, `openingHoursSpecification`, `priceRange`, `@id`, and `areaServed` as structured `City` objects.
- Add `FAQPage` schema over the existing five questions — rich results, no new content needed.
- Add canonical, `og:image`, `og:locale`, favicon, `robots.txt`, `sitemap.xml`. Delete `meta keywords`.
- **Give English a real URL.** `/en/index.html` with reciprocal `hreflang`. As built, the English translation is invisible to search entirely.
- Alt text should describe the actual work in Hebrew — "מטבח עץ אלון לאחר צביעה בתנור בגוון לבן מט" beats "Kitchen after restoration" for both accessibility and image search.
- **Separate service pages are worth it — later.** `/kitchens`, `/doors`, `/furniture`, each with its own projects, FAQ and schema. חידוש מטבחים and צביעת דלתות are different searches with different intent and a single homepage can only rank well for one. Do this in Phase 4, once the portfolio content exists to fill them.

### Accessibility

- Fix the contrast failures — brass at `#8C6B3F` resolves the accent, and secondary text moves from `#888` to `#57534A`.
- Add a global `:focus-visible` style. Only `.work-card` has one today.
- Modal: focus trap, focus restore, direction-aware arrows.
- Slider: `role="slider"`, `aria-valuenow`, `aria-label`, arrow/Home/End keys, 56px handle.
- Filters: `aria-pressed`, a labelled group, and a live result count.
- Hero video: a pause control.
- Translate `aria-label` and `alt` with the rest of the interface.
- Complete the reduced-motion block: disable `scroll-behavior`, all reveals, and the auto-sweep.

---

## K. Information I need from you

Nothing below is assumed and nothing will be invented. Several proposed sections are blocked until these are answered — particularly Process, Materials, and anything numeric.

### Verification — blocks copy currently on the site

1. Is it 35 years or 40? The schema and the hero badge say 1986, which is 40 years as of 2026, while the copy says "35+" in four places. Which is correct?
2. Is "500+ projects" a real figure or an estimate? If it isn't verifiable I'd rather use something you can stand behind — "over 300 kitchens" is stronger than a round number that sounds invented.
3. Is "מומחה מוסמך / Certified Expert" based on an actual certification? If yes, from whom — I'd name it. If not, it should come off the site.
4. Are the three testimonials real customers? If yes, can we attribute them to Google or Facebook and link out? If not, they need to be removed until real ones exist.
5. Do you have Google Business reviews? A rating and count pulled from a real profile is worth more than any number of on-page quotes.
6. How long does a kitchen actually take? The site currently tells Hebrew readers one to two weeks and English readers one to two days.
7. Is there a workmanship guarantee? If there is a real one, it deserves its own place on the page. If not, we say nothing.

### Process — blocks the highest-value new section

8. Walk me through a kitchen job from the first phone call to handover, in your own words. I don't want to guess at the steps — the real sequence, including the unglamorous parts, is what convinces people.
9. Is the oven/spray painting done in your own workshop, or is it subcontracted?
10. Are doors removed and taken away, or is everything done on site? This is one of the first things a customer wants to know.
11. What does preparation involve — sanding grades, degreasing, priming, how many coats? Specificity here is what separates you from a cheap painter.
12. How long does the kitchen stay unusable?

### Materials and capability

13. Which paint and lacquer brands do you actually use? Named products are one of the strongest and cheapest credibility signals available.
14. What finish options can a customer choose — matte, satin, gloss, textured? A finish menu is genuinely useful content.
15. What equipment do you own? Spray booth, curing oven, extraction, HVLP gun. Photographs of professional equipment do real work on this kind of site.
16. Are there materials or substrates you deliberately won't work with? Saying no to something makes every yes more credible.

### Photography — the largest gap

17. Do you have any photographs of Mansour working? The About section currently has no human being in it, which is a significant loss for a business whose whole story is one craftsman's four decades.
18. Are there workshop or spray-booth photos?
19. Can we get close-up detail shots of finished surfaces — an edge, a corner, a hinge, grain? Two or three of these would lift the perceived quality of the entire site.
20. Do you have process shots — masking, sanding, spraying, a piece mid-job?
21. For the existing before/after pairs, are there better-matched "before" photos? Slide 1's before and after are shot from completely different positions.
22. Can we go back to any completed kitchens for proper photography? One professionally shot kitchen would carry the whole homepage.

### Business and positioning

23. Which areas do you genuinely serve? The site says Haifa and Tel Aviv, but a testimonial is from Tiberias.
24. What is the realistic price range for a kitchen? Even a "from ₪X" figure filters out the wrong enquiries and signals confidence.
25. Which projects are most profitable and which do you most want more of? The homepage should be weighted toward those, and right now it treats all five categories equally.
26. Do customers mostly arrive by WhatsApp or by phone? It determines which action gets primary weight.
27. Can customers send photos over WhatsApp for an initial estimate? If yes, that becomes the main call to action across the site.
28. What can you do that competitors technically can't? This is the sentence the whole redesign should be built around, and I don't have it yet.
29. Is there a business address, and is it a workshop customers could visit?

---

## L. Implementation roadmap

Ordered so that each phase ships something visible and nothing depends on information you haven't given me yet — except Phase 2's process section, which is flagged.

### Phase 0 — Repairs

Everything in the Critical list, with no design changes at all: the case-mismatched filename, the 43 MB PNG, the missing hero poster, the hidden desktop phone number, the eager 3.7 MB image, the FAQ contradiction, the 35/40 discrepancy, the duplicated and unguarded badge code, and deleting the unused libraries and 7.5 MB of orphan assets. Ship this on its own — it is a materially better site by the end of it.

- Impact: **High** · Complexity: **Low** · Regression risk: **Low**

### Phase 1 — Visual refinement, structure untouched

New palette tokens, Frank Ruhl Libre added, weights 700–900 dropped, radii to 0–2px, shadows removed, section padding opened up, card chrome stripped from the portfolio, gold fills reduced to brass accents, the 3D badge and the WhatsApp pulse removed, contrast fixed, focus states added. Same HTML, almost entirely CSS. This is where the largest perceived-quality gain per unit of effort sits.

- Impact: **High** · Complexity: **Medium** · Regression risk: **Low**

### Phase 2 — Portfolio and storytelling

Reorder the homepage. Build the full-bleed featured transformation and the three alternating featured projects. Rewrite the comparison slider without jQuery, with correct ratios, keyboard support and the one-time auto-sweep. Convert services from icon cards to a typographic index. Rework About around a photograph of Mansour. Add the process and materials sections — *blocked on section K*.

- Impact: **High** · Complexity: **High** · Regression risk: **Medium**

### Phase 3 — Conversion and mobile

Sticky mobile contact bar, the CTA after the featured work, the photo-first WhatsApp flow with a pre-filled message, per-project enquiry from the modal, the static fallback form, single-column mobile portfolio, full-screen mobile modal, scrollable filter row.

- Impact: **High** · Complexity: **Medium** · Regression risk: **Medium**

### Phase 4 — Performance, SEO, accessibility

AVIF/WebP conversion with `srcset`, self-hosted subset fonts, Font Awesome replaced with inline SVG, ES module split, i18n moved to JSON with alt and aria coverage, expanded LocalBusiness and FAQPage schema, `/en/` with `hreflang`, sitemap and robots, full accessibility pass. Then evaluate dedicated service pages.

- Impact: **Medium** · Complexity: **Medium** · Regression risk: **Low**

---

*End of audit. No files modified. Awaiting answers to section K.*
