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

// DYNAMIC PROJECTS (Week 6)
const projectData = [
  { title: "Portfolio Website", desc: "Responsive website using HTML, CSS & JavaScript", category: "web" },
  { title: "University Practical", desc: "Academic based web application for practical assessment", category: "academic" }
];

const projectsContainer = document.getElementById("projects-grid");
if (projectsContainer) {
  projectData.forEach(project => {
    const card = document.createElement("div");
    card.className = "card glass";
    card.setAttribute("data-category", project.category);
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
    `;
    projectsContainer.appendChild(card);
  });
}

// COURSE PLAN
const courseData = [
  { weeks: "Week 1", phase: "Kick-off", topics: ["Version Control (Git)", "First Deployment", "VS Code Setup"] },
  { weeks: "Week 2", phase: "Structure & Style", topics: ["Semantic HTML5", "CSS3 Styling", "Separation of Concerns"] },
  { weeks: "Week 3", phase: "Responsive", topics: ["Flexbox Layouts", "Media Queries", "Mobile-First Design"] },
  { weeks: "Week 4", phase: "Interactivity", topics: ["DOM Manipulation", "Events", "Dark Mode"] },
  { weeks: "Week 5", phase: "Forms & Functions", topics: ["JS Functions", "Client-Side Forms", "Validation"] },
  { weeks: "Week 6", phase: "Dynamic Content", topics: ["Arrays & Loops", "DOM Generation", "Data Separation"] },
  { weeks: "Week 7", phase: "Server-Side", topics: ["PHP Intro", "Client-Server Model", "SQLite Connection"] },
  { weeks: "Week 8", phase: "Data Handling", topics: ["POST vs GET", "Form Processing", "Server Validation"] },
  { weeks: "Week 10", phase: "Database CRUD", topics: ["Create, Read, Update, Delete", "Admin Panel", "SQL"] },
  { weeks: "Week 11", phase: "Frameworks", topics: ["React Components", "Next.js Routing", "Vercel Deployment"] }
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

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");
    const projectCards = document.querySelectorAll("#projects-grid .card");

    projectCards.forEach(card => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});
