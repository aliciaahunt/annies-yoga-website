# Contact page maps: professional pattern and implementation recommendation

## Scope and current constraint

The site is a static React 19/Vite 8 application deployed to GitHub Pages. Its current contact page presents four equal bordered tiles for phone, email, timetable, and a combined “Strabane & Castlederg” location. The repository contains Annie's phone (`07716 034570`), email (`anniesyoga@yahoo.ie`), and town names, but **no street address or named venue for either town**. It also currently repeats “retreats” in the hero sentence.

That missing address is decisive: a professional map should never imply that a town-centre pin is the class venue. Exact venue names/addresses must be confirmed before publishing venue maps or directions.

## What strong first-party studio sites do

- [triyoga's locations page](https://triyoga.co.uk/locations/) gives each studio its own clearly labelled group: full address, “view on Google Maps,” local phone/email, more information, and schedule. Its individual [Chelsea studio page](https://triyoga.co.uk/locations/triyoga-chelsea/) adds opening hours, nearest stations, Google Maps directions, and parking guidance. The lesson for Annie's smaller site is the grouping, not the volume: treat Strabane and Castlederg as two distinct places rather than one generic contact tile.
- [CorePower Yoga's Manhattan Beach studio page](https://www.corepoweryoga.com/yoga-studios/ca/los-angeles/manhattan-beach) places a map/address and directions alongside the class schedule, then provides practical arrival information such as parking and how to find the entrance. The useful pattern is “place + directions + arrival detail,” not an ornamental map by itself.
- [Hotpod Yoga's studio finder](https://hotpodyoga.com/studios/) makes location name and complete address the primary scanning information. This supports using one repeated, consistent location component per town.
- Locally, [Studio 52 Belfast](https://studio52.yoga/contact-us) separates “Get in touch” from “Our Location,” describes the surrounding landmarks, provides parking advice, and offers “Get Directions.” This is especially relevant to a local independent teacher: warm explanatory copy can coexist with practical travel information.
- [Iyengar Yoga UK's Manchester centre profile](https://iyengaryoga.org.uk/groups/manchester-and-district-iyengar-yoga-2/) exposes the postal address, phone and email in a compact factual block before longer descriptive content. This reinforces putting essentials before narrative.

Across these examples, professional presentation comes from information hierarchy: direct contact first, distinct venue blocks second, and practical actions/details beside each venue. A four-cell “feature grid” is less appropriate because phone, email, timetable and venue are different information types, not equivalent products.

## Recommended page structure

1. Retain the dark contact hero, but fix the duplicated “retreats” and keep its introduction brief.
2. Replace the four equal option cells with a two-column “Contact Annie” section:
   - left: `Annie` (or `Annie [surname]` only if supplied), phone and email as semantic links;
   - right: a short response expectation and the existing timetable action.
3. Follow with a dedicated “Class locations” section containing two consistent location panels: **Strabane** and **Castlederg**.
4. Each panel should contain, in this order:
   - town heading;
   - confirmed venue name and postal address;
   - one concise arrival/parking note if useful;
   - “Get directions” external link;
   - responsive map below or alongside the details.
5. Do not repeat Annie's phone/email inside both location panels unless the venues genuinely have different contact details.

Visually, use generous whitespace, one subtle divider between locations, and no boxed four-cell dashboard. On wide screens, alternate or consistently pair map/details at roughly 55/45; on mobile, stack details before the map so the usable address and directions link are encountered first.

## Map method

### Recommended: Google Maps “Share or embed map” iframe

For this small static site, generate each iframe manually from the confirmed place in Google Maps: **Share → Embed a map → Copy HTML**. This official workflow is documented by [Google Maps Help](https://support.google.com/maps/answer/7101463?co=GENIE.Platform%3DDesktop&hl=en). It produces a fixed iframe URL and does not require application JavaScript, a Cloud project, or an API key managed in this public GitHub Pages repository.

Do not hand-construct an undocumented `output=embed` URL. Store the two exact, Google-generated `src` values as content constants and render them through a small reusable `LocationPanel` component.

The alternative [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) is unnecessary here. It requires a key in its iframe URL. If it is later chosen for configurable modes, Google says to use a separate key restricted to Maps Embed API and, ideally, website referrers ([security guidance](https://developers.google.com/maps/api-security-best-practices)). A Vite environment variable would not make a browser-delivered key secret; restriction, not concealment, is the protection.

### Multiple pins

Prefer two individual place embeds, one per location. A single combined map weakens the association between a class venue and its directions action. Google My Maps would support a bespoke multi-pin map, but adds another owned artefact/account dependency and is not justified for only two locations.

## Accessibility, privacy, and performance

- Give each iframe a unique descriptive title, e.g. `Map showing Annie's Yoga class venue in Strabane`; never rely on the map as the only source of the address.
- Keep the postal address in normal HTML using `<address>` (with its default italic styling reset) and provide a normal external “Get directions” link. Maps may fail, be blocked, or be difficult for keyboard/screen-reader users.
- Use `loading="lazy"` on both iframes. Google’s official Embed API example also uses lazy loading, and the map must remain at least 200×200px; target approximately 420–480px high on desktop and 300–360px on mobile.
- Use `referrerPolicy="strict-origin-when-cross-origin"`, `allowFullScreen`, a CSS border of zero, and a responsive wrapper with `width: 100%`.
- Do not place interactive buttons over the map. Give the map a visible boundary and enough separation from surrounding scroll content, especially on mobile.
- An embedded Google Map is third-party content. Google's [privacy policy](https://policies.google.com/privacy/embedded?hl=en-US) explicitly includes embedded Google Maps and describes collection/storage technologies including cookies, local storage and server logs. The site's privacy/cookie disclosure should therefore mention Google Maps before release.
- Privacy-best option: render a styled, non-tracking location placeholder and explicit “Load Google Map” button; only insert the iframe after consent/click. This also prevents map downloads until requested. For a lightweight local site without an existing consent manager, this click-to-load pattern is preferable if privacy minimisation is a priority; otherwise lazy-load the iframe and disclose it clearly.
- External directions links should open in the same tab by default. If product preference requires a new tab, add `target="_blank" rel="noreferrer"` and indicate the behaviour accessibly.

## Exact React/Vite implementation guidance

1. Obtain and verify Annie's full name (if it should be displayed), exact venue name, street address/postcode, parking/entrance note, and Google Maps listing for both towns. This is a content prerequisite, not a coding detail.
2. In `src/app/ContactPage.tsx`, model two immutable location records (`name`, `venue`, `addressLines`, `directionsUrl`, `embedUrl`, optional `arrivalNote`). Keeping the details together prevents mismatched pins and addresses.
3. Add a local reusable `LocationPanel` component or, if locations will appear elsewhere, `src/components/LocationPanel.tsx`. Render headings in document order and use `<address>`, `<a>`, and a titled `<iframe>`.
4. Replace `.contact-page-options-grid` with purpose-specific CSS: a compact contact details layout followed by `.contact-locations` and `.contact-location` sections. Avoid borders on every edge; use a single hairline separator or quiet paper/cream contrast.
5. Make phone and email full, comfortably sized text links with visible hover and `:focus-visible` states using the site's established dark moss interaction colour. Keep display formatting human-readable while `tel:` remains international.
6. Set iframe `width="600" height="450"` as intrinsic fallbacks, then override responsively in CSS. Use `loading="lazy"`, `title`, `allowFullScreen`, `referrerPolicy="strict-origin-when-cross-origin"`, and `style={{ border: 0 }}` or a class.
7. If click-to-load is selected, keep consent state local to each map (`useState(false)`), make the placeholder height match the eventual iframe to avoid layout shift, and make the button explain that loading connects to Google Maps.
8. Update `/contact` metadata to mention contact and class locations in Strabane and Castlederg. Correct the duplicate “retreats” copy.
9. Verify keyboard focus, narrow widths down to 320px, iframe title exposure, phone/email/directions links, and that each visible address exactly matches its embedded pin. Run lint, TypeScript/build, and a production-page visual check.

## Recommendation in one sentence

Build a warm direct-contact block followed by two spacious, repeated venue sections with confirmed HTML addresses, directions links, and individually lazy-loaded (or click-to-load) official Google Maps share embeds; do **not** ship maps until exact venues are confirmed.
