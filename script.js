// ===== DARK MODE =====
const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
}
themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ===== EMAILJS CONTACT FORM =====
const form = document.getElementById("contactForm");
const phoneInput = form.querySelector('input[name="user_phone"]');
const messageInput = form.querySelector('textarea[name="message"]');
const charCount = document.getElementById('charCount');

phoneInput.addEventListener('input', e => {
    const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
});

messageInput.addEventListener('input', () => {
    charCount.textContent = `${messageInput.value.length}/${messageInput.maxLength}`;
});

form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const phone = form.user_phone.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !phone || !message) return alert("Please fill in all fields.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Invalid email.");
    if (!/^[\+]?[\d\s\-\(\)]{10,20}$/.test(phone)) return alert("Invalid phone.");

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
        .then(() => { alert("Message sent!"); form.reset(); })
        .catch(err => { alert("Failed to send."); console.error(err); })
        .finally(() => { btn.disabled = false; btn.innerText = originalText; });
});

// ===== SKILL ANIMATION =====
document.querySelectorAll('.skill-circle').forEach(circle => {
    new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !circle.classList.contains('animated')){
                circle.classList.add('animated');
                let counter = 0, percent = parseInt(circle.dataset.percentage);
                const number = circle.querySelector('.number');
                const outer = circle.querySelector('.outer-circle');
                const interval = setInterval(() => {
                    counter >= percent ? clearInterval(interval) : (() => {
                        counter++; 
                        number.textContent = `${counter}%`;
                        outer.style.background = `conic-gradient(#e91e63 ${counter*3.6}deg,#ddd ${counter*3.6}deg)`;
                    })();
                }, 20);
                obs.unobserve(circle);
            }
        });
    }, {threshold:0.5}).observe(circle);
});

// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => backToTopBtn.style.display = (window.scrollY>300 ? "block":"none"));
backToTopBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

// ===== MOBILE MENU =====
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu?.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', ()=>navLinks.classList.remove('active')));

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY>50));

// ===== MODAL =====
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
document.querySelectorAll(".btn-details").forEach(btn => {
    btn.addEventListener("click", e => {
        const card = e.target.closest(".project-card-inner");
        modalTitle.innerText = card.querySelector("h3").innerText;
        modalDesc.innerText = card.querySelector(".project-card-back p").innerText;
        modal.style.display="flex";
    });
});
document.querySelector(".close-modal").addEventListener("click", ()=>modal.style.display="none");
window.addEventListener("click", e => { if(e.target==modal) modal.style.display="none"; });

// ===== FADE IN SECTIONS =====
document.querySelectorAll('.fade-in-section').forEach(sec => {
    new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){ entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
        });
    }, {threshold:0.2}).observe(sec);
});

// ===== PRELOADER =====
const preloader = document.getElementById('preloader');
window.addEventListener('load', ()=>{ preloader.style.opacity=0; setTimeout(()=>preloader.style.display='none',500); });

// ===== TESTIMONIAL SLIDER =====
let slideIndex=0;
const slides=document.querySelectorAll(".testimonial-slide");
const prevBtn=document.querySelector(".prev-btn");
const nextBtn=document.querySelector(".next-btn");
function showSlide(i){
    slides.forEach(s=>s.classList.remove("active"));
    slideIndex=(i+slides.length)%slides.length;
    slides[slideIndex].classList.add("active");
}
prevBtn?.addEventListener("click",()=>showSlide(slideIndex-1));
nextBtn?.addEventListener("click",()=>showSlide(slideIndex+1));
setInterval(()=>showSlide(slideIndex+1),5000);

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', ()=> {
    const scrolled=(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))*100;
    document.getElementById("myBar").style.width = scrolled+"%";
});

// ===== TYPEWRITER EFFECT =====
const typingText=document.querySelector('.typing-text');
if(typingText){
    const text=typingText.textContent;
    typingText.textContent='';
    let i=0;
    const typeWriter=()=>{ if(i<text.length){ typingText.textContent+=text[i]; i++; setTimeout(typeWriter,100); } }
    setTimeout(typeWriter,500);
}

// ===== ACTIVE NAV LINKS =====
const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", ()=>{
    let current="";
    sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-100) current=s.id; });
    navItems.forEach(a=>a.classList.toggle("active", a.getAttribute("href").includes(current) && current!==""));
});

// ===== BLOG SHARE =====
document.querySelectorAll('.share-btn').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
        const card=btn.closest('.blog-card');
        const title=card.querySelector('h3').innerText;
        const shareData={title,text:`Check out this post: ${title}`,url:window.location.href};
        try{
            if(navigator.share) await navigator.share(shareData);
            else { await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`); alert("Link copied!"); }
        }catch(err){ console.error(err); }
    });
});

// ===== PROJECT SEARCH =====
const searchInput=document.getElementById('projectSearch');
searchInput?.addEventListener('input', e=>{
    const term=e.target.value.toLowerCase();
    document.querySelectorAll('.project-card').forEach(card=>{
        const t=card.querySelector('h3').textContent.toLowerCase();
        const d=card.querySelector('p').textContent.toLowerCase();
        card.style.display=(t.includes(term)||d.includes(term))?"block":"none";
    });
});

// ===== LIGHTBOX =====
const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightbox-img');
const closeLightbox=document.querySelector('.close-lightbox');
document.querySelectorAll('.project-img').forEach(img=>{
    img.addEventListener('click',()=>{ lightbox.style.display="block"; lightboxImg.src=img.src; });
});
closeLightbox.addEventListener('click',()=>lightbox.style.display="none");
lightbox.addEventListener('click', e=>{ if(e.target!==lightboxImg) lightbox.style.display="none"; });

// ===== BLOG READ MORE =====
document.querySelectorAll('.read-more').forEach(btn=>{
    btn.addEventListener('click', e=>{
        e.preventDefault();
        const moreText=btn.parentElement.querySelector('.more-text');
        const show=moreText.style.display!=="inline";
        moreText.style.display=show?"inline":"none";
        btn.textContent=show?"Read Less":"Read More";
    });
});
