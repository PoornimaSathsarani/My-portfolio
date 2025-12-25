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

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MOBILE MENU =====
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
