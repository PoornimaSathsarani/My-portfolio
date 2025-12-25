// ===== DARK MODE =====
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.bar .progress');
window.addEventListener('scroll', () => {
    skillBars.forEach(bar => {
        const barPos = bar.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        if(barPos < screenPos){
            bar.style.width = bar.getAttribute('data-width');
        }
    });
});
