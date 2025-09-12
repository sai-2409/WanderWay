# 🚨 Production Issues - WanderWay Troubleshooting Guide

## Current Issues:
1. ❌ **Form submission shows blank page** instead of thank you page
2. ❌ **No emails being sent** (but works locally)
3. ✅ **Local environment works perfectly**

## 🔧 Step-by-Step Fix

### 1. **Check Render Logs (CRITICAL FIRST STEP)**

Go to your Render dashboard:
1. **Navigate to**: Your WanderWay service
2. **Click**: "Logs" tab
3. **Look for errors** when form is submitted
4. **Check for**: SendGrid errors, missing environment variables, or server crashes

### 2. **Verify Environment Variables**

In Render Dashboard → Environment:
```bash
# Check these are EXACTLY set (case-sensitive):
SENDGRID_API_KEY_WANDERWAY = [Your API Key - starts with SG.]
SENDGRID_FROM = booking@wanderway-industry.org
SENDGRID_TO = pedicap475@gmail.com
```

**⚠️ Common Issues:**
- Missing environment variables
- Extra spaces in values
- Wrong variable names (should be `SENDGRID_API_KEY_WANDERWAY`)

### 3. **Test Production Endpoints**

Try these URLs directly:

**A. Test Thank You Page:**
```
https://wanderway-industry.org/thankYou.html
```
Should show the animated thank you page.

**B. Test Email Functionality:**
```
https://wanderway-industry.org/api/test-email
```
Should return "Test email sent" or show SendGrid error.

**C. Test Email Templates:**
```
https://wanderway-industry.org/api/test-templates
```
Should return JSON with email templates.

### 4. **Check Build Configuration**

In Render Dashboard → Settings:
```bash
Build Command: npm install
Start Command: node server.js
Environment: Node
```

### 5. **Verify File Structure**

Ensure these files exist in production:
```
✅ server.js
✅ package.json  
✅ thankYou.html
✅ index.html
✅ email-templates.js
```

## 🐛 Common Production Issues & Fixes

### Issue 1: "Cannot GET /thankYou.html"
**Cause**: Static file serving not working
**Fix**: Add this to server.js (should already be there):
```javascript
app.use(express.static(__dirname));
```

### Issue 2: SendGrid 401/403 Errors
**Cause**: API key or sender verification issues
**Fixes**:
- Verify API key is correct in environment variables
- Ensure `booking@wanderway-industry.org` is verified in SendGrid
- Check API key has "Mail Send" permissions

### Issue 3: Form Redirects to Blank Page
**Cause**: Server error during form processing
**Fix**: Check Render logs for specific error messages

### Issue 4: Environment Variables Not Loading
**Cause**: Variables not set in Render dashboard
**Fix**: Double-check all environment variables are set correctly

## 🧪 Debug Steps

### Step 1: Test Individual Components

**Test 1 - Server Health:**
```
curl https://wanderway-industry.org/
```
Should return your main HTML page.

**Test 2 - Thank You Page:**
```
curl https://wanderway-industry.org/thankYou.html
```
Should return thank you page HTML.

**Test 3 - API Endpoint:**
```
curl -X POST https://wanderway-industry.org/api/test-email
```
Should test email functionality.

### Step 2: Check Form Submission

**Manual Form Test:**
```bash
curl -X POST https://wanderway-industry.org/api/book \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "Full Name=Test User&Email Address=test@example.com&Tour Type=Basic Tour&Number=2&Tour Date=2025-09-15&Tour Time=10:00 AM&Special Requests=Testing production&_next=/thankYou.html" \
  -L -v
```

### Step 3: Monitor Render Logs

While testing, watch Render logs for:
- Server startup messages
- Form submission logs
- SendGrid errors
- Any JavaScript errors

## 🔧 Quick Fixes to Try

### Fix 1: Update Server.js for Better Error Handling
Add this debug endpoint to server.js:

```javascript
// Debug endpoint for production
app.get("/api/debug", (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    hasApiKey: !!process.env.SENDGRID_API_KEY_WANDERWAY,
    fromEmail: process.env.SENDGRID_FROM,
    toEmail: process.env.SENDGRID_TO,
    timestamp: new Date().toISOString()
  });
});
```

### Fix 2: Enhanced Error Logging
Update the booking endpoint with better error handling:

```javascript
app.post("/api/book", async (req, res) => {
  try {
    console.log("📝 Form submission received:", req.body);
    console.log("🔧 Environment check:", {
      hasApiKey: !!process.env.SENDGRID_API_KEY_WANDERWAY,
      fromEmail: process.env.SENDGRID_FROM
    });
    
    // ... existing code ...
    
  } catch (err) {
    console.error("❌ Full error:", err);
    console.error("📧 SendGrid details:", err?.response?.body);
    return res.status(500).json({
      error: "Form submission failed",
      details: err.message
    });
  }
});
```

## 🚀 Most Likely Solutions

### Solution 1: Missing Environment Variables
- Go to Render Dashboard
- Check all environment variables are set
- Restart the service

### Solution 2: SendGrid Verification Issue
- Verify `booking@wanderway-industry.org` in SendGrid
- Check domain authentication is complete
- Ensure API key has correct permissions

### Solution 3: Server Configuration
- Verify build and start commands are correct
- Check if all files deployed properly
- Restart the Render service

## 📞 Next Steps

1. **Check Render logs immediately** - this will show the exact error
2. **Test the debug endpoints** listed above
3. **Verify environment variables** are set correctly
4. **Report back** with specific error messages from logs

The blank page suggests the server is crashing or redirecting incorrectly. The Render logs will show exactly what's happening! 

**Let me know what you find in the logs and I'll provide the specific fix!** 🔍