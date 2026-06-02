// Sticky header (desktop only — fixed .sticky on mobile blocked taps)
const header = document.querySelector(".header");
const nav = document.querySelector(".header__nav");
const navContainer = document.querySelector(".header .container");
const hamburger = document.getElementById("hamburger");
const navBackdrop = document.getElementById("navBackdrop");

function isMobileNav() {
  return window.matchMedia("(max-width: 768px)").matches;
}

if (header && navContainer && !isMobileNav()) {
  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      navContainer.classList.toggle("sticky", !entry.isIntersecting);
    },
    { root: null, threshold: 0, rootMargin: "-1px" }
  );
  stickyObserver.observe(header);
}

function setMobileNavOpen(open) {
  if (!nav || !hamburger) return;
  hamburger.classList.toggle("open", open);
  nav.classList.toggle("open", open);
  if (navBackdrop) {
    navBackdrop.classList.toggle("is-visible", open);
    navBackdrop.setAttribute("aria-hidden", open ? "false" : "true");
  }
  document.body.classList.toggle("nav-open", open);
}

function closeMobileNav() {
  setMobileNavOpen(false);
}

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    setMobileNavOpen(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMobileNav);
  }

  window.addEventListener("resize", () => {
    if (!isMobileNav()) closeMobileNav();
  });
}

// Hero background: optional video (use .hero__video + MP4/WebM sources)
document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.querySelector(".hero__video");
  if (!heroVideo) return;

  heroVideo.play().catch(() => {
    heroVideo.style.display = "none";
  });
});

// Intro carousel
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  const container = document.querySelector(".carousel__container");
  const prevBtn = document.querySelector(".carousel__btn--prev");
  const nextBtn = document.querySelector(".carousel__btn--next");
  const dotsContainer = document.getElementById("carouselDots");
  const currentEl = document.getElementById("carouselCurrent");
  const totalEl = document.getElementById("carouselTotal");

  if (!track || !container || !prevBtn || !nextBtn) return;

  const slides = track.querySelectorAll(":scope > .carousel__item");
  const totalSlides = slides.length;
  if (totalSlides === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  if (totalEl) totalEl.textContent = String(totalSlides);

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Go to photo ${i + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(i);
        startAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateUI() {
    if (currentEl) currentEl.textContent = String(currentIndex + 1);
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".carousel__dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }
  }

  function updateCarousel() {
    const slideWidth = container.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateUI();
  }

  function goToSlide(index) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    updateCarousel();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    startAutoSlide();
  });

  window.addEventListener("resize", updateCarousel);

  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);

  updateCarousel();
  startAutoSlide();
});

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

function setTourTypeSelection(tourName) {
  const tourSelect = document.getElementById("tourType");
  if (!tourSelect || !tourName) return false;

  const name = tourName.trim();
  const option = Array.from(tourSelect.options).find(
    (opt) => opt.value.trim() === name || opt.textContent.trim() === name
  );

  if (!option) return false;

  tourSelect.value = option.value;
  tourSelect.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function getTourNameFromCard(card) {
  return card?.querySelector("h3")?.textContent?.trim() || "";
}

function scrollToBookingSection(tourName) {
  if (tourName) setTourTypeSelection(tourName);

  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}

let pendingBookingTourName = null;

function openPayNoticeModal(tourName) {
  const modal = document.getElementById("payNoticeModal");
  if (!modal) {
    scrollToBookingSection(tourName);
    return;
  }

  pendingBookingTourName = tourName || null;
  modal.classList.remove("is-closing");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("pay-notice-open");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
    });
  });

  const gotItBtn = document.getElementById("payNoticeGotIt");
  gotItBtn?.focus();
}

function closePayNoticeModal() {
  const modal = document.getElementById("payNoticeModal");
  if (!modal || !modal.classList.contains("is-open")) return;

  const tourName = pendingBookingTourName;
  pendingBookingTourName = null;

  modal.classList.remove("is-open");
  modal.classList.add("is-closing");

  let finished = false;
  const finishClose = () => {
    if (finished) return;
    finished = true;
    modal.classList.remove("is-closing");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pay-notice-open");
    scrollToBookingSection(tourName);
  };

  const dialog = modal.querySelector(".pay-notice-modal__dialog");
  dialog?.addEventListener("transitionend", finishClose, { once: true });
  setTimeout(finishClose, 380);
}

function startBookNowFlow(tourName) {
  openPayNoticeModal(tourName);
}

document.addEventListener("DOMContentLoaded", () => {
  const gotItBtn = document.getElementById("payNoticeGotIt");
  gotItBtn?.addEventListener("click", closePayNoticeModal);
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

// Tour card image lightbox
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("tourCardModal");
  const modalInner = modal?.querySelector(".tour-modal__inner");

  function closeTourModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("tour-modal-open");
    if (modalInner) modalInner.innerHTML = "";
  }

  function openTourModal(card) {
    if (!modal || !modalInner) return;

    const clone = card.cloneNode(true);
    clone.classList.add("tour__card--expanded");
    clone.removeAttribute("id");

    const title = clone.querySelector("h3");
    if (title) title.id = "tourModalTitle";

    modalInner.appendChild(clone);

    const tourName = getTourNameFromCard(card);

    clone.querySelectorAll(".tour__card-button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeTourModal();
        startBookNowFlow(tourName);
      });
    });

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("tour-modal-open");
  }

  document.querySelectorAll(".tour__card-media").forEach((media) => {
    media.setAttribute("role", "button");
    media.setAttribute("tabindex", "0");
    media.setAttribute("aria-label", "View tour details larger");

    const openFromMedia = () => {
      const card = media.closest(".tour__card");
      if (card) openTourModal(card);
    };

    media.addEventListener("click", (e) => {
      e.stopPropagation();
      openFromMedia();
    });

    media.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openFromMedia();
      }
    });
  });

  modal?.addEventListener("click", (e) => {
    if (e.target.closest(".tour__card-button")) return;
    closeTourModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      closeTourModal();
    }
  });
});

// Book Now on tour cards (grid, not modal — modal buttons wired when opened)
document.addEventListener("click", (e) => {
  const bookBtn = e.target.closest(".tour__card-button");
  if (!bookBtn || bookBtn.closest("#tourCardModal")) return;
  e.preventDefault();
  const card = bookBtn.closest(".tour__card");
  startBookNowFlow(getTourNameFromCard(card));
});

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

function showFormStatus(message, type) {
  const statusEl = document.getElementById("formStatus");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = "form__status form__status--" + type;
  statusEl.style.display = "block";
}

function hideFormStatus() {
  const statusEl = document.getElementById("formStatus");
  if (!statusEl) return;
  statusEl.textContent = "";
  statusEl.className = "form__status";
  statusEl.style.display = "none";
}

function setSubmitLoading(isLoading) {
  const button = document.getElementById("submitButton");
  if (!button) return;
  button.disabled = isLoading;
  button.classList.toggle("is-loading", isLoading);
  button.textContent = isLoading ? "Sending…" : "Send Request";
}

async function submitBookingForm(form) {
  const body = new URLSearchParams(new FormData(form));

  const response = await fetch("/api/book", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: body.toString(),
    redirect: "manual",
  });

  const contentType = response.headers.get("Content-Type") || "";

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("Location") || "/thankYou.html";
    return { response, data: { ok: true, redirect: location } };
  }

  if (contentType.includes("application/json")) {
    const data = await response.json();
    if (data.error && data.ok !== true) {
      return {
        response,
        data: {
          ok: false,
          message:
            data.message ||
            "We could not send your booking. Please call +1 (929) 645-7024.",
          code: data.code || "EMAIL_FAILED",
        },
      };
    }
    return { response, data };
  }

  const text = (await response.text()).trim().slice(0, 200);

  if (response.status === 405) {
    return {
      response,
      data: {
        ok: false,
        message:
          "Booking server not reachable. Run npm start and open http://localhost:5000 (do not use Live Server / port 5500).",
      },
    };
  }

  return {
    response,
    data: {
      ok: false,
      message:
        text ||
        `Server error (${response.status}). Please call +1 (929) 645-7024.`,
    },
  };
}

// Add event listeners when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("emailInput");
  const guestsInput = document.getElementById("guestsInput");
  const form = document.getElementById("bookingForm");

  const params = new URLSearchParams(window.location.search);
  if (params.get("booking") === "error") {
    showFormStatus(
      "Your last booking could not be completed. Please try again or call +1 (929) 645-7024.",
      "error"
    );
    window.history.replaceState({}, "", window.location.pathname + "#contact");
  }

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
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      hideFormStatus();

      const emailValid = checkEmailValidation();
      const guestsValid = checkGuestsValidation();

      if (!emailValid) {
        emailInput.focus();
        showFormStatus("Please enter a valid email address.", "error");
        return;
      }

      if (!guestsValid) {
        guestsInput.focus();
        showFormStatus("Please enter a valid number of guests (1–10).", "error");
        return;
      }

      const tourDateInput = document.getElementById("tourDate");
      const tourDateTrigger = document.getElementById("tourDateTrigger");
      if (tourDateInput && !tourDateInput.value.trim()) {
        if (tourDateTrigger) {
          tourDateTrigger.classList.add("error");
          tourDateTrigger.focus();
        }
        showFormStatus("Please choose a tour date.", "error");
        return;
      }
      if (tourDateTrigger) tourDateTrigger.classList.remove("error");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setSubmitLoading(true);

      try {
        const { data } = await submitBookingForm(form);

        if (data.ok) {
          if (data.warning) {
            sessionStorage.setItem("bookingWarning", data.warning);
          }
          window.location.href = data.redirect || "/thankYou.html";
          return;
        }

        showFormStatus(
          data.message ||
            "We could not complete your booking. Please try again or call +1 (929) 645-7024.",
          "error"
        );
      } catch (err) {
        console.error("Booking submit failed:", err);
        showFormStatus(
          "Network error. Check your connection and try again, or call +1 (929) 645-7024.",
          "error"
        );
      } finally {
        setSubmitLoading(false);
      }
    });
  }
});
