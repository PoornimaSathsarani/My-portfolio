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
  alert("Message sent successfully! (Demo)");
  e.target.reset();
});

// BACK TO TOP BUTTON
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  backBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// PROJECT FILTER
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});
