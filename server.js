const express = require("express");
const path = require("path");
require("dotenv").config();
const { Resend } = require("resend");
const emailTemplates = require("./email-templates");

const app = express();
const PORT = process.env.PORT || 5000;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM =
  process.env.EMAIL_FROM ||
  process.env.RESEND_FROM ||
  process.env.SENDGRID_FROM;
const EMAIL_TO =
  process.env.EMAIL_TO ||
  process.env.RESEND_TO ||
  process.env.SENDGRID_TO;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

if (!resend) {
  console.warn("[WARN] RESEND_API_KEY not set. Emails will not be sent.");
} else {
  console.log("[Resend] Email provider ready");
}

function parseBookingBody(body) {
  return {
    name: (body["Full Name"] || body.fullName || "").trim(),
    email: (body["Email Address"] || body.email || "").trim(),
    tourType: (body["Tour Type"] || body.tourType || "").trim(),
    guests: String(
      body["Number of Guests"] || body["Number"] || body.guests || ""
    ).trim(),
    date: (body["Tour Date"] || body.date || "").trim(),
    time: (body["Tour Time"] || body.time || "").trim(),
    specialRequests: (body["Special Requests"] || body.notes || "").trim(),
    nextUrl: body._next || "/thankYou.html",
  };
}

function validateBooking(data) {
  const errors = [];
  if (!data.name) errors.push("Full name is required.");
  if (!data.email) errors.push("Email address is required.");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!data.tourType) errors.push("Please select a tour.");
  if (!data.guests) errors.push("Number of guests is required.");
  else {
    const n = parseInt(data.guests, 10);
    if (isNaN(n) || n < 1 || n > 10) {
      errors.push("Number of guests must be between 1 and 10.");
    }
  }
  if (!data.date) errors.push("Tour date is required.");
  if (!data.time) errors.push("Tour time is required.");
  return errors;
}

function formatResendError(error) {
  if (!error) return "Email send failed.";
  const msg = error.message || String(error);
  if (msg.includes("only send testing emails to your own email")) {
    return (
      "Resend test mode: emails can only go to your Resend account email until " +
      "wanderway-industry.org is verified. Set EMAIL_TO to that address for testing."
    );
  }
  return msg;
}

async function sendViaResend({ to, subject, html, replyTo }) {
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [to],
    subject,
    html,
    replyTo: replyTo || undefined,
  });

  if (error) {
    const err = new Error(formatResendError(error));
    err.resend = error;
    throw err;
  }
  return data;
}

async function sendBookingEmails(bookingData) {
  if (!resend || !EMAIL_FROM || !EMAIL_TO) {
    return {
      businessSent: false,
      customerSent: false,
      error: "Email service is not configured.",
    };
  }

  const businessPromise = sendViaResend({
    to: EMAIL_TO,
    replyTo: bookingData.email || undefined,
    subject: `New WanderWay Booking: ${bookingData.tourType} - ${bookingData.name}`,
    html: emailTemplates.business(bookingData),
  });

  const customerPromise = bookingData.email
    ? sendViaResend({
        to: bookingData.email,
        subject:
          "WanderWay Booking Confirmed - Central Park Adventure Awaits!",
        html: emailTemplates.customer(bookingData),
      })
    : Promise.resolve(null);

  const [businessResult, customerResult] = await Promise.allSettled([
    businessPromise,
    customerPromise,
  ]);

  const businessSent = businessResult.status === "fulfilled";
  const customerSent = customerResult.status === "fulfilled";

  if (!businessSent) {
    console.error("Business email failed:", businessResult.reason);
  }
  if (!customerSent && bookingData.email) {
    console.error("Customer email failed:", customerResult.reason);
  }

  return { businessSent, customerSent };
}

function respondBooking(res, payload, status = 200) {
  return res.status(status).json(payload);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  express.static(__dirname, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/thankYou.html", (req, res) => {
  res.sendFile(path.join(__dirname, "thankYou.html"));
});

app.post("/api/book", async (req, res) => {
  try {
    if (req.body.website) {
      console.warn("[WARN] Honeypot triggered — rejected submission");
      return respondBooking(
        res,
        { ok: false, message: "Unable to process your request.", code: "SPAM" },
        400
      );
    }

    const raw = parseBookingBody(req.body);
    const validationErrors = validateBooking(raw);

    if (validationErrors.length > 0) {
      return respondBooking(
        res,
        {
          ok: false,
          message: validationErrors[0],
          code: "VALIDATION",
          errors: validationErrors,
        },
        400
      );
    }

    const bookingData = {
      name: raw.name,
      email: raw.email,
      tourType: raw.tourType,
      guests: raw.guests,
      date: raw.date,
      time: raw.time,
      specialRequests: raw.specialRequests,
    };

    console.log(
      `New booking from ${bookingData.name} — ${bookingData.tourType}`
    );

    const { businessSent, customerSent } = await sendBookingEmails(bookingData);

    if (!resend) {
      return respondBooking(
        res,
        {
          ok: false,
          message:
            "We could not send your booking right now. Please call us at +1 (929) 645-7024.",
          code: "EMAIL_NOT_CONFIGURED",
        },
        503
      );
    }

    if (!businessSent) {
      const resendMsg = formatResendError(
        businessResult.reason?.resend || businessResult.reason
      );
      const isDev = process.env.NODE_ENV !== "production";
      return respondBooking(
        res,
        {
          ok: false,
          message: isDev
            ? resendMsg
            : "We could not send your booking request. Please try again or call +1 (929) 645-7024.",
          code: "EMAIL_FAILED",
        },
        500
      );
    }

    const redirect = raw.nextUrl.startsWith("/")
      ? raw.nextUrl
      : "/thankYou.html";

    const payload = {
      ok: true,
      redirect,
      warning: !customerSent
        ? "Your request was received. If you do not get a confirmation email within a few minutes, call +1 (929) 645-7024."
        : undefined,
    };

    if (!customerSent) {
      console.warn(
        `[WARN] Customer confirmation not sent to ${bookingData.email}`
      );
    }

    return respondBooking(res, payload);
  } catch (err) {
    console.error("Booking submission error:", err);
    return respondBooking(
      res,
      {
        ok: false,
        message:
          "Something went wrong. Please try again or call +1 (929) 645-7024.",
        code: "SERVER_ERROR",
      },
      500
    );
  }
});

app.get("/api/debug", (req, res) => {
  res.json({
    status: "Server running",
    provider: "resend",
    environment: process.env.NODE_ENV || "development",
    hasApiKey: !!RESEND_API_KEY,
    fromEmail: EMAIL_FROM || "not set",
    toEmail: EMAIL_TO || "not set",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/test-email", async (req, res) => {
  try {
    if (!resend) return res.status(500).send("Resend not configured");
    const to = req.query.to || EMAIL_TO;
    if (!to || !EMAIL_FROM) {
      return res.status(400).send("Missing EMAIL_TO or EMAIL_FROM");
    }
    await sendViaResend({
      to,
      subject: "WanderWay test email",
      html: `<p>Test email from WanderWay (Resend) at ${new Date().toISOString()}.</p>`,
    });
    res.send(`Test email sent to ${to}`);
  } catch (err) {
    console.error("/api/test-email error:", err);
    res.status(500).send("Failed to send test email");
  }
});

app.get("/api/test-templates", (req, res) => {
  const testData = {
    name: "John Doe",
    email: "test@example.com",
    tourType: "Classic Tour",
    guests: "2",
    date: "2025-09-15",
    time: "2:00 PM",
    specialRequests: "Extra blankets please.",
  };

  res.json({
    message: "Email templates generated successfully",
    testData,
    templates: {
      customer: emailTemplates.customer(testData).substring(0, 200) + "...",
      business: emailTemplates.business(testData).substring(0, 200) + "...",
    },
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`WanderWay server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
