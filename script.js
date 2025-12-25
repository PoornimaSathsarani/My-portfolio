// Dark Mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Project Data
const projects = [
    {
        title: "Portfolio Website",
        description: "Responsive portfolio using HTML, CSS, JS"
    },
    {
        title: "BMI Calculator",
        description: "JavaScript BMI calculator"
    },
    {
        title: "Medical Form",
        description: "Patient data collection form"
    }
];

const container = document.getElementById("projectContainer");

projects.forEach(project => {
    const div = document.createElement("div");
    div.className = "project-card";

    div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
    `;

    container.appendChild(div);
});

// Contact Form
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
});
