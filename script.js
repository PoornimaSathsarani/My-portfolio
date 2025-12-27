// ===== TYPING EFFECT =====
const typingText = document.querySelector(".typing-text");
const text = typingText.textContent;
typingText.textContent = "";
let i = 0;

function type(){
 if(i < text.length){
  typingText.textContent += text.charAt(i);
  i++;
  setTimeout(type,100);
 }
}
type();

// ===== BACK TO TOP =====
const backBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll",()=>{
 backBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backBtn.onclick = ()=>window.scrollTo({top:0,behavior:"smooth"});

// ===== SKILL ANIMATION =====
document.querySelectorAll(".skill-circle").forEach(circle=>{
 let percent = circle.dataset.percentage;
 let number = circle.querySelector(".number");
 let count = 0;
 let interval = setInterval(()=>{
  if(count >= percent) clearInterval(interval);
  else{
   count++;
   number.textContent = count+"%";
  }
 },20);
});

// ===== DARK MODE =====
document.addEventListener("DOMContentLoaded",()=>{
 const themeBtn = document.getElementById("themeBtn");

 if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark-mode");
  themeBtn.innerHTML='<i class="fas fa-sun"></i>';
 }

 themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeBtn.innerHTML = isDark
   ? '<i class="fas fa-sun"></i>'
   : '<i class="fas fa-moon"></i>';
  localStorage.setItem("theme",isDark?"dark":"light");
 });
});
