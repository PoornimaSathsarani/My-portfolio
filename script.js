// Dark Mode
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Projects
const projects = [
    { title:"Portfolio Website", description:"Personal responsive portfolio website", image:"images/portfolio.png" },
    { title:"BMI Calculator", description:"Simple BMI calculator using JavaScript", image:"images/bmi.png" },
    { title:"COVID-19 Tracker", description:"Track COVID-19 stats using API", image:"images/covid.png" },
    { title:"Weather App", description:"Real-time weather app using OpenWeather API", image:"images/weather.png" }
];

const container = document.getElementById("projectContainer");
projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    if(p.image) {
        const img = document.createElement("img");
        img.src = p.image; img.alt = p.title; card.appendChild(img);
    }
    const h3 = document.createElement("h3"); h3.textContent = p.title;
    const pDesc = document.createElement("p"); pDesc.textContent = p.description;
    card.appendChild(h3); card.appendChild(pDesc); container.appendChild(card);
});

// Contact Form
const form = document.getElementById("contactForm");
form.addEventListener("submit", function(event){
    event.preventDefault();
    alert("Message Sent Successfully!");
    form.reset();
});
