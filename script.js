/*
  IronPulse Gym - Scripts
  - Mobile navigation
  - Smooth section navigation
  - Simple testimonial slider
  - Basic contact form validation
  - AOS initialization
*/

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    const navToggle = document.querySelector(".nav__toggle");
    const navLinks = document.querySelectorAll(".nav__link");
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const yearSpan = document.getElementById("year");
  
    /* Sticky header subtle shadow on scroll */
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    });
  
    /* Mobile nav toggle */
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        header.classList.toggle("nav-open");
      });
    }
  
    /* Close mobile nav on link click + smooth scrolling is handled by CSS */
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
      });
    });
  
    /* Testimonial slider (simple) */
    const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
    const prevBtn = document.querySelector(".testimonials__control--prev");
    const nextBtn = document.querySelector(".testimonials__control--next");
    let currentTestimonialIndex = 0;
  
    function updateTestimonial(index) {
      testimonialCards.forEach((card, i) => {
        card.classList.toggle("active", i === index);
      });
    }
  
    if (prevBtn && nextBtn && testimonialCards.length > 1) {
      prevBtn.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateTestimonial(currentTestimonialIndex);
      });
  
      nextBtn.addEventListener("click", () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        updateTestimonial(currentTestimonialIndex);
      });
  
      // Auto-rotate every 8 seconds (optional)
      setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
        updateTestimonial(currentTestimonialIndex);
      }, 8000);
    }
  
    /* Simple form validation */
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const nameInput = contactForm.querySelector("#name");
        const emailInput = contactForm.querySelector("#email");
        const messageInput = contactForm.querySelector("#message");
  
        const errors = {
          name: "",
          email: "",
          message: "",
        };
  
        const setError = (field, message) => {
          const errorEl = contactForm.querySelector(`[data-error-for="${field}"]`);
          if (errorEl) errorEl.textContent = message;
        };
  
        // Clear previous errors
        Object.keys(errors).forEach((field) => setError(field, ""));
        formSuccess.textContent = "";
  
        // Basic validations
        if (!nameInput.value.trim()) {
          errors.name = "Please enter your name.";
        }
  
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
          errors.email = "Please enter your email.";
        } else {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailValue)) {
            errors.email = "Please enter a valid email address.";
          }
        }
  
        if (!messageInput.value.trim()) {
          errors.message = "Please enter a message.";
        }
  
        // Show errors
        let hasError = false;
        Object.entries(errors).forEach(([field, message]) => {
          if (message) {
            hasError = true;
            setError(field, message);
          }
        });
  
        if (!hasError) {
          // In a real app, send data via fetch/AJAX here
          contactForm.reset();
          formSuccess.textContent = "Thank you! Your message has been sent.";
        }
      });
    }
  
    /* Set current year in footer */
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    /* Initialize AOS (Animate On Scroll) */
    if (window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
      });
    }
  });