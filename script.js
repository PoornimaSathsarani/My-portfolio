/* ===== WEEK 4: DARK MODE ===== */
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

/* ===== WEEK 6: PROJECTS ARRAY ===== */
const projects = [
    {
        title: "Portfolio Website",
        description: "Personal responsive portfolio website"
    },
    {
        title: "BMI Calculator",
        description: "Simple BMI calculator using JavaScript"
    }
];

const container = document.getElementById("projectContainer");

/* ===== WEEK 6: LOOP ===== */
projects.forEach(function (project) {
    const card = document.createElement("div");
    card.className = "project-card";

    const h3 = document.createElement("h3");
    h3.textContent = project.title;

    const p = document.createElement("p");
    p.textContent = project.description;

    card.appendChild(h3);
    card.appendChild(p);
    container.appendChild(card);
});

/* ===== WEEK 5: FORM ===== */
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Name:", name.value);
    console.log("Email:", email.value);
    console.log("Message:", message.value);

    alert("Message Sent Successfully!");
});
