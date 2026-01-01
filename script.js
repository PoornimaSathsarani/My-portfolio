/ ===================== PRELOADER =====================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";
});

// ===================== DARK MODE =====================
const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.innerHTML = document.body.classList.contains("dark")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

// ===================== TYPING EFFECT =====================
const typingText = document.querySelector(".typing-text");
const words = ["Biomedical Technologist", "Web Developer", "Healthcare Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

const typeEffect = () => { 
  const currentWord = words[wordIndex];
  const currentChars = currentWord.substring(0, charIndex);
  typingText.textContent = currentChars;

  let typeSpeed = isDeleting ? 40 : 100;// Deleting faster, typing slightly faster


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

// ===================== FADE-IN ON SCROLL =====================
const fadeSections = document.querySelectorAll(".fade-in");
const revealOnScroll = () => {
  fadeSections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) sec.style.animationPlayState = "running";
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    
    // TODO: Register at https://formspree.io/ and replace this ID with your own
    const formspreeId = "https://formspree.io/f/xojvveyg"; 
    const formData = new FormData(e.target);

    if (formspreeId === "https://formspree.io/f/xojvveyg") {
      // Fallback to Mailto
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
      window.location.href = `mailto:dpswijenayake@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      e.target.reset();
    } else {
      fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          alert("Message sent successfully!");
          e.target.reset();
        } else {
          alert("Oops! There was a problem sending your message.");
        }
      }).catch(error => {
        alert("Error sending message. Please try again.");
      });
    }
  });
}

// ===================== BACK TO TOP =====================
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  if (!backBtn) return;
  if (window.scrollY > 300) backBtn.classList.add("active");
  else backBtn.classList.remove("active");
});
if (backBtn) backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== ACTIVE NAV LINK =====================
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section, footer");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) link.classList.add("active");
  });
});

// ===================== SKILL BARS =====================
const skillSection = document.getElementById("skills");
const progressBars = document.querySelectorAll(".skill-per");
window.addEventListener("scroll", () => {
  if (!skillSection) return;
  const sectionPos = skillSection.getBoundingClientRect().top;
  if (sectionPos < window.innerHeight - 50) {
    progressBars.forEach(bar => bar.style.width = bar.dataset.width);
  }
});

// ===================== MOBILE MENU =====================
const menuBtn = document.getElementById("menuBtn");
const navContainer = document.querySelector(".nav-links");

if (menuBtn && navContainer) {
  menuBtn.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    menuBtn.innerHTML = navContainer.classList.contains("active") ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

// ===================== TESTIMONIAL SLIDER =====================
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
if (slider && slides.length > 0) {
  let currentSlide = 0;
  const updateSlider = () => slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  const nextSlide = () => { currentSlide = (currentSlide + 1) % slides.length; updateSlider(); };
  const prevSlide = () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlider(); };
  nextBtn && nextBtn.addEventListener("click", nextSlide);
  prevBtn && prevBtn.addEventListener("click", prevSlide);
  setInterval(nextSlide, 3000);
}

// ===================== BLOG SEARCH & PAGINATION =====================
const blogSearchInput = document.getElementById("blogSearch");
const allBlogCards = document.querySelectorAll("#blog .blog-card");
const blogPagination = document.getElementById("blogPagination");
let currentPage = 2;
const itemsPerPage = 2;

const displayBlogPosts = (page) => {
  allBlogCards.forEach((card, index) => {
    card.style.display = (index >= (page-1)*itemsPerPage && index < page*itemsPerPage) ? "block" : "none";
  });
};

const setupPagination = () => {
  if (!blogPagination) return;
  blogPagination.innerHTML = "";
  const pageCount = Math.ceil(allBlogCards.length / itemsPerPage);
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
};

if (allBlogCards.length > 0) { displayBlogPosts(currentPage); setupPagination(); }

if (blogSearchInput) {
  blogSearchInput.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    if (blogPagination) blogPagination.style.display = term ? "none" : "flex";
    allBlogCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const text = card.querySelector("p").textContent.toLowerCase();
      card.style.display = title.includes(term) || text.includes(term) ? "block" : "none";
    });
  });
}

// ===================== PROJECT MODAL =====================
const projectBtns = document.querySelectorAll(".project-btn");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.getElementById("modalGallery");
const closeBtn = document.querySelector(".close-modal");

if (modal && closeBtn) {
  projectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;

      modalTitle.innerText = card.dataset.title || "Project Details";
      modalDesc.innerText = card.dataset.desc || "";

      modalGallery.innerHTML = "";
      if (card.dataset.images) {
        const images = card.dataset.images.split(",");
        images.forEach(src => {
          const img = document.createElement("img");
          img.src = src.trim();
          modalGallery.appendChild(img);
        });
      }

      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ===================== NEWSLETTER =====================
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="poornimasathsarani62@gmail.com"]').value;
    
    // --- INSTRUCTION ---
    // To get real emails, register at https://formspree.io/ and create a new form.
    // Replace "YOUR_FORMSPREE_ID" below with the ID they give you (e.g., "xwqbjqrz").
    const formspreeId = "https://formspree.io/f/xojvveyg"; 

    if (formspreeId !== "https://formspree.io/f/xojvveyg") {
      // Use Formspree service
      fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target)
      }).then(response => {
        if (response.ok) { alert("Thanks for subscribing!"); e.target.reset(); }
        else { alert("Oops! There was a problem submitting your form."); }
      });
    } else {
      // Fallback to Mailto (Current behavior)
      if (email) alert(`Thank you! Your email app will now open. Please send the email to complete your subscription.`);
      const subject = "Newsletter Subscription";
      const body = `Please add ${email} to your newsletter list.`;
      window.location.href = `mailto:dpswijenayake@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      e.target.reset();
    }
  });
}

// ===================== HERO BACKGROUND SLIDER =====================
const heroSection = document.querySelector(".hero");
const heroImages = [
  "images/background 01.jpeg",
  "images/background 02.jpeg",
  "images/background 03.jpeg"
];
let heroIndex = 0;

if (heroSection) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroImages[heroIndex]}')`;
  }, 3000);
}

// ===================== FOLLOW BUTTON =====================
const followBtn = document.getElementById("followBtn");
const followCountDisplay = document.getElementById("followCount");
const baseFollowers = 0;

// NOTE: This implementation uses localStorage, which saves data ONLY on the visitor's browser.
// You (the owner) will not see these counts increase unless you connect this to a database.
// For "Follow", you rely on the user actually sending the email to know they followed.
if (followBtn && followCountDisplay) {
  // Helper to safely get storage
  const getStoredFollow = () => {
    try { return localStorage.getItem("isFollowing") === "true"; } catch(e) { return false; }
  };

  const updateFollowUI = (isFollowing) => {
    if (isFollowing) {
      followBtn.innerText = "Following";
      followBtn.style.backgroundColor = "#5fe28b";
      followBtn.style.color = "white";
      followCountDisplay.innerText = `${baseFollowers + 1} Followers`;
    } else {
      followBtn.innerText = "Follow Website";
      followBtn.style.backgroundColor = "";
      followBtn.style.color = "";
      followCountDisplay.innerText = `${baseFollowers} Followers`;
    }
  };

  // Initialize
  updateFollowUI(getStoredFollow());

  followBtn.addEventListener("click", () => {
    const isNowFollowing = !getStoredFollow();
    updateFollowUI(isNowFollowing);
    
    try {
      if (isNowFollowing) {
        localStorage.setItem("isFollowing", "true");
        const subject = "New Website Follower";
        const body = "Hi, I just clicked the Follow button on your portfolio website!";
        window.location.href = `mailto:dpswijenayake@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      } else {
        localStorage.removeItem("isFollowing");
      }
    } catch(e) {}
  });
}

// ===================== SHARE BUTTON =====================
const shareBtn = document.getElementById("shareBtn");
const shareCountDisplay = document.getElementById("shareCount");
const baseShares = 0;

// NOTE: Counts are stored locally. To track real shares, integrate Google Analytics or a backend.
if (shareBtn && shareCountDisplay) {
  let localShares = 0;
  try { localShares = parseInt(localStorage.getItem("userShareCount") || "0"); } catch(e) {}
  
  shareCountDisplay.innerText = `${baseShares + localShares} Shares`;

  shareBtn.addEventListener("click", async () => {
    localShares++;
    try { localStorage.setItem("userShareCount", localShares); } catch(e) {}
    shareCountDisplay.innerText = `${baseShares + localShares} Shares`;

    const shareData = {
      title: document.title,
      text: "Check out this portfolio!",
      url: window.location.href,
    };

    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => prompt("Copy this link to share:", window.location.href));
    } else {
      prompt("Copy this link to share:", window.location.href);
    }
  });
}

// ===================== LIKE BUTTON =====================
const likeBtn = document.getElementById("likeBtn");
const likeCountDisplay = document.getElementById("likeCount");
const baseLikes = 0;

// NOTE: Counts are stored locally. To track real likes, you need a database (e.g., Firebase).
if (likeBtn && likeCountDisplay) {
  const getStoredLike = () => {
    try { return localStorage.getItem("isLiked") === "true"; } catch(e) { return false; }
  };
  
  const updateLikeUI = (isLiked) => {
    if (isLiked) {
      likeBtn.innerHTML = 'Liked <i class="fas fa-heart"></i>';
      likeBtn.style.color = "#ff6b6b";
      likeCountDisplay.innerText = `${baseLikes + 1} Likes`;
    } else {
      likeBtn.innerHTML = 'Like <i class="far fa-heart"></i>';
      likeBtn.style.color = "";
      likeCountDisplay.innerText = `${baseLikes} Likes`;
    }
  };

  updateLikeUI(getStoredLike());

  likeBtn.addEventListener("click", () => {
    const isNowLiked = !getStoredLike();
    updateLikeUI(isNowLiked);
    
    try {
      if (isNowLiked) localStorage.setItem("isLiked", "true");
      else localStorage.removeItem("isLiked");
    } catch(e) {}
  });
}

