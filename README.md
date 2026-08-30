# Annie's Yoga

Website for Annie's Yoga, with sections for classes, retreats, photos, and contact details.

## Contact form setup (zero-cost Turnstile and Worker)

The browser obtains a Cloudflare Turnstile token and sends the form to a Cloudflare Worker. The Worker validates the token and sends accepted submissions to Annie through a destination-restricted Cloudflare Email binding. No email credential or Turnstile secret enters the public website bundle.

### Human setup required

1. Create or sign into a Cloudflare account and remain on the **Workers Free** plan. Do not enable a paid Workers subscription.
2. In Cloudflare Turnstile, create one widget in **Managed** mode. Restrict it to the live website hostname. The code supplies `interaction-only`, flexible sizing, and a light theme.
3. Copy `.env.example` to `.env.local`. Add the widget's public site key and, after the Worker is deployed, its public endpoint. Never put the Turnstile secret in a `VITE_` variable.
4. In `wrangler.jsonc`, replace both hostname placeholders. `ALLOWED_ORIGINS` needs the complete origin including `https://`; `ALLOWED_TURNSTILE_HOSTNAMES` needs only the hostname.
5. Add `anniesyoga.uk` to Cloudflare DNS on the Free plan, enable Email Routing, and verify `anniesyoga@yahoo.ie` as a destination address.
6. Sign into Wrangler with `npx wrangler login`, then add the Turnstile secret when prompted:

   ```bash
   npx wrangler secret put TURNSTILE_SECRET
   ```

7. Deploy the Worker with `npm run worker:deploy`. Copy its `https://...workers.dev` endpoint.
8. In the GitHub repository's Actions variables, create `TURNSTILE_SITE_KEY` and `FORMS_ENDPOINT`. These are intentionally public values. Remove the obsolete `WEB3FORMS_ACCESS_KEY` Actions secret after confirming the new deployment works.
9. Deploy the website and test both a general enquiry and a class reservation. Confirm delivery, reply-to behavior, Turnstile analytics, and the direct email/telephone fallback.

For local frontend development, Cloudflare's official Turnstile test site key can be used in `.env.local`. For end-to-end local Worker testing, add `http://127.0.0.1:4173` to `ALLOWED_ORIGINS` and `localhost` to `ALLOWED_TURNSTILE_HOSTNAMES` only in a local Wrangler environment; do not allow local hostnames in production.

If the Worker reaches its Free-plan limit, it fails closed and the website retains direct email and telephone contact options. It must not be changed to a paid subscription automatically.

## Run it

```bash
npm run dev
```

## Build it

```bash
npm run build
```
