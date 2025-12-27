// PRELOADER
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// DARK MODE
const themeBtn = document.getElementById("themeBtn");
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  themeBtn.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
};

// TYPING EFFECT
const typingText = document.querySelector(".typing-text");
const words = ["Biomedical Technology Student", "Web Developer", "Healthcare Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChars = currentWord.substring(0, charIndex);
  typingText.textContent = currentChars;

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    typeSpeed = isDeleting ? 2000 : 500;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, typeSpeed);
};

if (typingText) typeEffect();

// FADE-IN ON SCROLL
const sections = document.querySelectorAll(".fade-in");
const reveal = () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight - 50) sec.style.animationPlayState = "running";
  });
};
window.addEventListener("scroll", reveal);
reveal();

// CONTACT FORM DEMO
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const nameInput = e.target.querySelector('input[type="text"]');
  const emailInput = e.target.querySelector('input[type="email"]');
  const msgInput = e.target.querySelector('textarea');

  const name = nameInput.value;
  const email = emailInput.value.trim();
  const message = msgInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Open Email Client
  const subject = `Portfolio Contact from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
  window.location.href = `mailto:yourname@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  e.target.reset();
});

// BACK TO TOP BUTTON
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backBtn.classList.add("active");
  } else {
    backBtn.classList.remove("active");
  }
});
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ACTIVE LINK ON SCROLL
const navLinks = document.querySelectorAll(".nav-links a");
const scrollSections = document.querySelectorAll("section, footer");

window.addEventListener("scroll", () => {
  let current = "";
  scrollSections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// SKILL BAR ANIMATION
const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".skill-per");

window.addEventListener("scroll", () => {
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos - 50) {
    progressBars.forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }
});

// MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const navContainer = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navContainer.classList.toggle("active");
  menuBtn.innerHTML = navContainer.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navContainer.classList.remove("active");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});
