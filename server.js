const express = require("express");
const path = require("path");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const sgClient = require("@sendgrid/client");
const emailTemplates = require("./email-templates");

const app = express();

// Store scheduled reminders (in production, use a database)
const scheduledReminders = new Map();
const PORT = process.env.PORT || 5000;

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

// Serve static files from the current directory with proper MIME types
app.use(
  express.static(__dirname, {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

// Handle all routes by serving index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle thank you page
app.get("/thankYou.html", (req, res) => {
  res.sendFile(path.join(__dirname, "thankYou.html"));
});

// Booking submission endpoint with beautiful Tailwind email templates
app.post("/api/book", async (req, res) => {
  try {
    // Debug logging for production
    console.log("📝 Form submission received");
    console.log("🔧 Environment check:", {
      hasApiKey: !!SG_KEY,
      fromEmail: process.env.SENDGRID_FROM,
      toEmail: process.env.SENDGRID_TO,
    });
    // Extract fields (support both pretty names and camelCase)
    const fullName = req.body["Full Name"] || req.body.fullName || "Guest";
    const email = req.body["Email Address"] || req.body.email || "";
    const tourType = req.body["Tour Type"] || req.body.tourType || "";
    const guests =
      req.body["Number of Guests"] ||
      req.body["Number"] ||
      req.body.guests ||
      "1";
    const date = req.body["Tour Date"] || req.body.date || "";
    const time = req.body["Tour Time"] || req.body.time || "";
    const specialRequests =
      req.body["Special Requests"] || req.body.notes || "";

    // Create booking data object
    const bookingData = {
      name: fullName,
      email: email,
      tourType: tourType,
      guests: guests,
      date: date,
      time: time,
      specialRequests: specialRequests,
    };

    console.log(`📧 New booking received from ${fullName} for ${tourType}`);

    const businessTo = process.env.SENDGRID_TO || "pedicap475@gmail.com";
    const from = process.env.SENDGRID_FROM || businessTo;
    const sandbox = process.env.SENDGRID_SANDBOX === "1";

    if (!SG_KEY) {
      console.warn("[WARN] No SendGrid key configured. Skipping email send.");
    } else {
      // 1. Send beautiful business notification email (RED theme)
      const businessHtml = emailTemplates.business(bookingData);
      await sgMail.send({
        to: businessTo,
        from,
        replyTo: email || from,
        subject: `🚨 New WanderWay Booking: ${tourType} - ${fullName}`,
        html: businessHtml,
        mailSettings: sandbox ? { sandboxMode: { enable: true } } : undefined,
      });
      console.log(`✅ Business notification sent to ${businessTo}`);

      // 2. Send beautiful customer confirmation email (GREEN theme)
      if (email) {
        const customerHtml = emailTemplates.customer(bookingData);
        await sgMail.send({
          to: email,
          from,
          subject:
            "🚲 WanderWay Booking Confirmed - Central Park Adventure Awaits!",
          html: customerHtml,
          mailSettings: sandbox ? { sandboxMode: { enable: true } } : undefined,
        });
        console.log(`✅ Customer confirmation sent to ${email}`);

        // 3. Schedule reminder email for 1 hour before tour (if date/time provided)
        if (date && time) {
          scheduleReminderEmail(bookingData, from, sandbox);
        }
      }
    }

    // Redirect to thank-you page (supports existing hidden _next)
    const nextUrl = req.body._next || "/thankYou.html";
    return res.redirect(303, nextUrl);
  } catch (err) {
    console.error("❌ Booking submission error:", err);
    console.error("📧 SendGrid details:", err?.response?.body || err);

    // Return JSON error for better debugging
    return res.status(500).json({
      error: "Booking submission failed",
      message: err.message,
      details: err?.response?.body || "Unknown error",
    });
  }
});

// Function to schedule reminder email 1 hour before tour
function scheduleReminderEmail(bookingData, fromEmail, sandbox) {
  try {
    // Parse the tour date and time
    const tourDateTime = new Date(`${bookingData.date} ${bookingData.time}`);
    const reminderTime = new Date(tourDateTime.getTime() - 60 * 60 * 1000); // 1 hour before
    const now = new Date();

    if (reminderTime > now) {
      const delay = reminderTime.getTime() - now.getTime();

      console.log(
        `⏰ Scheduling reminder email for ${
          bookingData.name
        } at ${reminderTime.toLocaleString()}`
      );

      const timeoutId = setTimeout(async () => {
        try {
          const reminderHtml = emailTemplates.reminder(bookingData);
          await sgMail.send({
            to: bookingData.email,
            from: fromEmail,
            subject: `⏰ Reminder: Your WanderWay Tour Starts in 1 Hour!`,
            html: reminderHtml,
            mailSettings: sandbox
              ? { sandboxMode: { enable: true } }
              : undefined,
          });
          console.log(`✅ Reminder email sent to ${bookingData.email}`);

          // Remove from scheduled reminders
          scheduledReminders.delete(
            bookingData.email + bookingData.date + bookingData.time
          );
        } catch (error) {
          console.error(`❌ Failed to send reminder email:`, error);
        }
      }, delay);

      // Store the timeout ID so we can cancel if needed
      scheduledReminders.set(
        bookingData.email + bookingData.date + bookingData.time,
        timeoutId
      );
    } else {
      console.log(
        `⚠️ Tour time is in the past, skipping reminder for ${bookingData.name}`
      );
    }
  } catch (error) {
    console.error(`❌ Error scheduling reminder:`, error);
  }
}

// Debug endpoint for production troubleshooting
app.get("/api/debug", (req, res) => {
  res.json({
    status: "Server running",
    environment: process.env.NODE_ENV || "development",
    hasApiKey: !!process.env.SENDGRID_API_KEY_WANDERWAY,
    hasLegacyApiKey: !!process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM || "not set",
    toEmail: process.env.SENDGRID_TO || "not set",
    timestamp: new Date().toISOString(),
    __dirname: __dirname,
  });
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

// Admin endpoint to view scheduled reminders
app.get("/api/admin/reminders", (req, res) => {
  const reminders = Array.from(scheduledReminders.keys()).map((key) => {
    return {
      key,
      scheduled: true,
      count: scheduledReminders.size,
    };
  });

  res.json({
    total: scheduledReminders.size,
    reminders: reminders,
  });
});

// Test endpoint for email templates
app.get("/api/test-templates", (req, res) => {
  const testData = {
    name: "John Doe",
    email: "test@example.com",
    tourType: "Central Park Highlights Tour",
    guests: "2",
    date: "2025-09-15",
    time: "2:00 PM",
    specialRequests: "Please bring extra blankets, it might be chilly!",
  };

  const templates = {
    customer: emailTemplates.customer(testData),
    business: emailTemplates.business(testData),
    reminder: emailTemplates.reminder(testData),
  };

  res.json({
    message: "Email templates generated successfully",
    testData,
    templates: {
      customer: templates.customer.substring(0, 200) + "...",
      business: templates.business.substring(0, 200) + "...",
      reminder: templates.reminder.substring(0, 200) + "...",
    },
  });
});

// Handle any other routes by redirecting to home
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`WanderWay server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
