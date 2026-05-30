/**
 * WanderWay Email Templates - Beautiful Tailwind CSS Email Designs
 * Contains customer confirmation, business notification, and tour reminder templates
 */

const emailTemplates = {
  // Green Customer Confirmation Email (Inline CSS for email clients)
  customer: (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WanderWay - Booking Confirmation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #f0fdf4; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <div style="background: linear-gradient(135deg, #166534 0%, #22c55e 100%); padding: 40px 32px; text-align: center;">
            <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 12px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🚲 WanderWay</h1>
            <p style="color: #dcfce7; margin: 0; font-size: 16px;">Central Park Pedicab Tours</p>
        </div>
        <div style="padding: 40px 32px;">
            <div style="background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%); color: white; padding: 12px 24px; border-radius: 9999px; display: inline-block; font-weight: 600; font-size: 14px; margin-bottom: 32px; text-transform: uppercase; letter-spacing: 0.05em;">✅ BOOKING CONFIRMED</div>
            <h2 style="color: #166534; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Thank you for choosing WanderWay!</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">We're excited to show you the beauty and magic of Central Park! Your pedicab tour has been confirmed and we'll be in touch within 24 hours.</p>
            
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">📋 Your Booking Details</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                    <span style="font-weight: 600; color: #166534; font-size: 14px;">👤 Name:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.name || "Guest"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                    <span style="font-weight: 600; color: #166534; font-size: 14px;">🚲 Tour:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.tourType || "Central Park Tour"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                    <span style="font-weight: 600; color: #166534; font-size: 14px;">📅 Date:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.date || "To be confirmed"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                    <span style="font-weight: 600; color: #166534; font-size: 14px;">⏰ Time:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.time || "To be confirmed"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                    <span style="font-weight: 600; color: #166534; font-size: 14px;">👥 Guests:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.guests || "1"
                    } guest(s)</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                    <span style="font-weight: 600; color: #166534; font-size: 14px;">📍 Meeting:</span>
                    <span style="color: #374151; font-weight: 500;">764 Doris C Freedman PI, New York, NY 10019 (in front of William Sherman Monument)</span>
                </div>
            </div>
            
            ${
              data.specialRequests
                ? `
            <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #92400e; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">📝 Special Requests</h3>
                <p style="color: #d97706; margin: 0;">${data.specialRequests}</p>
            </div>
            `
                : ""
            }
            
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; text-align: center;">
                <h3 style="color: #1d4ed8; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">📞 Contact Us</h3>
                <p style="color: #1e40af; margin: 0 0 4px 0;"><strong>Phone:</strong> +1 (929) 645-7024</p>
                <p style="color: #1e40af; margin: 0;"><strong>Email:</strong> wanderway06042025@gmail.com</p>
            </div>
        </div>
        <div style="background-color: #f9fafb; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;"><strong>WanderWay Tours</strong></p>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">© 2025 All rights reserved</p>
        </div>
    </div>
</body>
</html>`,

  // Red Business Notification Email (Inline CSS for email clients)
  business: (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking - WanderWay</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); padding: 32px; text-align: center;">
            <div style="background-color: #dc2626; color: white; padding: 8px 16px; border-radius: 9999px; display: inline-block; font-weight: 600; font-size: 12px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.05em;">🚨 NEW BOOKING</div>
            <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0;">WanderWay Business Portal</h1>
        </div>
        <div style="padding: 32px;">
            <h2 style="color: #1e40af; font-size: 20px; font-weight: bold; margin: 0 0 20px 0;">🚲 New Pedicab Tour Request</h2>
            <p style="color: #4b5563; margin: 0 0 24px 0;">You have received a new booking request. Please review the details below and confirm with the customer within 24 hours.</p>
            
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1e40af; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">📋 Booking Details</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #bfdbfe;">
                    <span style="font-weight: 600; color: #1e40af; font-size: 14px;">👤 Customer Name:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.name || "Guest"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #bfdbfe;">
                    <span style="font-weight: 600; color: #1e40af; font-size: 14px;">📧 Email:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.email || "Not provided"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #bfdbfe;">
                    <span style="font-weight: 600; color: #1e40af; font-size: 14px;">🚲 Tour Type:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.tourType || "Standard Tour"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #bfdbfe;">
                    <span style="font-weight: 600; color: #1e40af; font-size: 14px;">📅 Tour Date:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.date || "To be confirmed"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #bfdbfe;">
                    <span style="font-weight: 600; color: #1e40af; font-size: 14px;">⏰ Tour Time:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.time || "To be confirmed"
                    }</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
                    <span style="font-weight: 600; color: #1e40af; font-size: 14px;">👥 Number of Guests:</span>
                    <span style="color: #374151; font-weight: 500;">${
                      data.guests || "1"
                    }</span>
                </div>
            </div>

            ${
              data.specialRequests
                ? `
            <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <h3 style="color: #92400e; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">📝 Special Requests</h3>
                <p style="color: #d97706; margin: 0;">${data.specialRequests}</p>
            </div>
            `
                : ""
            }
            
            <div style="text-align: center; margin: 32px 0;">
                <a href="mailto:${
                  data.email
                }" style="display: inline-block; padding: 12px 24px; background-color: #16a34a; color: white; font-weight: 600; border-radius: 8px; text-decoration: none;">✅ Confirm Booking</a>
            </div>
        </div>
        <div style="background-color: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Booking received: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
    </div>
</body>
</html>`,

  // Orange Tour Reminder Email (Inline CSS for email clients)
  reminder: (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Reminder - WanderWay</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #fffbeb; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 40px 32px; text-align: center;">
            <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0 0 12px 0;">⏰ Tour Reminder</h1>
            <p style="color: #fde68a; margin: 0; font-size: 16px;">Your WanderWay adventure starts soon!</p>
        </div>
        <div style="padding: 40px 32px;">
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #92400e; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🎯 Today's Tour Details</h3>
                <p style="color: #78350f; font-weight: 600; margin: 0;">${
                  data.tourType || "Central Park Tour"
                } • ${data.date || "Today"} at ${
    data.time || "TBD"
  } • 764 Doris C Freedman PI, New York, NY 10019 (in front of William Sherman Monument)</p>
            </div>
            
            <h2 style="color: #ea580c; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Hi ${
              data.name || "there"
            }!</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">Just a friendly reminder that your Central Park pedicab tour is scheduled for today! We're excited to show you the magic of the park.</p>
            
            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #1d4ed8; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">📍 Meeting Information</h3>
                <p style="color: #1e40af; margin: 0 0 4px 0;"><strong>Location:</strong> Sherman Monument</p>
                <p style="color: #1e40af; margin: 0 0 4px 0;"><strong>Address:</strong> Grand Army Plaza, Central Park South</p>
                <p style="color: #1e40af; margin: 0 0 16px 0;"><strong>Time:</strong> ${
                  data.time || "As scheduled"
                }</p>
                <p style="color: #1d4ed8; font-size: 14px; margin: 0;">Look for the WanderWay pedicab with our green logo!</p>
            </div>
            
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #15803d; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">🎒 What to Bring</h3>
                <div style="color: #166534;">
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="color: #16a34a; margin-right: 8px; font-weight: bold;">•</span>
                        <span>Comfortable clothing</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="color: #16a34a; margin-right: 8px; font-weight: bold;">•</span>
                        <span>Camera for beautiful photos</span>
                    </div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="color: #16a34a; margin-right: 8px; font-weight: bold;">•</span>
                        <span>Weather-appropriate gear</span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span style="color: #16a34a; margin-right: 8px; font-weight: bold;">•</span>
                        <span>Excitement for adventure! 🎉</span>
                    </div>
                </div>
            </div>
            
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 24px; text-align: center;">
                <h3 style="color: #b91c1c; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">📞 Need to Reach Us?</h3>
                <p style="color: #991b1b; margin: 0 0 4px 0;"><strong>Phone:</strong> +1 (929) 645-7024</p>
                <p style="color: #991b1b; margin: 0 0 12px 0;"><strong>Email:</strong> wanderway06042025@gmail.com</p>
                <p style="color: #dc2626; font-size: 14px; margin: 0;">Call us if you're running late or have any questions!</p>
            </div>
        </div>
        <div style="background-color: #f9fafb; padding: 32px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px 0;"><strong>WanderWay Tours</strong></p>
            <p style="color: #6b7280; font-size: 14px; margin: 0;">© 2025 All rights reserved</p>
        </div>
    </div>
</body>
</html>`,
};

module.exports = emailTemplates;
