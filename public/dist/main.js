const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const yearEl = document.getElementById('year');
const GA_MEASUREMENT_ID = 'G-1B2F5LJYPT';
const PROD_HOSTNAMES = new Set(['tvenoveja.cz', 'www.tvenoveja.cz']);

function initGoogleAnalytics() {
  if (!PROD_HOSTNAMES.has(window.location.hostname)) {
    return;
  }

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}

initGoogleAnalytics();

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function toggleMenu() {
  if (!mobileMenu) {
    return;
  }

  const isOpen = !mobileMenu.classList.contains('opacity-0');
  mobileMenu.classList.toggle('opacity-0');
  mobileMenu.classList.toggle('-translate-y-full');
  mobileMenu.classList.toggle('pointer-events-none');
  document.body.classList.toggle('overflow-hidden');

  if (!isOpen) {
    mobileLinks.forEach((link, index) => {
      link.style.animationDelay = `${index * 0.1}s`;
      link.classList.add('mobile-link-anim');
    });
  } else {
    mobileLinks.forEach((link) => {
      link.classList.remove('mobile-link-anim');
    });
  }
}

if (menuToggle && menuClose && mobileMenu) {
  menuToggle.addEventListener('click', toggleMenu);
  menuClose.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav .hidden.lg\\:flex a');

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.remove('text-black');
        link.classList.add('text-slate-500');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('text-black');
          link.classList.remove('text-slate-500');
        }
      });
    }
  });
};

if (sections.length > 0 && navLinks.length > 0) {
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
}
