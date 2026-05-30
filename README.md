# WanderWay - Central Park Pedicab Tours

A responsive website for booking Central Park pedicab tours in New York City.

## Features

- **Tour booking** — Form with client and server validation
- **Dual email notifications** — Business owner + customer confirmation via Resend
- **Clear error handling** — Friendly messages if submission or email fails
- **Responsive design** — Works on mobile and desktop

## Tour Options

- **Basic Tour** (30 min, 1 stop)
- **Economy Tour** (40 min, 2 stops)
- **Classic Tour** (50 min, 3 stops)
- **Deluxe Tour** (60 min, 4 stops)

## Technologies

- **Frontend**: HTML, CSS, vanilla JavaScript
- **Backend**: Node.js + Express (`POST /api/book`)
- **Email**: [Resend](https://resend.com)
- **Deployment**: Render.com

## How booking works

```text
Browser form  →  POST /api/book (your Express server)  →  Resend sends 2 emails
                     ↓
              JSON response  →  thank-you page
```

The site does **not** use FormSubmit. Your server owns the booking flow; only the email provider changed.

## Local Development

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

   Get a Resend API key at [resend.com/api-keys](https://resend.com/api-keys). Verify your domain (or use Resend’s test sender while developing).

2. Install and run:

   ```bash
   npm install
   npm start
   ```

3. Open `http://localhost:5000` (or the port in `PORT`).

### Verify email setup

| Endpoint | Purpose |
|----------|---------|
| `GET /api/debug` | Confirms Resend key and env vars are loaded |
| `GET /api/test-email` | Sends a test email to `EMAIL_TO` |
| `GET /api/test-templates` | Returns a preview of template HTML |

Submit a test booking through the form on the home page.

## Environment Variables

Set these locally (`.env`) and on Render:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | API key from Resend (`re_...`) |
| `EMAIL_FROM` | Yes | Verified sender, e.g. `WanderWay <booking@yourdomain.com>` |
| `EMAIL_TO` | Yes | Business inbox for new booking alerts |
| `PORT` | No | Server port (default `5000`) |

## Deployment on Render

1. Connect your Git repository.
2. **Build command**: `npm install`
3. **Start command**: `npm start`
4. Add `RESEND_API_KEY`, `EMAIL_FROM`, and `EMAIL_TO` in the Render dashboard.
5. After deploy, verify:
   - `https://your-domain.com/api/debug`
   - `https://your-domain.com/api/test-email`
   - Submit a real test booking

See [PRODUCTION_TROUBLESHOOTING.md](PRODUCTION_TROUBLESHOOTING.md) if emails fail in production.

## File Structure

```
wanderWay/
├── index.html
├── thankYou.html
├── server.js
├── email-templates.js
├── package.json
├── css/
│   ├── style.css
│   ├── animation.css
│   └── booking.css
├── js/
│   └── script.js
├── dev/
│   ├── email-templates.html
│   └── preview-emails.html
└── img/
```

## Contact

- **Phone**: +1 (929) 645-7024
- **Email**: wanderway06042025@gmail.com
- **Meeting Point**: 764 Doris C Freedman PI, New York, NY 10019

## License

MIT License
