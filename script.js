/* GLOBAL */
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const themeBtn = document.querySelector(".theme-toggle");

/* SMOOTH SCROLL */
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
    menu?.classList.remove("show");
  });
});

/* HAMBURGER */
menuToggle?.addEventListener("click", () => {
  menu.classList.toggle("show");
});

/* FADE + TIMELINE */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.2 });

document
  .querySelectorAll(".fade-in, .timeline-row")
  .forEach(el => observer.observe(el));

/* NAV ACTIVE */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120)
      current = sec.id;
  });

  navLinks.forEach(a => {
    a.classList.toggle(
      "active",
      a.getAttribute("href") === `#${current}`
    );
  });
});

/* THEME SWITCH */
(function () {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
  }
})();

function toggleTheme() {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  localStorage.setItem("theme", light ? "light" : "dark");
  themeBtn.textContent = light ? "☀️" : "🌙";
}
/* ================= TYPING ANIMATION ================= */
const roles = [
  "Java Full Stack Developer",
  "Backend Developer",
  "Microservices Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let typingElement = document.getElementById("typing");
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingElement.textContent = currentRole.slice(0, charIndex++);
    if (charIndex > currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentRole.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();
/* ================= EMAILJS CONTACT FORM ================= */
emailjs.init("k0ZXXU4UMyDubQFjf"); // 🔑 paste your public key

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_2a9sxjq",        // ✅ YOUR SERVICE ID
    "template_4q5k5kr",       // ✅ YOUR TEMPLATE ID
    this
  ).then(() => {
    alert("Message sent successfully 🚀");
    this.reset();
  }, (error) => {
    alert("Failed to send message 😢");
    console.log(error);
  });
});
