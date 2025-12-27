/* ==============================
   PRELOADER
============================== */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});


/* ==============================
   DARK / LIGHT MODE TOGGLE
============================== */
const themeBtn = document.getElementById("themeBtn");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", "light");
  }
});


/* ==============================
   SMOOTH SCROLL FOR NAV LINKS
============================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* ==============================
   BACK TO TOP BUTTON
============================== */
const backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* ==============================
   SCROLL PROGRESS BAR
============================== */
window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("myBar");
  if (progressBar) {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  }
});


/* ==============================
   TYPING TEXT ANIMATION
============================== */
const typingText = document.querySelector(".typing-text");

if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = "";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 100);
    }
  }

  typeEffect();
}


/* ==============================
   FADE-IN ON SCROLL ANIMATION
============================== */
const fadeSections = document.querySelectorAll(".fade-in-section");

const fadeInOnScroll = () => {
  fadeSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
      section.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();


/* ==============================
   SKILL PERCENTAGE ANIMATION
============================== */
const skillCircles = document.querySelectorAll(".skill-circle");

const animateSkills = () => {
  skillCircles.forEach(skill => {
    const value = skill.getAttribute("data-percentage");
    const number = skill.querySelector(".number");

    let count = 0;
    const updateCount = () => {
      if (count < value) {
        count++;
        number.textContent = count + "%";
        setTimeout(updateCount, 20);
      }
    };

    const skillTop = skill.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (skillTop < screenHeight - 100 && !skill.classList.contains("done")) {
      skill.classList.add("done");
      updateCount();
    }
  });
};

window.addEventListener("scroll", animateSkills);
animateSkills();


/* ==============================
   CONTACT FORM (DEMO ONLY)
============================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully! (Demo)");
    contactForm.reset();
  });
}


