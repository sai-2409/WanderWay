// Writing code for making header sticky
const header = document.querySelector(".header");
const nav = document.querySelector(".header__nav");
const navContainer = document.querySelector(".container");

const stickyObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) {
      navContainer.classList.add("sticky");
    } else {
      navContainer.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-1px",
  }
);
stickyObserver.observe(header);

// Functioning side bar
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
});

// Video background functionality
document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.querySelector(".hero__video");

  if (heroVideo) {
    // Debug: Log video element
    console.log("Video element found:", heroVideo);

    // Check if video sources are loading
    heroVideo.addEventListener("loadstart", () => {
      console.log("Video started loading");
    });

    heroVideo.addEventListener("loadeddata", () => {
      console.log("Video data loaded successfully");
    });

    heroVideo.addEventListener("error", (e) => {
      console.error("Video error:", e);
      console.log("Video src:", heroVideo.currentSrc);
    });

    heroVideo.addEventListener("canplay", () => {
      console.log("Video can start playing");
    });

    // Ensure video plays on mobile devices
    heroVideo.play().catch((error) => {
      console.log("Video autoplay failed:", error);
      // Fallback: show poster image if video fails to play
    });

    // Optional: Add video controls on hover/click for better UX
    heroVideo.addEventListener("click", () => {
      if (heroVideo.paused) {
        heroVideo.play();
      } else {
        heroVideo.pause();
      }
    });
  } else {
    console.error("Video element not found!");
  }
});

// Writing JS code for the carusoul
const track = document.getElementById("carouselTrack");
const prevBtn = document.querySelector(".carousel__btn--prev");
const nextBtn = document.querySelector(".carousel__btn--next");

let currentIndex = 0;
const slides = document.querySelectorAll(".carousel__item");
const totalSlides = slides.length;

function updateCarousel() {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

// Optional: Auto-slide every 6 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 6000);

// Basic script for Pedicap
document.addEventListener("DOMContentLoaded", function () {
  console.log("Pedicap site loaded.");
});

// Start coding for my summer dream
const reviews = [
  {
    name: "Courtney Seedhouse",
    stars: 5,
    text: "Baki was absolutely incredible! He knew all the secret photo spots in Central Park and shared fun historical facts along the way. He was polite, funny, and made sure we were comfortable the entire ride. I would recommend him to anyone visiting NYC!",
  },
  {
    name: "Nathan Beane",
    stars: 5,
    text: "Khushnur gave us one of the best experiences we’ve had in New York! His storytelling skills are amazing, and he made the park come alive with his enthusiasm. We learned about movies filmed there, famous landmarks, and even saw turtles! Five stars without a doubt.",
  },
  {
    name: "Dionne Afutoto",
    stars: 5,
    text: "Jamal made our tour unforgettable. He was friendly and professional, and he knew so much about the park’s history and architecture. He even had a speaker and played soft music during the ride — it felt magical. Highly recommend Jamal!",
  },
  {
    name: "Mike Tabasco",
    stars: 5,
    text: "Akbar was the highlight of our trip! His energy, knowledge, and humor were top-tier. He made sure we saw every major attraction in the park and even took amazing photos for us. It felt more like a personal experience than a typical tour.",
  },
  {
    name: "Diana J.",
    stars: 5,
    text: "I took the tour with my mom and Baki made us feel so special! He was respectful, warm, and very informative. We especially appreciated his calm pace and attention to detail. Central Park was beautiful, and Baki made it even more memorable.",
  },
  {
    name: "Lena R..",
    stars: 5,
    text: "Such a peaceful and fun ride! Our guide was super friendly and gave us cool little facts about the park I’d never heard before. I’d absolutely do it again on my next trip!",
  },
  {
    name: "Victor T.",
    stars: 5,
    text: "Way better than walking. We saw everything in under an hour and still had time for pictures and jokes with our guide. Smooth ride and great vibes.",
  },
  {
    name: "Jasmine K.",
    stars: 5,
    text: "I brought my parents and they loved it. The pedicab was comfy, clean, and our guide made it feel like a personal tour. Definitely worth it!",
  },
  {
    name: "Alina S.",
    stars: 5,
    text: "Felt like I was in a movie! The guide was funny, the route was scenic, and the whole thing just made Central Park feel extra magical. Highly recommend.",
  },
  // Add more reviews here
];

let reviewIndex = 0;

function renderReview(review) {
  const div = document.createElement("div");
  div.className = "review__card";
  div.innerHTML = `
    <div class="review__author">${review.name}</div>
    <div class="review__stars">${"★".repeat(review.stars)}${"☆".repeat(
    5 - review.stars
  )}</div>
    <p>${review.text}</p>
  `;
  document.getElementById("reviewContainer").appendChild(div);
}

document.getElementById("loadMoreBtn").addEventListener("click", () => {
  if (reviewIndex < reviews.length) {
    renderReview(reviews[reviewIndex]);
    reviewIndex++;
    if (reviewIndex >= reviews.length) {
      document.getElementById("loadMoreBtn").disabled = true;
      document.getElementById("loadMoreBtn").textContent = "No more reviews";
    }
  }
});

// Load initial 2 reviews
renderReview(reviews[reviewIndex++]);
renderReview(reviews[reviewIndex++]);

// Form submission is handled by the server - no modal needed
// The form will redirect to thankYou.html after successful submission

// const div = document.createElement("div");
// div.innerHTML = `
// <div>We have recieved your information, and we'll contact you as soon as possible !</div>
// `;

// Writing code for the TourButton
const tourButton = document.querySelectorAll(".tour__card-button");
const contactSection = document.getElementById("contact");

tourButton.forEach((element) => {
  element.addEventListener("click", function () {
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Animating the Roadmap section
const roadmapImages = document.querySelectorAll(".roadmap__image");

const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.4,
  }
);

roadmapImages.forEach((img) => imageObserver.observe(img));

// Tour Stops Button Functionality
document.addEventListener("DOMContentLoaded", function () {
  const tourStopsButtons = document.querySelectorAll(".tour__stops-btn");

  tourStopsButtons.forEach((button) => {
    // Add click functionality for mobile devices
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      const infoPanel = this.nextElementSibling;
      const icon = this.querySelector(".btn-icon");

      if (infoPanel.classList.contains("active")) {
        // Hide panel
        infoPanel.classList.remove("active");
        icon.textContent = "+";
        icon.style.transform = "rotate(0deg)";
      } else {
        // Hide all other panels first
        document.querySelectorAll(".tour__stops-info").forEach((panel) => {
          panel.classList.remove("active");
        });
        document.querySelectorAll(".btn-icon").forEach((icon) => {
          icon.textContent = "+";
          icon.style.transform = "rotate(0deg)";
        });

        // Show current panel
        infoPanel.classList.add("active");
        icon.textContent = "−";
        icon.style.transform = "rotate(0deg)";
      }
    });

    // Add keyboard accessibility
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Close panels when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".tour__card")) {
      const allPanels = document.querySelectorAll(".tour__stops-info");
      const allIcons = document.querySelectorAll(".btn-icon");

      allPanels.forEach((panel) => {
        panel.classList.remove("active");
      });

      allIcons.forEach((icon) => {
        icon.textContent = "+";
        icon.style.transform = "rotate(0deg)";
      });
    }
  });
});

// Email validation functionality
function validateEmail(email) {
  // Basic email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function showEmailError(message) {
  const errorDiv = document.getElementById("emailError");
  const emailInput = document.getElementById("emailInput");

  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  emailInput.classList.add("error");
  emailInput.classList.remove("valid");
}

function hideEmailError() {
  const errorDiv = document.getElementById("emailError");
  const emailInput = document.getElementById("emailInput");

  errorDiv.style.display = "none";
  emailInput.classList.remove("error");
  emailInput.classList.add("valid");
}

// Guest validation functions
function validateGuests(guests) {
  const numGuests = parseInt(guests);
  return !isNaN(numGuests) && numGuests >= 1 && numGuests <= 10;
}

function showGuestsError(message) {
  const errorDiv = document.getElementById("guestsError");
  const guestsInput = document.getElementById("guestsInput");

  errorDiv.textContent = message;
  errorDiv.style.display = "block";
  guestsInput.classList.add("error");
  guestsInput.classList.remove("valid");
}

function hideGuestsError() {
  const errorDiv = document.getElementById("guestsError");
  const guestsInput = document.getElementById("guestsInput");

  errorDiv.style.display = "none";
  guestsInput.classList.remove("error");
  guestsInput.classList.add("valid");
}

function checkGuestsValidation() {
  const guestsInput = document.getElementById("guestsInput");
  const guests = guestsInput.value.trim();

  if (guests === "") {
    hideGuestsError();
    guestsInput.classList.remove("valid", "error");
    return true; // Let HTML5 required attribute handle empty validation
  }

  const numGuests = parseInt(guests);

  if (isNaN(numGuests)) {
    showGuestsError("Please enter a valid number");
    return false;
  }

  if (numGuests < 1) {
    showGuestsError("Number of guests must be at least 1");
    return false;
  }

  if (numGuests > 10) {
    showGuestsError("Maximum 10 guests allowed per tour");
    return false;
  }

  hideGuestsError();
  return true;
}

function checkEmailValidation() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  if (email === "") {
    hideEmailError();
    emailInput.classList.remove("valid", "error");
    return true; // Let HTML5 required attribute handle empty validation
  }

  if (!validateEmail(email)) {
    showEmailError(
      "Please enter a valid email address (e.g., example@domain.com)"
    );
    return false;
  }

  hideEmailError();
  return true;
}

// Add event listeners when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("emailInput");
  const guestsInput = document.getElementById("guestsInput");
  const form = document.querySelector(".form__container");

  if (emailInput) {
    // Real-time validation on input
    emailInput.addEventListener("input", function () {
      checkEmailValidation();
    });

    // Validation on blur (when user leaves the field)
    emailInput.addEventListener("blur", function () {
      checkEmailValidation();
    });
  }

  if (guestsInput) {
    // Real-time validation on input
    guestsInput.addEventListener("input", function () {
      checkGuestsValidation();
    });

    // Validation on blur (when user leaves the field)
    guestsInput.addEventListener("blur", function () {
      checkGuestsValidation();
    });
  }

  if (form) {
    // Prevent form submission if validation fails
    form.addEventListener("submit", function (e) {
      console.log("Form submission attempted");

      const emailValid = checkEmailValidation();
      const guestsValid = checkGuestsValidation();

      if (!emailValid) {
        console.log("Email validation failed - preventing submission");
        e.preventDefault();
        emailInput.focus();
        return false;
      }

      if (!guestsValid) {
        console.log("Guests validation failed - preventing submission");
        e.preventDefault();
        guestsInput.focus();
        return false;
      }

      console.log("All validations passed - allowing form submission");
      // Form will submit normally to /api/book
    });
  }
});
