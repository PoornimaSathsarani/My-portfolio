// ===== DARK MODE =====
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// ===== PROJECT DATA =====
const projects = [
    { title: "Portfolio Website", description: "Responsive portfolio using HTML, CSS, JS." },
    { title: "BMI Calculator", description: "JavaScript based BMI calculator." },
    { title: "Medical Form", description: "Client-side form validation project." }
];

const container = document.getElementById("projectContainer");
projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
    container.appendChild(card);
});

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar div');
window.addEventListener('scroll', () => {
    skillBars.forEach(bar => {
        const barPos = bar.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        if(barPos < screenPos){
            bar.style.width = bar.getAttribute('data-width');
        }
    });
});
