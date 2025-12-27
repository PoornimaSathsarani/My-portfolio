/* Preloader */
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

/* Dark / Light Mode */
const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
  themeBtn.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

/* Typing Effect */
const typingText = document.querySelector(".typing-text");
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = "";
  let i = 0;
  (function type() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i++);
      setTimeout(type, 100);
    }
  })();
}

/* Fade In */
const sections = document.querySelectorAll(".fade-in-section");
const reveal = () => {
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", reveal);
reveal();

/* Back to Top */
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  backBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Contact Form Demo */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message sent successfully! (Demo)");
});
