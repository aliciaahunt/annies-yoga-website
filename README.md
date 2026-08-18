# Annie's Yoga

Website for Annie's Yoga, with sections for classes, retreats, photos, and contact details.

## Contact form setup

The enquiry form submits through Web3Forms and uses its free hCaptcha integration. To enable it in production:

1. Create and verify a Web3Forms access key for `anniesyoga@yahoo.ie`.
2. In the Web3Forms dashboard, enable hCaptcha for the form.
3. In the GitHub repository, add an Actions secret named `WEB3FORMS_ACCESS_KEY` containing that key.
4. Deploy the site and send a test enquiry. Check Annie's inbox and spam folder, then confirm that replying addresses the visitor's email.

For local testing, copy `.env.example` to `.env.local` and replace the placeholder. The access key identifies the public form and is visible in the deployed browser bundle even when supplied through a GitHub secret.

If spam becomes significant, rotate the Web3Forms access key and update the GitHub secret. If the free allowance becomes insufficient, assess Web3Forms domain restriction, Formspree, or a serverless contact endpoint. The direct phone and email links should remain available if the form provider is unavailable.

## Run it

```bash
npm run dev
```

## Build it

```bash
npm run build
```
