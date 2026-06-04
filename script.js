const body = document.body;
const header = document.querySelector("#siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const closeMenuItems = document.querySelectorAll("[data-close-menu]");
const filters = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.querySelector("#contactForm");
const statusText = document.querySelector(".form-status");

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenu(!body.classList.contains("menu-open"));
});

closeMenuItems.forEach((item) => {
  item.addEventListener("click", () => setMenu(false));
});

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      header.classList.toggle("scrolled", window.scrollY > 20);
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.type === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.count);
      const suffix = target === 100 ? "%" : target === 15 ? "M" : "+";
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 48));

      const interval = window.setInterval(() => {
        current = Math.min(target, current + step);
        counter.textContent = `${current}${suffix}`;

        if (current === target) {
          window.clearInterval(interval);
        }
      }, 24);

      observer.unobserve(counter);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll("[data-count]").forEach((counter) => {
  counterObserver.observe(counter);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const phone = formData.get("phone").toString().trim();
  const service = formData.get("service").toString().trim();
  const message = formData.get("message").toString().trim();

  // Construct the WhatsApp message
  const whatsappNumber = "919876543210"; // TODO: Replace with the actual business WhatsApp number
  const whatsappText = `Hello Bhumi Enterprises,

I would like to request a service:
*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Details:* ${message}`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, "_blank");

  statusText.textContent = `Thanks ${name}. Redirecting to WhatsApp...`;
  contactForm.reset();

  // Dark mode toggle handling
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  function applyDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkModeToggle.setAttribute('aria-pressed', String(enabled));
  }
  function initDarkMode() {
    const stored = localStorage.getItem('darkMode');
    const enabled = stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyDarkMode(enabled);
  }
  darkModeToggle.addEventListener('click', () => {
    const isEnabled = document.body.classList.toggle('dark-mode');
    darkModeToggle.setAttribute('aria-pressed', String(isEnabled));
    localStorage.setItem('darkMode', isEnabled);
  });
  initDarkMode();
});
