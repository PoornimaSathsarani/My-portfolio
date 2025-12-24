/* ===== DARK MODE ===== */
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

/* ===== PROJECT DATA ===== */
const projects = [
    {
        title: "Portfolio Website",
        description: "Personal responsive portfolio website using HTML, CSS, and JavaScript."
    },
    {
        title: "BMI Calculator",
        description: "JavaScript-based BMI calculator for health monitoring."
    },
    {
        title: "Medical Data Form",
        description: "Simple form for collecting patient data."
    }
];

const container = document.getElementById("projectContainer");

/* ===== LOAD PROJECTS ===== */
projects.forEach(project => {
    const div = document.createElement("div");
    div.className = "project-card";

    div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;

    container.appendChild(div);
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
});
