// ===== DARK MODE =====
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {
        // Check LocalStorage
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Add smooth transition after page load to prevent flashing
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

// Initialize EmailJS (Replace "YOUR_PUBLIC_KEY" with your actual key)
if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY");
}

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

// Real-time Validation to disable submit button
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
checkInputs(); // Initial check

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = form.querySelector('input[name="user_name"]').value.trim();
    const email = form.querySelector('input[name="user_email"]').value.trim();
    const phone = form.querySelector('input[name="user_phone"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    // Create status message element if it doesn't exist
    let statusMsg = document.getElementById('statusMsg');
    if (!statusMsg) {
        statusMsg = document.createElement('div');
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

    if (name === "" || email === "" || phone === "" || message === "") {
        showStatus("Please fill in all fields.", "red");
        return;
    }

    if (!validateEmail(email)) {
        showStatus("Please enter a valid email address.", "red");
        return;
    }

    if (!validatePhone(phone)) {
        showStatus("Please enter a valid phone number.", "red");
        return;
    }

    // Replace these with your actual Service ID and Template ID
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    if (typeof emailjs === 'undefined') {
        showStatus("Email service not loaded. Check internet connection.", "red");
        btn.disabled = false;
        btn.innerText = originalText;
        return;
    }

    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            showStatus("Message sent successfully!", "green");
            form.reset();
        }, (err) => {
            showStatus("Failed to send message. Please try again.", "red");
            console.error("EmailJS Error:", err);
        })
        .finally(() => {
            btn.innerText = originalText;
            checkInputs();
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

document.querySelectorAll('.skill-circle').forEach(circle => {
    skillObserver.observe(circle);
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

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

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

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });
    navItems.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current) && current !== "") {
            a.classList.add("active");
        }
    });
});

// ===== BLOG SHARE =====
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const card = btn.closest('.blog-card');
        const title = card.querySelector('h3').innerText;
        
        const shareData = {
            title: title,
            text: `Check out this post: ${title}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    });
});

// ===== PROJECT SEARCH =====
const searchInput = document.getElementById('projectSearch');
const projectCards = document.querySelectorAll('.project-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            
            card.style.display = (title.includes(searchTerm) || desc.includes(searchTerm)) ? "block" : "none";
        });
    });
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
});

// ===== BLOG READ MORE =====
document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const moreText = btn.parentElement.querySelector('.more-text');
        
        if (moreText.style.display === "inline") {
            moreText.style.display = "none";
            btn.textContent = "Read More";
        } else {
            moreText.style.display = "inline";
            btn.textContent = "Read Less";
        }
    });
});
