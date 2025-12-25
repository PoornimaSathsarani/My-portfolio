// ===== DARK MODE =====
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Initialize EmailJS (Replace "YOUR_PUBLIC_KEY" with your actual key)
emailjs.init("YOUR_PUBLIC_KEY");

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");

// Auto-format phone number as (XXX) XXX-XXXX
const phoneInput = form.querySelector('input[name="user_phone"]');
phoneInput.addEventListener('input', (e) => {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
});

// Character Counter
const messageInput = form.querySelector('textarea[name="message"]');
const charCount = document.getElementById('charCount');
messageInput.addEventListener('input', () => {
    charCount.textContent = `${messageInput.value.length}/${messageInput.getAttribute('maxlength')}`;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = form.querySelector('input[name="user_name"]').value.trim();
    const email = form.querySelector('input[name="user_email"]').value.trim();
    const phone = form.querySelector('input[name="user_phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    // Replace these with your actual Service ID and Template ID
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            alert("Message sent successfully!");
            form.reset();
        }, (err) => {
            alert("Failed to send message. Please try again.");
            console.error("EmailJS Error:", err);
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerText = originalText;
        });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    // Allows optional +, spaces, dashes, parentheses, and digits
    const re = /^[\+]?[\d\s\-\(\)]{10,20}$/;
    return re.test(phone);
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

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
});

// ===== TYPEWRITER EFFECT =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);
}
