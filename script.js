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
    
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Message sent successfully!");
    form.reset();
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== SKILL BAR ANIMATION =====
const skillCircles = document.querySelectorAll('.skill-circle');
window.addEventListener('scroll', () => {
    skillCircles.forEach(circle => {
        const circlePos = circle.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        
        if(circlePos < screenPos && !circle.classList.contains('animated')){
            circle.classList.add('animated');
            const percent = parseInt(circle.getAttribute('data-percentage'));
            const outer = circle.querySelector('.outer-circle');
            const number = circle.querySelector('.number');
            let counter = 0;
            
            const interval = setInterval(() => {
                if(counter >= percent){
                    clearInterval(interval);
                } else {
                    counter++;
                    number.textContent = `${counter}%`;
                    const angle = counter * 3.6;
                    outer.style.background = `conic-gradient(#e91e63 ${angle}deg, #ddd ${angle}deg)`;
                }
            }, 20);
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

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MODAL =====
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close-modal");

document.querySelectorAll(".btn-details").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest(".project-card-inner");
        const title = card.querySelector("h3").innerText;
        const desc = card.querySelector(".project-card-back p").innerText;
        
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// ===== FADE IN ANIMATION =====
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// ===== PRELOADER =====
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// ===== TESTIMONIAL SLIDER =====
const slides = document.querySelectorAll(".testimonial-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let slideIndex = 0;

if (slides.length > 0) {
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slideIndex = (index + slides.length) % slides.length;
        slides[slideIndex].classList.add("active");
    }

    if(prevBtn) prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
    if(nextBtn) nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));

    // Auto slide
    setInterval(() => {
        showSlide(slideIndex + 1);
    }, 5000);
}
