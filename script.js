// ===================== PRELOADER =====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});

// ===================== DARK MODE =====================
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.innerHTML = document.body.classList.contains("dark")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

// ===================== TYPING EFFECT =====================
const typingText = document.querySelector(".typing-text");
const words = [
  "Biomedical Technology Student",
  "Web Developer",
  "Healthcare Technology Enthusiast"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex);

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    speed = isDeleting ? 1500 : 500;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

// ===================== FADE IN ON SCROLL =====================
const fadeItems = document.querySelectorAll(".fade-in");
function revealOnScroll() {
  fadeItems.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===================== BACK TO TOP =====================
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (!backBtn) return;
  backBtn.classList.toggle("active", window.scrollY > 300);
});
backBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== MOBILE MENU =====================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// ===================== ACTIVE NAV LINK =====================
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section, footer");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) {
      current = sec.id;
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ===================== SKILL BARS =====================
const skillSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".skill-per");

window.addEventListener("scroll", () => {
  if (!skillSection) return;
  const pos = skillSection.getBoundingClientRect().top;
  if (pos < window.innerHeight - 100) {
    skillBars.forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }
});

// ===================== TESTIMONIAL SLIDER =====================
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let slideIndex = 0;

function showSlide() {
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

nextBtn?.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
});

prevBtn?.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide();
});

setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
}, 5000);

// ===================== PROJECT MODAL =====================
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.getElementById("modalGallery");
const closeModal = document.querySelector(".close-modal");
const projectBtns = document.querySelectorAll(".project-btn");

projectBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".card");
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalGallery.innerHTML = "";

    if (card.dataset.images) {
      card.dataset.images.split(",").forEach(src => {
        const img = document.createElement("img");
        img.src = src.trim();
        modalGallery.appendChild(img);
      });
    }

    modal.classList.add("active");
  });
});

closeModal?.addEventListener("click", () => modal.classList.remove("active"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Message sent successfully!");
  contactForm.reset();
});

// ===================== BLOG SEARCH =====================
const blogSearch = document.getElementById("blogSearch");
const blogCards = document.querySelectorAll(".blog-card");

blogSearch?.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  blogCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});

// ===================== NEWSLETTER =====================
const newsletterForm = document.getElementById("newsletterForm");
newsletterForm?.addEventListener("submit", e => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input").value;
  alert(`Subscribed successfully: ${email}`);
  newsletterForm.reset();
});
