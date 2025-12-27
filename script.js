// Typing effect
const text = document.querySelector(".typing-text");
const original = text.textContent;
text.textContent = "";
let i = 0;

function type(){
 if(i < original.length){
   text.textContent += original.charAt(i);
   i++;
   setTimeout(type,100);
 }
}
type();

// Back to top
const btn = document.getElementById("backToTopBtn");
window.addEventListener("scroll",()=>{
 btn.style.display = window.scrollY > 300 ? "block" : "none";
});
btn.onclick = ()=>window.scrollTo({top:0,behavior:"smooth"});

// Skill animation
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
