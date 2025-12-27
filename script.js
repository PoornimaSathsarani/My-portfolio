document.addEventListener("DOMContentLoaded", () => {
// Dark Mode Toggle
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const icon = themeBtn.querySelector("i");
      if (document.body.classList.contains("dark-mode")) {
        icon.classList.replace("fa-moon", "fa-sun");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
      }
    });
  }

// Typing effect
  const text = document.querySelector(".typing-text");
  if (text) {
    const original = text.textContent;
    text.textContent = "";
    let i = 0;

    function type() {
      if (i < original.length) {
        text.textContent += original.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  }

// Back to top
  const btn = document.getElementById("backToTopBtn");
  const nav = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (btn) btn.style.display = window.scrollY > 300 ? "block" : "none";
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  });
  if (btn) btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Skill animation
  document.querySelectorAll(".skill-circle").forEach(circle => {
    let percent = circle.dataset.percentage;
    let number = circle.querySelector(".number");
    let count = 0;
    let interval = setInterval(() => {
      if (count >= percent) clearInterval(interval);
      else {
        count++;
        number.textContent = count + "%";
      }
    }, 20);
  });

// Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      alert("Message Sent Successfully!");
      this.reset();
    });
  }

// Mobile Menu Toggle
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }
});

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});
