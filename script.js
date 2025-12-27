// PRELOADER
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// DARK MODE
const themeBtn = document.getElementById("themeBtn");
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  themeBtn.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  if (typeof updateChartColors === 'function') updateChartColors();
};

// TYPING EFFECT
const typingText = document.querySelector(".typing-text");
const words = ["Biomedical Technology Student", "Web Developer", "Healthcare Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChars = currentWord.substring(0, charIndex);
  typingText.textContent = currentChars;

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    typeSpeed = isDeleting ? 2000 : 500;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, typeSpeed);
};

if (typingText) typeEffect();

// FADE-IN ON SCROLL
const sections = document.querySelectorAll(".fade-in");
const reveal = () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight - 50) sec.style.animationPlayState = "running";
  });
};
window.addEventListener("scroll", reveal);
reveal();

// CONTACT FORM DEMO
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const nameInput = e.target.querySelector('input[type="text"]');
  const emailInput = e.target.querySelector('input[type="email"]');
  const msgInput = e.target.querySelector('textarea');

  const name = nameInput.value;
  const email = emailInput.value.trim();
  const message = msgInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Open Email Client
  const subject = `Portfolio Contact from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
  window.location.href = `mailto:yourname@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  e.target.reset();
});

// BACK TO TOP BUTTON
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backBtn.classList.add("active");
  } else {
    backBtn.classList.remove("active");
  }
});
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ACTIVE LINK ON SCROLL
const navLinks = document.querySelectorAll(".nav-links a");
const scrollSections = document.querySelectorAll("section, footer");

window.addEventListener("scroll", () => {
  let current = "";
  scrollSections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// SKILL BAR ANIMATION
const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".skill-per");

window.addEventListener("scroll", () => {
  const sectionPos = skillSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos - 50) {
    progressBars.forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }
});

// SKILLS CHART
const ctx = document.getElementById('skillsChart');
let skillsChart;

function updateChartColors() {
  if (!skillsChart) return;
  const isDark = document.body.classList.contains('dark');
  const textColor = isDark ? '#f4f4f4' : '#666';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  skillsChart.options.scales.r.grid.color = gridColor;
  skillsChart.options.scales.r.angleLines.color = gridColor;
  skillsChart.options.scales.r.pointLabels.color = textColor;
  skillsChart.options.scales.r.ticks.backdropColor = isDark ? 'transparent' : 'rgba(255, 255, 255, 0.75)';
  skillsChart.update();
}

if (ctx) {
  Chart.defaults.font.family = "'Inter', sans-serif";
  skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HTML/CSS', 'JavaScript', 'Python', 'Biomedical Tech', 'Communication', 'Problem Solving'],
      datasets: [{
        label: 'Skill Level',
        data: [90, 80, 75, 85, 70, 80],
        backgroundColor: 'rgba(87, 81, 209, 0.2)',
        borderColor: '#5751d1',
        pointBackgroundColor: '#5fe28b',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#5751d1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
}

// MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const navContainer = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navContainer.classList.toggle("active");
  menuBtn.innerHTML = navContainer.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navContainer.classList.remove("active");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// TESTIMONIAL SLIDER
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

if (slider && slides.length > 0) {
  let currentSlide = 0;

  const updateSlider = () => {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  };

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// BLOG SEARCH FILTER
const blogSearchInput = document.getElementById("blogSearch");
const allBlogCards = document.querySelectorAll("#blog .blog-card");

if (blogSearchInput) {
  blogSearchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const pagination = document.getElementById("blogPagination");

    if (pagination) {
      pagination.style.display = searchTerm ? "none" : "flex";
    }

    if (!searchTerm && typeof displayBlogPosts === "function") {
      displayBlogPosts(currentPage);
      return;
    }

    allBlogCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const excerpt = card.querySelector("p").textContent.toLowerCase();
      
      card.style.display = (title.includes(searchTerm) || excerpt.includes(searchTerm)) ? "block" : "none";
    });
  });
}

// PROJECT MODAL
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.getElementById("modalGallery");
const closeBtn = document.querySelector(".close-modal");
const projectBtns = document.querySelectorAll(".project-btn");

projectBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-desc");
    const images = card.getAttribute("data-images");
    
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    modalGallery.innerHTML = "";
    if (images) {
      images.split(",").forEach(imgSrc => {
        const img = document.createElement("img");
        img.src = imgSrc.trim();
        modalGallery.appendChild(img);
      });
    }

    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// BLOG PAGINATION
const blogPagination = document.getElementById("blogPagination");
let currentPage = 1;
const itemsPerPage = 1; // Set to 1 to see pagination with 2 items

const displayBlogPosts = (page) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const blogCards = document.querySelectorAll("#blog .blog-card");

  blogCards.forEach((card, index) => {
    if (index >= start && index < end) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

const setupPagination = () => {
  const blogCards = document.querySelectorAll("#blog .blog-card");
  const pageCount = Math.ceil(blogCards.length / itemsPerPage);
  
  if (blogPagination) {
    blogPagination.innerHTML = "";
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentPage = i;
        displayBlogPosts(currentPage);
        
        document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });

      blogPagination.appendChild(btn);
    }
  }
};

if (document.querySelector("#blog .blog-card")) {
  displayBlogPosts(currentPage);
  setupPagination();
}

// NEWSLETTER SUBSCRIPTION
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Thank you for subscribing with ${email}!`);
      e.target.reset();
    }
  });
}
