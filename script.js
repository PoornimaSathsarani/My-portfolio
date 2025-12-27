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

// COURSE PLAN
const courseData = [
  { weeks: "Week 1-3", phase: "Foundation + Styling", topics: ["HTML5 and CSS3", "Responsive Design", "Github and Version Control"] },
  { weeks: "Week 4-6", phase: "Dynamics", topics: ["Client-Side Interactivity with JavaScript", "Validation", "Interaction"] },
  { weeks: "Week 7-9", phase: "Server-Side", topics: ["Scripting with PHP", "Forms With PHP", "Memory"] },
  { weeks: "Week 10-13", phase: "Databases with MySQL", topics: ["CRUD Application", "Design Patterns and Frameworks"] },
  { weeks: "Last 2 Weeks", phase: "Finalization", topics: ["Deployment live to server", "Model Paper", "Final Project Presentations"] }
];

const courseContainer = document.getElementById("course-timeline");
if (courseContainer) {
  courseData.forEach(item => {
    const card = document.createElement("div");
    card.className = "card fade-in";
    card.innerHTML = `
      <h3>${item.weeks}</h3>
      <h4>${item.phase}</h4>
      <ul>${item.topics.map(topic => `<li>${topic}</li>`).join("")}</ul>
    `;
    courseContainer.appendChild(card);
  });
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
