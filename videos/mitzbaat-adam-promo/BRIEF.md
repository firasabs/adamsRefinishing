---
workflow: product-launch-video
flow: automation
storyboard: no
message: "A tired kitchen or piece of furniture doesn't need replacing — 35 years of craft can make it look brand new."
destination: instagram-facebook-reels-stories-tiktok
aspect: 1080x1920
language: he
length: 30s
angle: before-after-transformation-reveal
narration: no
audience: homeowners in Haifa and the surrounding area considering a kitchen or furniture refresh
---

## Intent

A promotional ad for מצבעת אדם (Mitzbaat Adam), Mansour Abu Saada's kitchen-
renewal and furniture/door-painting business in Haifa, to run as a social
video ad. Sell, not just show: the goal is to generate leads via the site's
free-quote CTA. Lead with the site's strongest asset — its real before/after
transformation photos — cut fast, punchy, and silent-friendly (captions/
on-screen text carry the message since social video is watched muted).
Close on the brand and the free-quote CTA. Tone: confident, warm,
craftsman-pride — not corporate.

## Assets

- index.html / front/ (this repo) — the business's own site; use as the
  no-capture source of truth for brand, copy, and imagery instead of
  re-crawling the live URL, since the real files are already local:
  - front/images/kitchens/before1.jpeg, after1.jpg, before2.jpg, after2.jpg,
    ze1.jpg/ze1B.jpg, ze2.jpg/ze2B.jpg, kbabir_A1.jpg/kbabir_B1.jpg,
    tavoon1.jpg/tavoon2.jpg — real before/after kitchen pairs, the video's
    core visual proof.
  - front/images/doors/door1A.jpg / door1B.jpg — door refinishing before/after.
  - front/images/rehet/reh1A.jpg / reh1B.jpg — furniture before/after.
  - front/images/logo/trans_airgun.png, favicon-512.png — brand logo for the
    closing sting.
  - front/videos/heroBackground.mp4 — existing hero footage, usable as a
    craftsman/work b-roll cutaway if it fits the pace.
  - index.html `#testimonials` — real customer testimonial copy, usable as a
    proof line if a beat has room.
  - meta description: "מנסור אבו סעדה — מעל 35 שנה ניסיון בצביעה וחידוש
    מטבחים, דלתות ורהיטי עץ. הגעה עד הבית. הצעת מחיר חינם." — source of the
    35-years/home-visit/free-quote claims.

## Customizations

- Silent-first design: burned-in captions/on-screen text instead of
  voiceover, since Reels/Stories/TikTok are typically watched muted.
- Logo sting close with the free-quote CTA text (site's own
  "קבלו הצעת מחיר חינם").

## Notes

- Concept, platform, length, and process were confirmed via a 4-question
  pick (pitch round + must-haves + run-shape) rather than free-form chat;
  answers are locked above.
- No-capture path: the source files already exist locally in this repo, so
  the workflow should seed `capture/` from them by hand per the route's
  no-capture instructions, rather than crawling the live URL, to avoid
  losing fidelity to a re-compressed/rescaled crawl of the same images.
- Fully silent audio (no narration, no music) unless the user asks for a
  music bed later — local TTS/BGM engines (Kokoro/MusicGen) are not
  installed in this environment and HeyGen sign-in was skipped for the
  autonomous run.
