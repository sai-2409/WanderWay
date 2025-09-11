const express = require("express");
const path = require("path");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const sgClient = require("@sendgrid/client");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure SendGrid
const SG_KEY =
  process.env.SENDGRID_API_KEY_WANDERWAY || process.env.SENDGRID_API_KEY;
const SG_HOST =
  process.env.SENDGRID_API_HOST ||
  (process.env.SENDGRID_EU === "1" ? "https://api.eu.sendgrid.com" : undefined);
if (SG_KEY) {
  // Configure client (supports EU host) and attach to mail helper
  sgClient.setApiKey(SG_KEY);
  if (SG_HOST) {
    sgClient.setDefaultRequest("baseUrl", SG_HOST);
    console.log(`[SendGrid] Using API host: ${SG_HOST}`);
  }
  sgMail.setClient(sgClient);
  sgMail.setApiKey(SG_KEY);
} else {
  console.warn("[WARN] SENDGRID_API_KEY not set. Emails will not be sent.");
}

// Parse form bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle all routes by serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle thank you page
app.get("/thankYou.html", (req, res) => {
  res.sendFile(path.join(__dirname, "thankYou.html"));
});

// Booking submission endpoint
app.post("/api/book", async (req, res) => {
  try {
    // Extract fields (support both pretty names and camelCase)
    const fullName = req.body["Full Name"] || req.body.fullName || "Guest";
    const email = req.body["Email Address"] || req.body.email || "";
    const tourType = req.body["Tour Type"] || req.body.tourType || "";
    const guests = req.body["Number"] || req.body.guests || "";
    const date = req.body["Tour Date"] || req.body.date || "";
    const time = req.body["Tour Time"] || req.body.time || "";
    const notes = req.body["Special Requests"] || req.body.notes || "";

    // Compose HTML summary
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
        <h2 style="margin:0 0 12px;color:#0a5c0a">New Pedicab Booking</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email || "(not provided)"}</p>
        <p><strong>Tour:</strong> ${tourType}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Date:</strong> ${date} &nbsp; <strong>Time:</strong> ${time}</p>
        <p><strong>Notes:</strong> ${notes || "—"}</p>
      </div>`;

    const businessTo = process.env.SENDGRID_TO || "pedicap475@gmail.com";
    const from = process.env.SENDGRID_FROM || businessTo; // must be a verified sender on SendGrid

    const sandbox = process.env.SENDGRID_SANDBOX === "1";
    if (!SG_KEY) {
      console.warn("[WARN] No SendGrid key configured. Skipping email send.");
    } else {
      // Send to business inbox
      await sgMail.send({
        to: businessTo,
        from,
        replyTo: email || from,
        subject: "New WanderWay Booking Request",
        html,
        mailSettings: sandbox ? { sandboxMode: { enable: true } } : undefined,
      });

      // Optional confirmation to the customer if email provided
      if (email) {
        await sgMail.send({
          to: email,
          from,
          subject: "We received your WanderWay booking",
          html: `<div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
                   <p>Hi ${fullName},</p>
                   <p>Thanks for booking a WanderWay Pedicab tour! We received your request and will confirm details shortly.</p>
                   <p><strong>Your selection:</strong> ${
                     tourType || "(not specified)"
                   } • ${guests || "?"} guest(s) • ${date || "?"} at ${
            time || "?"
          }</p>
                   <p>We look forward to touring Central Park with you! 🌳🚲</p>
                 </div>`,
          mailSettings: sandbox ? { sandboxMode: { enable: true } } : undefined,
        });
      }
    }

    // Redirect to thank-you page (supports existing hidden _next)
    const nextUrl = req.body._next || "/thankYou.html";
    return res.redirect(303, nextUrl);
  } catch (err) {
    console.error("SendGrid error:", err?.response?.body || err);
    return res
      .status(500)
      .send(
        "Sorry, something went wrong sending your booking. Please try again."
      );
  }
});

// Simple health/test route to verify SendGrid config without using the form
app.get("/api/test-email", async (req, res) => {
  try {
    if (!SG_KEY) return res.status(500).send("SendGrid not configured");
    const to = req.query.to || process.env.SENDGRID_TO;
    const from = process.env.SENDGRID_FROM || process.env.SENDGRID_TO;
    if (!to || !from)
      return res.status(400).send("Missing SENDGRID_TO or SENDGRID_FROM");
    const sandbox = process.env.SENDGRID_SANDBOX === "1";
    await sgMail.send({
      to,
      from,
      subject: "WanderWay test email",
      html: `<p>This is a test email from WanderWay server at ${new Date().toISOString()}.</p>`,
      mailSettings: sandbox ? { sandboxMode: { enable: true } } : undefined,
    });
    res.send(`Test email queued to ${to}${sandbox ? " (sandbox mode)" : ""}`);
  } catch (err) {
    console.error("/api/test-email error:", err?.response?.body || err);
    res.status(500).send("Failed to send test email");
  }
});

// Handle any other routes by redirecting to home
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`WanderWay server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
