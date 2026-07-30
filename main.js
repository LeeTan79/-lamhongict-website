const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const progress = document.querySelector('.page-progress');
const backTop = document.querySelector('.back-top');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  if (header) {
    header.classList.toggle('scrolled', y > 10);
  }

  if (backTop) {
    backTop.classList.toggle('show', y > 500);
  }

  if (progress && max > 0) {
    progress.style.width = ((y / max) * 100) + "%";
  }
});

backTop?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

const counters = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);

    let current = 0;

    const timer = setInterval(() => {

      current += Math.ceil(target / 40);

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      el.textContent = current;

    }, 30);

    counterObserver.unobserve(el);

  });
}, {
  threshold: 0.5
});

counters.forEach(counter => {
  counterObserver.observe(counter);
});
