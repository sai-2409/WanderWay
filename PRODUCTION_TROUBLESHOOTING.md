# Production Troubleshooting

Quick checks when the booking form or emails fail in production.

## 1. Environment variables (Render dashboard)

```bash
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=WanderWay <booking@wanderway-industry.org>
EMAIL_TO=your_business@gmail.com
```

- No extra spaces in values
- `EMAIL_FROM` must use a **verified domain** in [Resend Domains](https://resend.com/domains)
- For quick tests only, Resend allows `onboarding@resend.dev` as the from address

## 2. Test endpoints

| URL | Expected |
|-----|----------|
| `/api/debug` | JSON with `provider: "resend"`, `hasApiKey: true` |
| `/api/test-email` | "Test email sent to …" |
| `/thankYou.html` | Thank-you page loads |

## 3. Form shows an error instead of a blank page

The form uses JavaScript `fetch` to `POST /api/book`. If something fails, a red banner appears on the form. Check Render **Logs** for `Business email failed` or `Customer email failed`.

**Policy:** Booking succeeds if the **business** email sends. If only the customer email fails, a yellow notice appears on the thank-you page.

## 4. Common Resend errors

| Symptom | Fix |
|---------|-----|
| Domain not verified | Add DNS records in Resend, wait for verification |
| Invalid `from` address | Use an email on your verified domain in `EMAIL_FROM` |
| 403 / API key | Create a new key at [resend.com/api-keys](https://resend.com/api-keys) |
| Works locally, not on Render | Env vars not set on the Render service |

## 5. Manual booking test

```bash
curl -X POST https://wanderway-industry.org/api/book \
  -H "Accept: application/json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Full Name=Test&Email Address=test@example.com&Tour Type=Basic Tour&Number=2&Tour Date=2026-06-01&Tour Time=10:00 AM"
```

Expect JSON: `{ "ok": true, "redirect": "/thankYou.html" }`.

## 6. Render settings

- **Build**: `npm install`
- **Start**: `npm start` (runs `node server.js`)

For more detail, see [README.md](README.md).
