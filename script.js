// ===== DARK MODE =====
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        setTimeout(() => {
            const style = document.createElement('style');
            style.innerHTML = `body, .navbar, .project-card, .blog-card, input, textarea { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }`;
            document.head.appendChild(style);
        }, 100);

        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }
});

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY");
}

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
const phoneInput = form.querySelector('input[name="user_phone"]');
const messageInput = form.querySelector('textarea[name="message"]');
const charCount = document.getElementById('charCount');

phoneInput.addEventListener('input', (e) => {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
});

messageInput.addEventListener('input', () => {
    charCount.textContent = `${messageInput.value.length}/${messageInput.getAttribute('maxlength')}`;
});

const nameInput = form.querySelector('input[name="user_name"]');
const emailInput = form.querySelector('input[name="user_email"]');
const submitBtn = form.querySelector('button[type="submit"]');

const checkInputs = () => {
    const isValid = nameInput.value.trim() !== "" &&
                    emailInput.value.trim() !== "" &&
                    phoneInput.value.trim() !== "" &&
                    messageInput.value.trim() !== "" &&
                    validateEmail(emailInput.value.trim()) &&
                    validatePhone(phoneInput.value.trim());
    submitBtn.disabled = !isValid;
};

[nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    input.addEventListener('input', checkInputs);
});
checkInputs();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let statusMsg = document.getElementById('statusMsg') || document.createElement('div');
    if (!statusMsg.id) {
        statusMsg.id = 'statusMsg';
        statusMsg.style.marginTop = '15px';
        statusMsg.style.fontWeight = 'bold';
        statusMsg.style.textAlign = 'center';
        form.appendChild(statusMsg);
    }

    const showStatus = (text, color) => {
        statusMsg.textContent = text;
        statusMsg.style.color = color;
        setTimeout(() => { statusMsg.textContent = ''; }, 5000);
    };

    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            showStatus("Message sent successfully!", "green");
            form.reset();
        }, (err) => {
            showStatus("Failed to send message. Please try again.", "red");
        })
        .finally(() => {
            btn.innerText = originalText;
            checkInputs();
        });
});

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePhone(phone) { return /^[\+]?[\d\s\-\(\)]{10,20}$/.test(phone); }

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            if (!circle.classList.contains('animated')) {
                circle.classList.add('animated');
                const percent = parseInt(circle.getAttribute('data-percentage'));
                const outer = circle.querySelector('.outer-circle');
                const number = circle.querySelector('.number');
                let counter = 0;
                const interval = setInterval(() => {
                    if (counter >= percent) {
                        clearInterval(interval);
                    } else {
                        counter++;
                        number.textContent = `${counter}%`;
                        const angle = counter * 3.6;
                        outer.style.background = `conic-gradient(#e91e63 ${angle}deg, #ddd ${angle}deg)`;
                    }
                }, 20);
            }
            observer.unobserve(circle);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-circle').forEach(circle => { skillObserver.observe(circle); });

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
    backToTopBtn.style.display = (document.documentElement.scrollTop > 300) ? "block" : "none";
});
backToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

// ===== MOBILE MENU =====
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (mobileMenu) {
    mobileMenu.addEventListener('click', () => { navLinks.classList.toggle('active'); });
}
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => { navLinks.classList.remove('active'); });
});