# WanderWay - Central Park Pedicab Tours

A beautiful, responsive website for booking Central Park pedicab tours in New York City.

## Features

- 🚲 **Tour Booking System** - Easy-to-use form with email validation
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- ✅ **Email Validation** - Real-time email format checking
- 📍 **Interactive Elements** - Tour details, meeting point, and booking info
- 🎬 **Media Integration** - YouTube video and image galleries

## Tour Options

- **Basic Tour** (30 min, 1 stop) - $50
- **Economy Tour** (40 min, 2 stops) - $60
- **Classic Tour** (50 min, 3 stops) - $70
- **Deluxe Tour** (60 min, 4 stops) - $80

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Form Handling**: FormSubmit.co
- **Deployment**: Render.com

## Local Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm start
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

## Deployment on Render

### Step 1: Prepare Your Repository

1. Ensure all files are committed to your Git repository
2. Push your code to GitHub, GitLab, or Bitbucket

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your repository
4. Configure the deployment:
   - **Name**: `wanderway-tours` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is sufficient

### Step 3: Update Form Redirect (After Deployment)

After deployment, update the form redirect URL:

1. Copy your deployed site URL (e.g., `https://wanderway-tours.onrender.com`)
2. Update line 599 in `index.html`:

   ```html
   <!-- Change this: -->
   <input type="hidden" name="_next" value="./thankYou.html" />

   <!-- To this (replace with your actual domain): -->
   <input
     type="hidden"
     name="_next"
     value="https://your-site-name.onrender.com/thankYou.html"
   />
   ```

3. Commit and push the changes

### Step 4: Environment Variables (Optional)

If you want to add any environment-specific configurations, you can set them in Render's dashboard under "Environment Variables".

## File Structure

```
wanderWay/
├── index.html              # Main landing page
├── thankYou.html           # Form submission confirmation
├── server.js               # Express.js server
├── package.json            # Node.js dependencies
├── .gitignore             # Git ignore rules
├── css/
│   ├── style.css          # Main styles
│   └── animation.css      # Animations
├── js/
│   └── script.js          # JavaScript functionality
└── img/                   # Images and assets
```

## Contact Information

- **Phone**: +1 213-709-5924
- **Email**: wanderway06042025@gmail.com
- **Meeting Point**: 764 Doris C Freedman PI, New York, NY 10019

## License

This project is licensed under the MIT License.

---

_Ready to explore Central Park? Book your pedicab tour today!_ 🚲✨
