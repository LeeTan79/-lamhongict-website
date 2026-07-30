const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.main-nav a').forEach(item => {
    item.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle?.setAttribute('aria-expanded', false);
    });
});
