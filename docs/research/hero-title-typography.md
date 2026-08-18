# Hero title typography for “Annie’s Yoga”

Accessed: 18 August 2026

## Recommendation

Use **“Annie’s Yoga” on one line in the existing serif**, with a responsive size of approximately **48px on small phones, scaling to 72px on desktop**, a **regular/light-medium weight (400)**, line-height around **0.95–1.0**, and slightly tight tracking (about **-0.035em**).

Suggested CSS starting point:

```css
.hero h1.home-title {
  max-width: 12ch;
  font-size: clamp(48px, 5.25vw, 72px);
  font-weight: 400;
  line-height: .96;
  letter-spacing: -.035em;
  text-wrap: balance;
}
```

This is deliberately **not heavy bold**. For a short personal studio name, a regular serif reads as confident and premium; bold would push the visual language toward fitness promotion and compete unnecessarily with the photograph. Weight 400 is also sturdier than the site's current 300 and is less vulnerable to looking faint over a variable photographic background.

## Evidence from current first-party sites

- [CorePower Yoga](https://www.corepoweryoga.com/) uses short, direct promotional hero copy (“Try a Free Week!”) with a compact supporting line and CTA. Its visual hierarchy is assertive, but its brand name remains a separate logo rather than an oversized text headline. This supports keeping a personal brand-title concise and distinct from the CTA.
- [Equinox](https://www.equinox.com/) presents short hero/module headings (“Everything Equinox Has to Offer”; “Where Luxury and Fitness Meet”) as compact display text rather than extremely thin, screen-filling type. It separates the heading, one restrained supporting sentence, and CTA—useful evidence for a premium service hierarchy.
- [Headspace](https://www.headspace.com/meditation) uses concise, plain-language display headings such as “Meditation made simple,” with a separate supporting line. The emphasis comes from scale and spacing rather than an ultra-heavy weight, matching the calmer category tone.
- [Apple](https://www.apple.com/) is a useful premium-editorial comparator for very short names. Its current homepage uses short product headings such as “iPhone” and “MacBook Air.” The first-party stylesheet sets headings to **font-weight 600** and its responsive display scale includes **40px, 48px and 56px** sizes; this shows that short names do not need 100px+ type to establish hierarchy. Apple’s sans-serif can tolerate 600; the more delicate serif on Annie’s site should stop at 400 rather than imitate that weight literally.

These examples vary by campaign and viewport, so they support a range and hierarchy—not a universal magic pixel size. At a common 1440px desktop width, the recommended 72px maximum is about **5vw**; at a 390px phone width, 48px is about **12vw**. The `clamp()` interpolation avoids abrupt breakpoint jumps and prevents the title from becoming either tiny on phones or billboard-sized on large screens.

## Readability and accessibility constraints

- WCAG 2.2 requires at least **3:1 contrast for large text** and notes that unusually thin strokes can appear fainter in practice even when the nominal color passes. It explicitly recommends stronger/thicker lines or exceeding the minimum contrast where thin type is used. That supports moving from weight 300 to 400 and retaining the dark overlay behind the white title. [W3C: Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- Text must remain usable when resized to 200%; therefore the title should stay as live HTML text, use a bounded responsive scale, and avoid fixed-height text containers that clip. [W3C: Understanding SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- `clamp(minimum, preferred, maximum)` is an established responsive CSS pattern that preserves readable bounds while adapting continuously to the viewport. [web.dev: CSS min(), max(), and clamp()](https://web.dev/articles/min-max-clamp)

## Fit with this site

The current homepage override is only `clamp(23px, calc(2.733vw - 1px), 42.33px)`, one third of the original slogan scale. That is too subdued for a two-word brand title in a full-viewport hero and risks reading like supporting copy. The broader site already uses a light editorial serif with large headings; **48–72px at weight 400** restores hierarchy without returning to the previous 69–127px slogan treatment.

Keep the title on one line wherever it fits. At the 320px supported minimum viewport, 48px may wrap depending on the font metrics and content padding; if visual testing shows a wrap, lower only the phone minimum to 44px rather than forcing overflow or reducing the desktop treatment.
