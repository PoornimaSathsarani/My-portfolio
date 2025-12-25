/* ===== DARK MODE ===== */
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

/* ===== PROJECT DATA ===== */
const projects = [
    {
        title: "Portfolio Website",
        description: "Responsive portfolio using HTML, CSS and JS."
    },
    {
        title: "BMI Calculator",
        description: "JavaScript based BMI calculator."
    },
    {
        title: "Medical Form",
        description: "Client-side form validation project."
    }
];

const container = document.getElementById("projectContainer");

/* ===== LOAD PROJECTS ===== */
projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;

    container.appendChild(card);
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
});
