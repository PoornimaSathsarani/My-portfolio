// DARK MODE
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Change icon
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});

// PROJECT DATA
const projects = [
    { title: "Portfolio Website", description: "HTML, CSS, JS based portfolio" },
    { title: "BMI Calculator", description: "JavaScript BMI calculator" },
    { title: "Medical Form", description: "Patient data form" }
];

const container = document.getElementById("projectContainer");

projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "project-card";
    div.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p>`;
    container.appendChild(div);
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Message Sent!");
});
