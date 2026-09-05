---
format: 1080x1920
duration: 29s
message: "A tired kitchen or piece of furniture doesn't need replacing — 35 years of craft can make it look brand new."
arc: BAB (before -> after tease -> proof -> CTA)
audience: homeowners in Haifa and the surrounding area considering a kitchen or furniture refresh
mode: autonomous
music: none
---

## Video direction

**Fully silent** (no narration, no BGM, no SFX — `music: none` + no `SCRIPT.md`, the canonical
silent marker). No spoken cues exist, so reveals are paced to a fixed per-frame cue rhythm
designed below instead of a voiceover — the same anti-front-loading discipline still applies:
nothing dumps at t=0, each further piece (a badge, a label, a line) lands on its own window, and
every frame ends on a held read before the harness transition takes over.

- **Palette system** (from `frame.md`, roles as remixed onto the brand): `{colors.bg}` white
  `#ffffff` is the default photo-reveal ground; `{colors.dark}` ink `#111111` is body copy,
  borders, and the Frame 6 statement panel; `{colors.red}`-role — actually the brand's darker
  gold `#b8893e` — is the lone accent: every badge, label chip, underline, and the progress bar;
  `{colors.light}`-role — the brand's lighter gold `#CDA255` — used only for off-white/alternate
  stripe panels. No fifth color anywhere. Type: Heebo for both display and body (Shrikhand has no
  Hebrew glyphs, so display headlines also render in Heebo at heavy weight per `frame.md`'s
  brand-adaptation note); Space Grotesk chrome stays Latin/numerals only (mono labels, the ★★★★★
  rating).
- **Motion grammar**: long-tail `power3` eases throughout (smooth, never bouncy, save the one
  earned spring-pop per beat that the source blueprints call for — inner-edge badges, the logo
  mark, the CTA line). Reveal model: each frame's Scene 1 shows only its entry move, later
  Scenes add one further piece at a time, and the final Scene is a held read — a subtle
  phase-opposed idle float (never synchronized, never lazy breathing) is the only thing allowed
  to move during a hold.
- **Rhythm / held-frame allocation**: Frame 1 (hook) and Frame 6 (35-years statement) are the
  video's two deliberate breather beats — low motion, calm holds. Frames 2–5 (the four
  `comparison-split` reveals) run at a near-identical brisk cadence so they read as one montage
  movement, not four separate videos. Frame 7 ends on the longest hold in the piece (the logo
  lockup), per `logo-assemble-lockup`'s Brand_Outro convention.
- **Structural transitions**: `zoom-through` marks the two state changes (hook → first proof;
  proof run → statement); `crossfade` links same-world beats (within the reveal run, and
  statement → close).
- **Negative list**: no stock imagery beyond the real captured before/after pairs; no rounded
  corners anywhere except the CTA's one hint-pill (Bold Poster is square-corner); no shadow
  beyond the system's double-border / red-leftbar / stacked-text-shadow vocabulary — no generic
  box-shadow; no color outside bg / dark / gold-dark / gold-light; avoid both motion failure
  modes — slideshow (front-load then freeze) and screensaver (elements drifting independently of
  the beat).
- **Caption-band**: no auto-caption pass runs (silent, nothing to transcribe), but every frame
  still plans its content into the top ~83% for platform-UI safety (Reels/Stories controls sit in
  the bottom band).

## Frame 1 — Hook

- scene: Full-bleed, slightly dim/desaturated shot of the tired "before" kitchen; the question types/snaps on over it
- voiceover: ""
- duration: 3s
- transition_in: cut
- status: outline
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Pain validation
- beat: recognition
- blueprint: kinetic-type-beats
- focal: assets/before2.jpg
- roles: before2.jpg = background (dim ~55% with a dark-panel scrim, desaturate slightly)
- asset_candidates: assets/before2.jpg — dated kitchen, worn cabinet doors, before refinishing
- on_screen_text: "מטבח ישן?\nרהיט שנשכח?"

Adapt: keep the signature — the words ARE the motion, arriving and clearing as one hard-cut
beat — but the "bare canvas" becomes the dimmed before-photo so the viewer's own tired kitchen
is on screen before the video says anything else.

Scene 1 (0.0–0.6s): before2.jpg fills the frame under a ~55% dark scrim; "מטבח ישן?" arrives
dead-center via per-word staggered fade — centered, upper-third (the golden position).
Scene 2 (0.6–1.6s): line 1 holds; "רהיט שנשכח?" fades in just below it the same way; a thin gold
underline draws on left→right beneath "ישן?" — stacked two-line centered composition.
Scene 3 (1.6–3.0s): both lines hold, static — no further motion, the recognition beat is left to
land — hard cut into Frame 2's `zoom-through`.

## Frame 2 — Reveal: Kitchen

- scene: Before/after kitchen pair held side by side, mirrored book-open tilt, "לפני" / "אחרי" pill badges pop on each half
- voiceover: ""
- duration: 5s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/02-reveal-kitchen-1.html
- type: product_intro
- persuasion: Show-don't-tell proof
- beat: relief
- blueprint: comparison-split
- focal: assets/after2.jpg
- roles: before2.jpg = cutout-left, after2.jpg = cutout-right
- asset_candidates: assets/before2.jpg — dated kitchen before; assets/after2.jpg — same kitchen refinished, fresh cabinet color and hardware
- on_screen_text: "לפני / אחרי"

Adapt: keep the signature split-tilt entry and inner-edge badge pop; drop the blueprint's usual
Scene-1 title line — with only 5s and two full photos to show, the badges alone (לפני / אחרי)
carry all the labeling this frame needs. The state change from Frame 1's tease, made visible:
this is the video's thesis frame — everything after is more evidence of the same trick.

Scene 1 (0.0–1.9s): split-tilt entry (signature) — before2.jpg enters from the left with a +tilt
`rotateY` book-open, after2.jpg enters from the right ~0.2s behind with a mirrored −tilt, both
scaling 0.85→1 into a symmetric split-screen spread.
Scene 2 (1.9–2.8s): inner-edge badge pop — a gold "לפני" pill spring-pops onto the left card's
inner edge, a gold "אחרי" pill spring-pops onto the right card's inner edge ~0.3s later (the
lone overshoot in the shot).
Scene 3 (2.8–5.0s): held spread — gentle phase-opposed idle float (left `sin(t)`, right
`sin(t+π)`, subtle jitter only); crossfades out via `zoom-through` into Frame 3.

## Frame 3 — Reveal: Kitchen 2

- scene: Second kitchen before/after pair, same comparison-split shape for rhythm
- voiceover: ""
- duration: 5s
- transition_in: crossfade
- status: outline
- src: compositions/frames/03-reveal-kitchen-2.html
- type: feature_showcase
- persuasion: Rule of three (proof point 2 of 3)
- beat: confidence
- blueprint: comparison-split
- focal: assets/ze1B.jpg
- roles: ze1.jpg = cutout-left, ze1B.jpg = cutout-right
- asset_candidates: assets/ze1.jpg — second kitchen, dated wood-tone cabinets, before; assets/ze1B.jpg — same kitchen repainted, modern finish
- on_screen_text: "חידוש מטבחים"

Adapt: keep the split-tilt signature entry; swap the twin לפני/אחרי badges for a single
bottom-center label chip naming the service — Frame 2 already taught the before/after grammar,
so this beat graduates to naming what was just proven instead of repeating the same labels.
Second proof point — repetition builds the case that Frame 2 wasn't a lucky one-off.

Scene 1 (0.0–1.7s): split-tilt entry (signature) — ze1.jpg from the left (+tilt), ze1B.jpg from
the right (−tilt, ~0.2s behind), scale 0.85→1.
Scene 2 (1.7–2.6s): a gold label chip "חידוש מטבחים" spring-pops in bottom-center beneath the
split, inside the top-83% safe area.
Scene 3 (2.6–5.0s): held spread, phase-opposed idle float; crossfades into Frame 4.

## Frame 4 — Reveal: Door

- scene: Entrance door before/after pair, comparison-split
- voiceover: ""
- duration: 4s
- transition_in: crossfade
- status: outline
- src: compositions/frames/04-reveal-door.html
- type: feature_showcase
- persuasion: Value stacking (breadth of service)
- beat: confidence
- blueprint: comparison-split
- focal: assets/door1B.jpg
- roles: door1A.jpg = cutout-left, door1B.jpg = cutout-right
- asset_candidates: assets/door1A.jpg — entrance door, worn/faded paint, before; assets/door1B.jpg — same door freshly painted, after
- on_screen_text: "צביעת דלתות"

Broadens the promise from "kitchens" to "anything wood in your home" without a word of narration
— the service label is the only new information.

Scene 1 (0.0–1.6s): split-tilt entry — door1A.jpg left (+tilt), door1B.jpg right (−tilt, ~0.2s
behind).
Scene 2 (1.6–2.4s): label chip "צביעת דלתות" spring-pops bottom-center.
Scene 3 (2.4–4.0s): held spread, subtle idle float; crossfades into Frame 5.

## Frame 5 — Reveal: Furniture + testimonial

- scene: Furniture before/after pair, comparison-split; a real 5-star testimonial line settles under it
- voiceover: ""
- duration: 4.5s
- transition_in: crossfade
- status: outline
- src: compositions/frames/05-reveal-furniture.html
- type: social_proof
- persuasion: Social proof
- beat: trust
- blueprint: comparison-split
- focal: assets/reh1B.jpg
- roles: reh1A.jpg = cutout-left, reh1B.jpg = cutout-right
- asset_candidates: assets/reh1A.jpg — worn wood furniture piece, before; assets/reh1B.jpg — same piece repainted/refinished, after
- on_screen_text: "רהיטי עץ"
- proof_quote: "★★★★★ העבודה יצאה מדהימה! המטבח נראה כמו חדש לגמרי. — שרה כ., חיפה"

Closes the proof run on furniture, then hands off directly to a real customer's words instead of
the brand's own claim — the highest-trust beat before the ask.

Scene 1 (0.0–1.6s): split-tilt entry — reh1A.jpg left (+tilt), reh1B.jpg right (−tilt, ~0.2s
behind).
Scene 2 (1.6–2.4s): label chip "רהיטי עץ" spring-pops bottom-center, slightly higher than
Frames 3–4's chip position to leave room below.
Scene 3 (2.4–4.5s): the split holds (idle float) while the testimonial line fades up from the
lower third in a red-leftbar-card strip — "★★★★★ העבודה יצאה מדהימה! המטבח נראה כמו חדש לגמרי." on
one line, "— שרה כ., חיפה" on a second, smaller line beneath — settles and holds to the cut.

## Frame 6 — Proof: 35 years

- scene: Calm statement card — the brand's own claim, no photo — "35+ years", "we come to your home", "free quote"
- voiceover: ""
- duration: 3.5s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/06-proof-stat.html
- type: branding
- persuasion: Authority by association (experience)
- beat: confidence
- blueprint: titlecard-reveal
- focal: (none — typographic statement)
- roles: (none — dark-panel canvas, no photo)
- asset_candidates:
- on_screen_text: "מעל 35 שנה\nשל אהבה למקצוע"
- sub_text: "הגעה עד הבית · הצעת מחיר חינם"

The breather beat: after four fast proof cuts, one still card states the brand's authority
plainly before the close. Ground switches to the dark panel (`{colors.dark}`) for contrast after
five bright photo beats.

Scene 1 (0.0–0.4s): static dark-panel canvas establishes the calm break.
Scene 2 (0.4–1.5s): "מעל 35 שנה" fades in centered while scaling ~95%→100%, gold, smooth ease-out.
Scene 3 (1.5–3.5s): the one slide-up crossfade (signature) — "מעל 35 שנה" translates up and fades
as "של אהבה למקצוע" translates up from below to take its place at center; once settled, the
sub-line "הגעה עד הבית · הצעת מחיר חינם" fades in beneath in mono chrome and holds to the cut.

## Frame 7 — CTA / Outro

- scene: Logo mark draws in and locks up center-frame; the CTA line and tagline settle beneath it
- voiceover: ""
- duration: 4s
- transition_in: crossfade
- status: outline
- src: compositions/frames/07-cta-outro.html
- type: cta
- persuasion: Risk reversal (free, no obligation)
- beat: motivation
- blueprint: logo-assemble-lockup
- focal: assets/trans_airgun.png
- roles: trans_airgun.png = cutout (centered mark)
- asset_candidates: assets/trans_airgun.png — primary brand mark for the closing sting
- on_screen_text: "קבלו הצעת מחיר חינם"
- sub_text: "מצבעת אדם · חידוש מטבחים וצביעת רהיטים · חיפה והסביבה"

Adapt: the mark is a raster PNG with no vector parts to assemble or orbit, so this reproduces the
settled-lockup-reveal resolution directly rather than a parts-build — the mark is on stage from
the first frame with no satellites, keeping the accent-underline-sweep + tagline-wipe-in as the
signature beat. The one ask, plainly stated, under the brand's own mark — held to the final
frame, the longest hold in the video.

Scene 1 (0.0–0.9s): on the light/beige ground, the logo mark spring-pops in centered from a slight
scale-down (98%→100%) with a soft gold ambient-glow bloom behind it.
Scene 2 (0.9–1.8s): a gold accent underline draws on left→right beneath the mark; "קבלו הצעת
מחיר חינם" wipes in word by word beneath it.
Scene 3 (1.8–4.0s): the tagline "מצבעת אדם · חידוש מטבחים וצביעת רהיטים · חיפה והסביבה" settles in
mono chrome beneath the CTA line; the whole lockup holds dead static to the final frame.
