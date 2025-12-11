
const links = document.querySelectorAll('.nav-links a[data-page]');
const pages = document.querySelectorAll('.page');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.dataset.page;

        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('bi-moon');
    icon.classList.toggle('bi-sun');
});

const accordions = document.querySelectorAll('.accordion-item');

accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    
    if (hash) {
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(hash);
        if (targetPage) {
            targetPage.classList.add('active');
            
            links.forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`a[data-page="${hash}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
});